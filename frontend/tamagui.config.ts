import { createTamagui, createFont } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

const poppinsFont = createFont({
  family: 'Poppins_400Regular',
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 30,
    9: 36,
    10: 48,
    true: 16,
  },
  lineHeight: {
    1: 17,
    2: 22,
    3: 25,
    4: 26,
    5: 28,
    6: 30,
    7: 34,
    8: 40,
    9: 46,
    10: 58,
    true: 26,
  },
  weight: {
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
  face: {
    100: { normal: 'Poppins_100Thin', italic: 'Poppins_100Thin_Italic' },
    200: { normal: 'Poppins_200ExtraLight', italic: 'Poppins_200ExtraLight_Italic' },
    300: { normal: 'Poppins_300Light', italic: 'Poppins_300Light_Italic' },
    400: { normal: 'Poppins_400Regular', italic: 'Poppins_400Regular_Italic' },
    500: { normal: 'Poppins_500Medium', italic: 'Poppins_500Medium_Italic' },
    600: { normal: 'Poppins_600SemiBold', italic: 'Poppins_600SemiBold_Italic' },
    700: { normal: 'Poppins_700Bold', italic: 'Poppins_700Bold_Italic' },
    800: { normal: 'Poppins_800ExtraBold', italic: 'Poppins_800ExtraBold_Italic' },
    900: { normal: 'Poppins_900Black', italic: 'Poppins_900Black_Italic' },
  },
});

const config = createTamagui({
  ...defaultConfig,
  fonts: {
    heading: poppinsFont,
    body: poppinsFont,
  },
});

export default config;
