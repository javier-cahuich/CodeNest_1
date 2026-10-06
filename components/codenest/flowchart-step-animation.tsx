import React, { useEffect, useState, useRef } from "react";
import { View, Pressable, Platform } from "react-native";
import Svg, {
  Path,
  Rect,
  Text as SvgText,
  Defs,
  Marker,
  G,
} from "react-native-svg";
import { Text } from "@/components/ui/text";
import LucideIcon from "@/lib/icons/LucideIcon";
import { cn } from "@/lib/utils";

export interface FlowchartAnimationProps {
  accentColor?: string;
  isDark?: boolean;
}

interface FlowStepData {
  id: string;
  label: string;
  type: "terminator" | "process" | "data";
  typeLabel: string;
  description: string;
}

const FLOW_STEPS: FlowStepData[] = [
  {
    id: "step-1",
    label: "Inicio",
    type: "terminator",
    typeLabel: "Terminal (Óvalo)",
    description: "Marca el punto de arranque o entrada del algoritmo.",
  },
  {
    id: "step-2",
    label: "Proceso",
    type: "process",
    typeLabel: "Proceso (Rectángulo)",
    description: "Operación previa o inicialización de variables.",
  },
  {
    id: "step-3",
    label: "Datos",
    type: "data",
    typeLabel: "Entrada de Datos (Paralelogramo)",
    description: "Lectura o captura de datos ingresados por el usuario.",
  },
  {
    id: "step-4",
    label: "Proceso",
    type: "process",
    typeLabel: "Proceso / Cálculo (Rectángulo)",
    description: "Ejecución de operaciones matemáticas o transformaciones de los datos.",
  },
  {
    id: "step-5",
    label: "Resultados",
    type: "data",
    typeLabel: "Salida de Datos (Paralelogramo)",
    description: "Muestra en pantalla o devuelve los resultados producidos.",
  },
  {
    id: "step-6",
    label: "Fin",
    type: "terminator",
    typeLabel: "Terminal (Óvalo)",
    description: "Punto de finalización y cierre del algoritmo.",
  },
];

