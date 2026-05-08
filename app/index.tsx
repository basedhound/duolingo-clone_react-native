import { useAuth } from '@clerk/expo';
import { Href, Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguageStore } from '@/store/language-store';

export default function RootIndex() {
  const { isLoaded, isSignedIn } = useAuth();
  const { selectedLanguageId, _hasHydrated } = useLanguageStore();

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

  return <Redirect href={'/(tabs)' as Href} />;
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
});
