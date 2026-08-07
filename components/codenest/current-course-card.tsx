import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import type { Course } from "@/data/courses";

export function CurrentCourseCard({
  course,
  progress,
  onPress,
}: {
  course: Course;
  progress: number;
  onPress: () => void;
}) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Cambiar curso. Curso actual: ${course.title}`}
      className="overflow-hidden rounded-[24px] border border-slate-800 bg-slate-950 px-5 py-5 active:opacity-90 dark:border-slate-700"
    >
      <View className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-emerald-400/10" />

      <View className="flex-row items-start gap-3">
        <View className="mt-1 h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
          <LucideIcon name={course.icon} size={20} className="text-white" />
        </View>
        <View className="flex-1 gap-1 pr-1">
          <Text className="text-caption font-semibold uppercase tracking-[0.16em] text-emerald-300">
            Curso actual
          </Text>
          <Text className="text-h2 leading-7 text-white">
            {course.title}
          </Text>
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <Text className="text-caption text-slate-300">Tu avance</Text>
        <Text className="text-caption font-semibold text-emerald-300">{clampedProgress}%</Text>
      </View>
      <View className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
        <View
          className="h-full rounded-full bg-emerald-400"
          style={{ width: `${clampedProgress}%` }}
        />
      </View>

      <View className="mt-5 flex-row items-center justify-between border-t border-white/10 pt-4">
        <Text className="text-button text-white">Explorar cursos</Text>
        <View className="h-8 w-8 items-center justify-center rounded-full bg-white/10">
          <LucideIcon name="ArrowRight" size={17} className="text-white" />
        </View>
      </View>
    </Pressable>
  );
}
