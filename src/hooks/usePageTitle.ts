// src/hooks/usePageTitle.ts — per-route document titles for history/SEO
import { useEffect } from "react";

const BASE_TITLE = "Amreet Khuntia — Software & DevOps Engineer";

/** Pass a room name ("Work") for "Work · Amreet Khuntia …"; omit for the base title. */
export function usePageTitle(room?: string) {
  useEffect(() => {
    document.title = room ? `${room} · ${BASE_TITLE}` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [room]);
}
