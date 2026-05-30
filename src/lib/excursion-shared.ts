import type { ExcursionRelatedLink } from "@/lib/excursion-types";

export const hellesyltExcursionRelatedLinks: readonly ExcursionRelatedLink[] = [
  { label: "Hellesylt port guide", href: "/hellesylt-port-guide" },
  { label: "One day in Hellesylt", href: "/one-day-in-hellesylt" },
  { label: "Cruise Smart Planner", href: "/#planner" },
];

export const hellesyltExcursionBreadcrumbs = (
  tourLabel: string,
) =>
  [
    { label: "Home", href: "/" },
    { label: "Excursions", href: "/excursions" },
    { label: tourLabel },
  ] as const;

export const standardNotIncluded = [
  "Food, drinks, and personal purchases unless stated",
  "Optional gratuities",
  "Independent time beyond the tour schedule",
] as const;

export const standardTimingAdvice = [
  "Confirm your cruise line's all-aboard time the morning you arrive in Hellesylt.",
  "Disembark promptly on busy Geirangerfjord cruise days.",
  "Keep 30 to 45 minutes before all aboard to reach the pier or tender point.",
  "Mountain roads and gondola operations can be weather-dependent, pack layers.",
] as const;
