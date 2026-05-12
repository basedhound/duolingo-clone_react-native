import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { languages } from '@/data/languages';
import { lessons } from '@/data/lessons';
import { units } from '@/data/units';
import { createStreamVideoClient, getStreamApiUrl } from '@/lib/stream';
import type { Language, Lesson } from '@/types/learning';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type CallPhase = 'loading' | 'connecting' | 'joined' | 'error';
type AgentStatus = 'idle' | 'connecting' | 'connected' | 'failed';

// ─────────────────────────────────────────────
// Language phrases
// ─────────────────────────────────────────────

const LANG_PHRASE: Record<string, string> = {
  es: '¡Muy bien! That was great! 👋',
  fr: 'Très bien ! C\'était super ! 👋',
  ja: 'とても良かったです！Great job! 👋',
  de: 'Sehr gut! Das war super! 👋',
};

// ─────────────────────────────────────────────
// Status helpers
// ─────────────────────────────────────────────

function resolveStatus(
  phase: CallPhase,
  agentStatus: AgentStatus,
): { label: string; color: string; spinner: boolean } {
  if (phase === 'connecting') {
    return { label: 'Connecting...', color: '#F59E0B', spinner: true };
  }
  switch (agentStatus) {
    case 'idle':
      return { label: 'Setting up teacher...', color: '#F59E0B', spinner: true };
    case 'connecting':
      return { label: 'Teacher joining...', color: '#F59E0B', spinner: true };
    case 'connected':
      return { label: 'Teacher Online', color: '#21C16B', spinner: false };
    case 'failed':
      return { label: 'Teacher unavailable', color: '#F59E0B', spinner: false };
  }
}

// ─────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────

