"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { business } from "@/lib/business";
import { EXTRA_JOBS, GROUPS, SERVICE_NAMES, SNOW_DETAIL } from "@/lib/services";
import { CheckRow } from "@/components/ui/Ticket";
import { usePunchList, type PropertyType, type Timing } from "./PunchListProvider";
import { formatPhone } from "./summary";

export const inputClass =
  "block h-12 w-full rounded-md border border-rule bg-ink px-3.5 text-base text-paper placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime aria-[invalid=true]:border-paper";

export type Errors = Partial<Record<"jobs" | "name" | "phone" | "email", string>>;

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.9375rem] font-medium text-paper">
      {children}
    </p>
  );
}

function RadioRow({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-md border px-4 ${
        checked ? "border-lime" : "border-rule hover:border-muted"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="grid size-[22px] shrink-0 place-items-center rounded-[4px] border-[1.5px] border-muted peer-checked:border-lime peer-checked:bg-lime peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
      >
        <Check className="size-3.5 text-ink" strokeWidth={3.5} />
      </span>
      <span className="font-medium">{value}</span>
    </label>
  );
}

// Step 1: What is on your list?
export function StepJobs({ error }: { error?: string }) {
  const { form, toggleService, toggleExtra, setField, focusGroup } = usePunchList();
  const focusRef = useRef<HTMLFieldSetElement | null>(null);

  useEffect(() => {
    if (focusGroup && focusRef.current) {
      focusRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [focusGroup]);

  return (
    <div>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {GROUPS.map((group) => {
          const active = focusGroup === group.id;
          return (
            <fieldset
              key={group.id}
              ref={active ? focusRef : undefined}
              className={`min-w-0 rounded-md border px-3 pb-2 pt-1 ${active ? "border-lime" : "border-transparent"}`}
            >
              <legend className="label-caps px-1 text-muted">{group.title}</legend>
              {group.services.map((id) => (
                <CheckRow
                  key={id}
                  checked={form.services.includes(id)}
                  onChange={(next) => toggleService(id, next)}
                  detail={id === "snow-removal" ? SNOW_DETAIL.join(", ").toLowerCase() : undefined}
                >
                  {SERVICE_NAMES[id]}
                </CheckRow>
              ))}
            </fieldset>
          );
        })}
      </div>

      {/* DRAFT: confirm these example small jobs with the owner */}
      <div className="mt-6 border-t border-dashed border-rule pt-5">
        <p className="label-caps text-muted">Small jobs neighbors ask for</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXTRA_JOBS.map((job) => {
            const on = form.extras.includes(job);
            return (
              <button
                key={job}
                type="button"
                aria-pressed={on}
                onClick={() => toggleExtra(job)}
                className={`min-h-11 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                  on ? "border-lime bg-lime text-ink" : "border-rule text-muted hover:border-muted hover:text-paper"
                }`}
              >
                {job}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="pl-other" className="label-caps text-muted">
          Something else
        </label>
        <input
          id="pl-other"
          type="text"
          value={form.other}
          onChange={(e) => setField("other", e.target.value)}
          placeholder="Write it in"
          maxLength={140}
          className={`${inputClass} mt-2`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "pl-jobs-error" : undefined}
        />
        <FieldError id="pl-jobs-error">{error}</FieldError>
      </div>
    </div>
  );
}

const PROPERTY_TYPES: Exclude<PropertyType, "">[] = ["Home", "Rental or managed property", "Business"];

// Step 2: Where is it?
export function StepPlace() {
  const { form, setField } = usePunchList();
  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="label-caps text-muted">Property type</legend>
        <div className="mt-3 grid gap-2">
          {PROPERTY_TYPES.map((type) => (
            <RadioRow
              key={type}
              name="pl-property"
              value={type}
              checked={form.property === type}
              onChange={() => setField("property", type)}
            />
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="pl-town" className="label-caps text-muted">
          Town
        </label>
        <input
          id="pl-town"
          type="text"
          list="pl-towns"
          value={form.town}
          onChange={(e) => setField("town", e.target.value)}
          placeholder="Lancaster, Lititz, Mount Joy..."
          autoComplete="address-level2"
          className={`${inputClass} mt-2`}
        />
        <datalist id="pl-towns">
          {business.towns.map((town) => (
            <option key={town} value={town} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

const TIMINGS: Exclude<Timing, "">[] = [
  "As soon as possible",
  "This month",
  "Just planning",
  "Ongoing maintenance",
];

// Step 3: When?
export function StepTiming() {
  const { form, setField } = usePunchList();
  return (
    <fieldset>
      <legend className="sr-only">When do you need it?</legend>
      <div className="grid gap-2">
        {TIMINGS.map((timing) => (
          <RadioRow
            key={timing}
            name="pl-timing"
            value={timing}
            checked={form.timing === timing}
            onChange={() => setField("timing", timing)}
          />
        ))}
      </div>
    </fieldset>
  );
}

// Step 4: Your info
export function StepInfo({ errors }: { errors: Errors }) {
  const { form, setField } = usePunchList();
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pl-name" className="label-caps text-muted">
            Name
          </label>
          <input
            id="pl-name"
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            autoComplete="name"
            className={`${inputClass} mt-2`}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "pl-name-error" : undefined}
          />
          <FieldError id="pl-name-error">{errors.name}</FieldError>
        </div>
        <div>
          <label htmlFor="pl-phone" className="label-caps text-muted">
            Phone
          </label>
          <input
            id="pl-phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setField("phone", formatPhone(e.target.value))}
            autoComplete="tel"
            placeholder="(717) 555-0123"
            className={`${inputClass} mt-2`}
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "pl-phone-error" : undefined}
          />
          <FieldError id="pl-phone-error">{errors.phone}</FieldError>
        </div>
      </div>
      <div>
        <label htmlFor="pl-email" className="label-caps text-muted">
          Email <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="pl-email"
          type="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          autoComplete="email"
          className={`${inputClass} mt-2`}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "pl-email-error" : undefined}
        />
        <FieldError id="pl-email-error">{errors.email}</FieldError>
      </div>
      <div>
        <label htmlFor="pl-notes" className="label-caps text-muted">
          Notes <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="pl-notes"
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
          rows={3}
          maxLength={400}
          className={`${inputClass} mt-2 h-auto py-3`}
        />
      </div>
      <p className="text-[0.9375rem] text-muted">You can text us photos after you send this.</p>
    </div>
  );
}
