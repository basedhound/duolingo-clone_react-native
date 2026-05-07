import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { images } from '@/constants/images';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Logo row ── */}
      <View className="flex-row items-center justify-center gap-2 pt-4 pb-2">
        <Image source={images.mascotLogo} style={styles.logoIcon} resizeMode="contain" />
        <Text className="font-poppins-bold text-2xl text-text-primary">muolingo</Text>
      </View>

      {/* ── Heading & subtitle ── */}
      <View className="px-6 mt-4">
        <Text className="font-poppins-bold text-[32px] text-text-primary leading-[38px]">
          Your AI language
        </Text>
        <Text className="font-poppins-bold text-[32px] text-lingua-purple leading-[38px]">
          teacher.
        </Text>
        <Text className="font-poppins text-[15px] text-text-secondary leading-[24px] mt-2">
          Real conversations, personalized{'\n'}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* ── Mascot illustration with speech bubbles ── */}
      <View className="flex-1 items-center justify-center">
        <View style={styles.illustrationContainer}>
          {/* Hello! bubble – left */}
          <View style={styles.bubbleHello}>
            <Text className="font-poppins text-[15px] text-text-primary">Hello!</Text>
          </View>

          {/* ¡Hola! bubble – upper right */}
          <View style={styles.bubbleHola}>
            <Text className="font-poppins-semibold text-[15px] text-lingua-purple">¡Hola!</Text>
          </View>

          {/* 你好! bubble – right */}
          <View style={styles.bubbleChinese}>
            <Text className="font-poppins-semibold text-[15px] text-red-500">你好!</Text>
          </View>

          {/* Mascot */}
          <Image source={images.mascotWelcome} style={styles.mascot} resizeMode="contain" />
        </View>
      </View>

      {/* ── Get Started button ── */}
      <View className="px-5 pb-6">
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.replace('/')}
        >
          <Text className="font-poppins-semibold text-[17px] text-white">Get Started</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
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
  logoIcon: {
    width: 38,
    height: 38,
  },
  illustrationContainer: {
    width: 340,
    height: 320,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    width: 290,
    height: 310,
  },
  // Speech bubbles
  bubbleHello: {
    position: 'absolute',
    left: 4,
    top: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    transform: [{ rotate: '-6deg' }],
    zIndex: 10,
  },
  bubbleHola: {
    position: 'absolute',
    right: 4,
    top: 18,
    backgroundColor: '#E8EFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    transform: [{ rotate: '4deg' }],
    zIndex: 10,
  },
  bubbleChinese: {
    position: 'absolute',
    right: 2,
    top: 168,
    backgroundColor: '#FFE8E8',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    transform: [{ rotate: '5deg' }],
    zIndex: 10,
  },
  button: {
    backgroundColor: '#6C4EF5',
    borderRadius: 16,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
