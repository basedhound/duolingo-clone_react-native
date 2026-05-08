import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;
const CIRCLE_SIZE = 52;
const TAB_BAR_HEIGHT = 68;

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: TabConfig[] = [
  { label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Learn', icon: 'book-outline', activeIcon: 'book' },
  { label: 'AI Teacher', icon: 'sparkles-outline', activeIcon: 'sparkles' },
  { label: 'Chat', icon: 'chatbubbles-outline', activeIcon: 'chatbubbles' },
  { label: 'Profile', icon: 'person-circle-outline', activeIcon: 'person-circle' },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const circleX = useSharedValue(
    state.index * TAB_WIDTH + TAB_WIDTH / 2 - CIRCLE_SIZE / 2
  );

  useEffect(() => {
    circleX.value = withTiming(
      state.index * TAB_WIDTH + TAB_WIDTH / 2 - CIRCLE_SIZE / 2,
      { duration: 220, easing: Easing.out(Easing.cubic) }
    );
  }, [state.index, circleX]);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.circle, circleAnimatedStyle]} />

      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const config = TAB_CONFIG[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? config.activeIcon : config.icon}
                size={22}
                color={isActive ? '#FFFFFF' : '#6B7280'}
              />
              {!isActive && (
                <Text style={styles.label} numberOfLines={1}>
                  {config.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#6C4EF5',
    top: (TAB_BAR_HEIGHT - CIRCLE_SIZE) / 2,
  },
  tabsRow: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
  },
  tabItem: {
    width: TAB_WIDTH,
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});
