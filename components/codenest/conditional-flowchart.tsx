import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";

export function ConditionalFlowchart() {
  const [hasError, setHasError] = useState(false);

  return (
    <View className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header bar */}
      <View className="flex-row items-center justify-between border-b border-border/80 bg-muted/30 px-5 py-3.5">
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <Text className="text-caption font-semibold tracking-wider text-muted-foreground uppercase">
            Diagrama de flujo
          </Text>
        </View>
        <View className="rounded-full bg-amber-500/10 px-2.5 py-0.5 border border-amber-500/20">
          <Text className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            Condicional Si / Sino
          </Text>
        </View>
      </View>

      {/* SVG Canvas Area */}
      <View className="items-center justify-center p-4 bg-muted/10">
        <View className="w-full max-w-[340px] items-center justify-center rounded-2xl bg-white p-3 shadow-xs border border-slate-200 dark:border-slate-300">
          <Image
            source={require("@/assets/svg/Diagrama-edad.svg")}
            style={{ width: 280, height: 287 }}
            contentFit="contain"
            onError={() => setHasError(true)}
          />
        </View>
      </View>

      {/* Legend / Flow explanation */}
      <View className="border-t border-border/80 bg-muted/20 px-5 py-3.5 gap-1.5">
        <View className="flex-row items-center gap-2">
          <LucideIcon name="Info" size={14} className="text-amber-500" />
          <Text className="text-caption font-semibold text-foreground">
            Flujo de decisión:
          </Text>
        </View>
        <Text className="text-caption text-muted-foreground leading-5">
          1. Inicio → 2. Entrada (edad) → 3. Decisión (¿edad &gt;= 18?) → 4. Camino Sí (&quot;Mayor de edad&quot;) o No (&quot;Menor de edad&quot;) → 5. Fin.
        </Text>
      </View>
    </View>
  );
}

export default ConditionalFlowchart;
