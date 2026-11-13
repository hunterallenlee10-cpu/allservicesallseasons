"use client";

import { ArrowLeft, ArrowRight, Check, Mail, MessageSquare, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { btnGhost, btnPrimary } from "@/components/ui/buttons";
import { TickBox } from "@/components/ui/Ticket";
import { usePunchList } from "./PunchListProvider";
import { StepInfo, StepJobs, StepPlace, StepTiming, type Errors } from "./Steps";
import { emailIsValid, jobList, mailLink, phoneIsValid, placeLine, smsLink } from "./summary";

const TITLES = ["What is on your list?", "Where is it?", "When?", "Your info"];

// The Punch List: four steps, then a ticket the visitor can text, call in or email.
// Front end only. Nothing is sent until they press one of those buttons.
export function PunchListForm({ variant }: { variant: "modal" | "inline" }) {
  const { form, count, openSignal } = usePunchList();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const modal = variant === "modal";

  // Every new "Get My Quote" press starts at step 1 with the ticked jobs in view.
  useEffect(() => {
    if (openSignal === 0) return;
    setStep(0);
    setDone(false);
    setErrors({});
  }, [openSignal]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bodyRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: !modal ? true : false });
  }, [step, done, modal]);

  function validate(at: number): Errors {
    const e: Errors = {};
    if (at === 0 && count === 0) e.jobs = "Tick at least one job, or write yours in.";
    if (at === 3) {
      if (!form.name.trim()) e.name = "Add your name so we know who to ask for.";
      if (!phoneIsValid(form.phone)) {
        e.phone = form.phone
          ? "That number looks short. We need all 10 digits to call you back."
          : "Add a phone number so we can call or text you back.";
      }
      if (!emailIsValid(form.email)) e.email = "That email does not look right. Check it, or leave it blank.";
    }
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = e.jobs ? "pl-other" : e.name ? "pl-name" : e.phone ? "pl-phone" : "pl-email";
      document.getElementById(first)?.focus();
      return;
    }
    if (step === 3) setDone(true);
    else setStep(step + 1);
  }

  const shell = modal ? "flex min-h-0 flex-1 flex-col" : "flex flex-col";
  const Heading = modal ? "h2" : "h3";

  if (done) {
    const jobs = jobList(form);
    const place = placeLine(form);
    return (
      <div className={shell}>
        <div ref={bodyRef} className={`quick-fade px-5 pb-6 pt-6 sm:px-8 sm:pt-8 ${modal ? "relative min-h-0 flex-1 overflow-y-auto overscroll-contain" : ""}`}>
          <span className="grid size-12 place-items-center rounded-[10px] bg-lime">
            <Check className="size-7 text-ink" strokeWidth={3} aria-hidden="true" />
          </span>
          {/* DRAFT: confirm reply method and timing */}
          <Heading
            ref={headingRef}
            tabIndex={-1}
            id={modal ? "punch-list-title" : undefined}
            className="display mt-5 text-[1.5rem] outline-none sm:text-[1.75rem]"
          >
            Got it. Your list is ready to send.
          </Heading>
          <p className="mt-3 text-muted">
            Text it, call it in or email it. It goes straight to {business.shortName}.
          </p>

          <div className="mt-6 rounded-[10px] border border-rule bg-ink">
            <div className="flex min-h-11 items-center justify-between border-b border-dashed border-rule px-4">
              <span className="label-caps text-muted">Punch List</span>
              <span className="label-caps text-muted">{form.name.trim()}</span>
            </div>
            <ul className="grid gap-2.5 p-4">
              {jobs.map((job) => (
                <li key={job} className="flex items-start gap-3">
                  <TickBox className="mt-0.5" />
                  <span className="font-medium leading-snug">{job}</span>
                </li>
              ))}
            </ul>
            <dl className="grid gap-1 border-t border-dashed border-rule p-4 text-[0.9375rem] text-muted">
              {place ? (
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0">Where</dt>
                  <dd className="text-paper">{place.replace(/\.$/, "")}</dd>
                </div>
              ) : null}
              {form.timing ? (
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0">When</dt>
                  <dd className="text-paper">{form.timing}</dd>
                </div>
              ) : null}
              <div className="flex gap-2">
                <dt className="w-16 shrink-0">Phone</dt>
                <dd className="text-paper">{form.phone}</dd>
              </div>
              {form.notes.trim() ? (
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0">Notes</dt>
                  <dd className="text-paper">{form.notes.trim()}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={smsLink(form)} className={`${btnPrimary} min-h-14`}>
              <MessageSquare className="size-4" strokeWidth={2.25} aria-hidden="true" />
              Text this to us
            </a>
            <a href={business.phoneHref} className={`${btnGhost} min-h-14`}>
              <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
              Call now
            </a>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <a
              href={mailLink(form)}
              className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-paper underline decoration-muted underline-offset-4 hover:decoration-paper"
            >
              <Mail className="size-4" strokeWidth={2} aria-hidden="true" />
              Email it instead
            </a>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
              }}
              className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-muted underline decoration-rule underline-offset-4 hover:text-paper"
            >
              Change my list
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      className={shell}
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <div className="px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-4 pr-10">
          <span className="label-caps text-muted">Punch List</span>
          <span className="label-caps text-lime" aria-live="polite">
            Step {step + 1} of 4
          </span>
        </div>
        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-rule"
          role="progressbar"
          aria-label="Punch List progress"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step + 1}
        >
          <div className="h-full bg-lime transition-[width] duration-150" style={{ width: `${((step + 1) / 4) * 100}%` }} />
        </div>
        <Heading
          ref={headingRef}
          tabIndex={-1}
          id={modal ? "punch-list-title" : undefined}
          className="display mt-5 text-[1.375rem] outline-none sm:text-[1.625rem]"
        >
          {TITLES[step]}
        </Heading>
      </div>

      <div
        ref={bodyRef}
        key={step}
        className={`quick-fade px-5 pb-6 pt-5 sm:px-8 ${modal ? "relative min-h-0 flex-1 overflow-y-auto overscroll-contain" : ""}`}
      >
        {step === 0 ? <StepJobs error={errors.jobs} /> : null}
        {step === 1 ? <StepPlace /> : null}
        {step === 2 ? <StepTiming /> : null}
        {step === 3 ? <StepInfo errors={errors} /> : null}
      </div>

      <div className="flex items-center gap-3 border-t border-dashed border-rule px-5 py-4 sm:px-8">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className={`${btnGhost} px-4`}>
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
            <span className="max-[430px]:sr-only">Back</span>
          </button>
        ) : null}
        <p className="ml-auto whitespace-nowrap text-right text-[0.9375rem] leading-tight text-muted" aria-live="polite">
          <span className="font-semibold text-paper">{count}</span> {count === 1 ? "job" : "jobs"}
          <span className="hidden min-[380px]:inline"> on your list</span>
        </p>
        <button type="submit" className={`${btnPrimary} px-5`}>
          {step === 3 ? "Finish my list" : "Next"}
          <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
