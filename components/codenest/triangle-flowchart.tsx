import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";

export function TriangleFlowchart() {
  const [hasError, setHasError] = useState(false);

  return (
    <View className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header bar */}
      <View className="flex-row items-center justify-between border-b border-border/80 bg-muted/30 px-5 py-3.5">
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
          <Text className="text-caption font-semibold tracking-wider text-muted-foreground uppercase">
            Diagrama de flujo
          </Text>
        </View>
        <View className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 border border-cyan-500/20">
          <Text className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
            Área del triángulo
          </Text>
        </View>
      </View>

      {/* SVG Canvas Area */}
      <View className="items-center justify-center p-4 bg-muted/10">
        <View className="w-full max-w-[320px] items-center justify-center rounded-2xl bg-white p-3 shadow-xs border border-slate-200 dark:border-slate-300">
          <Image
            source={require("@/assets/svg/diagrama_triangulo.svg")}
            style={{ width: 165, height: 402 }}
            contentFit="contain"
            onError={() => setHasError(true)}
          />
        </View>
      </View>

      {/* Legend / Flow explanation */}
      <View className="border-t border-border/80 bg-muted/20 px-5 py-3.5 gap-1.5">
        <View className="flex-row items-center gap-2">
          <LucideIcon name="Info" size={14} className="text-cyan-500" />
          <Text className="text-caption font-semibold text-foreground">
            Flujo de ejecución:
          </Text>
        </View>
        <Text className="text-caption text-muted-foreground leading-5">
          1. Inicio → 2. Entrada (base, altura) → 3. Proceso (cálculo de área) → 4. Salida (resultado impreso) → 5. Fin.
        </Text>
      </View>
    </View>
  );
}

export default TriangleFlowchart;
