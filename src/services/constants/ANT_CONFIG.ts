import { theme, type ThemeConfig } from 'antd'
import { MAIN_COLORS } from './COLORS'
const MAIN_THEME_TOKEN: ThemeConfig['token'] = {
  borderRadius: 8,
  borderRadiusLG: 8,
  borderRadiusOuter: 8,
  fontSize: 14,
  fontSizeXL: 16,
  controlHeight: 34,
  controlHeightLG: 51,
}

export const ANTD_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: MAIN_COLORS.light.primary,
    colorBgBase: MAIN_COLORS.light.background,
    colorTextBase: MAIN_COLORS.light.text + 'b6',
    colorBorder: MAIN_COLORS.light.border,
    ...MAIN_THEME_TOKEN,
  },
  components: {},
}

export const ANTD_THEME_DARK: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: MAIN_COLORS.dark.primary,
    colorBgBase: MAIN_COLORS.dark.background,
    colorTextBase: MAIN_COLORS.dark.text + 'b6',
    colorBorder: MAIN_COLORS.dark.border,
    ...MAIN_THEME_TOKEN,
  },
  components: {},
}
