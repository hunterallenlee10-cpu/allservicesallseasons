"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GroupId, ServiceId } from "@/lib/services";

const PunchListModal = dynamic(() => import("./PunchListModal"), { ssr: false });

export type PropertyType = "" | "Home" | "Rental or managed property" | "Business";
export type Timing = "" | "As soon as possible" | "This month" | "Just planning" | "Ongoing maintenance";

export type PunchForm = {
  services: ServiceId[];
  extras: string[];
  other: string;
  property: PropertyType;
  town: string;
  timing: Timing;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const EMPTY: PunchForm = {
  services: [],
  extras: [],
  other: "",
  property: "",
  town: "",
  timing: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

type OpenOptions = { tick?: ServiceId[]; group?: GroupId };

type PunchListContext = {
  form: PunchForm;
  count: number;
  isOpen: boolean;
  // Bumps every time the list is opened, so the form can jump back to step 1.
  openSignal: number;
  focusGroup: GroupId | null;
  open: (options?: OpenOptions) => void;
  close: () => void;
  toggleService: (id: ServiceId, next?: boolean) => void;
  toggleExtra: (name: string) => void;
  setField: <K extends keyof PunchForm>(key: K, value: PunchForm[K]) => void;
  reset: () => void;
  // The /contact page embeds the builder inline. When it is mounted, "Get My
  // Quote" scrolls to it instead of opening the modal.
  registerInline: (el: HTMLElement | null) => void;
};

const Ctx = createContext<PunchListContext | null>(null);

export function PunchListProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<PunchForm>(EMPTY);
  const [isOpen, setIsOpen] = useState(false);
  const [openSignal, setOpenSignal] = useState(0);
  const [focusGroup, setFocusGroup] = useState<GroupId | null>(null);
  const inline = useRef<HTMLElement | null>(null);

  const open = useCallback((options?: OpenOptions) => {
    const tick = options?.tick;
    if (tick?.length) {
      setForm((f) => ({ ...f, services: Array.from(new Set([...f.services, ...tick])) }));
    }
    setFocusGroup(options?.group ?? null);
    setOpenSignal((n) => n + 1);
    if (inline.current) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      inline.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      inline.current.focus({ preventScroll: true });
    } else {
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const toggleService = useCallback((id: ServiceId, next?: boolean) => {
    setForm((f) => {
      const has = f.services.includes(id);
      const want = next ?? !has;
      if (want === has) return f;
      return { ...f, services: want ? [...f.services, id] : f.services.filter((s) => s !== id) };
    });
  }, []);

  const toggleExtra = useCallback((name: string) => {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(name) ? f.extras.filter((e) => e !== name) : [...f.extras, name],
    }));
  }, []);

  const setField = useCallback(<K extends keyof PunchForm>(key: K, value: PunchForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const reset = useCallback(() => setForm(EMPTY), []);

  const registerInline = useCallback((el: HTMLElement | null) => {
    inline.current = el;
  }, []);

  const count = form.services.length + form.extras.length + (form.other.trim() ? 1 : 0);

  const value = useMemo<PunchListContext>(
    () => ({
      form,
      count,
      isOpen,
      openSignal,
      focusGroup,
      open,
      close,
      toggleService,
      toggleExtra,
      setField,
      reset,
      registerInline,
    }),
    [form, count, isOpen, openSignal, focusGroup, open, close, toggleService, toggleExtra, setField, reset, registerInline],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {isOpen ? <PunchListModal /> : null}
    </Ctx.Provider>
  );
}

export function usePunchList(): PunchListContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePunchList must be used inside PunchListProvider");
  return ctx;
}
