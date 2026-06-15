import { createFileRoute, Link } from "@tanstack/react-router";
import { lecciones } from "../lib/maya-data";
import { GraduationCap, ArrowRight, BookMarked } from "lucide-react";

export const Route = createFileRoute("/aprende")({
  head: () => ({
    meta: [
      { title: "Aprende maya yucateco · ¡Ko'one'ex Kaambal!" },
      { name: "description", content: "Lecciones básicas de maya yucateco: alfabeto, saludos, pronombres, números, familia y frases útiles." },
      { property: "og:title", content: "Aprende maya yucateco" },
      { property: "og:description", content: "Lecciones interactivas de gramática y vocabulario." },
    ],
  }),
  component: AprendePage,
});

function AprendePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Aprende</p>
        <h1 className="font-display text-4xl sm:text-6xl leading-tight">
          Lecciones para <em className="text-gradient-gold">comenzar</em>.
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl text-sm sm:text-base">
          Seis lecciones cortas con ejemplos, audio y notas gramaticales. Sigue el orden o elige la que te llame.
        </p>
      </header>

      <ol className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {lecciones.map((l, i) => (
          <li key={l.slug}>
            <Link to="/aprende/$slug" params={{ slug: l.slug }} className="card-ritual rounded-2xl p-5 sm:p-6 block group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 font-display text-[5rem] leading-none text-cinnabar/10 group-hover:text-cinnabar/20 transition">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-cinnabar/15 border border-cinnabar/40 mb-4">
                <GraduationCap className="h-4 w-4 text-gold" />
              </div>
              <h2 className="font-display text-xl mb-1.5">{l.titulo}</h2>
              <p className="text-sm text-muted-foreground mb-4">{l.resumen}</p>
              <div className="inline-flex items-center gap-2 text-sm text-cinnabar font-medium">
                Abrir lección <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl border border-gold/30 bg-gold/5 p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold mb-2">
          <BookMarked className="h-3.5 w-3.5" /> Referencias
        </div>
        <p className="text-sm text-muted-foreground">
          Lecciones basadas en <em>U nu'ukbesajil u ts'íibta'al maayat'aan</em> (INALI · SEP, 2014),
          el diccionario maya de la UADY (<a href="https://www.mayas.uady.mx/diccionario/" target="_blank" rel="noopener" className="text-cinnabar hover:underline">mayas.uady.mx</a>)
          y el corpus de John P. Bolles.
        </p>
      </div>
    </div>
  );
}
