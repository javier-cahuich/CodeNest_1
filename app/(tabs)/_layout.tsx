import { Tabs } from "expo-router";
import LucideIcon from "@/lib/icons/LucideIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/theming/ThemeProvider";
import { useLessonProgressStore } from "@/stores/lesson-progress-store";

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.foreground,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: theme.typography.h3?.fontFamily,
          fontSize: 18,
        },
        headerRight: () => <ThemeToggle />,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.caption?.fontFamily,
          fontSize: 12,
        },
        popToTopOnBlur: false,
      }}
    >
      <Tabs.Screen
        name="index"
        listeners={{
          focus: () => {
            void useLessonProgressStore.getState().loadCompletedLessons();
          },
        }}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <LucideIcon name="House" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cursos"
        options={{
          title: "Cursos",
          href: null,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarLabel: "Practice",
          tabBarIcon: ({ color, size }) => <LucideIcon name="Code" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: "Resources",
          tabBarLabel: "Resources",
          tabBarIcon: ({ color, size }) => (
            <LucideIcon name="BookOpenText" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarLabel: "Leaderboard",
          tabBarIcon: ({ color, size }) => <LucideIcon name="Trophy" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <LucideIcon name="UserRound" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
