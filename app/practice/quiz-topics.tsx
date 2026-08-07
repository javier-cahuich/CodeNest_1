import { router } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Text } from "@/components/ui/text";
import { flashcardTopics } from "@/data/flashcard-topics";
import LucideIcon from "@/lib/icons/LucideIcon";

export default function QuizTopicsScreen() {
  return (
    <Screen className="bg-background">
      <FlatList
        data={flashcardTopics}
        keyExtractor={(item) => item.slug}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="pb-5">
            <View className="rounded-[32px] border border-border bg-card px-5 py-6">
              <Text className="text-h1 leading-10 text-foreground">Temas de Cuestionario</Text>
              <Text className="mt-3 text-body leading-7 text-muted-foreground">
                Elige un tema para resolver 5 preguntas con validación inmediata, avance guiado y
                resultados al final de la sesión.
              </Text>
            </View>
          </View>
        }
        contentContainerClassName="gap-4 pb-8"
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/practice/quiz-session",
                params: { topic: item.slug },
              })
            }
            className="rounded-[28px] border border-border bg-card px-5 py-5 shadow-sm shadow-foreground/10 active:opacity-90"
          >
            <View className="flex-row items-start gap-4">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <LucideIcon name="FileQuestionMark" size={22} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-h3 text-card-foreground">{item.title}</Text>
                <Text className="mt-2 text-body leading-6 text-muted-foreground">
                  {item.description}
                </Text>
              </View>
              <LucideIcon name="ChevronRight" size={20} className="mt-1 text-muted-foreground" />
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}
