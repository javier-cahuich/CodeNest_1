import * as React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { courses } from "@/data/courses";
import { getFlashcardTopicsByCourseId } from "@/data/flashcard-topics";
import { getLegacyFlashcardDestinations } from "@/data/flashcard-decks";
import { FLASHCARDS_PER_DECK } from "@/data/flashcards/content";
import { isLegacyFlashcardTopic } from "@/data/flashcards/legacy-progress";
import LucideIcon from "@/lib/icons/LucideIcon";
import { flashcardStartHref, flashcardTopicsHref } from "@/lib/flashcards";
import { useCourseStore } from "@/stores/course-store";

export default function FlashcardTopicsScreen() {
  const params = useLocalSearchParams<{ course?: string; legacyTopic?: string }>();
  const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
  const setSelectedCourseId = useCourseStore((state) => state.setSelectedCourseId);
  const [showCourses, setShowCourses] = React.useState(false);
  const routeCourse = courses.find((course) => course.id === params.course);
  const courseId = routeCourse?.id ?? selectedCourseId;
  const currentCourse = courses.find((course) => course.id === courseId)!;
  const legacyTopic = params.legacyTopic ?? "";
  const isLegacy = isLegacyFlashcardTopic(legacyTopic);
  const legacyDestinations = getLegacyFlashcardDestinations(legacyTopic);
  const choosingLegacyDestination = isLegacy && legacyDestinations.length > 0;
  const topics = choosingLegacyDestination
    ? legacyDestinations
    : getFlashcardTopicsByCourseId(courseId);

  React.useEffect(() => {
    if (routeCourse) setSelectedCourseId(routeCourse.id);
  }, [routeCourse, setSelectedCourseId]);

  return (
    <Screen className="bg-background">
      <FlatList
        data={topics}
        keyExtractor={(item) => item.slug}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4 pb-8"
        ListHeaderComponent={
          <View className="gap-4 pb-2">
            {isLegacy ? (
              <View className="gap-3 rounded-[24px] border border-primary/20 bg-primary/10 p-5">
                <Text className="text-h4 text-foreground">
                  Las tarjetas ahora se organizan por sección
                </Text>
                <Text className="text-body leading-6 text-muted-foreground">
                  {choosingLegacyDestination
                    ? "Los conceptos de tu antiguo mazo están en estas secciones. Elige cuál quieres repasar; las clasificaciones equivalentes se conservan."
                    : "Este mazo anterior no tiene tarjetas equivalentes en el catálogo actual. Sus registros se conservan como históricos. Puedes explorar los mazos del curso."}
                </Text>
                <Button
                  variant="outline"
                  onPress={() => router.replace(flashcardTopicsHref(courseId))}
                >
                  <Text>Ver todos los mazos de mi curso</Text>
                </Button>
              </View>
            ) : null}
            {!choosingLegacyDestination ? (
              <View className="gap-4 rounded-[28px] border border-border bg-card p-5">
                <View className="gap-2">
                  <Text className="text-caption uppercase tracking-[0.18em] text-muted-foreground">
                    Curso seleccionado
                  </Text>
                  <Text className="text-h2 text-card-foreground">{currentCourse.title}</Text>
                  <Text className="text-body leading-6 text-muted-foreground">
                    Un mazo por sección, con 15 conceptos de sus lecciones.
                  </Text>
                </View>
                <Button
                  variant="outline"
                  accessibilityState={{ expanded: showCourses }}
                  onPress={() => setShowCourses((value) => !value)}
                >
                  <LucideIcon name="BookOpen" size={18} className="mr-2 text-foreground" />
                  <Text>Cambiar curso</Text>
                </Button>
                {showCourses ? (
                  <View className="gap-2">
                    {courses.map((course) => (
                      <Button
                        key={course.id}
                        variant={course.id === courseId ? "secondary" : "outline"}
                        className="h-auto min-h-12 justify-start px-4 py-3"
                        accessibilityState={{ selected: course.id === courseId }}
                        onPress={() => {
                          setSelectedCourseId(course.id);
                          setShowCourses(false);
                          router.replace(flashcardTopicsHref(course.id));
                        }}
                      >
                        <View className="flex-1 gap-1">
                          <Text className="text-body text-foreground">{course.title}</Text>
                          <Text className="text-caption text-muted-foreground">
                            {course.hasContent
                              ? `${getFlashcardTopicsByCourseId(course.id).length} mazos`
                              : "Próximamente"}
                          </Text>
                        </View>
                        {course.id === courseId ? (
                          <LucideIcon name="Check" size={18} className="text-primary" />
                        ) : null}
                      </Button>
                    ))}
                  </View>
                ) : null}
              </View>
            ) : null}
            <Text className="text-h3 text-foreground">
              {choosingLegacyDestination ? "Mazos relacionados" : "Secciones para repasar"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center gap-3 rounded-[28px] border border-dashed border-border bg-card px-5 py-8">
            <LucideIcon name="Layers" size={28} className="text-muted-foreground" />
            <Text className="text-h3 text-card-foreground">Próximamente</Text>
            <Text className="text-body text-center leading-6 text-muted-foreground">
              Los mazos de este curso estarán disponibles cuando se publiquen sus lecciones.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.courseTitle}, ${FLASHCARDS_PER_DECK} tarjetas`}
            onPress={() => {
              setSelectedCourseId(item.courseId);
              router.push(flashcardStartHref(item.slug));
            }}
            className="rounded-[28px] border border-border bg-card px-5 py-5 shadow-sm shadow-foreground/10 active:opacity-90"
          >
            <View className="flex-row items-start gap-4">
              <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <LucideIcon name="Layers" size={22} className="text-primary" />
              </View>
              <View className="flex-1">
                {choosingLegacyDestination ? (
                  <Text className="mb-1 text-caption text-muted-foreground">
                    {item.courseTitle}
                  </Text>
                ) : null}
                <Text className="text-h3 text-card-foreground">{item.title}</Text>
                <Text className="mt-2 text-body leading-6 text-muted-foreground">
                  {item.description}
                </Text>
                <Text className="mt-3 text-caption text-primary">
                  {FLASHCARDS_PER_DECK} tarjetas · {item.lessonSlugs.length} lecciones
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
