import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/lib/mock-data';

/** Concise 4-question FAQ — answers the objections a student has before joining. */
export default function FaqSection() {
  return (
    <section className="bg-bg-elevated px-6 py-12">
      <div className="mx-auto max-w-[560px]">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">FAQ</p>
        <h2 className="mb-6 text-[24px] font-bold text-foreground">Questions, answered</h2>

        <Accordion.Root type="single" collapsible defaultValue={faqItems[0].question}>
          <div className="space-y-2">
            {faqItems.map((item) => (
              <Accordion.Item
                key={item.question}
                value={item.question}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex min-h-14 w-full items-center justify-between gap-3 px-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-white/[0.03]">
                    {item.question}
                    <ChevronDown className="h-4 w-4 shrink-0 text-subtle transition-transform duration-200 data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted">{item.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </div>
        </Accordion.Root>
      </div>
    </section>
  );
}
