// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Inline stand-in for @gsap/react's useGSAP. Mirrors its default
   `revertOnUpdate: false`: one gsap.context lives for the component's
   lifetime, the callback is re-added when dependencies change, and the
   context is reverted only on unmount. A callback may return its own
   cleanup, which runs before the next re-add and on unmount. */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
} as const;

type Month = keyof typeof monthOrder;

export type JourneyItem = {
  id: string;
  year: string;
  month: Month;
  content: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const topJourneyData: JourneyItem[] = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    content: "Signal research turns scattered notes into a clear product thesis",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    content: "Founding release ships with the first live customer journeys",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    content: "Automation layer connects insight, publishing, and sales motion",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    content: "New markets open with localized launches and faster onboarding",
  },
];

const bottomJourneyData: JourneyItem[] = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    content: "Prototype sprint validates the experience with real operators",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    content: "Community feedback reshapes the roadmap into sharper releases",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    content: "Companion mobile workflows make the timeline travel-ready",
  },
];

export const allJourneyItems: JourneyItem[] = [
  ...topJourneyData,
  ...bottomJourneyData,
].sort((a, b) => {
  const yearDiff = Number(a.year) - Number(b.year);
  if (yearDiff !== 0) return yearDiff;
  return monthOrder[a.month] - monthOrder[b.month];
});

export default function Timeline({
  title = "Product Storyline",
  periodLabel = "2020-2026",
  textColor = "var(--color-foreground, #0f172a)",
  mutedTextColor = "var(--color-muted-foreground, #64748b)",
  activeColor = "#ff5f00",
  backgroundColor = "var(--color-background, #ffffff)",
  imageUrl = "https://cdn.21st.dev/assets/mirror/b0/b0c41784074f76ac5fb6b447da87780c901135841317a096241371f24bc13ddd.jpg",
  imageAlt = "Modern office workspace",
  duration,
  scrollDuration = 1.2,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section || !wholeSliderRef.current) return;

    const isMobile = window.innerWidth < 640;
    const slidePercent = isMobile ? -62 : -68;
    const lineWidth = isMobile ? "75%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "82% 50%" : "92% bottom";
    const lineEnd = isMobile ? "80% 50%" : "92% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
        pin: !isMobile,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent, duration: normalizedDuration }
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });

    // Milestone item reveal animations
    gsap.utils.toArray<HTMLElement>(".journey-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.35, y: 15, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 85%",
            end: "left 40%",
            scrub: true,
          },
        }
      );
    });
  }, { scope: sectionRef, dependencies: [reducedMotion, normalizedDuration] });

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className="relative w-full min-h-screen overflow-hidden py-16 px-4 sm:px-8 border-y border-slate-200 dark:border-slate-800"
    >
      {/* Header Info */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
            style={{ ...activeStyle, color: "#ffffff" }}
          >
            {periodLabel}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
        </div>

        {imageUrl && (
          <div className="w-full md:w-72 h-36 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md shrink-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Horizontal Slider Area */}
      <div className="relative w-full overflow-hidden pt-10 pb-16">
        <div
          ref={wholeSliderRef}
          className="flex flex-col relative min-w-[280vw] sm:min-w-[200vw] select-none pl-6 sm:pl-16"
        >
          {/* Top Row Items */}
          <div className="grid grid-flow-col auto-cols-[300px] sm:auto-cols-[360px] gap-12 sm:gap-24 mb-10 items-end">
            {topJourneyData.map((item) => (
              <div
                key={item.id}
                className="journey-card flex flex-col items-start gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={activeStyle}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.month} {item.year}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold leading-relaxed">
                  {item.content}
                </p>
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 self-center -mb-8 mt-2" />
              </div>
            ))}
          </div>

          {/* Center Continuous Line */}
          <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-800 my-6">
            <div
              className="journey-line absolute left-0 top-0 h-full rounded-full transition-all"
              style={activeStyle}
            />
          </div>

          {/* Bottom Row Items */}
          <div className="grid grid-flow-col auto-cols-[300px] sm:auto-cols-[360px] gap-12 sm:gap-24 mt-10 items-start pl-36 sm:pl-48">
            {bottomJourneyData.map((item) => (
              <div
                key={item.id}
                className="journey-card flex flex-col items-start gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700 self-center -mt-8 mb-2" />
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={activeStyle}
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {item.month} {item.year}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { Timeline };
