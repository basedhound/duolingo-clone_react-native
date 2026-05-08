import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { images } from '@/constants/images';
import { languages } from '@/data/languages';
import { useLanguageStore } from '@/store/language-store';

export default function LanguageSelectionScreen() {
  const { selectedLanguageId: storedId, setSelectedLanguage } = useLanguageStore();
  const [selectedId, setSelectedId] = useState<string | null>(storedId);
  const [search, setSearch] = useState('');

  const filtered = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLanguage = languages.find(l => l.id === selectedId);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#0D132B" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-poppins-semibold text-[18px] text-text-primary">
          Choose a language
        </Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={19} color="#6B7280" />
          <TextInput
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Popular label */}
        <Text className="font-poppins-bold text-[15px] text-text-primary px-4 mb-3">
          Popular
        </Text>

        {/* Language list */}
        <View className="px-4 gap-3">
          {filtered.map(lang => {
            const isSelected = selectedId === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedId(lang.id)}
                activeOpacity={0.75}
                style={[styles.card, isSelected && styles.cardSelected]}
              >
                <View style={styles.flagCircle}>
                  <Text style={styles.flagEmoji}>{lang.flag}</Text>
                </View>
                <View className="flex-1 ml-3">
                  <Text className="font-poppins-semibold text-[15px] text-text-primary">
                    {lang.name}
                  </Text>
                  <Text className="font-poppins text-[13px] text-text-secondary" numberOfLines={1}>
                    {lang.description}
                  </Text>
                </View>
                {isSelected ? (
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Earth illustration */}
        <Image source={images.earth} style={styles.earthImage} resizeMode="contain" />
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedId && styles.confirmButtonDisabled]}
          disabled={!selectedId}
          activeOpacity={0.85}
          onPress={() => {
            if (selectedId) {
              setSelectedLanguage(selectedId);
              router.replace('/');
            }
          }}
        >
          <Text className="font-poppins-semibold text-[16px] text-white">
            {selectedLanguage ? `Start Learning ${selectedLanguage.name}` : 'Select a Language'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#0D132B',
    padding: 0,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  cardSelected: {
    borderColor: '#6C4EF5',
    backgroundColor: '#F0EDFF',
  },
  flagCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagEmoji: {
    fontSize: 28,
    lineHeight: 36,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6C4EF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earthImage: {
    width: '100%',
    height: 220,
    marginTop: 16,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  confirmButton: {
    backgroundColor: '#6C4EF5',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#C4B5FD',
  },
});
