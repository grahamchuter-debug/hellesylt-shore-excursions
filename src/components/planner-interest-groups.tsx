import Link from "next/link";

import { plannerInterestGroups } from "@/lib/cruise-port-day-planner";

export function PlannerInterestGroups() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {plannerInterestGroups.map((group) => (
        <div
          key={group.title}
          className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--norway-blue)]">
            {group.title}
          </h3>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-800 transition hover:text-[var(--norway-blue)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
