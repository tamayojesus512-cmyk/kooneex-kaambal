import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { dictionary, smartSearch, mayaAlphabet, mayaInitial, categorias, type Category, type DictEntry } from "../lib/maya-data";
import { SpeakerButton } from "../components/SpeakerButton";
import { ShareButton } from "../components/ShareButton";
import { SmartSearch } from "../components/SmartSearch";
import { Languages, Filter } from "lucide-react";

export const Route = createFileRoute("/diccionario")({
  head: () => ({
    meta: [
      { title: "Diccionario maya-español · ¡Ko'one'ex Kaambal!" },
      { name: "description", content: "Diccionario bidireccional maya yucateco ↔ español con búsqueda fuzzy, filtros por categoría, navegación alfabética maya, ejemplos y pronunciación." },
      { property: "og:title", content: "Diccionario maya yucateco" },
      { property: "og:description", content: "Búsqueda bidireccional con fuzzy y filtros." },
    ],
  }),
  component: DiccionarioPage,
});

const tipos = ["sust.", "vb.", "adj.", "adv.", "pron.", "interj.", "num."] as const;

function DiccionarioPage() {
  const [q, setQ] = useState("");
  const [dir, setDir] = useState<"maya-es" | "es-maya">("maya-es");
  const [cat, setCat] = useState<Category | "Todas">("Todas");
  const [tipo, setTipo] = useState<string>("Todos");
  const [letter, setLetter] = useState<string>("Todas");
  const [picked, setPicked] = useState<DictEntry | null>(null);

  const results = useMemo(() => {
    let base: DictEntry[] = q ? smartSearch(q, dir, 500).map(h => h.entry) : [...dictionary].sort((a, b) => a.maya.localeCompare(b.maya));
    if (cat !== "Todas") base = base.filter(e => e.categoria === cat);
    if (tipo !== "Todos") base = base.filter(e => e.tipo === tipo);
    if (letter !== "Todas") base = base.filter(e => mayaInitial(e.maya) === letter);
    return base;
  }, [q, dir, cat, tipo, letter]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Diccionario</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight">
          Cada palabra, una <em className="text-gradient-gold">semilla</em>.
        </h1>
        <p className="mt-3 sm:mt-4 text-muted-foreground max-w-2xl text-sm sm:text-base">
          Búsqueda fuzzy bidireccional. Ignora acentos y glotales. Basado en UADY · INALI 2014.
        </p>
      </header>

      <div className="mb-4">
        <SmartSearch size="lg" autoFocus onPick={(e) => setPicked(e)} />
      </div>

      {/* Filtros */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-4 mb-4 space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3.5 w-3.5 text-cinnabar" /> Filtros
        </div>
        {/* Direction + manual search */}
        <div className="flex flex-wrap gap-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={dir === "maya-es" ? "filtrar lista en maya…" : "filtrar lista en español…"}
            className="flex-1 min-w-[180px] rounded-lg bg-background border border-border px-3 py-2 text-sm outline-none focus:border-cinnabar"
          />
          <button
            onClick={() => setDir(d => d === "maya-es" ? "es-maya" : "maya-es")}
            className="px-3 py-2 rounded-lg bg-cinnabar/10 border border-cinnabar/40 text-cinnabar text-xs font-semibold"
          >
            {dir === "maya-es" ? "MAYA→ES" : "ES→MAYA"}
          </button>
        </div>
        {/* Categoría */}
        <div className="flex flex-wrap gap-1.5">
          {(["Todas", ...categorias] as const).map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-full text-xs border transition ${
                cat === c ? "bg-cinnabar text-primary-foreground border-cinnabar" : "border-border text-muted-foreground hover:border-cinnabar/50"
              }`}
            >{c}</button>
          ))}
        </div>
        {/* Tipo */}
        <div className="flex flex-wrap gap-1.5">
          {(["Todos", ...tipos] as const).map(t => (
            <button
              key={t}
              onClick={() => setTipo(t)}
              className={`px-2.5 py-1 rounded-full text-[11px] border transition ${
                tipo === t ? "bg-gold/20 text-gold border-gold/50" : "border-border text-muted-foreground hover:border-gold/40"
              }`}
            >{t}</button>
          ))}
        </div>
        {/* Alfabeto maya */}
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setLetter("Todas")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition ${
              letter === "Todas" ? "bg-jade/20 text-jade border-jade/50" : "border-border text-muted-foreground hover:border-jade/40"
            }`}
          >abc</button>
          {mayaAlphabet.map(l => (
            <button
              key={l}
              onClick={() => setLetter(l)}
              className={`min-w-[28px] px-2 py-1 rounded-md text-[11px] font-mono border transition ${
                letter === l ? "bg-jade/20 text-jade border-jade/50" : "border-border text-muted-foreground hover:border-jade/40"
              }`}
            >{l}</button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
        <Languages className="h-3.5 w-3.5" /> {results.length} entradas
      </p>

      {picked && (
        <div className="mb-4 rounded-2xl border border-gold/40 bg-gold/5 p-4 sm:p-5">
          <div className="flex items-baseline gap-3 flex-wrap mb-2">
            <span className="font-display text-2xl text-gold">{picked.maya}</span>
            <span className="text-[10px] uppercase text-cinnabar">{picked.tipo}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{picked.categoria}</span>
            <button onClick={() => setPicked(null)} className="ml-auto text-xs text-muted-foreground hover:text-foreground">cerrar ×</button>
          </div>
          <p className="text-sm">{picked.es}</p>
          {picked.ejemplo && <p className="mt-2 text-xs italic text-muted-foreground">«{picked.ejemplo}» — «{picked.ejemploEs}»</p>}
          <div className="mt-3 flex gap-2">
            <SpeakerButton word={picked.maya} />
            <ShareButton maya={picked.maya} es={picked.es} />
          </div>
        </div>
      )}

      <ul className="divide-y divide-border/50 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-card/40">
        {results.map(e => (
          <li key={e.maya + e.es} className="p-3 sm:p-4 flex items-start gap-3">
            <SpeakerButton word={e.maya} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display text-lg sm:text-xl text-gold">{e.maya}</span>
                <span className="text-[10px] uppercase tracking-wider text-cinnabar">{e.tipo}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.categoria}</span>
              </div>
              <p className="text-sm text-foreground/90 mt-0.5">{e.es}</p>
              {e.ejemplo && (
                <div className="mt-1.5 text-xs text-muted-foreground italic">
                  «{e.ejemplo}» — «{e.ejemploEs}»
                </div>
              )}
            </div>
            <ShareButton maya={e.maya} es={e.es} />
          </li>
        ))}
        {results.length === 0 && (
          <li className="py-12 text-center text-muted-foreground text-sm">
            No hay coincidencias. Prueba otra letra, categoría o término.
          </li>
        )}
      </ul>
    </div>
  );
}
