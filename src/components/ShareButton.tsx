import { Share2, Check } from "lucide-react";
import { useState } from "react";

export function ShareButton({ maya, es }: { maya: string; es: string }) {
  const [done, setDone] = useState(false);
  async function share() {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/diccionario?w=${encodeURIComponent(maya)}`;
    const text = `${maya} — ${es} · Káaxal Maaya`;
    try {
      if (navigator.share) {
        await navigator.share({ title: maya, text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }
    } catch {/* user cancelled */}
  }
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); share(); }}
      title="Compartir"
      aria-label={`Compartir ${maya}`}
      className="inline-grid place-items-center h-7 w-7 rounded-full border border-gold/40 bg-gold/10 text-gold hover:bg-gold hover:text-obsidian transition shrink-0"
    >
      {done ? <Check className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
    </button>
  );
}
