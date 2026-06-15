import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Layers, Grid3x3, SpellCheck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/juegos/")({
  component: JuegosHome,
});

type GameTile = { to: string; icon: typeof Brain; title: string; desc: string };
const games: GameTile[] = [
  { to: "/juegos/quiz", icon: Brain, title: "Quiz de vocabulario", desc: "10 preguntas mezcladas. Opción múltiple." },
  { to: "/juegos/memorama", icon: Grid3x3, title: "Memorama", desc: "Empareja maya con su significado en español." },
  { to: "/juegos/flashcards", icon: Layers, title: "Flashcards", desc: "Voltea, escucha y marca 'sé / no sé'." },
  { to: "/juegos/sopa", icon: SpellCheck, title: "Sopa de letras", desc: "Encuentra palabras mayas escondidas en la rejilla." },
];

function readScore(k: string): string {
  if (typeof window === "undefined") return "—";
  return localStorage.getItem(`kaambal.scores.${k}`) ?? "—";
}

function JuegosHome() {
  const [scores, setScores] = useState<Record<string, string>>({});
  useEffect(() => {
    setScores({
      quiz: readScore("quiz"),
      memorama: readScore("memorama"),
      flashcards: readScore("flashcards"),
      sopa: readScore("sopa"),
    });
  }, []);
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Báaxal · Kaambal</p>
        <h1 className="font-display text-4xl sm:text-6xl leading-tight">
          Aprende <em className="text-gradient-gold">jugando</em>.
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
          Cuatro juegos con las palabras del diccionario. Tu mejor puntaje se guarda en este dispositivo.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {games.map(g => {
          const key = g.to.split("/").pop()!;
          return (
            <Link key={g.to} to={g.to as any} className="card-ritual rounded-2xl p-6 group relative overflow-hidden">
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-cinnabar/10 blur-3xl group-hover:bg-cinnabar/20 transition" />
              <div className="relative">
                <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-cinnabar/20 to-gold/10 border border-cinnabar/30 mb-5">
                  <g.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{g.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Mejor: <span className="text-gold font-semibold">{scores[key] ?? "—"}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-cinnabar font-medium">
                    Jugar <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
