import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
      <View className="flex-1 items-center justify-center">
        <Text className="heading--h2 text-text-primary">Home</Text>
      </View>
    </SafeAreaView>
  );
}
