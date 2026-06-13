import type { ReactNode } from "react"

export type LegalBlock =
  | { type: "p"; text: ReactNode }
  | { type: "list"; items: ReactNode[] }

export interface LegalSection {
  heading: string
  blocks: LegalBlock[]
}

interface LegalDocumentProps {
  title: string
  lastUpdated: string
  intro: ReactNode
  sections: LegalSection[]
}

/**
 * Shared presentation for long-form legal pages (Terms, Privacy).
 * Server component — static, readable, no client JS.
 */
export function LegalDocument({ title, lastUpdated, intro, sections }: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/70 pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full bg-primary/10 blur-[130px]" />
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </header>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={section.heading} className="scroll-mt-28">
              <h2 className="flex items-baseline gap-3 text-2xl font-bold tracking-tight">
                <span className="text-base font-semibold text-primary">{i + 1}.</span>
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, j) =>
                  block.type === "p" ? (
                    <p key={j} className="leading-7 text-muted-foreground">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={j} className="space-y-2 pl-1">
                      {block.items.map((it, k) => (
                        <li key={k} className="flex gap-3 leading-7 text-muted-foreground">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  )
}
