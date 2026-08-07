import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getQuizTopicSession } from "@/data/quiz-topics";
import LucideIcon from "@/lib/icons/LucideIcon";

function parseCount(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsedValue = Number.parseInt(rawValue ?? "0", 10);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

const resultCards = [
  { key: "correct", label: "Aciertos", icon: "Check", tone: "success" },
  { key: "incorrect", label: "Errores", icon: "X", tone: "destructive" },
  { key: "omitted", label: "Omisiones", icon: "Minus", tone: "secondary" },
] as const;

export default function QuizResultsScreen() {
  const params = useLocalSearchParams<{
    topic?: string;
    correct?: string;
    incorrect?: string;
    omitted?: string;
  }>();

  const topic = params.topic ? getQuizTopicSession(params.topic) : undefined;
  const correctCount = parseCount(params.correct);
  const incorrectCount = parseCount(params.incorrect);
  const omittedCount = parseCount(params.omitted);

  return (
    <Screen scroll contentClassName="flex-1 justify-center gap-5">
      <View className="items-center rounded-[32px] border border-border bg-card px-5 py-8">
        <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-primary/10">
          <LucideIcon name="FileCheck" size={28} className="text-primary" />
        </View>
        <Text className="mt-5 text-h1 text-center text-foreground">Resultados de Cuestionario</Text>
        <Text className="mt-3 text-body text-center leading-7 text-muted-foreground">
          {topic
            ? `Terminaste el tema ${topic.topicTitle}. Aquí tienes el resumen final de tu sesión.`
            : "Aquí tienes el resumen final de tu sesión de cuestionario."}
        </Text>
      </View>

      <View className="gap-3">
        {resultCards.map((card) => {
          const value =
            card.key === "correct"
              ? correctCount
              : card.key === "incorrect"
                ? incorrectCount
                : omittedCount;

          const toneClassName =
            card.tone === "success"
              ? "bg-success/10 border-success"
              : card.tone === "destructive"
                ? "bg-destructive/10 border-destructive"
                : "bg-secondary border-border";

          const iconClassName =
            card.tone === "success"
              ? "text-success"
              : card.tone === "destructive"
                ? "text-destructive"
                : "text-secondary-foreground";

          return (
            <View
              key={card.key}
              className={`flex-row items-center gap-4 rounded-[28px] border px-5 py-5 ${toneClassName}`}
            >
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-card">
                <LucideIcon name={card.icon} size={22} className={iconClassName} />
              </View>
              <View className="flex-1">
                <Text className="text-h4 text-foreground">{card.label}</Text>
                <Text className="mt-1 text-body text-muted-foreground">
                  {card.key === "correct"
                    ? "Respuestas marcadas correctamente."
                    : card.key === "incorrect"
                      ? "Respuestas seleccionadas con error."
                      : "Preguntas que quedaron sin responder."}
                </Text>
              </View>
              <Text className="text-h2 text-foreground">{value}</Text>
            </View>
          );
        })}
      </View>

      <Button className="h-12 rounded-2xl" onPress={() => router.replace("/practice/quiz-topics")}>
        <Text className="text-button text-primary-foreground">Continuar</Text>
      </Button>
    </Screen>
  );
}
