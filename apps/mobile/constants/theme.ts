export const palette = {
  white: "#FFFFFF",
  primary: {
    "50": "#eff6ff",
    "100": "#dcebfd",
    "200": "#c0dcfd",
    "300": "#95c7fb",
    "400": "#62a9f8",
    "500": "#3e87f3",
    "600": "#1d61e7",
    "700": "#2053d5",
    "800": "#2044ad",
    "900": "#203d88",
    "950": "#182653",
  },
  gray: {
    "50": "#f9fafb",
    "100": "#f4f4f5",
    "200": "#e6e8ea",
    "300": "#d3d6d9",
    "400": "#a0a6ab",
    "500": "#6c7278",
    "600": "#50585e",
    "700": "#3c454c",
    "800": "#242c32",
    "900": "#1E293B",
    "950": "#060a0f",
  },
  red: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
    "950": "#450a0a",
  },
  green: {
    "50": "#f0fdf5",
    "100": "#dcfce8",
    "200": "#bbf7d1",
    "300": "#86efad",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803c",
    "800": "#166533",
    "900": "#14532b",
    "950": "#052e14",
  },
  yellow: {
    "50": "#fef9e8",
    "100": "#fef0c3",
    "200": "#fee28a",
    "300": "#fdd147",
    "400": "#fac215",
    "500": "#eab308",
    "600": "#ca9a04",
    "700": "#a17c07",
    "800": "#85680e",
    "900": "#715a12",
    "950": "#423306",
  },
} as const;

export const colors = {
  background: palette.white,
  foreground: palette.gray[900],
  muted: palette.gray["500"],
  status: {
    error: palette.red["500"],
    // errorBackground: palette.red["50"],
    success: palette.green["500"],
    warning: palette.yellow["500"],
    info: palette.primary["500"],
  },
  input: {
    background: palette.white,
    foreground: palette.gray["900"],
    placeholder: palette.gray["400"],
    border: palette.gray["200"],
    borderFocused: palette.primary["500"],
    backgroundDisabled: palette.gray["100"],
  },
  button: {
    primary: {
      background: palette.primary["500"],
      backgroundPressed: palette.primary["600"],
      foreground: palette.white,
    },
    secondary: {
      background: "transparent",
      backgroundPressed: palette.gray["100"],
      foreground: palette.primary["500"],
      border: palette.gray["200"],
    },
    ghost: {
      background: "transparent",
      backgroundPressed: palette.gray["100"],
      foreground: palette.gray["700"],
    },
    destructive: {
      background: palette.red["500"],
      backgroundPressed: palette.red["600"],
      foreground: palette.white,
    },
  },
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const borderWidth = {
  thin: 1,
  medium: 2,
} as const;

export const spacing = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "8": 32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
  "24": 96,
} as const;

export const fontSize = {
  "10": 10,
  "12": 12,
  "14": 14,
  "16": 16,
  "18": 18,
  "20": 20,
  "24": 24,
  "28": 28,
  "32": 32,
  "36": 36,
  "40": 40,
} as const;

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extraBold: "Inter_800ExtraBold",
} as const;