function ControlButton({
  icon,
  label,
  active = true,
  danger = false,
  disabled = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.controlItem, disabled && { opacity: 0.4 }]}
      onPress={onPress}
      activeOpacity={0.75}
      disabled={disabled}
    >
      <View
        style={[
          styles.controlCircle,
          danger && styles.controlCircleDanger,
          !active && styles.controlCircleInactive,
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={danger ? '#FFFFFF' : active ? '#0D132B' : '#9CA3AF'}
        />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function StatColumn({
  label,
  value,
  color,
  last = false,
}: {
  label: string;
  value: string;
  color: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.statCol, !last && styles.statColBorder]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────
// Inner content — must live inside <StreamCall>
// to access Stream hooks
// ─────────────────────────────────────────────

interface AudioCallContentProps {
  lesson: Lesson | undefined;
  language: Language | undefined;
  phase: CallPhase;
  agentStatus: AgentStatus;
  userImageUrl: string | undefined;
  userName: string;
  onEndCall: () => void;
}

function AudioCallContent({
  lesson,
  language,
  phase,
  agentStatus,
  userImageUrl,
  userName,
  onEndCall,
}: AudioCallContentProps) {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, optimisticIsMute } = useMicrophoneState();

  const [subtitlesVisible, setSubtitlesVisible] = useState(true);

  const teacherPhrase =
    LANG_PHRASE[language?.id ?? ''] ?? '¡Muy bien! That was great! 👋';

  const { label: statusLabel, color: statusColor, spinner: showSpinner } =
    resolveStatus(phase, agentStatus);

  const isConnecting = phase === 'connecting';
  const isMuted = optimisticIsMute;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>

        {/* ── Header ──────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onEndCall}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#0D132B" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>AI Teacher</Text>
            <View style={styles.onlineRow}>
              {showSpinner ? (
                <ActivityIndicator
                  size="small"
                  color={statusColor}
                  style={{ marginRight: 4 }}
                />
              ) : (
                <View style={[styles.onlineDot, { backgroundColor: statusColor }]} />
              )}
              <Text style={[styles.onlineText, { color: statusColor }]}>
                {statusLabel}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.headerIconBtn}>
              <Ionicons name="videocam-outline" size={18} color="#0D132B" />
            </View>
            <View style={styles.headerIconBtn}>
              <Text style={styles.headerStreakText}>12</Text>
            </View>
            <View style={styles.headerIconBtn}>
              <Ionicons name="notifications-outline" size={18} color="#0D132B" />
            </View>
          </View>
        </View>

        {/* ── Teacher Area ─────────────────────── */}
        <View style={styles.teacherArea}>
          {/* Room background */}
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=70',
            }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
          <View style={styles.overlay} />

          {/* Fox mascot */}
          <Image
            source={images.mascotWelcome}
            style={styles.mascot}
            resizeMode="contain"
          />

          {/* User camera preview */}
          <View style={styles.userPreview}>
            {userImageUrl ? (
              <Image
                source={{ uri: userImageUrl }}
                style={styles.userPreviewImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.userPreviewFallback}>
                <Text style={styles.userPreviewInitial}>
                  {(userName[0] ?? 'U').toUpperCase()}
                </Text>
              </View>
            )}
            {/* Mic-off badge */}
            {isMuted && (
              <View style={styles.mutedBadge}>
                <Ionicons name="mic-off" size={10} color="#fff" />
              </View>
            )}
          </View>

          {/* Lesson info pill */}
          <View style={styles.lessonPill}>
            <Text style={styles.lessonPillFlag}>{language?.flag ?? '🌍'}</Text>
            <Text style={styles.lessonPillText} numberOfLines={1}>
              {lesson?.title ?? 'Lesson'}
            </Text>
          </View>

          {/* Speech bubble */}
          {subtitlesVisible && agentStatus === 'connected' && (
            <View style={styles.bubbleWrapper}>
              <View style={styles.bubble}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bubblePhrase}>{teacherPhrase}</Text>
                </View>
                <View style={styles.bubbleSpeaker}>
                  <Ionicons name="volume-high" size={22} color="#6C4EF5" />
                </View>
              </View>
              <View style={styles.bubbleArrow} />
            </View>
          )}

          {/* Overlay while Stream is connecting */}
          {isConnecting && (
            <View style={styles.connectingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.connectingOverlayText}>Joining lesson...</Text>
            </View>
          )}

          {/* Overlay while agent is joining (after Stream is ready) */}
          {!isConnecting && (agentStatus === 'idle' || agentStatus === 'connecting') && (
            <View style={styles.connectingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.connectingOverlayText}>Teacher is joining...</Text>
            </View>
          )}
        </View>

        {/* ── Controls ────────────────────────── */}
        <View style={styles.controls}>
          <ControlButton
            icon="videocam-outline"
            label="Camera"
            active={false}
            disabled
          />
          <ControlButton
            icon={isMuted ? 'mic-off-outline' : 'mic-outline'}
            label={isMuted ? 'Muted' : 'Mic'}
            active={!isMuted}
            onPress={() => microphone.toggle()}
            disabled={isConnecting}
          />
          <ControlButton
            icon="language-outline"
            label="Subtitles"
            active={subtitlesVisible}
            onPress={() => setSubtitlesVisible((v) => !v)}
          />
          <ControlButton
            icon="call-outline"
            label="End Call"
            danger
            onPress={onEndCall}
          />
        </View>

        {/* ── Session feedback card ────────────── */}
        <View style={styles.statsCard}>
          <StatColumn label="Speaking" value="Excellent" color="#21C16B" />
          <StatColumn label="Pronunciation" value="Great" color="#6C4EF5" />
          <StatColumn label="Grammar" value="Good" color="#4D8BFF" last />
        </View>

      </SafeAreaView>
    </View>
  );
}

// ─────────────────────────────────────────────
// Shared header shell (used by loading + error)
// ─────────────────────────────────────────────

