import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { CurrentCourseCard } from "@/components/codenest/current-course-card";
import { CourseCertificateStatus } from "@/components/codenest/course-certificate-status";
import { HomeStats } from "@/components/codenest/home-stats";
import { ModuleCard } from "@/components/codenest/module-card";
import { Screen } from "@/components/layout/screen";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { getLearningStatsByCourseId, getModulesByCourseId } from "@/data/codenest-modules";
import { getCourseById } from "@/data/courses";
import { useCourseStore } from "@/stores/course-store";
import { useLessonProgressStore } from "@/stores/lesson-progress-store";

export default function HomeTabScreen() {
  const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
  const completedLessons = useLessonProgressStore((state) => state.completedLessons);
  const lessonScores = useLessonProgressStore((state) => state.lessonScores);
  const totalExperience = useLessonProgressStore((state) => state.totalExperience);
  const progressError = useLessonProgressStore((state) => state.progressError);
  const loadCompletedLessons = useLessonProgressStore((state) => state.loadCompletedLessons);
  const selectedCourse = getCourseById(selectedCourseId);
  const courseStats = getLearningStatsByCourseId(selectedCourseId);

  useFocusEffect(
    useCallback(() => {
      void loadCompletedLessons({ force: true });
    }, [loadCompletedLessons]),
  );

  const modules = selectedCourse?.hasContent ? getModulesByCourseId(selectedCourseId) : [];
  const completedModules = selectedCourse?.hasContent
    ? modules.filter((module) => completedLessons[module.slug]).length
    : 0;
  const totalModules = selectedCourse?.hasContent ? courseStats.totalModules : 0;
  const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
  const completedScores = modules
    .map((module) => lessonScores[module.slug])
    .filter((score): score is number => typeof score === "number");
  const averageScore =
    completedScores.length === totalModules && totalModules > 0
      ? completedScores.reduce((sum, score) => sum + score, 0) / totalModules
      : 0;
  const certificateAvailable = completedModules === totalModules && averageScore >= 80;
  const streak = parseInt(courseStats.currentStreak, 10) || 1;

  const goToCourses = () => router.push("/(tabs)/cursos");

  const header = (
    <View className="gap-5 pb-6 pt-2">
      <HomeStats
        points={totalExperience}
        streak={streak}
      />

      {selectedCourse ? (
        <CurrentCourseCard course={selectedCourse} progress={progress} onPress={goToCourses} />
      ) : null}

      {progressError ? (
        <View className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
          <Text className="text-body leading-6 text-destructive">{progressError}</Text>
        </View>
      ) : null}
    </View>
  );

  if (modules.length === 0) {
    return (
      <Screen className="bg-background">
        {header}
        <View className="mt-2 items-center gap-3 rounded-[24px] border border-dashed border-border bg-card px-6 py-10">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <LucideIcon name="Sparkles" size={26} className="text-primary" />
          </View>
          <Text className="text-h3 text-center text-card-foreground">Próximamente</Text>
          <Text className="text-center text-body leading-6 text-muted-foreground">
            Aún no hay lecciones disponibles para este curso. Pronto agregaremos su contenido.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen className="bg-background">
      <FlatList
        data={modules}
        keyExtractor={(item) => item.slug}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ListFooterComponent={<CourseCertificateStatus isAvailable={certificateAvailable} />}
        contentContainerClassName="gap-4 pb-8"
        renderItem={({ item }) => (
          <ModuleCard
            module={item}
            isCompleted={Boolean(completedLessons[item.slug])}
            bestScore={lessonScores[item.slug]}
            onPress={() =>
              router.push({
                pathname: "/module/[slug]",
                params: { slug: item.slug },
              })
            }
          />
        )}
      />
    </Screen>
  );
}
