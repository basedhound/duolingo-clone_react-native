import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { languages } from '@/data/languages';
import { lessons } from '@/data/lessons';
import { units } from '@/data/units';
import type { Lesson } from '@/types/learning';
import { useLanguageStore } from '@/store/language-store';

type IoniconName = keyof typeof Ionicons.glyphMap;

const GREETINGS: Record<string, string> = {
  es: 'Hola',
  fr: 'Bonjour',
  ja: 'こんにちは',
  de: 'Hallo',
};

const DAILY_XP = 15;
const DAILY_GOAL = 20;
const STREAK = 12;

// ─────────────────────────────────────────────
// Plan item helpers
// ─────────────────────────────────────────────

type LessonDisplay = {
  label: string;
  subtitle: string;
  icon: IoniconName;
  iconBg: string;
};

function getLessonDisplay(lesson: Lesson): LessonDisplay {
  switch (lesson.type) {
    case 'vocabulary':
      return { label: 'Lesson', subtitle: lesson.title, icon: 'book', iconBg: '#6C4EF5' };
    case 'conversation':
      return { label: 'AI Conversation', subtitle: 'Talk about your day', icon: 'headset', iconBg: '#4D8BFF' };
    case 'ai_teacher':
      return { label: 'New words', subtitle: 'Live AI conversation', icon: 'chatbubbles', iconBg: '#FF6B6B' };
    default:
      return { label: 'Lesson', subtitle: lesson.title, icon: 'book', iconBg: '#6C4EF5' };
  }
}

function PlanItem({
  lesson,
  completed,
  isLast,
}: {
  lesson: Lesson;
  completed: boolean;
  isLast: boolean;
}) {
  const config = getLessonDisplay(lesson);
  return (
    <TouchableOpacity
      style={[styles.planItem, !isLast && styles.planItemBorder]}
      activeOpacity={0.7}
    >
      <View style={[styles.planIconBox, { backgroundColor: config.iconBg }]}>
        <Ionicons name={config.icon} size={22} color="#FFFFFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.planLabel}>{config.label}</Text>
        <Text style={styles.planSubtitle} numberOfLines={1}>
          {config.subtitle}
        </Text>
      </View>
      {completed ? (
        <Ionicons name="checkmark-circle" size={28} color="#6C4EF5" />
      ) : (
        <View style={styles.emptyCircle} />
      )}
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();

  const language = languages.find((l) => l.id === selectedLanguageId);
  const unit = units.find((u) => u.languageId === selectedLanguageId);
  const todayLessons = unit
    ? (unit.lessonIds
        .slice(0, 3)
        .map((id) => lessons.find((l) => l.id === id))
        .filter(Boolean) as Lesson[])
    : [];

  const greeting = GREETINGS[selectedLanguageId ?? ''] ?? 'Hello';
  const firstName = user?.firstName ?? 'there';
  const xpFraction = DAILY_XP / DAILY_GOAL;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.flagCircle}>
              <Text style={styles.flagEmoji}>{language?.flag ?? '🌍'}</Text>
            </View>
            <Text style={styles.greetingText}>
              {greeting}, {firstName}! 👋
            </Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.streakRow}>
              <Image
                source={images.streakFire}
                style={styles.streakIcon}
                resizeMode="contain"
              />
              <Text style={styles.streakCount}>{STREAK}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#0D132B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────── */}
        <View style={styles.dailyGoalCard}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={styles.dailyGoalLabel}>Daily goal</Text>
            <View style={styles.xpRow}>
              <Text style={styles.xpCurrent}>{DAILY_XP}</Text>
              <Text style={styles.xpGoal}> / {DAILY_GOAL} XP</Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={{ flex: xpFraction, backgroundColor: '#FF8A00', borderRadius: 5 }}
              />
              <View style={{ flex: 1 - xpFraction }} />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={styles.treasureImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Continue Learning Card ──────────────── */}
        <View style={styles.continueCard}>
          <View style={styles.continueContent}>
            <Text style={styles.continueLabelSmall}>Continue learning</Text>
            <Text style={styles.continueLanguageName}>
              {language?.name ?? 'Spanish'}
            </Text>
            <Text style={styles.continueLevelLabel}>A1 • Unit 1</Text>
            <TouchableOpacity style={styles.continueBtn} activeOpacity={0.85}>
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={images.palace}
            style={styles.palaceImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Today's Plan ────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{"Today's plan"}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planList}>
            {todayLessons.map((lesson, i) => (
              <PlanItem
                key={lesson.id}
                lesson={lesson}
                completed={i === 0}
                isLast={i === todayLessons.length - 1}
              />
            ))}
          </View>
        </View>

        {/* ── Next Up Card ────────────────────────── */}
        <View style={styles.nextUpCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextUpLabel}>Next up</Text>
            <Text style={styles.nextUpTitle}>AI Video Call</Text>
            <Text style={styles.nextUpSub}>Practice speaking</Text>
          </View>
          <View style={styles.nextUpRight}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
              }}
              style={styles.teacherAvatar}
            />
            <TouchableOpacity style={styles.videoCallBtn} activeOpacity={0.85}>
              <Ionicons name="videocam" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 32 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  flagCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F7FB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: { fontSize: 22, lineHeight: 28 },
  greetingText: { fontFamily: 'Poppins-SemiBold', fontSize: 17, color: '#0D132B' },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakIcon: { width: 22, height: 22 },
  streakCount: { fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#FF8A00' },

  // Daily Goal Card
  dailyGoalCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#FFF5EC',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 110,
    overflow: 'hidden',
  },
  dailyGoalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  xpRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 14 },
  xpCurrent: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    color: '#0D132B',
    lineHeight: 40,
  },
  xpGoal: { fontFamily: 'Poppins-Regular', fontSize: 15, color: '#6B7280' },
  progressTrack: {
    height: 10,
    backgroundColor: '#FFE0C2',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  treasureImage: { width: 100, height: 100 },

  // Continue Learning Card
  continueCard: {
    marginHorizontal: 20,
    marginBottom: 28,
    backgroundColor: '#6C4EF5',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: 188,
    paddingLeft: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  continueContent: { flex: 1, zIndex: 1 },
  continueLabelSmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  continueLanguageName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 36,
    marginBottom: 4,
  },
  continueLevelLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 22,
  },
  continueBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  continueBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#6C4EF5',
  },
  palaceImage: {
    position: 'absolute',
    right: -8,
    bottom: 0,
    width: 168,
    height: 188,
  },

  // Section
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: { fontFamily: 'Poppins-Bold', fontSize: 18, color: '#0D132B' },
  viewAll: { fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#6C4EF5' },

  // Plan list
  planList: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  planItemBorder: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  planIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#0D132B',
    marginBottom: 2,
  },
  planSubtitle: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#6B7280' },
  emptyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },

  // Next Up Card
  nextUpCard: {
    marginHorizontal: 20,
    backgroundColor: '#F0F8EE',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextUpLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  nextUpTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0D132B',
    marginBottom: 2,
  },
  nextUpSub: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#6B7280' },
  nextUpRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  teacherAvatar: { width: 64, height: 64, borderRadius: 32 },
  videoCallBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#21C16B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
