export type PlannerExcursionLink = {
  label: string;
  href?: string;
};

export type PortTimeTier = {
  minHours: number;
  maxHours: number | null;
  label: string;
  confidenceScore: number;
  confidenceLabel: string;
  confidenceMessage: string;
  excursions: readonly PlannerExcursionLink[];
  dayPlan: readonly string[];
  conversionNote?: string;
};

export type CruisePortDayPlannerConfig = {
  portName: string;
  heading: string;
  subtitle: string;
  supportingCopy: string;
  returnBufferNote: string;
  tiers: readonly PortTimeTier[];
};

export const hellesyltPortDayPlannerConfig: CruisePortDayPlannerConfig = {
  portName: "Hellesylt",
  heading: "Hellesylt Cruise Smart Planner™",
  subtitle: "Plan your shore excursions around your actual time in port.",
  supportingCopy:
    "Built specifically for cruise passengers calling at Hellesylt, including short technical stops before Geiranger.",
  returnBufferNote:
    "Always confirm your cruise line's official all-aboard time, as this may be earlier than the published departure time.",
  tiers: [
    {
      minHours: 0,
      maxHours: 3,
      label: "Under 3 hours",
      confidenceScore: 40,
      confidenceLabel: "Very Short Port Call",
      confidenceMessage:
        "Best suited to Hellesylt village and waterfall time only. Avoid longer countryside tours unless your ship schedule clearly allows.",
      excursions: [
        { label: "Hellesylt village and waterfall time only" },
        {
          label: "Avoid longer countryside tours unless ship schedule allows",
        },
      ],
      dayPlan: [
        "Disembark promptly and stay within Hellesylt village",
        "Walk to the waterfall and harbour viewpoints on foot",
        "Skip Mount Stranda, Briksdal Glacier, and Geiranger routes",
        "Be back at the gangway by your recommended return time",
      ],
    },
    {
      minHours: 3,
      maxHours: 4,
      label: "3 to 4 hours",
      confidenceScore: 70,
      confidenceLabel: "Good Short Port Call",
      confidenceMessage:
        "Enough time for Mount Stranda panoramic touring or a private short scenic option with comfortable return margins.",
      excursions: [
        {
          label: "Journey to Mount Stranda and Panoramic Views",
          href: "/excursions/mount-stranda-panoramic-views",
        },
        {
          label: "Private Mount Stranda and Panoramic Views",
          href: "/excursions/private-mount-stranda-panoramic-views",
        },
      ],
      dayPlan: [
        "Arrive in Hellesylt and head straight to your excursion meeting point",
        "Morning or early afternoon: Mount Stranda scenic tour",
        "Allow time for coffee and gondola viewpoints before return",
        "Keep 45 minutes before all aboard for pier access",
      ],
    },
    {
      minHours: 4,
      maxHours: 6,
      label: "4 to 6 hours",
      confidenceScore: 85,
      confidenceLabel: "Strong Port Call",
      confidenceMessage:
        "Ideal for Mount Stranda scenic tours and shorter private viewpoint options with fjord and mountain scenery.",
      excursions: [
        {
          label: "Mount Stranda scenic tours",
          href: "/excursions/mount-stranda-panoramic-views",
        },
        {
          label: "Private Mount Stranda and Panoramic Views",
          href: "/excursions/private-mount-stranda-panoramic-views",
        },
      ],
      dayPlan: [
        "Confirm your excursion departure near Hellesylt village",
        "Morning: Sunnylvsfjord drive, Ljøen viewpoint, and gondola time",
        "Add brief waterfall or village time only if return times are confirmed",
        "Return to port by recommended return time",
      ],
    },
    {
      minHours: 6,
      maxHours: 8,
      label: "6 to 8 hours",
      confidenceScore: 90,
      confidenceLabel: "Full Glacier Window",
      confidenceMessage:
        "Enough time for Briksdal Glacier Discovery or the private glacier option with mountain road travel from Hellesylt.",
      excursions: [
        {
          label: "Briksdal Glacier Discovery",
          href: "/excursions/briksdal-glacier-discovery",
        },
        {
          label: "Private Briksdal Glacier Discovery",
          href: "/excursions/private-briksdal-glacier-discovery",
        },
      ],
      dayPlan: [
        "Disembark early for glacier tour departures on busy cruise days",
        "Morning to afternoon: Briksdal Glacier with Hornindal Lake scenery",
        "Pack layers for mountain roads and glacier walking",
        "Allow 45 minutes before all aboard at Hellesylt pier",
      ],
    },
    {
      minHours: 8,
      maxHours: null,
      label: "8+ hours",
      confidenceScore: 95,
      confidenceLabel: "Excellent Full Day",
      confidenceMessage:
        "Ideal for private full-day Hellesylt highlights or the panoramic Geiranger route with lunch.",
      conversionNote:
        "Most cruise passengers with 8+ hours in Hellesylt choose the Private Full Day Highlights or the Private Panoramic Journey to Geiranger with Lunch.",
      excursions: [
        {
          label: "Private Full Day Hellesylt Highlights",
          href: "/excursions/private-full-day-hellesylt-highlights",
        },
        {
          label: "Private Panoramic Journey to Geiranger with Lunch",
          href: "/excursions/private-panoramic-geiranger-lunch",
        },
      ],
      dayPlan: [
        "Arrive early and confirm your private tour departure",
        "Morning: Oldedalen Valley, Briksdal Glacier, or Geiranger panorama route",
        "Midday: Lunch included on premium full-day tours",
        "Afternoon: Additional viewpoints with flexible private pacing",
        "Keep the final hour free near the cruise port for a calm return",
      ],
    },
  ],
};

