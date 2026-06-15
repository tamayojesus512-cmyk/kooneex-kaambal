import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { relatos } from "../lib/maya-data";
import { GlyphDivider } from "../components/GlyphDivider";
import { ArrowRight, X } from "lucide-react";
import xtabayImg from "@/assets/xtabay.jpg";
import aluxesImg from "@/assets/aluxes.jpg";
import hanalPixanImg from "@/assets/hanal-pixan.jpg";

export const Route = createFileRoute("/relatos")({
  head: () => ({
    meta: [
      { title: "Relatos y tradiciones de Yucatán · Káaxal Maaya" },
      { name: "description", content: "La Xtabay, los Aluxes y el Hanal Pixán: tres leyendas vivas del Mayab contadas con respeto a la tradición oral." },
      { property: "og:title", content: "Relatos y tradiciones de Yucatán" },
      { property: "og:description", content: "Leyendas mayas: la mujer del ceibo, los guardianes del monte y la comida de las ánimas." },
    ],
  }),
  component: RelatosPage,
});

const imgMap: Record<string, string> = {
  xtabay: xtabayImg,
  aluxes: aluxesImg,
  "hanal-pixan": hanalPixanImg,
};

function RelatosPage() {
  const [open, setOpen] = useState<typeof relatos[number] | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Relatos y Tradiciones</p>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-3xl">
          Lo que el monte <em className="text-gradient-gold">aún cuenta</em>.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Tres historias vivas del Mayab: la mujer del ceibo, los guardianes pequeños y la cena con los muertos.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {relatos.map(r => (
          <article key={r.id} className="card-ritual rounded-2xl overflow-hidden group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={imgMap[r.id]} alt={r.titulo} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cinnabar mb-1">{r.subtitulo}</p>
                <h2 className="font-display text-3xl text-gold">{r.titulo}</h2>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.resumen}</p>
              <button
                onClick={() => setOpen(r)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-5 py-2.5 font-medium text-sm hover:opacity-90 transition self-start"
              >
                Leer leyenda <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-obsidian/85 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-cinnabar/40 bg-background shadow-[var(--shadow-deep)]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center rounded-full bg-background/80 border border-border hover:bg-cinnabar hover:text-primary-foreground transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img src={imgMap[open.id]} alt={open.titulo} width={1024} height={768} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-2">{open.subtitulo}</p>
                <h2 className="font-display text-4xl md:text-5xl">{open.titulo}</h2>
              </div>
            </div>
            <div className="p-8 space-y-5">
              {open.relato.map((p, i) => (
                <p key={i} className="text-foreground/90 leading-relaxed first-letter:font-display first-letter:text-4xl first-letter:text-gold first-letter:mr-1 first-letter:float-left">
                  {p}
                </p>
              ))}
              <GlyphDivider />
              <p className="text-xs text-center text-muted-foreground italic">
                Tradición oral del Mayab · transmitida por las y los abuelos de Yucatán, Campeche y Quintana Roo.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
