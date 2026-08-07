import { Theme } from "../Theme";

const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "hsl(222 47% 8%)",
    foreground: "hsl(210 40% 98%)",
    card: "hsl(222 39% 11%)",
    cardForeground: "hsl(210 40% 98%)",
    popover: "hsl(222 39% 11%)",
    popoverForeground: "hsl(210 40% 98%)",
    primary: "hsl(192 91% 58%)",
    primaryForeground: "hsl(222 47% 11%)",
    secondary: "hsl(217 32% 17%)",
    secondaryForeground: "hsl(210 40% 98%)",
    tertiary: "hsl(42 100% 64%)",
    tertiaryForeground: "hsl(26 83% 14%)",
    muted: "hsl(217 28% 17%)",
    mutedForeground: "hsl(215 20% 72%)",
    accent: "hsl(197 63% 18%)",
    accentForeground: "hsl(210 40% 98%)",
    success: "hsl(142 70.6% 45.3%)",
    successForeground: "hsl(0 0% 98%)",
    warning: "hsl(38 92% 50%)",
    warningForeground: "hsl(26 83% 14%)",
    destructive: "hsl(0 72% 51%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(217 23% 24%)",
    notification: "hsl(217 23% 24%)",
    input: "hsl(217 23% 24%)",
    ring: "hsl(192 91% 58%)",
    overlay: "hsl(0 0% 100%)",
  },
  typography: {
    h1: {
      fontSize: "34px",
      fontFamily: "Inter_700Bold",
    },
    h2: {
      fontSize: "28px",
      fontFamily: "Inter_700Bold",
    },
    h3: {
      fontSize: "22px",
      fontFamily: "Inter_600SemiBold",
    },
    h4: {
      fontSize: "18px",
      fontFamily: "Inter_600SemiBold",
    },
    h5: {
      fontSize: "16px",
      fontFamily: "Inter_500Medium",
    },
    h6: {
      fontSize: "14px",
      fontFamily: "Inter_500Medium",
    },
    body: {
      fontSize: "15px",
      fontFamily: "Inter_400Regular",
    },
    caption: {
      fontSize: "12px",
      fontFamily: "Inter_300Light",
    },
    button: {
      fontSize: "15px",
      fontFamily: "Inter_600SemiBold",
    },
  },
};

export default darkTheme;
