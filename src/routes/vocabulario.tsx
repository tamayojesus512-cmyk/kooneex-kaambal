import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { categorias, dictionary, type Category } from "../lib/maya-data";
import { SpeakerButton } from "../components/SpeakerButton";
import { Volume2, Search } from "lucide-react";

export const Route = createFileRoute("/vocabulario")({
  head: () => ({
    meta: [
      { title: "Vocabulario maya yucateco · Káaxal Maaya" },
      { name: "description", content: "Vocabulario maya yucateco organizado por categorías: saludos, familia, naturaleza, números, comida y más. Con pronunciación." },
      { property: "og:title", content: "Vocabulario maya yucateco" },
      { property: "og:description", content: "Palabras esenciales del maya yucateco por categoría, con audio." },
    ],
  }),
  component: VocabularioPage,
});

function VocabularioPage() {
  const [active, setActive] = useState<Category | "Todas">("Todas");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return dictionary.filter(d => {
      if (active !== "Todas" && d.categoria !== active) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return d.maya.toLowerCase().includes(s) || d.es.toLowerCase().includes(s);
    });
  }, [active, q]);

  const byCat = useMemo(() => {
    const map = new Map<Category, typeof dictionary>();
    for (const d of filtered) {
      const arr = map.get(d.categoria) ?? [];
      arr.push(d);
      map.set(d.categoria, arr);
    }
    return map;
  }, [filtered]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Vocabulario</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          Palabras del <em className="text-gradient-gold">Mayab</em>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Explora vocabulario maya yucateco por categoría. Toca el altavoz para escuchar la pronunciación.
        </p>
      </header>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl bg-background border border-border px-4 py-3 mb-6 max-w-xl">
        <Search className="h-4 w-4 text-cinnabar" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar palabra en maya o español…"
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {(["Todas", ...categorias] as const).map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              active === c
                ? "bg-cinnabar text-primary-foreground border-cinnabar shadow-[0_8px_28px_-8px_var(--cinnabar)]"
                : "border-border text-muted-foreground hover:text-foreground hover:border-cinnabar/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mb-6 inline-flex items-center gap-2">
        <Volume2 className="h-3.5 w-3.5 text-cinnabar" /> {filtered.length} palabras · toca el altavoz para escuchar
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-card/40 p-12 text-center text-muted-foreground">
          No se encontraron palabras con «{q}».
        </div>
      )}

      {[...byCat.entries()].map(([cat, items]) => (
        <section key={cat} className="mb-12">
          <h2 className="font-display text-2xl text-gold mb-4 flex items-center gap-3">
            <span className="h-px flex-1 max-w-12 bg-cinnabar/40" /> {cat}
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map(v => (
              <li key={v.maya + v.es} className="card-ritual rounded-xl p-4 flex items-start gap-3">
                <SpeakerButton word={v.maya} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-lg text-gold">{v.maya}</span>
                    <span className="text-[10px] uppercase tracking-wider text-cinnabar">{v.tipo}</span>
                  </div>
                  <p className="text-sm text-foreground/90">{v.es}</p>
                  {v.ejemplo && (
                    <div className="mt-2 pt-2 border-t border-border/40 text-xs">
                      <p className="italic text-gold/80">«{v.ejemplo}»</p>
                      <p className="text-muted-foreground">«{v.ejemploEs}»</p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
