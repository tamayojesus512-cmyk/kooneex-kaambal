import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../lib/maya-data";
import { Check, X, RotateCcw, Trophy, ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/juegos/quiz")({
  head: () => ({ meta: [{ title: "Quiz · Juegos · ¡Ko'one'ex Kaambal!" }] }),
  component: QuizPage,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizPage() {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => shuffle(quizQuestions).slice(0, 10), [seed]);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const isCorrect = selected !== null && selected === q.correcta;

  useEffect(() => {
    if (done) {
      const prev = Number(localStorage.getItem("kaambal.scores.quiz") || 0);
      if (score > prev) localStorage.setItem("kaambal.scores.quiz", String(score));
    }
  }, [done, score]);

  function choose(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correcta) setScore(s => s + 1);
  }
  function next() {
    if (i + 1 >= questions.length) setDone(true);
    else { setI(i + 1); setSelected(null); }
  }
  function restart() { setSeed(s => s + 1); setI(0); setSelected(null); setScore(0); setDone(false); }

  const pct = Math.round((score / questions.length) * 100);
  const veredict = pct >= 80 ? "¡Excelente! Eres un xook ma'alob (buen estudiante)."
    : pct >= 50 ? "Vas por buen camino. Sigue caminando el k'iin."
    : "Apenas comienzas el sendero — vuelve al vocabulario y prueba otra vez.";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/juegos" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-3 w-3" /> volver a juegos</Link>
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Quiz</p>
        <h1 className="font-display text-3xl sm:text-5xl leading-tight">
          Pon a prueba tu <em className="text-gradient-gold">memoria</em>.
        </h1>
      </header>

      {!done ? (
        <>
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-3">
            <span>Pregunta {i + 1} de {questions.length}</span>
            <span>Aciertos: <span className="text-gold font-semibold">{score}</span></span>
          </div>
          <div className="h-1.5 rounded-full bg-border/40 overflow-hidden mb-6 sm:mb-8">
            <div className="h-full bg-gradient-to-r from-cinnabar to-gold transition-all" style={{ width: `${((i + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="card-ritual rounded-2xl p-6 sm:p-8">
              <h2 className="font-display text-xl sm:text-2xl text-gold mb-5">{q.pregunta}</h2>
              <div className="grid gap-3">
                {q.opciones.map((op, idx) => {
                  const state = selected === null ? "idle" : idx === q.correcta ? "correct" : idx === selected ? "wrong" : "muted";
                  return (
                    <button key={idx} onClick={() => choose(idx)} disabled={selected !== null}
                      className={`text-left rounded-xl border px-4 sm:px-5 py-3.5 transition flex items-center justify-between gap-3 ${
                        state === "idle" ? "border-border hover:border-cinnabar bg-background/60" :
                        state === "correct" ? "border-jade bg-jade/15" :
                        state === "wrong" ? "border-cinnabar bg-cinnabar/15" :
                        "border-border bg-background/30 opacity-50"
                      }`}>
                      <span className="text-sm sm:text-base">{op}</span>
                      {state === "correct" && <Check className="h-5 w-5 text-jade" />}
                      {state === "wrong" && <X className="h-5 w-5 text-cinnabar" />}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-border bg-background/60 p-4 sm:p-5">
                  <p className={`text-sm font-medium mb-1 ${isCorrect ? "text-jade" : "text-cinnabar"}`}>{isCorrect ? "¡Correcto!" : "Casi…"}</p>
                  <p className="text-sm text-muted-foreground">{q.explicacion}</p>
                  <button onClick={next} className="mt-4 inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-5 py-2.5 font-medium text-sm hover:opacity-90 transition">
                    {i + 1 >= questions.length ? "Ver resultado" : "Siguiente"} <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-ritual rounded-3xl p-8 sm:p-10 text-center">
          <Trophy className="h-14 w-14 text-gold mx-auto mb-5" />
          <h2 className="font-display text-3xl sm:text-4xl mb-2">{score} / {questions.length}</h2>
          <p className="text-gold font-display text-xl sm:text-2xl mb-4">{pct}%</p>
          <p className="text-muted-foreground max-w-md mx-auto mb-7 text-sm">{veredict}</p>
          <button onClick={restart} className="inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition">
            <RotateCcw className="h-4 w-4" /> Volver a intentar
          </button>
        </motion.div>
      )}
    </div>
  );
}
