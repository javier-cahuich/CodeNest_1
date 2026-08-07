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
    title: "Flash drills",
    description: "Abre temas de tarjetas para repasar sintaxis y conceptos clave.",
    icon: "Zap",
    accentClassName: "bg-sky-400",
    iconBackgroundClassName: "bg-sky-100 dark:bg-sky-950",
    iconClassName: "text-sky-500 dark:text-sky-300",
  },
  {
    id: "logic",
    title: "Logic puzzles",
    description: "Mini retos guiados para pensar antes de escribir código.",
    icon: "Puzzle",
    accentClassName: "bg-emerald-300",
    iconBackgroundClassName: "bg-emerald-100 dark:bg-emerald-950",
    iconClassName: "text-emerald-500 dark:text-emerald-300",
  },
  {
    id: "review",
    title: "Quick review",
    description: "Abre temas de cuestionario para repasar lo que viste hoy.",
    icon: "History",
    accentClassName: "bg-violet-300",
    iconBackgroundClassName: "bg-violet-100 dark:bg-violet-950",
    iconClassName: "text-violet-600 dark:text-violet-300",
  },
];

export default function PracticeTabScreen() {
  return (
    <Screen scroll contentClassName="gap-6 pb-12">
      <View className="items-center rounded-[32px] bg-sky-50 px-6 py-8 dark:bg-sky-950/50">
        <Text className="text-center text-h1 leading-10 text-foreground">
          Practica sin salir de ritmo
        </Text>
        <Text className="mt-3 text-center text-body leading-7 text-muted-foreground">
          Refuerza tus conocimientos con ejercicios interactivos y repasos diseñados para mejorar
          tus habilidades.
        </Text>
      </View>

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
              className="relative min-h-40 overflow-hidden rounded-[28px] border border-border/70 bg-card px-6 py-6 shadow-sm active:opacity-90"
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
