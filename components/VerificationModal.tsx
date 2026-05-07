import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  email: string;
  onClose: () => void;
}

export default function VerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode('');
      const t = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 6);
    setCode(digits);
    if (digits.length === 6) {
      setTimeout(() => router.replace('/'), 300);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <TouchableOpacity
          style={[StyleSheet.absoluteFillObject, styles.backdrop]}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Sheet anchored to bottom */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.sheet}>
              {/* Drag handle */}
              <View style={styles.handle} />

              {/* Icon */}
              <View style={styles.iconWrap}>
                <Ionicons name="mail-outline" size={28} color="#6C4EF5" />
              </View>

              {/* Heading */}
              <Text className="font-poppins-bold text-[22px] text-text-primary text-center mt-3">
                Check your email
              </Text>
              <Text className="font-poppins text-[14px] text-text-secondary text-center mt-2 px-8 leading-[22px]">
                {'We sent a 6-digit code to\n'}
                <Text className="font-poppins-semibold text-text-primary">{email || 'your email'}</Text>
              </Text>

              {/* OTP boxes */}
              <TouchableOpacity
                onPress={() => inputRef.current?.focus()}
                style={styles.otpRow}
                activeOpacity={1}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.otpBox,
                      code.length === i && styles.otpBoxActive,
                      code[i] !== undefined && styles.otpBoxFilled,
                    ]}
                  >
                    <Text style={styles.otpDigit}>{code[i] ?? ''}</Text>
                  </View>
                ))}

                {/* Hidden input captures keyboard */}
                <TextInput
                  ref={inputRef}
                  value={code}
                  onChangeText={handleChange}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={styles.hiddenInput}
                />
              </TouchableOpacity>

              {/* Resend */}
              <Text className="font-poppins text-[13px] text-text-secondary text-center mt-5 mb-10">
                Didn't receive it?{' '}
                <Text className="font-poppins-semibold text-lingua-purple">Resend code</Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginBottom: 20,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0ECFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: {
    borderColor: '#6C4EF5',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#6C4EF5',
    backgroundColor: '#FFFFFF',
  },
  otpDigit: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#0D132B',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
