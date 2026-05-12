import { StreamClient } from '@stream-io/node-sdk';

import { languages } from '@/data/languages';
import { lessons } from '@/data/lessons';
import { units } from '@/data/units';
import type { VocabularyActivity, PhraseMatchActivity } from '@/types/learning';

// Agent user must match AGENT_USER_ID in vision-agent/main.py
const AGENT_USER_ID = 'language-teacher';

interface AudioSessionBody {
  userId: string;
  lessonId: string;
  languageId: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as AudioSessionBody;
    const { userId, lessonId, languageId } = body;

    if (!userId || !lessonId) {
      return Response.json({ error: 'Missing userId or lessonId' }, { status: 400 });
    }

    const apiKey = process.env.STREAM_API_KEY;
    const apiSecret = process.env.STREAM_API_SECRET;

    if (!apiKey || !apiSecret) {
      return Response.json({ error: 'Stream not configured' }, { status: 500 });
    }

    const client = new StreamClient(apiKey, apiSecret);

    // Generate a short-lived user token (1 hour)
    const token = client.generateUserToken({
      user_id: userId,
      validity_in_seconds: 3600,
    });

    // Ensure the agent user exists so it can be added as a call member
    await client.upsertUsers([{ id: AGENT_USER_ID, name: 'AI Teacher' }]);

    // Look up lesson context to pack into the call's custom data
    const lesson = lessons.find((l) => l.id === lessonId);
    const language = languages.find((l) => l.id === languageId);
    units.find((u) => u.lessonIds.includes(lessonId ?? ''));

    const vocabulary = lesson?.activities
      .filter((a): a is VocabularyActivity => a.type === 'vocabulary')
      .flatMap((a) =>
        a.items.slice(0, 12).map((i) => ({ word: i.word, translation: i.translation })),
      ) ?? [];

    const phrases = lesson?.activities
      .filter((a): a is PhraseMatchActivity => a.type === 'phrase_match')
      .flatMap((a) =>
        a.phrases.slice(0, 8).map((p) => ({ phrase: p.phrase, translation: p.translation })),
      ) ?? [];

    const lessonCustomData = {
      lessonId,
      lessonTitle: lesson?.title ?? '',
      languageId,
      languageName: language?.name ?? '',
      goals: lesson?.goals ?? [],
      vocabulary,
      phrases,
      aiTeacher: lesson?.aiTeacher ?? null,
    };

    // One shared audio_room per lesson (call type required for agent publish permissions)
    const callId = `${languageId}-${lessonId}`;
    const call = client.video.call('audio_room', callId);

    // Create the call if it doesn't exist; if it does, getOrCreate is a no-op for data
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [
          { user_id: userId, role: 'speaker' },
          { user_id: AGENT_USER_ID, role: 'admin' },
        ],
        custom: lessonCustomData,
      },
    });

    // Always refresh custom data and member roles for existing calls
    await call.update({ custom: lessonCustomData });
    await call.updateCallMembers({
      update_members: [
        { user_id: userId, role: 'speaker' },
        { user_id: AGENT_USER_ID, role: 'admin' },
      ],
    });

    // Activate the room so speakers and admins can publish audio
    try {
      await call.goLive();
    } catch {
      // Room may already be live; ignore
    }

    return Response.json({ token, callId });
  } catch (error) {
    console.error('[Stream] audio-session error:', error);
    return Response.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
