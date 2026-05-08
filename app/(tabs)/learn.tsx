import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { languages } from '@/data/languages';
import { lessons } from '@/data/lessons';
import { units } from '@/data/units';
import type { Lesson } from '@/types/learning';
import { useLanguageStore } from '@/store/language-store';

// ─────────────────────────────────────────────
// Status helpers
// ─────────────────────────────────────────────

type LessonStatus = 'completed' | 'in_progress' | 'locked';

function getStatus(index: number): LessonStatus {
  if (index < 2) return 'completed';
  if (index === 2) return 'in_progress';
  return 'locked';
}


// ─────────────────────────────────────────────
// Lesson card
// ─────────────────────────────────────────────

function LessonCard({
  lesson,
  index,
  onPress,
}: {
  lesson: Lesson;
  index: number;
  onPress: () => void;
}) {
  const status = getStatus(index);
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in_progress';
  const isLocked = status === 'locked';
  return (
    <TouchableOpacity
      style={[styles.card, isInProgress && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.cardLeft}>
        <Text style={[styles.cardNumber, isInProgress && styles.cardNumberActive]}>
          Lesson {index + 1}
        </Text>
        <Text style={[styles.cardTitle, isLocked && styles.cardTitleLocked]}>
          {lesson.title}
        </Text>
        {isInProgress && <Text style={styles.inProgressBadge}>In progress</Text>}
        {isLocked && (
          <Text style={styles.cardSub}>
            {lesson.activities.length} {lesson.activities.length === 1 ? 'activity' : 'activities'}
          </Text>
        )}
      </View>

      <View style={styles.cardRight}>
        {isCompleted && (
          <View style={styles.completedCircle}>
            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
          </View>
        )}
        {isInProgress && (
          <Image source={images.treasure} style={styles.inProgressImage} resizeMode="contain" />
        )}
        {isLocked && (
          <View style={styles.lockCircle}>
            <Ionicons name="lock-closed" size={18} color="#9CA3AF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export default function LearnScreen() {
  const { selectedLanguageId } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<'lessons' | 'practice'>('lessons');

  const language = languages.find((l) => l.id === selectedLanguageId);
  const unit = units.find((u) => u.languageId === selectedLanguageId);
  const unitLessons = unit
    ? (unit.lessonIds
        .map((id) => lessons.find((l) => l.id === id))
        .filter(Boolean) as Lesson[])
    : [];

  const completedCount = unitLessons.filter((_, i) => getStatus(i) === 'completed').length;
  const inProgressLesson = unitLessons.find((_, i) => getStatus(i) === 'in_progress');
  const headerTitle = inProgressLesson?.title ?? unit?.title ?? 'Lessons';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Header ────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle} numberOfLines={1}>{headerTitle}</Text>
            <Text style={styles.headerSub}>
              Unit {unit?.order ?? 1} • {completedCount} / {unitLessons.length} lessons
            </Text>
          </View>
          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
            <Ionicons name="bookmark-outline" size={22} color="#6C4EF5" />
          </TouchableOpacity>
        </View>

        {/* ── Hero ──────────────────────────────── */}
        <View style={styles.hero}>
          <View style={styles.heroBg} />
          <Image
            source={images.mascotWelcome}
            style={styles.heroMascot}
            resizeMode="contain"
          />
          <View style={styles.heroFlagPill}>
            <Text style={styles.heroFlag}>{language?.flag ?? '🌍'}</Text>
            <Text style={styles.heroLangName}>{language?.name ?? 'Language'}</Text>
          </View>
        </View>

        {/* ── Tab Selector ──────────────────────── */}
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'lessons' && styles.tabBtnActive]}
            onPress={() => setActiveTab('lessons')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabLabel, activeTab === 'lessons' && styles.tabLabelActive]}>
              Lessons
            </Text>
            {activeTab === 'lessons' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'practice' && styles.tabBtnActive]}
            onPress={() => setActiveTab('practice')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabLabel, activeTab === 'practice' && styles.tabLabelActive]}>
              Practice
            </Text>
            {activeTab === 'practice' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>

        {/* ── Content ───────────────────────────── */}
        <View style={styles.listContainer}>
          {activeTab === 'lessons' ? (
            unitLessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={i}
                onPress={() => router.push(`/lesson/${lesson.id}` as Href)}
              />
            ))
          ) : (
            <View style={styles.practicePlaceholder}>
              <Ionicons name="barbell-outline" size={48} color="#D1D5DB" />
              <Text style={styles.practiceTitle}>Practice coming soon</Text>
              <Text style={styles.practiceSub}>
                Complete more lessons to unlock practice exercises.
              </Text>
            </View>
          )}
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
    paddingBottom: 12,
  },
  headerTitles: { flex: 1, marginRight: 12 },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#0D132B',
    lineHeight: 28,
  },
  headerSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero
  hero: {
    height: 220,
    marginHorizontal: 0,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#D0ECF8',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#C5E8F5',
  },
  heroMascot: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 180,
    height: 200,
  },
  heroFlagPill: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  heroFlag: { fontSize: 18 },
  heroLangName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#0D132B',
  },

  // Tab selector
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabBtnActive: {},
  tabLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#9CA3AF',
  },
  tabLabelActive: {
    color: '#6C4EF5',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#6C4EF5',
  },

  // Lesson list
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },

  // Lesson card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardActive: {
    borderColor: '#6C4EF5',
    backgroundColor: '#F5F2FF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLeft: { flex: 1 },
  cardNumber: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  cardNumberActive: { color: '#6C4EF5' },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0D132B',
    lineHeight: 22,
  },
  cardTitleLocked: { color: '#6B7280' },
  cardSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  inProgressBadge: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#6C4EF5',
    marginTop: 4,
  },
  cardRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#21C16B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inProgressImage: {
    width: 48,
    height: 48,
  },
  lockCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Practice placeholder
  practicePlaceholder: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  practiceTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#6B7280',
  },
  practiceSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
