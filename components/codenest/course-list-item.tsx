import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";
import type { ModuleTone } from "@/data/codenest-modules";

const toneStyles: Record<ModuleTone, { iconWrap: string; icon: string }> = {
  cyan: {
    iconWrap: "bg-cyan-100 dark:bg-cyan-400/15",
    icon: "text-cyan-600 dark:text-cyan-300",
  },
  amber: {
    iconWrap: "bg-amber-100 dark:bg-amber-400/15",
    icon: "text-amber-600 dark:text-amber-300",
  },
  emerald: {
    iconWrap: "bg-emerald-100 dark:bg-emerald-400/15",
    icon: "text-emerald-600 dark:text-emerald-300",
  },
  violet: {
    iconWrap: "bg-violet-100 dark:bg-violet-400/15",
    icon: "text-violet-600 dark:text-violet-300",
  },
  rose: {
    iconWrap: "bg-rose-100 dark:bg-rose-400/15",
    icon: "text-rose-600 dark:text-rose-300",
  },
};

export function CourseListItem({
  course,
  isSelected,
  onPress,
}: {
  course: Course;
  isSelected: boolean;
  onPress: () => void;
}) {
  const tone = toneStyles[course.tone];

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-4 rounded-[24px] border px-4 py-4 active:opacity-90",
        isSelected ? "border-primary bg-primary/10" : "border-border bg-card",
      )}
    >
      <View
        className={cn(
          "h-14 w-14 items-center justify-center rounded-2xl border border-black/5 dark:border-white/5",
          tone.iconWrap,
        )}
      >
        <LucideIcon name={course.icon} size={26} className={tone.icon} />
      </View>

      <View className="flex-1">
        <Text className="text-h3 leading-6 text-card-foreground">{course.title}</Text>
        <Text className="mt-1 text-body leading-5 text-muted-foreground">{course.description}</Text>
      </View>

      <LucideIcon name="ChevronRight" size={20} className="text-muted-foreground" />
    </Pressable>
  );
}
