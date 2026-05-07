import { colors, typography } from '@/theme';

export { colors, typography };

// Colors shape compatible with use-theme-color hook
export const Colors = {
  light: {
    text: colors.neutral.textPrimary,
    background: colors.neutral.background,
    tint: colors.primary.linguaPurple,
    icon: colors.neutral.textSecondary,
    tabIconDefault: colors.neutral.textSecondary,
    tabIconSelected: colors.primary.linguaPurple,
  },
  dark: {
    text: colors.neutral.textPrimary,
    background: colors.neutral.background,
    tint: colors.primary.linguaPurple,
    icon: colors.neutral.textSecondary,
    tabIconDefault: colors.neutral.textSecondary,
    tabIconSelected: colors.primary.linguaPurple,
  },
};
