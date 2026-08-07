import { Pressable, View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import LucideIcon from "@/lib/icons/LucideIcon";
import type { LearningModule, ModuleTone } from "@/data/codenest-modules";

const toneStyles: Record<
  ModuleTone,
  {
    iconWrap: string;
    icon: string;
  }
> = {
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

export function ModuleCard({
  module,
  isCompleted = false,
  bestScore,
  onPress,
}: {
  module: LearningModule;
  isCompleted?: boolean;
  bestScore?: number;
  onPress: () => void;
}) {
  const tone = toneStyles[module.tone];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${module.title}${isCompleted ? ", lección finalizada" : ""}`}
      className="overflow-hidden rounded-[28px] border border-border bg-card px-5 py-5 active:opacity-90"
    >
      <View className="flex-row items-start gap-4">
        <View
          className={cn(
            "h-14 w-14 items-center justify-center rounded-[20px] border border-black/5 dark:border-white/5",
            tone.iconWrap,
          )}
        >
          <LucideIcon name={module.icon} size={24} className={tone.icon} />
        </View>

        <View className="flex-1 gap-3">
          {isCompleted ? (
            <View className="flex-row items-center justify-between gap-2">
              <Badge
                variant="outline"
                className="flex-row items-center gap-1.5 border-emerald-200 bg-emerald-50 px-3 py-1 dark:border-emerald-500/30 dark:bg-emerald-500/10"
              >
                <LucideIcon
                  name="Check"
                  size={13}
                  className="text-emerald-600 dark:text-emerald-300"
                />
                <Text className="text-caption text-emerald-700 dark:text-emerald-200">
                  Finalizada
                </Text>
              </Badge>

              {typeof bestScore === "number" ? (
                <Badge
                  variant="outline"
                  className="flex-row items-center gap-1 border-primary/20 bg-primary/10 px-2.5 py-1"
                >
                  <LucideIcon name="Trophy" size={13} className="text-primary" />
                  <Text className="text-caption text-primary">{bestScore}/100</Text>
                </Badge>
              ) : null}
            </View>
          ) : null}

          <View>
            <Text className="text-h3 leading-7 text-card-foreground">{module.title}</Text>
            <Text className="mt-2 text-body leading-6 text-muted-foreground">
              {module.description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
