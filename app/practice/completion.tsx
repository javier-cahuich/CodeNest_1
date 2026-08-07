import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getFlashcardTopic } from "@/data/flashcard-decks";
import LucideIcon from "@/lib/icons/LucideIcon";

function parseCount(value: string | string[] | undefined) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsedValue = Number.parseInt(rawValue ?? "0", 10);
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

const summaryCards = [
  {
    key: "known",
    label: "Conocido",
    description: "Conceptos que ya reconoces con seguridad.",
    icon: "Check",
    toneClassName: "border-success bg-success/10",
    iconClassName: "text-success",
  },
  {
    key: "inProgress",
    label: "En progreso",
    description: "Conceptos que conviene volver a repasar.",
    icon: "RotateCcw",
    toneClassName: "border-border bg-secondary",
    iconClassName: "text-secondary-foreground",
  },
] as const;

export default function FlashcardCompletionScreen() {
  const params = useLocalSearchParams<{
    topic?: string;
    known?: string;
    inProgress?: string;
    total?: string;
  }>();
  const topic = params.topic ? getFlashcardTopic(params.topic) : undefined;
  const knownCount = parseCount(params.known);
  const inProgressCount = parseCount(params.inProgress);
  const totalCount = parseCount(params.total);

  const handleRestart = () => {
    if (!topic) {
      router.replace("/practice/topics");
      return;
    }

    router.replace({
      pathname: "/practice/session",
      params: { topic: topic.slug },
    });
  };

  return (
    <Screen scroll contentClassName="flex-1 justify-center gap-5">
      <View className="items-center rounded-[32px] border border-border bg-card px-5 py-8">
        <View className="h-16 w-16 items-center justify-center rounded-[24px] bg-primary/10">
          <LucideIcon name="FileCheck" size={28} className="text-primary" />
        </View>
        <Text className="mt-5 text-h1 text-center text-foreground">Resumen de tarjetas</Text>
        <Text className="mt-3 text-body text-center leading-7 text-muted-foreground">
          Terminaste la sesión{topic ? ` de ${topic.title}` : ""}. Revisa cómo clasificaste los
          conceptos antes de salir de la actividad.
        </Text>
      </View>

      <View className="gap-3">
        {summaryCards.map((card) => {
          const value = card.key === "known" ? knownCount : inProgressCount;

          return (
            <View
              key={card.key}
              className={`flex-row items-center gap-4 rounded-[28px] border px-5 py-5 ${card.toneClassName}`}
            >
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-card">
                <LucideIcon name={card.icon} size={22} className={card.iconClassName} />
              </View>
              <View className="flex-1">
                <Text className="text-h4 text-foreground">{card.label}</Text>
                <Text className="mt-1 text-body leading-6 text-muted-foreground">
                  {card.description}
                </Text>
              </View>
              <Text className="text-h2 text-foreground">{value}</Text>
            </View>
          );
        })}
      </View>

      <View className="rounded-[28px] border border-border bg-card px-5 py-5">
        <View className="flex-row items-center justify-between gap-4">
          <Text className="text-h4 text-card-foreground">Total repasado</Text>
          <Text className="text-h2 text-card-foreground">{totalCount}</Text>
        </View>
        <Text className="mt-2 text-body leading-6 text-muted-foreground">
          Tus clasificaciones se conservarán en este resumen hasta que decidas salir o reiniciar la
          ronda.
        </Text>
      </View>

      <View className="gap-3">
        <Button variant="secondary" className="h-12 rounded-2xl" disabled>
          <Text className="text-button text-secondary-foreground">Seguir repasando términos</Text>
        </Button>
        <Button variant="outline" className="h-12 rounded-2xl" onPress={handleRestart}>
          <Text className="text-button text-foreground">Reiniciar tarjetas</Text>
        </Button>
        <Button className="h-12 rounded-2xl" onPress={() => router.replace("/practice/topics")}>
          <Text className="text-button text-primary-foreground">Terminar</Text>
        </Button>
      </View>
    </Screen>
  );
}
