import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDailyWord, normalize } from "../lib/maya-data";
import { SpeakerButton } from "../components/SpeakerButton";
import { Heart, RotateCcw, Send, Sparkles, Trophy, X as XIcon } from "lucide-react";
import { GlyphDivider } from "../components/GlyphDivider";

export const Route = createFileRoute("/palabra-del-dia")({
  head: () => ({
    meta: [
      { title: "Palabra del día — Adivina y aprende maya · Káaxal Maaya" },
      { name: "description", content: "Juego diario: lee la pista en español, adivina la palabra en 3 intentos y descubre su raíz en maya yucateco." },
      { property: "og:title", content: "Palabra del día — Káaxal Maaya" },
      { property: "og:description", content: "Adivina la palabra. 3 intentos. Descubre el maya detrás." },
    ],
  }),
  component: PalabraDelDiaPage,
});

const MAX_ATTEMPTS = 3;

function PalabraDelDiaPage() {
  const word = useMemo(() => getDailyWord(), []);
  const [guess, setGuess] = useState("");
  const [tries, setTries] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  function check(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "playing" || !guess.trim()) return;
    const norm = normalize(guess);
    const valid = word.respuestas.some(r => normalize(r) === norm);
    const nextTries = [...tries, guess.trim()];
    setTries(nextTries);
    setGuess("");
    if (valid) setStatus("won");
    else if (nextTries.length >= MAX_ATTEMPTS) setStatus("lost");
  }

  function reset() {
    setGuess("");
    setTries([]);
    setStatus("playing");
  }

  const remaining = MAX_ATTEMPTS - tries.length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Palabra del día</p>
        <h1 className="font-display text-5xl md:text-6xl leading-tight">
          Adivina la <em className="text-gradient-gold">palabra</em>.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Lee la pista. Tienes <span className="text-foreground font-semibold">3 intentos</span> para adivinar.
          Al acertar o al fallar todos, te mostraremos la palabra en maya y su significado.
        </p>
      </header>

      <div className="card-ritual rounded-3xl p-8 sm:p-10">
        {/* Pista */}
        <div className="flex items-start gap-3 mb-8">
          <Sparkles className="h-5 w-5 text-gold mt-1 shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-cinnabar mb-2">Pista</div>
            <p className="font-display text-2xl md:text-3xl leading-snug text-foreground">{word.pista}</p>
          </div>
        </div>

        {/* Vidas */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
              <Heart
                key={i}
                className={`h-5 w-5 transition ${i < remaining ? "text-cinnabar fill-cinnabar/40" : "text-border"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {status === "playing" ? `${remaining} intento${remaining === 1 ? "" : "s"} restante${remaining === 1 ? "" : "s"}` : "Juego terminado"}
            </span>
          </div>
          {status === "playing" && tries.length > 0 && (
            <button onClick={reset} className="text-xs text-muted-foreground hover:text-cinnabar inline-flex items-center gap-1">
              <RotateCcw className="h-3 w-3" /> Reiniciar
            </button>
          )}
        </div>

        {/* Intentos previos */}
        {tries.length > 0 && (
          <ul className="mb-6 space-y-2">
            {tries.map((t, i) => {
              const ok = word.respuestas.some(r => normalize(r) === normalize(t));
              return (
                <li
                  key={i}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm ${
                    ok ? "border-jade bg-jade/10" : "border-cinnabar/40 bg-cinnabar/5"
                  }`}
                >
                  <span className="font-mono">{t}</span>
                  {ok
                    ? <span className="text-xs text-jade uppercase tracking-wider font-semibold">¡Acertaste!</span>
                    : <XIcon className="h-4 w-4 text-cinnabar" />}
                </li>
              );
            })}
          </ul>
        )}

        {/* Input o resultado */}
        <AnimatePresence mode="wait">
          {status === "playing" ? (
            <motion.form
              key="form"
              onSubmit={check}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <input
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="Escribe tu respuesta en español…"
                className="flex-1 rounded-xl bg-background border border-border px-4 py-3 outline-none focus:border-cinnabar transition"
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!guess.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-cinnabar text-primary-foreground px-5 py-3 font-medium hover:opacity-90 transition disabled:opacity-40"
              >
                <Send className="h-4 w-4" /> Probar
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-cinnabar/40 bg-gradient-to-br from-cinnabar/10 via-transparent to-gold/10 p-8 text-center"
            >
              {status === "won" ? (
                <>
                  <Trophy className="h-14 w-14 text-gold mx-auto mb-4" />
                  <p className="text-jade font-medium uppercase tracking-wider text-sm mb-2">¡Acertaste!</p>
                </>
              ) : (
                <>
                  <XIcon className="h-14 w-14 text-cinnabar mx-auto mb-4" />
                  <p className="text-cinnabar font-medium uppercase tracking-wider text-sm mb-2">Sin intentos</p>
                  <p className="text-muted-foreground text-sm mb-6">La respuesta era: <span className="text-foreground font-semibold">{word.respuestaPrincipal}</span></p>
                </>
              )}

              <GlyphDivider />

              <div className="my-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-cinnabar mb-2">En maya yucateco</div>
                <div className="flex items-center justify-center gap-3">
                  <SpeakerButton word={word.maya} />
                  <span className="font-display text-5xl text-gold">{word.maya}</span>
                </div>
              </div>

              <p className="text-foreground/90 leading-relaxed max-w-lg mx-auto mb-4">{word.significado}</p>
              <p className="text-xs italic text-muted-foreground max-w-lg mx-auto mb-6">{word.curiosidad}</p>

              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition"
              >
                <RotateCcw className="h-4 w-4" /> Jugar otra vez
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        La palabra cambia cada día. Vuelve mañana para una nueva.
      </p>
    </div>
  );
}
