import type { IconName } from "@/lib/icons/LucideIcon";

export type ErrorReviewMetricTone = "destructive" | "success" | "primary";
export type ErrorReviewTopicTone = "sky" | "emerald" | "violet";

export type ErrorReviewMetric = {
  id: "pending" | "corrected" | "accuracy";
  label: string;
  value: string;
  icon: IconName;
  tone: ErrorReviewMetricTone;
};

export type ErrorReviewTopic = {
  id: string;
  title: string;
  icon: IconName;
  tone: ErrorReviewTopicTone;
};

export type ErrorReviewOverview = {
  rewardExperience: number;
  metrics: ErrorReviewMetric[];
  topics: ErrorReviewTopic[];
};

// Fuente temporal. Más adelante este objeto puede construirse con la respuesta de Supabase
// sin cambiar la estructura que consume la pantalla.
export const errorReviewMockData: ErrorReviewOverview = {
  rewardExperience: 20,
  metrics: [
    {
      id: "pending",
      label: "Pendientes",
      value: "12",
      icon: "FileText",
      tone: "destructive",
    },
    {
      id: "corrected",
      label: "Corregidos",
      value: "8",
      icon: "CircleCheck",
      tone: "success",
    },
    {
      id: "accuracy",
      label: "Precisión",
      value: "76%",
      icon: "Target",
      tone: "primary",
    },
  ],
  topics: [
    {
      id: "loops",
      title: "Bucles",
      icon: "RefreshCw",
      tone: "sky",
    },
    {
      id: "conditionals",
      title: "Condicionales",
      icon: "GitBranch",
      tone: "emerald",
    },
    {
      id: "operators",
      title: "Operadores",
      icon: "Calculator",
      tone: "violet",
    },
  ],
};
