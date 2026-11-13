import { business } from "@/lib/business";
import { ALL_SERVICES, SERVICE_NAMES } from "@/lib/services";
import type { PunchForm } from "./PunchListProvider";

// Every job on the list, services first in his own order, then small jobs, then free text.
export function jobList(form: PunchForm): string[] {
  const services = ALL_SERVICES.filter((id) => form.services.includes(id)).map((id) => SERVICE_NAMES[id]);
  const other = form.other.trim();
  return [...services, ...form.extras, ...(other ? [other] : [])];
}

export function placeLine(form: PunchForm): string {
  const town = form.town.trim();
  if (form.property && town) return `${form.property} in ${town}.`;
  if (form.property) return `${form.property}.`;
  if (town) return `Property in ${town}.`;
  return "";
}

// "Hi, this is Dana. My list: Mulching, Snow removal, Screen repairs. Home in Lititz. Timing: this month."
export function buildMessage(form: PunchForm): string {
  const parts = [
    `Hi, this is ${form.name.trim()}.`,
    `My list: ${jobList(form).join(", ")}.`,
    placeLine(form),
    form.timing ? `Timing: ${form.timing.toLowerCase()}.` : "",
    form.notes.trim() ? `Notes: ${form.notes.trim()}` : "",
    form.phone ? `My number: ${form.phone}.` : "",
    form.email.trim() ? `Email: ${form.email.trim()}` : "",
  ];
  return parts.filter(Boolean).join(" ");
}

export function smsLink(form: PunchForm): string {
  // "?&body=" is the form that works on both iOS and Android.
  return `${business.smsHref}?&body=${encodeURIComponent(buildMessage(form))}`;
}

export function mailLink(form: PunchForm): string {
  const subject = `Punch List from ${form.name.trim()}`;
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    buildMessage(form),
  )}`;
}

export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function phoneIsValid(value: string): boolean {
  return value.replace(/\D/g, "").length === 10;
}

export function emailIsValid(value: string): boolean {
  const v = value.trim();
  return v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}
