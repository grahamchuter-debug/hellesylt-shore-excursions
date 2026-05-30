export const siteRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/excursions", priority: 0.9, changeFrequency: "weekly" as const },
  {
    path: "/excursions/mount-stranda-panoramic-views",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/excursions/briksdal-glacier-discovery",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/excursions/private-briksdal-glacier-discovery",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/excursions/private-full-day-hellesylt-highlights",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/excursions/private-mount-stranda-panoramic-views",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/excursions/private-panoramic-geiranger-lunch",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/hellesylt-port-guide",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/one-day-in-hellesylt",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/is-hellesylt-worth-visiting",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/best-time-to-visit-hellesylt",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
] as const;
