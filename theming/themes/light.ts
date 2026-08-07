import { Theme } from "../Theme";

const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "hsl(210 33% 98%)",
    foreground: "hsl(222 47% 11%)",
    card: "hsl(0 0% 100%)",
    cardForeground: "hsl(222 47% 11%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(222 47% 11%)",
    primary: "hsl(193 95% 43%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(214 36% 93%)",
    secondaryForeground: "hsl(222 47% 14%)",
    tertiary: "hsl(39 96% 57%)",
    tertiaryForeground: "hsl(26 83% 14%)",
    muted: "hsl(210 28% 94%)",
    mutedForeground: "hsl(215 16% 40%)",
    accent: "hsl(201 94% 93%)",
    accentForeground: "hsl(222 47% 11%)",
    success: "hsl(142 70.6% 45.3%)",
    successForeground: "hsl(0 0% 98%)",
    warning: "hsl(38 92% 50%)",
    warningForeground: "hsl(26 83% 14%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(214 31% 88%)",
    notification: "hsl(214 31% 88%)",
    input: "hsl(214 31% 88%)",
    ring: "hsl(193 95% 43%)",
    overlay: "hsl(0 0% 0%)",
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

export default lightTheme;
