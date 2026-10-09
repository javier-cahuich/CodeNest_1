import { View } from "react-native";
import { Screen } from "@/components/layout/screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  errorReviewMockData,
  type ErrorReviewMetric,
  type ErrorReviewMetricTone,
  type ErrorReviewTopic,
  type ErrorReviewTopicTone,
} from "@/data/error-review";
import LucideIcon from "@/lib/icons/LucideIcon";
import { cn } from "@/lib/utils";

const metricToneClasses: Record<
  ErrorReviewMetricTone,
  { iconBackground: string; iconColor: string }
> = {
  destructive: {
    iconBackground: "bg-rose-100 dark:bg-rose-500/15",
    iconColor: "text-rose-600 dark:text-rose-300",
  },
  success: {
    iconBackground: "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  primary: {
    iconBackground: "bg-cyan-100 dark:bg-cyan-500/15",
    iconColor: "text-cyan-600 dark:text-cyan-300",
  },
};

const topicToneClasses: Record<
  ErrorReviewTopicTone,
  { iconBackground: string; iconColor: string }
> = {
  sky: {
    iconBackground: "bg-sky-100 dark:bg-sky-500/15",
    iconColor: "text-sky-600 dark:text-sky-300",
  },
  emerald: {
    iconBackground: "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  violet: {
    iconBackground: "bg-violet-100 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-300",
  },
};

function MetricCard({ metric }: { metric: ErrorReviewMetric }) {
  const tone = metricToneClasses[metric.tone];

  return (
    <View className="min-w-24 flex-1 items-center gap-2 rounded-[24px] border border-border bg-card px-2 py-4 shadow-sm shadow-foreground/5 sm:flex-row sm:gap-3 sm:px-4">
      <View
        className={cn("h-10 w-10 items-center justify-center rounded-full", tone.iconBackground)}
      >
        <LucideIcon name={metric.icon} size={21} className={tone.iconColor} />
      </View>
      <View className="min-w-0 items-center sm:flex-1 sm:items-start">
        <Text className="text-center text-caption text-muted-foreground sm:text-left">
          {metric.label}
        </Text>
        <Text className="mt-0.5 text-h2 leading-8 text-card-foreground">{metric.value}</Text>
      </View>
    </View>
  );
}

function TopicRow({ topic, isLast }: { topic: ErrorReviewTopic; isLast: boolean }) {
  const tone = topicToneClasses[topic.tone];

  return (
    <View
      className={cn("flex-row items-center gap-4 px-4 py-4", !isLast && "border-b border-border")}
    >
      <View
        className={cn("h-12 w-12 items-center justify-center rounded-2xl", tone.iconBackground)}
      >
        <LucideIcon name={topic.icon} size={23} className={tone.iconColor} />
      </View>
      <Text className="flex-1 text-h4 text-card-foreground">{topic.title}</Text>
    </View>
  );
}

export default function ErrorReviewScreen() {
  return (
    <Screen scroll contentClassName="items-center pb-12">
      <View className="w-full max-w-4xl gap-5">
        <View className="relative overflow-hidden rounded-[30px] border border-border bg-card px-6 py-6 shadow-sm shadow-foreground/5">
          <View className="absolute bottom-0 left-0 top-0 w-2 bg-emerald-400 dark:bg-emerald-500" />

          <View className="pl-2">
            <Text className="text-h2 leading-9 text-card-foreground">Repaso inteligente</Text>
          </View>

          <Button className="mt-6 h-14 rounded-2xl">
            <Text className="text-button text-primary-foreground">
              Empezar + {errorReviewMockData.rewardExperience} EXP
            </Text>
          </Button>
        </View>

        <View className="flex-row flex-wrap gap-3">
          {errorReviewMockData.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </View>

        <View className="rounded-[30px] border border-border bg-card px-4 py-5 shadow-sm shadow-foreground/5">
          <View className="px-1 pb-4">
            <Text className="text-h3 text-card-foreground">Lo que reforzaremos</Text>
          </View>

          <View className="overflow-hidden rounded-[22px] border border-border bg-background/40">
            {errorReviewMockData.topics.map((topic, index) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                isLast={index === errorReviewMockData.topics.length - 1}
              />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
