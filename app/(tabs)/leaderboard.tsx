import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";

const ranking = [
  { name: "Valeria", points: 1280, streak: "12 días" },
  { name: "Mateo", points: 1190, streak: "9 días" },
  { name: "Tú", points: 980, streak: "4 días" },
  { name: "Elena", points: 910, streak: "5 días" },
];

export default function LeaderboardTabScreen() {
  return (
    <Screen scroll contentClassName="gap-5">
      <View className="rounded-[32px] border border-border bg-slate-950 px-5 py-6">
        <Badge variant="outline" className="self-start border-amber-300/30 bg-white/10 px-3 py-1">
          <Text className="text-caption uppercase tracking-[0.2em] text-amber-100">
            Leaderboard
          </Text>
        </Badge>
        <Text className="mt-4 text-h1 leading-10 text-white">Clasificación semanal</Text>
        <Text className="mt-3 text-body leading-7 text-slate-300">
          Aquí vivirán los puntajes, rachas y metas comunitarias. Esta primera versión muestra la
          estructura visual del ranking.
        </Text>
      </View>

      {ranking.map((entry, index) => (
        <View key={entry.name} className="rounded-[28px] border border-border bg-card px-5 py-5">
          <View className="flex-row items-center gap-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/15">
              <Text className="text-h3 text-amber-500">{index + 1}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-h3 text-card-foreground">{entry.name}</Text>
              <Text className="mt-1 text-body text-muted-foreground">{entry.streak}</Text>
            </View>
            <View className="items-end">
              <LucideIcon name="Trophy" size={18} className="text-amber-500" />
              <Text className="mt-2 text-body text-card-foreground">{entry.points} pts</Text>
            </View>
          </View>
        </View>
      ))}
    </Screen>
  );
}