export const plannerInterestGroups = [
  {
    title: "Active",
    items: [
      {
        label: "Briksdal Glacier Discovery",
        href: "/excursions/briksdal-glacier-discovery",
      },
      {
        label: "Private Briksdal Glacier Discovery",
        href: "/excursions/private-briksdal-glacier-discovery",
      },
    ],
  },
  {
    title: "Premium",
    items: [
      {
        label: "Private Full Day Hellesylt Highlights",
        href: "/excursions/private-full-day-hellesylt-highlights",
      },
      {
        label: "Private Panoramic Journey to Geiranger with Lunch",
        href: "/excursions/private-panoramic-geiranger-lunch",
      },
    ],
  },
] as const;

export const RECOMMENDED_RETURN_BUFFER_MINUTES = 45;
export const LATEST_COMFORTABLE_RETURN_BUFFER_MINUTES = 30;

export function parseTimeToMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());

  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) {
    return null;
  }

  return hours * 60 + minutes;
}

export function formatTimeLabel(time: string): string {
  const minutes = parseTimeToMinutes(time);
  if (minutes === null) {
    return time;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

export function subtractMinutesFromTime(
  time: string,
  subtractMinutes: number,
): string | null {
  const totalMinutes = parseTimeToMinutes(time);
  if (totalMinutes === null) {
    return null;
  }

  let result = totalMinutes - subtractMinutes;
  if (result < 0) {
    result += 24 * 60;
  }

  const hours = Math.floor(result / 60) % 24;
  const minutes = result % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function calculatePortMinutes(
  arrival: string,
  departure: string,
): number | null {
  const arrivalMinutes = parseTimeToMinutes(arrival);
  const departureMinutes = parseTimeToMinutes(departure);

  if (arrivalMinutes === null || departureMinutes === null) {
    return null;
  }

  let diff = departureMinutes - arrivalMinutes;

  if (diff <= 0) {
    diff += 24 * 60;
  }

  return diff;
}

export function formatPortDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  if (minutes === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  return `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${minutes === 1 ? "" : "s"}`;
}

export function getTierForPortMinutes(
  totalMinutes: number,
  tiers: readonly PortTimeTier[],
): PortTimeTier {
  const hours = totalMinutes / 60;

  return (
    tiers.find((tier) => {
      const meetsMinimum = hours >= tier.minHours;
      const belowMaximum = tier.maxHours === null || hours < tier.maxHours;
      return meetsMinimum && belowMaximum;
    }) ?? tiers[tiers.length - 1]
  );
}

export function getReturnGuidance(departure: string) {
  return {
    departureLabel: formatTimeLabel(departure),
    recommendedReturn: subtractMinutesFromTime(
      departure,
      RECOMMENDED_RETURN_BUFFER_MINUTES,
    ),
    latestComfortableReturn: subtractMinutesFromTime(
      departure,
      LATEST_COMFORTABLE_RETURN_BUFFER_MINUTES,
    ),
  };
}

export function getConfidenceTone(score: number): {
  badge: string;
  bar: string;
} {
  if (score >= 90) {
    return { badge: "bg-emerald-100 text-emerald-800", bar: "bg-emerald-500" };
  }
  if (score >= 65) {
    return { badge: "bg-amber-100 text-amber-800", bar: "bg-amber-500" };
  }
  return { badge: "bg-orange-100 text-orange-800", bar: "bg-orange-500" };
}
