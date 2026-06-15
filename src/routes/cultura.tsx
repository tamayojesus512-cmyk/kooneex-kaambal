import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ceiba from "@/assets/ceiba.jpg";
import codex from "@/assets/codex.jpg";
import { wisdom } from "../lib/maya-data";
import { GlyphDivider } from "../components/GlyphDivider";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/cultura")({
  head: () => ({
    meta: [
      { title: "Cultura y sabiduría maya · Káaxal Maaya" },
      { name: "description", content: "Sabiduría maya yucateca: frases, cosmovisión y memoria escrita. Carrusel de voces que guían el camino del Mayab." },
      { property: "og:title", content: "Cultura y sabiduría maya" },
      { property: "og:description", content: "Voces, cosmovisión y memoria del pueblo maya yucateco." },
    ],
  }),
  component: CulturaPage,
});

function WisdomMarquee() {
  const items = [...wisdom, ...wisdom];
  return (
    <div className="group relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {items.map((w, i) => (
          <figure key={i} className="card-ritual rounded-2xl p-7 relative w-[340px] sm:w-[420px] shrink-0 border border-cinnabar/40">
            <Quote className="absolute top-4 right-4 h-7 w-7 text-cinnabar/30" />
            <blockquote className="font-display text-xl md:text-2xl italic text-gold leading-snug mb-4">
              «{w.maya}»
            </blockquote>
            <p className="text-foreground/90 leading-relaxed text-sm mb-5">«{w.es}»</p>
            <figcaption className="text-[10px] uppercase tracking-[0.25em] text-cinnabar">{w.source}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

function CulturaPage() {
  return (
    <>
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={ceiba} alt="" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Cultura · Sabiduría Maya</p>
          <h1 className="font-display text-5xl md:text-6xl leading-tight">
            Voces que guían el <em className="text-gradient-gold">camino</em>.
          </h1>
          <GlyphDivider />
          <p className="text-muted-foreground mt-4">Pasa el cursor sobre las tarjetas para detener el carrusel.</p>
        </div>
      </section>

      <WisdomMarquee />

      <section className="relative py-24 mt-12">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-deep)]">
            <img src={codex} alt="Páginas de códice maya con glifos rojos y negros sobre papel amate" width={1024} height={768} loading="lazy" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/40 via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-4">— Memoria escrita</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              De los <em className="text-gradient-gold">códices</em> a tu pantalla.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              El alfabeto maya yucateco moderno se compone de 20 consonantes y 5 vocales,
              con sus juumilwoojo'ob: vocales largas (áa), glotalizadas (a') y rearticuladas (a'a).
              Estas reglas fueron consensuadas por las y los hablantes en las <em>Normas de escritura</em> publicadas por el INALI en 2014.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { n: "20", t: "Consonantes", d: "Incluyen ch', k', p', t', ts, ts'." },
                { n: "5", t: "Vocales base", d: "a, e, i, o, u con sus variantes." },
                { n: "4", t: "Tipos vocálicos", d: "Corta, larga, glotal, rearticulada." },
              ].map(b => (
                <div key={b.n} className="rounded-xl border border-border bg-card/40 p-5">
                  <div className="font-display text-3xl text-cinnabar mb-2">{b.n}</div>
                  <div className="font-medium mb-1">{b.t}</div>
                  <div className="text-xs text-muted-foreground">{b.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
