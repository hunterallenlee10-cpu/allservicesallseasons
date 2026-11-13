"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { seasonForMonth, type SeasonId } from "@/lib/services";

const SeasonContext = createContext<SeasonId>("winter");

// The server renders the season for its own date (pages revalidate hourly).
// After hydration we correct to the visitor's own month if it differs.
export function SeasonProvider({
  initialSeason,
  children,
}: {
  initialSeason: SeasonId;
  children: ReactNode;
}) {
  const [season, setSeason] = useState<SeasonId>(initialSeason);

  useEffect(() => {
    const now = seasonForMonth(new Date().getMonth());
    setSeason((prev) => (prev === now ? prev : now));
  }, []);

  return <SeasonContext.Provider value={season}>{children}</SeasonContext.Provider>;
}

export function useSeason(): SeasonId {
  return useContext(SeasonContext);
}