function ShellHeader({
  label,
  color,
  showSpinner = false,
  onBack,
}: {
  label: string;
  color: string;
  showSpinner?: boolean;
  onBack: () => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={24} color="#0D132B" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>AI Teacher</Text>
        <View style={styles.onlineRow}>
          {showSpinner ? (
            <ActivityIndicator size="small" color={color} style={{ marginRight: 4 }} />
          ) : (
            <View style={[styles.onlineDot, { backgroundColor: color }]} />
          )}
          <Text style={[styles.onlineText, { color }]}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();

  const lesson = lessons.find((l) => l.id === id);
  const unit = units.find((u) => u.lessonIds.includes(id ?? ''));
  const language = languages.find((l) => l.id === unit?.languageId);

  const [phase, setPhase] = useState<CallPhase>('loading');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null);
  const [streamCall, setStreamCall] = useState<Call | null>(null);

  const callRef = useRef<Call | null>(null);
  const clientRef = useRef<StreamVideoClient | null>(null);
  const callIdRef = useRef<string | null>(null);
  const agentSessionRef = useRef<string | null>(null);

  // ── Stop agent helper (fire-and-forget) ──────
  function stopAgent() {
    const sessionId = agentSessionRef.current;
    const cid = callIdRef.current;
    if (!sessionId || !cid) return;
    agentSessionRef.current = null;
    fetch(
      getStreamApiUrl(
        `/api/stream/agent-session?callId=${encodeURIComponent(cid)}&sessionId=${encodeURIComponent(sessionId)}`,
      ),
      { method: 'DELETE' },
    ).catch(() => {});
  }

  // ── Unmount cleanup ───────────────────────────
  useEffect(() => {
    return () => {
      stopAgent();
      callRef.current?.leave().catch(() => {});
      clientRef.current?.disconnectUser().catch(() => {});
      callRef.current = null;
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stream setup ──────────────────────────────
  useEffect(() => {
    if (!user?.id || !id) return;

    let active = true;

    async function init() {
      try {
        // 1. Request token + call from our API route
        const url = getStreamApiUrl('/api/stream/audio-session');
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user!.id,
            lessonId: id,
            languageId: unit?.languageId ?? 'es',
          }),
        });

        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(err.error ?? `Server error ${res.status}`);
        }

        const { token, callId } = (await res.json()) as {
          token: string;
          callId: string;
        };

        if (!active) return;

        callIdRef.current = callId;

        // 2. Create Stream client with the Clerk user's identity
        const client = createStreamVideoClient(
          user!.id,
          token,
          user!.fullName ?? undefined,
          user!.imageUrl ?? undefined,
        );
        clientRef.current = client;

        // 3. Reference the audio_room call
        const call = client.call('audio_room', callId);
        callRef.current = call;

        setStreamClient(client);
        setStreamCall(call);
        setPhase('connecting');

        // 4. Join (creates if not yet existing)
        await call.join({ create: true });

        if (!active) return;
        setPhase('joined');
      } catch (e) {
        if (active) {
          const msg = e instanceof Error ? e.message : 'Failed to connect';
          console.error('[Stream] setup error:', msg);
          setErrorMsg(msg);
          setPhase('error');
        }
      }
    }

    init();

    return () => {
      active = false;
    };
  }, [user?.id, user, id, unit?.languageId]);

  // ── Start agent once the user has joined the call ──
  useEffect(() => {
    if (phase !== 'joined') return;
    const callId = callIdRef.current;
    if (!callId) return;

    let cancelled = false;
    setAgentStatus('connecting');

    fetch(getStreamApiUrl('/api/stream/agent-session'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ callId, callType: 'audio_room' }),
    })
      .then((r) => r.json())
      .then((data: { sessionId?: string }) => {
        if (cancelled) return;
        if (data.sessionId) {
          agentSessionRef.current = data.sessionId;
          setAgentStatus('connected');
        } else {
          setAgentStatus('failed');
        }
      })
      .catch(() => {
        if (!cancelled) setAgentStatus('failed');
      });

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // ── End call ──────────────────────────────────
  function handleEndCall() {
    stopAgent();
    callRef.current?.leave().catch(() => {});
    router.back();
  }

  const userDisplayName =
    user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? 'Learner';

  // ── Loading state ─────────────────────────────
  if (phase === 'loading' || !streamClient || !streamCall) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <ShellHeader
            label="Connecting..."
            color="#F59E0B"
            showSpinner
            onBack={() => router.back()}
          />
          <View style={styles.teacherArea}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=70',
              }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <Image
              source={images.mascotWelcome}
              style={styles.mascot}
              resizeMode="contain"
            />
            <View style={styles.statusCard}>
              <ActivityIndicator size="large" color="#6C4EF5" />
              <Text style={styles.statusCardTitle}>Setting up your lesson</Text>
              <Text style={styles.statusCardSub}>
                {language?.flag ?? '🌍'} {lesson?.title ?? 'AI Teacher Lesson'}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // ── Error state ───────────────────────────────
  if (phase === 'error') {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <ShellHeader label="Error" color="#EF4444" onBack={() => router.back()} />
          <View style={styles.teacherArea}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=70',
              }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.statusCard}>
              <Ionicons name="alert-circle" size={48} color="#EF4444" />
              <Text style={styles.statusCardTitle}>Could not connect</Text>
              <Text style={styles.statusCardSub}>{errorMsg}</Text>
              <TouchableOpacity
                style={styles.errorBtn}
                onPress={() => router.back()}
                activeOpacity={0.8}
              >
                <Text style={styles.errorBtnText}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // ── Connected ─────────────────────────────────
  return (
    <StreamVideo client={streamClient}>
      <StreamCall call={streamCall}>
        <AudioCallContent
          lesson={lesson}
          language={language}
          phase={phase}
          agentStatus={agentStatus}
          userImageUrl={user?.imageUrl ?? undefined}
          userName={userDisplayName}
          onEndCall={handleEndCall}
        />
      </StreamCall>
    </StreamVideo>
  );
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F7FB' },
  safeArea: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerCenter: { flex: 1 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#0D132B' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 },
  onlineDot: { width: 8, height: 8, borderRadius: 4 },
  onlineText: { fontFamily: 'Poppins-Regular', fontSize: 12 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStreakText: { fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#0D132B' },

  // Teacher area
  teacherArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#2B2D42',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  mascot: {
    position: 'absolute',
    bottom: 0,
    left: -20,
    width: '80%',
    height: '100%',
  },

  // User preview (top-right pip)
  userPreview: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 96,
    height: 122,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  userPreviewImage: { width: '100%', height: '100%' },
  userPreviewFallback: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPreviewInitial: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#6B7280',
  },
  mutedBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Lesson info pill
  lessonPill: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  lessonPillFlag: { fontSize: 16 },
  lessonPillText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#0D132B',
    maxWidth: 140,
  },

  // Speech bubble
  bubbleWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 100,
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bubblePhrase: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0D132B',
    lineHeight: 24,
  },
  bubbleSpeaker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleArrow: {
    position: 'absolute',
    bottom: -10,
    left: 26,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },

  // Connecting overlay on teacher area
  connectingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  connectingOverlayText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  // Status card (loading / error)
  statusCard: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  statusCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#0D132B',
    textAlign: 'center',
  },
  statusCardSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  errorBtn: {
    marginTop: 4,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  errorBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },

  // Controls
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  controlItem: { alignItems: 'center', gap: 6 },
  controlCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlCircleDanger: { backgroundColor: '#FF4D4F' },
  controlCircleInactive: { backgroundColor: '#F9FAFB' },
  controlLabel: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#6B7280' },

  // Stats card
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    gap: 4,
  },
  statColBorder: { borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  statLabel: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#6B7280' },
  statValue: { fontFamily: 'Poppins-SemiBold', fontSize: 14 },
});
