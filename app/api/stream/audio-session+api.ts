import { StreamClient } from '@stream-io/node-sdk';

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

    // Create or get the lesson call — one shared room per lesson
    const callId = `${languageId}-${lessonId}`;
    const call = client.video.call('default', callId);

    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }],
      },
    });

    return Response.json({ token, callId });
  } catch (error) {
    console.error('[Stream] audio-session error:', error);
    return Response.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
