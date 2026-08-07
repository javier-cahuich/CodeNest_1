import { View } from "react-native";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import type { IconName } from "@/lib/icons/LucideIcon";

type Stat = {
  icon: IconName;
  value: string;
  iconClassName: string;
  iconWrapClassName: string;
};

export function HomeStats({
  points,
  streak,
}: {
  points: number;
  streak: number;
}) {
  const stats: Stat[] = [
    {
      icon: "Award",
      value: points.toLocaleString("es-MX"),
      iconClassName: "text-amber-500 dark:text-amber-300",
      iconWrapClassName: "bg-amber-100 dark:bg-amber-400/15",
    },
    {
      icon: "Flame",
      value: `${streak}`,
      iconClassName: "text-rose-500 dark:text-rose-300",
      iconWrapClassName: "bg-rose-100 dark:bg-rose-400/15",
    },
  ];

  return (
    <View className="flex-row gap-3">
      {stats.map((stat, idx) => (
        <View
          key={idx}
          className="flex-1 flex-row items-center gap-2 rounded-full border border-border bg-card px-3 py-2"
        >
          <View
            className={`h-8 w-8 items-center justify-center rounded-full ${stat.iconWrapClassName}`}
          >
            <LucideIcon name={stat.icon} size={18} className={stat.iconClassName} />
          </View>
          <Text className="text-h3 text-card-foreground">{stat.value}</Text>
        </View>
      ))}
    </View>
  );
}
