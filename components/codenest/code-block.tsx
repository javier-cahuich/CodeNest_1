import { Platform, View } from "react-native";
import { Text } from "@/components/ui/text";

export function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <View className="overflow-hidden rounded-3xl border border-border bg-[#0f172a]">
      <View className="flex-row items-center justify-between border-b border-white/10 px-4 py-3">
        <Text className="text-caption uppercase tracking-[0.28em] text-cyan-200">{label}</Text>
        <View className="flex-row gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <View className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <View className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </View>
      </View>
      <Text
        className="px-4 py-4 text-[13px] leading-6 text-slate-100"
        style={{
          fontFamily: Platform.select({
            ios: "Menlo",
            android: "monospace",
            default: "monospace",
          }),
        }}
      >
        {code}
      </Text>
    </View>
  );
}
