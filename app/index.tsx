import { useAuth, useClerk } from '@clerk/expo';
import { Redirect, router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguageStore } from '@/store/language-store';

export default function HomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { selectedLanguageId, _hasHydrated, clearSelectedLanguage } = useLanguageStore();

  if (!isLoaded || !_hasHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6C4EF5" />
        </View>
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="font-poppins-bold text-[28px] text-text-primary">muolingo</Text>
        <Text className="font-poppins text-base text-text-secondary text-center">
          Learn languages with your AI teacher.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.push('/language-selection')}
        >
          <Text className="font-poppins-semibold text-[16px] text-white">Choose a Language</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          activeOpacity={0.85}
          onPress={() => signOut()}
        >
          <Text className="font-poppins-semibold text-[16px] text-text-secondary">Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => clearSelectedLanguage()}
        >
          <Text className="font-poppins text-[13px] text-error mt-4">
            Reset language (dev)
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#6C4EF5',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginTop: 8,
  },
  buttonSecondary: {
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
});
