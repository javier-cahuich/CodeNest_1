import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";
import { cn } from "@/lib/utils";

// Map names from CSV / modules to the SVG assets in assets/svg
const SVG_ASSETS: Record<string, any> = {
  "1.inicio-fin": require("@/assets/svg/1.inicio-fin.svg"),
  "2.entradaSalidad": require("@/assets/svg/2.entradaSalidad.svg"),
  "2.entradaSalida": require("@/assets/svg/2.entradaSalida.svg"),
  "3.proceso": require("@/assets/svg/3.proceso.svg"),
  "4.decicion": require("@/assets/svg/4.decicion.svg"),
  "4.decision": require("@/assets/svg/4.decision.svg"),
};

// Fallback vector specifications matching the exact SVG files from assets/svg
const SVG_FALLBACKS: Record<
  string,
  {
    viewBox: string;
    path: string;
  }
> = {
  "1.inicio-fin": {
    viewBox: "0 0 162 82",
    path: "M121 1c22.1 0 40 17.9 40 40s-17.9 40-40 40H41C18.9 81 1 63.1 1 41S18.9 1 41 1z",
  },
  "2.entradaSalidad": {
    viewBox: "0 0 160 122",
    path: "M29.94 8.73A10.4 10.4 0 0 1 40 1h112a6.15 6.15 0 0 1 5.94 7.73l-27.88 104.54A10.4 10.4 0 0 1 120 121H8a6.15 6.15 0 0 1-5.94-7.73z",
  },
  "2.entradaSalida": {
    viewBox: "0 0 160 122",
    path: "M29.94 8.73A10.4 10.4 0 0 1 40 1h112a6.15 6.15 0 0 1 5.94 7.73l-27.88 104.54A10.4 10.4 0 0 1 120 121H8a6.15 6.15 0 0 1-5.94-7.73z",
  },
  "3.proceso": {
    viewBox: "0 0 162 122",
    path: "M1 9a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8v104a8 8 0 0 1-8 8H9a8 8 0 0 1-8-8z",
  },
  "4.decicion": {
    viewBox: "0 0 160 120",
    path: "M73.6 4.8a10.67 10.67 0 0 1 12.8 0l67.2 50.4a6 6 0 0 1 0 9.6l-67.2 50.4a10.67 10.67 0 0 1-12.8 0L6.4 64.8a6 6 0 0 1 0-9.6z",
  },
  "4.decision": {
    viewBox: "0 0 160 120",
    path: "M73.6 4.8a10.67 10.67 0 0 1 12.8 0l67.2 50.4a6 6 0 0 1 0 9.6l-67.2 50.4a10.67 10.67 0 0 1-12.8 0L6.4 64.8a6 6 0 0 1 0-9.6z",
  },
};

export function isFlowchartSymbolKey(key: string): boolean {
  return key in SVG_ASSETS || key in SVG_FALLBACKS;
}

export interface FlowchartSymbolProps {
  name: string;
  className?: string;
}

export function FlowchartSymbol({ name, className }: FlowchartSymbolProps) {
  const [loadError, setLoadError] = useState(false);
  const asset = SVG_ASSETS[name];
  const fallback = SVG_FALLBACKS[name];

  return (
    <View
      className={cn(
        "h-12 w-16 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm border border-slate-200 dark:border-slate-300",
        className,
      )}
    >
      {asset && !loadError ? (
        <Image
          source={asset}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
          onError={() => setLoadError(true)}
        />
      ) : fallback ? (
        <Svg
          width="100%"
          height="100%"
          viewBox={fallback.viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          <Path
            d={fallback.path}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="3"
          />
        </Svg>
      ) : null}
    </View>
  );
}

export default FlowchartSymbol;
