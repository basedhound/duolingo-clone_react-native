import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function HomeScreen() {
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
          onPress={() => router.push('/onboarding')}
        >
          <Text className="font-poppins-semibold text-[16px] text-white">View Onboarding</Text>
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
  button: {
    backgroundColor: '#6C4EF5',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginTop: 8,
  },
});
