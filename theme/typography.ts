export const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  fontSize: {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 16,
    bodyLg: 16,
    bodyMd: 14,
    bodySm: 13,
    caption: 11,
  },
  lineHeight: {
    h1: 38,   // 32 × 1.2
    h2: 31,   // 24 × 1.3
    h3: 26,   // 20 × 1.3
    h4: 22,   // 16 × 1.4
    bodyLg: 26, // 16 × 1.6
    bodyMd: 22, // 14 × 1.6
    bodySm: 21, // 13 × 1.6
    caption: 15, // 11 × 1.4
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
} as const;
