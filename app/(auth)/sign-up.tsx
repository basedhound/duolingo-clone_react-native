import { useSignUp, useSSO } from '@clerk/expo';
import { type Href, router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { images } from '@/constants/images';
import VerificationModal from '@/components/VerificationModal';

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formError, setFormError] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const isLoading = fetchStatus === 'fetching';

  const handleSignUp = async () => {
    if (!email || !password) return;
    setFormError('');

    const { error: createError } = await signUp.password({
      emailAddress: email,
      password,
    });
    if (createError) {
      setFormError(createError.message ?? 'Something went wrong');
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setFormError(sendError.message ?? 'Failed to send verification code');
      return;
    }

    setModalVisible(true);
  };

  const handleVerify = async (code: string) => {
    setVerifyError('');

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setVerifyError(error.message ?? 'Invalid code. Try again.');
      return;
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) return;
          const url = decorateUrl('/');
          router.replace(url as Href);
        },
      });
    }
  };

  const handleResend = async () => {
    await signUp.verifications.sendEmailCode();
  };

  const handleSSO = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch {
      setFormError('Sign-in failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color="#0D132B" />
          </TouchableOpacity>

          {/* Heading */}
          <View className="px-6 mt-2">
            <Text className="font-poppins-bold text-[30px] text-text-primary leading-9.5">
              Create your account
            </Text>
            <Text className="font-poppins text-[15px] text-text-secondary mt-1">
              Start your language journey today ✨
            </Text>
          </View>

          {/* Mascot with sparkles */}
          <View style={styles.mascotArea}>
            <Text style={[styles.sparkle, styles.sparkleTopLeft]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleTopRight]}>✦</Text>
            <Text style={[styles.sparkle, styles.sparkleBottomRight]}>✦</Text>
            <Image
              source={images.mascotAuth}
              style={styles.mascotImage}
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View className="px-6 gap-3">
            {/* Email */}
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF"
                style={styles.textInput}
                underlineColorAndroid="transparent"
              />
            </View>

            {/* Password */}
            <View style={[styles.inputCard, styles.inputCardRow]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowPassword(v => !v)}
                style={{ paddingLeft: 8 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up button */}
            <TouchableOpacity
              style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
              activeOpacity={0.85}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text className="font-poppins-semibold text-[17px] text-white">
                {isLoading ? 'Signing up…' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Form error */}
            {formError ? (
              <Text style={styles.errorText}>{formError}</Text>
            ) : null}

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text className="font-poppins text-[13px] text-text-secondary mx-3">
                or continue with
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social buttons */}
            <SocialButton
              icon={<Ionicons name="logo-google" size={22} color="#4285F4" />}
              label="Continue with Google"
              onPress={() => handleSSO('oauth_google')}
            />
            <SocialButton
              icon={
                <View style={styles.fbIconWrap}>
                  <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
                </View>
              }
              label="Continue with Facebook"
              onPress={() => handleSSO('oauth_facebook')}
            />
            <SocialButton
              icon={<Ionicons name="logo-apple" size={24} color="#000000" />}
              label="Continue with Apple"
              onPress={() => handleSSO('oauth_apple')}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text className="font-poppins text-[14px] text-text-secondary">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
              <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        error={verifyError}
      />
    </SafeAreaView>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.socialIconSlot}>{icon}</View>
      <Text className="font-poppins-medium text-[15px] text-text-primary flex-1 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  backBtn: {
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 8,
    padding: 4,
    alignSelf: 'flex-start',
  },
  mascotArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 190,
    position: 'relative',
    marginVertical: 8,
  },
  mascotImage: {
    width: 220,
    height: 170,
  },
  sparkle: {
    position: 'absolute',
    fontFamily: 'Poppins-Bold',
  },
  sparkleTopLeft: {
    top: 22,
    left: 60,
    fontSize: 20,
    color: '#FFC800',
  },
  sparkleTopRight: {
    top: 10,
    right: 80,
    fontSize: 14,
    color: '#4D8BFF',
  },
  sparkleBottomRight: {
    bottom: 28,
    right: 65,
    fontSize: 24,
    color: '#FFC800',
  },
  inputCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  inputCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#0D132B',
    padding: 0,
  },
  primaryBtn: {
    backgroundColor: '#6C4EF5',
    borderRadius: 16,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    height: 54,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  socialIconSlot: {
    width: 32,
    alignItems: 'center',
  },
  fbIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});
