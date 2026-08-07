import { router } from "expo-router";
import { View } from "react-native";
import { CourseListItem } from "@/components/codenest/course-list-item";
import { Screen } from "@/components/layout/screen";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { courses, type CourseId } from "@/data/courses";
import { useCourseStore } from "@/stores/course-store";

export default function CursosTabScreen() {
  const selectedCourseId = useCourseStore((state) => state.selectedCourseId);
  const setSelectedCourseId = useCourseStore((state) => state.setSelectedCourseId);

  const handleSelect = (id: CourseId) => {
    setSelectedCourseId(id);
    router.replace("/(tabs)");
  };

  return (
    <Screen scroll contentClassName="gap-5">
      <View className="gap-3">
        <Badge variant="outline" className="self-start px-3 py-1">
          <Text className="text-caption uppercase tracking-[0.24em] text-muted-foreground">
            Catálogo
          </Text>
        </Badge>
        <Text className="text-h2 text-foreground">Elige tu curso</Text>
        <Text className="text-body leading-6 text-muted-foreground">
          Selecciona el curso que quieres explorar. El curso elegido se mostrará en tu pantalla de
          inicio.
        </Text>
      </View>

      <View className="gap-3">
        {courses.map((course) => (
          <CourseListItem
            key={course.id}
            course={course}
            isSelected={course.id === selectedCourseId}
            onPress={() => handleSelect(course.id)}
          />
        ))}
      </View>
    </Screen>
  );
}
