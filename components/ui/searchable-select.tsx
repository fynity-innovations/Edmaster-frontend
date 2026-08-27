"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type SearchableOption = { value: string; label: string }

type Props = {
  options: SearchableOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  icon?: React.ReactNode
  id?: string
  error?: boolean
  clearable?: boolean
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  icon,
  id,
  error,
  clearable = true,
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    // Prefer matches that start with the query, then any substring match.
    const starts: SearchableOption[] = []
    const contains: SearchableOption[] = []
    for (const o of options) {
      const label = o.label.toLowerCase()
      if (label.startsWith(q)) starts.push(o)
      else if (label.includes(q)) contains.push(o)
    }
    return [...starts, ...contains]
  }, [options, query])

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery("")
      setHighlight(Math.max(0, filtered.findIndex((o) => o.value === value)))
      // Focus the search box once the panel is painted.
      requestAnimationFrame(() => searchRef.current?.focus())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return
    listRef.current?.children[highlight]?.scrollIntoView({ block: "nearest" })
  }, [highlight, open])

  const commit = (option: SearchableOption) => {
    onChange(option.value)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filtered[highlight]) commit(filtered[highlight])
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "w-full flex items-center gap-2 py-3 pr-10 rounded-xl border bg-background text-left text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          icon ? "pl-10" : "pl-4",
          error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary",
        )}
      >
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </span>
        )}
        <span className={cn("truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear selection"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
              className="p-0.5 rounded hover:bg-secondary text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </span>
          )}
          <ChevronDown
            className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-card shadow-xl overflow-hidden">
          <div className="relative border-b border-border">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlight(0)
              }}
              onKeyDown={onKeyDown}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 bg-transparent text-sm text-foreground focus:outline-none"
            />
          </div>

          <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted-foreground">No matches found</li>
            )}
            {filtered.map((option, i) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => commit(option)}
                className={cn(
                  "px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between gap-2",
                  i === highlight ? "bg-secondary text-foreground" : "text-foreground",
                )}
              >
                <span className="truncate">{option.label}</span>
                {option.value === value && <Check className="w-4 h-4 text-primary shrink-0" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
