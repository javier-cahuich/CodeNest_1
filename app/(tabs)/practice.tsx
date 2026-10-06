import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Text } from "@/components/ui/text";
import LucideIcon, { type IconName } from "@/lib/icons/LucideIcon";

type PracticeMode = {
  id: "flash" | "logic" | "review";
  title: string;
  description: string;
  icon: IconName;
  accentClassName: string;
  iconBackgroundClassName: string;
  iconClassName: string;
};

const practiceModes: PracticeMode[] = [
  {
    id: "flash",
    title: "Flash Cards",
    description: "Tarjetas para repasar conceptos clave.",
    icon: "Zap",
    accentClassName: "bg-sky-400",
    iconBackgroundClassName: "bg-sky-100 dark:bg-sky-950",
    iconClassName: "text-sky-500 dark:text-sky-300",
  },
  {
    id: "logic",
    title: "Errores",
    description: "Repasa tus errores recientes.",
    icon: "Puzzle",
    accentClassName: "bg-emerald-300",
    iconBackgroundClassName: "bg-emerald-100 dark:bg-emerald-950",
    iconClassName: "text-emerald-500 dark:text-emerald-300",
  },
  {
    id: "review",
    title: "Cuestionarios",
    description: "Practica con preguntas rápidas.",
    icon: "History",
    accentClassName: "bg-violet-300",
    iconBackgroundClassName: "bg-violet-100 dark:bg-violet-950",
    iconClassName: "text-violet-600 dark:text-violet-300",
  },
];

export default function PracticeTabScreen() {
  return (
    <Screen scroll contentClassName="gap-6 pb-12">
      <View className="gap-4">
        {practiceModes.map((mode) => {
          const opensFlashcards = mode.id === "flash";
          const opensQuizzes = mode.id === "review";
          const opensPracticeFlow = opensFlashcards || opensQuizzes;

          return (
            <Pressable
              key={mode.id}
              accessibilityRole={opensPracticeFlow ? "button" : undefined}
              accessibilityLabel={opensPracticeFlow ? `Abrir ${mode.title}` : undefined}
              onPress={() => {
                if (opensFlashcards) {
                  router.push("/practice/topics");
                  return;
                }

                if (opensQuizzes) {
                  router.push("/practice/quiz-topics");
                }
              }}
              className="relative min-h-32 overflow-hidden rounded-[28px] border border-border/70 bg-card px-6 py-4 shadow-sm active:opacity-90"
            >
              <View className={`absolute bottom-0 left-0 top-0 w-1.5 ${mode.accentClassName}`} />
              <View className="flex-1 flex-row items-center gap-5">
                <View
                  className={`h-16 w-16 items-center justify-center rounded-full ${mode.iconBackgroundClassName}`}
                >
                  <LucideIcon name={mode.icon} size={30} className={mode.iconClassName} />
                </View>

                <View className="flex-1">
                  <Text className="text-h3 text-card-foreground">{mode.title}</Text>
                  <Text className="mt-2 text-body leading-6 text-muted-foreground">
                    {mode.description}
                  </Text>
                </View>

                {opensPracticeFlow ? (
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <LucideIcon name="ChevronRight" size={26} className={mode.iconClassName} />
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}
