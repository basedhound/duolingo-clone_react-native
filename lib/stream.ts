import Constants from 'expo-constants';
import { StreamVideoClient, type User } from '@stream-io/video-react-native-sdk';

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY ?? '';

function getDevServerUrl(): string {
  // hostUri is like "192.168.x.x:8081" in Expo dev mode
  const hostUri = Constants.expoConfig?.hostUri;
  return hostUri ? `http://${hostUri}` : 'http://localhost:8081';
}

export function getStreamApiUrl(path: string): string {
  const override = process.env.EXPO_PUBLIC_API_URL;
  const base = override ?? (__DEV__ ? getDevServerUrl() : '');
  return `${base}${path}`;
}

export function createStreamVideoClient(
  userId: string,
  token: string,
  userName?: string,
  userImage?: string,
): StreamVideoClient {
  const user: User = {
    id: userId,
    name: userName,
    image: userImage,
  };
  return StreamVideoClient.getOrCreateInstance({ apiKey: API_KEY, user, token });
}
