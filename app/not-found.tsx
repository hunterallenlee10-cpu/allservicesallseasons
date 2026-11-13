import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { business } from "@/lib/business";
import { CallButton, QuoteButton, btnGhost } from "@/components/ui/buttons";
import { TickBox } from "@/components/ui/Ticket";

export const metadata: Metadata = {
  title: `Page not found | ${business.name}`,
  description: `That page does not exist. Call or text ${business.shortName} at ${business.phoneDisplay}.`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="border-b border-rule">
      <div className="shell py-20 lg:py-32">
        <p className="label-caps flex items-center gap-3 text-muted">
          <TickBox checked={false} />
          Error 404
        </p>
        <h1 id="not-found-title" className="display mt-5 max-w-[16ch] text-[clamp(2rem,8.4vw,4rem)]">
          That page is not <span className="text-lime">on the list.</span>
        </h1>
        <p className="mt-5 max-w-[34rem] text-lg text-muted">
          The link is broken or the page has moved. Everything {business.shortName} does is one tap away.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className={btnGhost}>
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
            Back to the home page
          </Link>
          <QuoteButton />
          <CallButton />
        </div>
      </div>
    </section>
  );
}