export function FlowchartStepAnimation() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  const currentInfo = FLOW_STEPS[activeStep];

  return (
    <View className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Top Header / Controller Bar */}
      <View className="flex-row items-center justify-between border-b border-border/80 bg-muted/30 px-5 py-3.5">
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <Text className="text-caption font-semibold tracking-wider text-muted-foreground uppercase">
            Simulación Interactiva
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={handleReset}
            accessibilityRole="button"
            accessibilityLabel="Reiniciar animación"
            className="flex-row items-center gap-1 rounded-xl border border-border bg-card px-2.5 py-1.5 active:opacity-70"
          >
            <LucideIcon name="RotateCcw" size={14} className="text-muted-foreground" />
            <Text className="text-caption font-medium text-muted-foreground">Reiniciar</Text>
          </Pressable>

          <Pressable
            onPress={handleTogglePlay}
            accessibilityRole="button"
            accessibilityLabel={isPlaying ? "Pausar animación" : "Reproducir animación"}
            className="flex-row items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 active:opacity-80"
          >
            <LucideIcon
              name={isPlaying ? "Pause" : "Play"}
              size={14}
              className="text-white"
            />
            <Text className="text-caption font-medium text-white">
              {isPlaying ? "Pausa" : "Auto"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* SVG Diagram Canvas */}
      <View className="items-center justify-center py-6 px-4 bg-muted/10">
        <Svg
          width="100%"
          height={430}
          viewBox="0 0 280 430"
          className="max-w-[320px]"
        >
          <Defs>
            <Marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <Path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
            </Marker>
            <Marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <Path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06b6d4" />
            </Marker>
          </Defs>

          {/* Connectors (Arrows) */}
          {/* Arrow 0 -> 1 */}
          <Path
            d="M 140 46 L 140 68"
            stroke={activeStep >= 1 ? "#06b6d4" : "#cbd5e1"}
            strokeWidth={activeStep === 0 ? 3 : 2}
            markerEnd={activeStep >= 1 ? "url(#arrow-active)" : "url(#arrow-default)"}
            strokeDasharray={activeStep === 0 ? "4 3" : undefined}
          />

          {/* Arrow 1 -> 2 */}
          <Path
            d="M 140 114 L 140 136"
            stroke={activeStep >= 2 ? "#06b6d4" : "#cbd5e1"}
            strokeWidth={activeStep === 1 ? 3 : 2}
            markerEnd={activeStep >= 2 ? "url(#arrow-active)" : "url(#arrow-default)"}
            strokeDasharray={activeStep === 1 ? "4 3" : undefined}
          />

          {/* Arrow 2 -> 3 */}
          <Path
            d="M 140 182 L 140 204"
            stroke={activeStep >= 3 ? "#06b6d4" : "#cbd5e1"}
            strokeWidth={activeStep === 2 ? 3 : 2}
            markerEnd={activeStep >= 3 ? "url(#arrow-active)" : "url(#arrow-default)"}
            strokeDasharray={activeStep === 2 ? "4 3" : undefined}
          />

          {/* Arrow 3 -> 4 */}
          <Path
            d="M 140 250 L 140 272"
            stroke={activeStep >= 4 ? "#06b6d4" : "#cbd5e1"}
            strokeWidth={activeStep === 3 ? 3 : 2}
            markerEnd={activeStep >= 4 ? "url(#arrow-active)" : "url(#arrow-default)"}
            strokeDasharray={activeStep === 3 ? "4 3" : undefined}
          />

          {/* Arrow 4 -> 5 */}
          <Path
            d="M 140 318 L 140 340"
            stroke={activeStep >= 5 ? "#06b6d4" : "#cbd5e1"}
            strokeWidth={activeStep === 4 ? 3 : 2}
            markerEnd={activeStep >= 5 ? "url(#arrow-active)" : "url(#arrow-default)"}
            strokeDasharray={activeStep === 4 ? "4 3" : undefined}
          />

          {/* NODE 0: Inicio (Terminator / Oval) */}
          <G
            onPress={() => handleStepClick(0)}
            style={{ cursor: "pointer" }}
          >
            <Rect
              x="80"
              y="6"
              width="120"
              height="40"
              rx="20"
              ry="20"
              fill={activeStep === 0 ? "#06b6d4" : "#f0fdf4"}
              stroke={activeStep === 0 ? "#0891b2" : "#86efac"}
              strokeWidth={activeStep === 0 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="31"
              textAnchor="middle"
              fill={activeStep === 0 ? "#ffffff" : "#15803d"}
              fontSize="14"
              fontWeight="bold"
            >
              Inicio
            </SvgText>
          </G>

          {/* NODE 1: Proceso 1 (Process / Rectangle) */}
          <G
            onPress={() => handleStepClick(1)}
            style={{ cursor: "pointer" }}
          >
            <Rect
              x="75"
              y="74"
              width="130"
              height="40"
              rx="8"
              ry="8"
              fill={activeStep === 1 ? "#06b6d4" : "#eff6ff"}
              stroke={activeStep === 1 ? "#0891b2" : "#93c5fd"}
              strokeWidth={activeStep === 1 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="99"
              textAnchor="middle"
              fill={activeStep === 1 ? "#ffffff" : "#1d4ed8"}
              fontSize="14"
              fontWeight="bold"
            >
              Proceso
            </SvgText>
          </G>

          {/* NODE 2: Datos (Data / Parallelogram) */}
          <G
            onPress={() => handleStepClick(2)}
            style={{ cursor: "pointer" }}
          >
            <Path
              d="M 85 142 L 215 142 L 195 182 L 65 182 Z"
              fill={activeStep === 2 ? "#06b6d4" : "#fef3c7"}
              stroke={activeStep === 2 ? "#0891b2" : "#fcd34d"}
              strokeWidth={activeStep === 2 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="167"
              textAnchor="middle"
              fill={activeStep === 2 ? "#ffffff" : "#b45309"}
              fontSize="14"
              fontWeight="bold"
            >
              Datos
            </SvgText>
          </G>

          {/* NODE 3: Proceso 2 (Process / Rectangle) */}
          <G
            onPress={() => handleStepClick(3)}
            style={{ cursor: "pointer" }}
          >
            <Rect
              x="75"
              y="210"
              width="130"
              height="40"
              rx="8"
              ry="8"
              fill={activeStep === 3 ? "#06b6d4" : "#eff6ff"}
              stroke={activeStep === 3 ? "#0891b2" : "#93c5fd"}
              strokeWidth={activeStep === 3 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="235"
              textAnchor="middle"
              fill={activeStep === 3 ? "#ffffff" : "#1d4ed8"}
              fontSize="14"
              fontWeight="bold"
            >
              Proceso
            </SvgText>
          </G>

          {/* NODE 4: Resultados (Data / Parallelogram) */}
          <G
            onPress={() => handleStepClick(4)}
            style={{ cursor: "pointer" }}
          >
            <Path
              d="M 85 278 L 215 278 L 195 318 L 65 318 Z"
              fill={activeStep === 4 ? "#06b6d4" : "#fef3c7"}
              stroke={activeStep === 4 ? "#0891b2" : "#fcd34d"}
              strokeWidth={activeStep === 4 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="303"
              textAnchor="middle"
              fill={activeStep === 4 ? "#ffffff" : "#b45309"}
              fontSize="14"
              fontWeight="bold"
            >
              Resultados
            </SvgText>
          </G>

          {/* NODE 5: Fin (Terminator / Oval) */}
          <G
            onPress={() => handleStepClick(5)}
            style={{ cursor: "pointer" }}
          >
            <Rect
              x="80"
              y="346"
              width="120"
              height="40"
              rx="20"
              ry="20"
              fill={activeStep === 5 ? "#06b6d4" : "#fef2f2"}
              stroke={activeStep === 5 ? "#0891b2" : "#fca5a5"}
              strokeWidth={activeStep === 5 ? 3 : 1.5}
            />
            <SvgText
              x="140"
              y="371"
              textAnchor="middle"
              fill={activeStep === 5 ? "#ffffff" : "#b91c1c"}
              fontSize="14"
              fontWeight="bold"
            >
              Fin
            </SvgText>
          </G>
        </Svg>
      </View>

      {/* Interactive Step Detail Card */}
      <View className="border-t border-border bg-card p-5">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <View className="flex-row h-6 items-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 px-2">
              <Text className="text-caption font-bold text-cyan-700 dark:text-cyan-300">
                Paso {activeStep + 1} de {FLOW_STEPS.length}
              </Text>
            </View>
            <Text className="text-caption font-medium text-muted-foreground">
              {currentInfo.typeLabel}
            </Text>
          </View>

          {/* Step dots */}
          <View className="flex-row items-center gap-1.5">
            {FLOW_STEPS.map((_, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleStepClick(idx)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  activeStep === idx
                    ? "w-6 bg-cyan-500"
                    : "w-2 bg-muted-foreground/30",
                )}
              />
            ))}
          </View>
        </View>

        <Text className="text-h3 font-bold text-card-foreground">
          {currentInfo.label}
        </Text>
        <Text className="mt-1 text-body text-muted-foreground leading-6">
          {currentInfo.description}
        </Text>

        <View className="mt-4 flex-row items-center justify-between gap-3 pt-3 border-t border-border/50">
          <Pressable
            disabled={activeStep === 0}
            onPress={() => handleStepClick(activeStep - 1)}
            className={cn(
              "flex-row items-center gap-1 rounded-xl border border-border px-3 py-2 active:opacity-70",
              activeStep === 0 && "opacity-40",
            )}
          >
            <LucideIcon name="ChevronLeft" size={16} className="text-foreground" />
            <Text className="text-caption font-medium text-foreground">Anterior</Text>
          </Pressable>

          <Pressable
            disabled={activeStep === FLOW_STEPS.length - 1}
            onPress={() => handleStepClick(activeStep + 1)}
            className={cn(
              "flex-row items-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 active:opacity-80",
              activeStep === FLOW_STEPS.length - 1 && "opacity-40",
            )}
          >
            <Text className="text-caption font-medium text-white">Siguiente</Text>
            <LucideIcon name="ChevronRight" size={16} className="text-white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
