import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { dictionary } from "../lib/maya-data";
import { SpeakerButton } from "../components/SpeakerButton";
import { RotateCcw, ArrowLeft, Trophy } from "lucide-react";

export const Route = createFileRoute("/juegos/memorama")({
  head: () => ({ meta: [{ title: "Memorama · Juegos · ¡Ko'one'ex Kaambal!" }] }),
  component: MemoramaPage,
});

type Card = { id: number; pairId: number; text: string; side: "maya" | "es" };

function build(seed: number): Card[] {
  void seed;
  const pool = [...dictionary].sort(() => Math.random() - 0.5).slice(0, 8);
  const cards: Card[] = [];
  pool.forEach((e, i) => {
    cards.push({ id: i * 2, pairId: i, text: e.maya, side: "maya" });
    cards.push({ id: i * 2 + 1, pairId: i, text: e.es, side: "es" });
  });
  return cards.sort(() => Math.random() - 0.5);
}

function MemoramaPage() {
  const [seed, setSeed] = useState(0);
  const cards = useMemo(() => build(seed), [seed]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const done = matched.length === cards.length && cards.length > 0;

  useEffect(() => {
    if (done) {
      const prev = Number(localStorage.getItem("kaambal.scores.memorama") || 9999);
      if (moves < prev) localStorage.setItem("kaambal.scores.memorama", String(moves));
    }
  }, [done, moves]);

  function flip(id: number) {
    if (flipped.includes(id) || matched.includes(id)) return;
    if (flipped.length === 2) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next.map(i => cards.find(c => c.id === i)!);
      if (a.pairId === b.pairId && a.side !== b.side) {
        setTimeout(() => { setMatched(m => [...m, a.id, b.id]); setFlipped([]); }, 500);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }
  function restart() { setSeed(s => s + 1); setFlipped([]); setMatched([]); setMoves(0); }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/juegos" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-3 w-3" /> volver a juegos</Link>
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Memorama</p>
        <h1 className="font-display text-3xl sm:text-5xl">Empareja maya con su <em className="text-gradient-gold">significado</em>.</h1>
      </header>

      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-4">
        <span>Movimientos: <span className="text-gold font-semibold">{moves}</span></span>
        <button onClick={restart} className="inline-flex items-center gap-2 text-cinnabar hover:text-gold"><RotateCcw className="h-3 w-3" /> reiniciar</button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map(c => {
          const isUp = flipped.includes(c.id) || matched.includes(c.id);
          return (
            <motion.button
              key={c.id}
              onClick={() => flip(c.id)}
              whileTap={{ scale: 0.96 }}
              className={`aspect-[3/4] rounded-xl border text-xs sm:text-sm font-medium grid place-items-center p-2 text-center transition ${
                matched.includes(c.id)
                  ? "bg-jade/15 border-jade/60 text-jade"
                  : isUp
                    ? c.side === "maya" ? "bg-gradient-to-br from-cinnabar/30 to-gold/10 border-cinnabar/60 text-gold font-display"
                      : "bg-background border-border text-foreground"
                    : "bg-obsidian/80 border-border hover:border-cinnabar/60"
              }`}
            >
              {isUp ? (
                <span className="leading-tight">{c.text}</span>
              ) : (
                <span className="text-gold/40 font-display text-2xl">K</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 card-ritual rounded-2xl p-6 text-center">
          <Trophy className="h-12 w-12 text-gold mx-auto mb-3" />
          <p className="font-display text-2xl">¡Completado en {moves} movimientos!</p>
          <p className="text-sm text-muted-foreground mt-1">Tu mejor: {localStorage.getItem("kaambal.scores.memorama") ?? moves}</p>
          <button onClick={restart} className="mt-5 inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-5 py-2.5 text-sm font-medium">
            <RotateCcw className="h-4 w-4" /> Otra ronda
          </button>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {Array.from(new Set(cards.map(c => c.pairId))).map(pid => {
              const m = cards.find(c => c.pairId === pid && c.side === "maya")!;
              return (
                <span key={pid} className="inline-flex items-center gap-1.5 rounded-full bg-background border border-border px-2.5 py-1 text-xs">
                  <SpeakerButton word={m.text} size="sm" />
                  <span className="font-display text-gold">{m.text}</span>
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
