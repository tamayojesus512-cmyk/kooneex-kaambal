import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { dictionary, categorias, type Category } from "../lib/maya-data";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";

export const Route = createFileRoute("/juegos/sopa")({
  head: () => ({ meta: [{ title: "Sopa de letras · Juegos · ¡Ko'one'ex Kaambal!" }] }),
  component: SopaPage,
});

const SIZE = 12;
const DIRS = [
  [1, 0], [0, 1], [1, 1], [-1, 1],
] as const;

function clean(s: string) {
  return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['' ]/g, "");
}

type Placed = { word: string; display: string; cells: [number, number][] };

function place(words: string[]) {
  const grid: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
  const placed: Placed[] = [];
  const cleaned = words.map(w => ({ display: w, clean: clean(w) }))
    .filter(w => w.clean.length >= 3 && w.clean.length <= SIZE)
    .sort((a, b) => b.clean.length - a.clean.length);

  for (const { display, clean: w } of cleaned) {
    let placedOk = false;
    for (let tries = 0; tries < 80 && !placedOk; tries++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const r0 = Math.floor(Math.random() * SIZE);
      const c0 = Math.floor(Math.random() * SIZE);
      const cells: [number, number][] = [];
      let ok = true;
      for (let i = 0; i < w.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) { ok = false; break; }
        if (grid[r][c] && grid[r][c] !== w[i]) { ok = false; break; }
        cells.push([r, c]);
      }
      if (!ok) continue;
      cells.forEach(([r, c], i) => grid[r][c] = w[i]);
      placed.push({ word: w, display, cells });
      placedOk = true;
    }
  }
  // fill empties
  const letters = "ABCDEFIJKLMNOPSTUWXY";
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
  return { grid, placed };
}

function SopaPage() {
  const [cat, setCat] = useState<Category>("Animales");
  const [seed, setSeed] = useState(0);
  const { grid, placed } = useMemo(() => {
    const words = dictionary.filter(d => d.categoria === cat).map(d => d.maya).slice(0, 10);
    void seed;
    return place(words);
  }, [cat, seed]);

  const [selecting, setSelecting] = useState(false);
  const [path, setPath] = useState<[number, number][]>([]);
  const [found, setFound] = useState<string[]>([]);
  const allFound = found.length === placed.length && placed.length > 0;

  useEffect(() => { setFound([]); setPath([]); }, [cat, seed]);

  useEffect(() => {
    if (allFound) {
      const prev = Number(localStorage.getItem("kaambal.scores.sopa") || 0);
      if (placed.length > prev) localStorage.setItem("kaambal.scores.sopa", String(placed.length));
    }
  }, [allFound, placed.length]);

  function cellKey(r: number, c: number) { return `${r},${c}`; }
  function inPath(r: number, c: number) { return path.some(([pr, pc]) => pr === r && pc === c); }
  function inFound(r: number, c: number) {
    return placed.some(p => found.includes(p.word) && p.cells.some(([pr, pc]) => pr === r && pc === c));
  }
  function start(r: number, c: number) { setSelecting(true); setPath([[r, c]]); }
  function over(r: number, c: number) {
    if (!selecting) return;
    if (inPath(r, c)) return;
    setPath(p => [...p, [r, c]]);
  }
  function end() {
    if (!selecting) { return; }
    setSelecting(false);
    const word = path.map(([r, c]) => grid[r][c]).join("");
    const reversed = word.split("").reverse().join("");
    const hit = placed.find(p => (p.word === word || p.word === reversed) && !found.includes(p.word));
    if (hit) setFound(f => [...f, hit.word]);
    setPath([]);
  }
  function restart() { setSeed(s => s + 1); }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/juegos" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-3 w-3" /> volver a juegos</Link>
      <header className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Sopa de letras</p>
        <h1 className="font-display text-3xl sm:text-5xl">Encuentra las palabras <em className="text-gradient-gold">mayas</em>.</h1>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
        {categorias.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${cat === c ? "bg-cinnabar text-primary-foreground border-cinnabar" : "border-border text-muted-foreground hover:border-cinnabar/50"}`}
          >{c}</button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-3">
        <span>Encontradas: <span className="text-gold font-semibold">{found.length}</span> / {placed.length}</span>
        <button onClick={restart} className="inline-flex items-center gap-2 text-cinnabar hover:text-gold"><RotateCcw className="h-3 w-3" /> nueva sopa</button>
      </div>

      <div
        onMouseLeave={end}
        onMouseUp={end}
        onTouchEnd={end}
        className="grid gap-0.5 sm:gap-1 select-none mb-6 mx-auto"
        style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0,1fr))` }}
      >
        {grid.map((row, r) => row.map((ch, c) => {
          const sel = inPath(r, c); const fnd = inFound(r, c);
          return (
            <button
              key={cellKey(r, c)}
              onMouseDown={() => start(r, c)}
              onMouseEnter={() => over(r, c)}
              onTouchStart={() => start(r, c)}
              className={`aspect-square text-[11px] sm:text-sm font-mono font-bold rounded-sm transition ${
                fnd ? "bg-jade/30 text-jade border border-jade/60" :
                sel ? "bg-cinnabar text-primary-foreground" :
                "bg-obsidian/70 border border-border text-foreground/80 hover:bg-cinnabar/15"
              }`}
            >{ch}</button>
          );
        }))}
      </div>

      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Palabras ocultas</div>
        <div className="flex flex-wrap gap-1.5">
          {placed.map(p => (
            <span key={p.word} className={`px-2.5 py-1 rounded-full text-xs border transition ${
              found.includes(p.word) ? "bg-jade/15 border-jade/50 text-jade line-through" : "border-border text-foreground"
            }`}>{p.display}</span>
          ))}
        </div>
      </div>

      {allFound && (
        <div className="mt-6 card-ritual rounded-2xl p-6 text-center">
          <Trophy className="h-10 w-10 text-gold mx-auto mb-3" />
          <p className="font-display text-2xl">¡Encontraste todas!</p>
          <button onClick={restart} className="mt-4 inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-5 py-2.5 text-sm font-medium">
            <RotateCcw className="h-4 w-4" /> Nueva sopa
          </button>
        </div>
      )}
    </div>
  );
}
