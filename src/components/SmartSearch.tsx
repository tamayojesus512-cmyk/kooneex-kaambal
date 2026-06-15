import { useState, useMemo, useRef, useEffect } from "react";
import { Search, ArrowLeftRight, Volume2 } from "lucide-react";

import { smartSearch, type DictEntry } from "../lib/maya-data";
import { playMayaAudio } from "./SpeakerButton";

type Dir = "maya-es" | "es-maya";

export function SmartSearch({
  size = "lg",
  autoFocus = false,
  onPick,
}: {
  size?: "md" | "lg";
  autoFocus?: boolean;
  onPick?: (entry: DictEntry) => void;
}) {
  const [dir, setDir] = useState<Dir>("maya-es");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => smartSearch(q, dir, 8), [q, dir]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => { setActive(0); }, [q, dir]);

  function pick(entry: DictEntry) {
    onPick?.(entry);
    playMayaAudio(entry.maya);
    setOpen(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (!hits.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, hits.length - 1)); setOpen(true); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (hits[active]) pick(hits[active].entry); }
    else if (e.key === "Escape") setOpen(false);
  }

  const big = size === "lg";

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className={`flex items-stretch gap-2 rounded-2xl border border-gold/30 bg-obsidian/60 backdrop-blur-xl shadow-[0_20px_60px_-20px_var(--cinnabar)] ${big ? "p-2" : "p-1.5"}`}>
        <div className={`flex items-center gap-3 flex-1 px-3 ${big ? "py-3" : "py-2"}`}>
          <Search className={`text-cinnabar shrink-0 ${big ? "h-5 w-5" : "h-4 w-4"}`} />
          <input
            autoFocus={autoFocus}
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
            placeholder={dir === "maya-es" ? "Buscar en maya… (ej. ja', k'iin, balam)" : "Buscar en español… (ej. agua, sol, jaguar)"}
            className={`bg-transparent outline-none flex-1 placeholder:text-muted-foreground/70 ${big ? "text-base" : "text-sm"}`}
            aria-label="Buscar palabra"
          />
        </div>
        <button
          type="button"
          onClick={() => setDir(d => (d === "maya-es" ? "es-maya" : "maya-es"))}
          className="px-3 flex items-center gap-2 rounded-xl bg-cinnabar/15 hover:bg-cinnabar/25 border border-cinnabar/40 text-cinnabar transition shrink-0"
          aria-label="Invertir dirección"
          title="Invertir dirección"
        >
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            {dir === "maya-es" ? "MAYA→ES" : "ES→MAYA"}
          </span>
          <ArrowLeftRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {open && q && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 rounded-2xl border border-gold/30 bg-obsidian/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          {hits.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Sin coincidencias para «{q}».</div>
          ) : (
            <ul className="max-h-[60vh] overflow-y-auto divide-y divide-border/40">
              {hits.map((h, idx) => (
                <li key={h.entry.maya + h.entry.es}>
                  <button
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => pick(h.entry)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition ${idx === active ? "bg-cinnabar/15" : "hover:bg-cinnabar/10"}`}
                  >
                    <span className="h-7 w-7 grid place-items-center rounded-full border border-cinnabar/40 bg-cinnabar/10 text-cinnabar shrink-0">
                      <Volume2 className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-display text-base text-gold">{h.entry.maya}</span>
                        <span className="text-[10px] uppercase text-cinnabar">{h.entry.tipo}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{h.entry.categoria}</span>
                      </div>
                      <div className="text-sm text-foreground/90 truncate">{h.entry.es}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
