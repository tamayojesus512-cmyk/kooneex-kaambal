import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { dictionary, categorias, type Category } from "../lib/maya-data";
import { SpeakerButton, playMayaAudio } from "../components/SpeakerButton";
import { Headphones, Play } from "lucide-react";

export const Route = createFileRoute("/escucha")({
  head: () => ({
    meta: [
      { title: "Escucha · ¡Ko'one'ex Kaambal!" },
      { name: "description", content: "Entrena tu oído con audios de palabras y frases en maya yucateco, organizadas por categoría." },
      { property: "og:title", content: "Escucha maya yucateco" },
      { property: "og:description", content: "Audios de pronunciación organizados por categoría." },
    ],
  }),
  component: EscuchaPage,
});

function EscuchaPage() {
  const [cat, setCat] = useState<Category>("Saludos");
  const items = useMemo(() => dictionary.filter(d => d.categoria === cat), [cat]);

  function playAll() {
    let i = 0;
    const tick = () => {
      if (i >= items.length) return;
      playMayaAudio(items[i].maya);
      i++;
      setTimeout(tick, 2200);
    };
    tick();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Escucha</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight">
          Entrena el <em className="text-gradient-gold">oído</em>.
        </h1>
        <p className="mt-3 text-muted-foreground text-sm sm:text-base">
          Toca el altavoz para cada palabra o reproduce toda la categoría en orden.
        </p>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {categorias.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${cat === c ? "bg-cinnabar text-primary-foreground border-cinnabar" : "border-border text-muted-foreground hover:border-cinnabar/50"}`}
          >{c}</button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground inline-flex items-center gap-2">
          <Headphones className="h-3.5 w-3.5 text-cinnabar" /> {items.length} audios en {cat}
        </span>
        <button onClick={playAll} className="inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
          <Play className="h-3.5 w-3.5" /> Reproducir todo
        </button>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map(e => (
          <li key={e.maya + e.es} className="card-ritual rounded-xl p-4 flex items-center gap-3">
            <SpeakerButton word={e.maya} />
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg text-gold truncate">{e.maya}</div>
              <div className="text-sm text-muted-foreground truncate">{e.es}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
