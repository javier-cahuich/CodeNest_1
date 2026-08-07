import { View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";

export function HomeHero({
  currentStreak,
  completedModules,
  totalModules,
  nextFocus,
}: {
  currentStreak: string;
  completedModules: number;
  totalModules: number;
  nextFocus: string;
}) {
  const progress = Math.round((completedModules / totalModules) * 100);

  return (
    <View className="overflow-hidden rounded-[32px] border border-sky-300/40 bg-slate-950 px-5 py-6">
      <View className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-cyan-400/20" />
      <View className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-amber-300/10" />

      <Badge
        variant="outline"
        className="self-start border-sky-300/30 bg-white/10 px-3 py-1 dark:border-sky-300/30"
      >
        <Text className="text-caption uppercase tracking-[0.24em] text-sky-100">Ruta inicial</Text>
      </Badge>

      <View className="mt-4 gap-3">
        <Text className="text-h1 leading-10 text-white">Aprende programación paso a paso</Text>
        <Text className="text-body leading-6 text-slate-300">
          Módulos breves, ejemplos claros y una ruta pensada para que entiendas la lógica antes de
          escribir proyectos completos.
        </Text>
      </View>

      <View className="mt-6 flex-row flex-wrap gap-3">
        <View className="min-w-[145px] flex-1 rounded-3xl bg-white/10 px-4 py-4">
          <View className="mb-3 h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/20">
            <LucideIcon name="Flame" size={20} className="text-cyan-200" />
          </View>
          <Text className="text-caption uppercase tracking-[0.2em] text-slate-400">Racha</Text>
          <Text className="mt-1 text-h3 text-white">{currentStreak}</Text>
        </View>

        <View className="min-w-[145px] flex-1 rounded-3xl bg-white/10 px-4 py-4">
          <View className="mb-3 h-11 w-11 items-center justify-center rounded-2xl bg-amber-300/20">
            <LucideIcon name="ChartNoAxesColumnIncreasing" size={20} className="text-amber-200" />
          </View>
          <Text className="text-caption uppercase tracking-[0.2em] text-slate-400">Avance</Text>
          <Text className="mt-1 text-h3 text-white">
            {completedModules}/{totalModules} módulos
          </Text>
        </View>
      </View>

      <View className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1">
            <Text className="text-caption uppercase tracking-[0.2em] text-slate-400">
              Siguiente foco
            </Text>
            <Text className="mt-1 text-body text-slate-100">{nextFocus}</Text>
          </View>
          <Text className="text-h3 text-cyan-200">{progress}%</Text>
        </View>
        <View className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <View className="h-full rounded-full bg-cyan-400" style={{ width: `${progress}%` }} />
        </View>
      </View>
    </View>
  );
}
