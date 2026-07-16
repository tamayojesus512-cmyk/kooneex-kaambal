import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Target,
} from "lucide-react";
import { SpeakerButton } from "../components/SpeakerButton";

export const Route = createFileRoute("/aprende/$slug")({
  component: LessonPage,
});

type LessonItem = {
  maya: string;
  spanish: string;
  note?: string;
  audio?: boolean;
};

type Lesson = {
  number: number;
  title: string;
  category: string;
  objective: string;
  introduction: string;
  instruction?: string;
  items: LessonItem[];
  explanation?: string;
  practice: string[];
};

const LESSONS: Record<string, Lesson> = {
  /*
   * =====================================================
   * LECCIÓN 1
   * =====================================================
   */
  saludos: {
    number: 1,
    title: "Saludos y presentaciones",
    category: "Vocabulario y conversación",
    objective:
      "Reconocer y utilizar saludos básicos en una conversación cotidiana.",
    introduction:
      "Los saludos permiten iniciar una conversación y mostrar respeto hacia otras personas. Escucha cada expresión y repítela en voz alta.",
    items: [
      {
        maya: "Ba'ax ka wa'alik",
        spanish: "¿Qué dices? / ¿Cómo estás?",
      },
      {
        maya: "Bix a beel",
        spanish: "¿Cómo estás?",
        note: "Literalmente se relaciona con preguntar cómo va tu camino.",
      },
      {
        maya: "Ma'alob",
        spanish: "Bien / está bien",
      },
      {
        maya: "Asab ma'alob",
        spanish: "Muy bien",
      },
      {
        maya: "Yuum bo'otik",
        spanish: "Gracias",
      },
      {
        maya: "Mix ba'al",
        spanish: "De nada / no hay de qué",
      },
      {
        maya: "Ma'alob k'iin",
        spanish: "Buenos días",
      },
      {
        maya: "Ma'alob áak'ab",
        spanish: "Buenas noches",
      },
      {
        maya: "In lak'ech",
        spanish: "Tú eres mi otro yo",
      },
      {
        maya: "A lak'en",
        spanish: "Yo soy tu otro tú",
        note: "Puede utilizarse como respuesta a In lak'ech.",
      },
    ],
    practice: [
      "Escucha Ba'ax ka wa'alik y repítelo en voz alta.",
      "Responde utilizando Ma'alob o Asab ma'alob.",
      "Finaliza la conversación diciendo Yuum bo'otik.",
    ],
  },

  /*
   * =====================================================
   * LECCIÓN 2
   * =====================================================
   */
  numeros: {
    number: 2,
    title: "Números del 1 al 10",
    category: "Vocabulario",
    objective:
      "Reconocer, pronunciar y relacionar los números mayas del 1 al 10.",
    introduction:
      "Los números forman parte de las conversaciones diarias. Escucha cada número, observa su escritura y repítelo en voz alta.",
    items: [
      { maya: "Jun", spanish: "1 — uno" },
      { maya: "Ka'", spanish: "2 — dos" },
      { maya: "Óox", spanish: "3 — tres" },
      { maya: "Kan", spanish: "4 — cuatro" },
      { maya: "Jo'", spanish: "5 — cinco" },
      { maya: "Wak", spanish: "6 — seis" },
      { maya: "Uk'", spanish: "7 — siete" },
      { maya: "Waxak", spanish: "8 — ocho" },
      { maya: "Bolon", spanish: "9 — nueve" },
      { maya: "Lajun", spanish: "10 — diez" },
    ],
    explanation:
      "El sistema de numeración maya es vigesimal, lo que significa que utiliza grupos de veinte como base.",
    practice: [
      "Escucha los números del uno al cinco en orden.",
      "Repite los números del seis al diez sin leer la traducción.",
      "Elige tres números al azar e intenta recordar su significado.",
    ],
  },

  /*
   * =====================================================
   * LECCIÓN 3
   * =====================================================
   */
  alfabeto: {
    number: 3,
    title: "Alfabeto y pronunciación",
    category: "Práctica de pronunciación",
    objective:
      "Identificar algunos sonidos característicos del maya yucateco.",
    introduction:
      "El maya yucateco incluye vocales largas y consonantes glotalizadas. El apóstrofo forma parte de la palabra y representa un cierre de la garganta.",
    instruction:
      "Escucha el audio y repite la palabra en voz alta. Intenta que tu pronunciación sea lo más parecida posible al ejemplo. Puedes reproducirlo varias veces.",
    items: [
      {
        maya: "K'iin",
        spanish: "Sol",
        note: "La consonante k' es glotalizada.",
      },
      {
        maya: "Ja'",
        spanish: "Agua",
        note: "La palabra termina con un cierre glotal.",
      },
      {
        maya: "Ch'íich'",
        spanish: "Pájaro",
        note: "Contiene el sonido glotalizado ch'.",
      },
      {
        maya: "Ts'íib",
        spanish: "Escribir",
        note: "La combinación ts' produce un sonido glotalizado.",
      },
      {
        maya: "T'aan",
        spanish: "Lengua, habla o palabra",
        note: "Contiene una vocal larga representada por aa.",
      },
      {
        maya: "Yáaxché",
        spanish: "Ceiba",
        note: "La repetición de la vocal indica una pronunciación más larga.",
      },
    ],
    explanation:
      "El apóstrofo no es un signo decorativo. Es parte de la escritura y puede cambiar la pronunciación de una palabra.",
    practice: [
      "Reproduce cada palabra al menos dos veces.",
      "Escucha dónde aparece el cierre glotal.",
      "Repite lentamente y después intenta decirla a velocidad normal.",
    ],
  },

  /*
   * =====================================================
   * LECCIÓN 4
   * =====================================================
   */
  familia: {
    number: 4,
    title: "Familia y parentesco",
    category: "Vocabulario",
    objective:
      "Reconocer palabras relacionadas con integrantes de la familia.",
    introduction:
      "La familia es uno de los primeros espacios donde se aprende y transmite una lengua. Escucha cada palabra y relaciónala con su significado.",
    items: [
      { maya: "Na'", spanish: "Madre" },
      { maya: "Taata", spanish: "Padre" },
      { maya: "Suku'un", spanish: "Hermano mayor" },
      { maya: "Kiik", spanish: "Hermana mayor" },
      {
        maya: "Iits'in",
        spanish: "Hermano o hermana menor",
      },
      { maya: "Nool", spanish: "Abuelo" },
      { maya: "Chich", spanish: "Abuela" },
      { maya: "Paal", spanish: "Niño, niña o hijo" },
      { maya: "Xi'ipal", spanish: "Muchacho" },
      { maya: "X-ch'úupal", spanish: "Muchacha" },
      {
        maya: "Láak'tsil",
        spanish: "Familiar o pariente",
      },
      {
        maya: "Chan paal",
        spanish: "Niño pequeño",
      },
    ],
    explanation:
      "Para expresar una relación de posesión puede colocarse una forma personal antes del sustantivo. Por ejemplo, In na' puede expresar mi madre.",
    practice: [
      "Elige tres palabras relacionadas con tu familia.",
      "Repite cada palabra después de escuchar su audio.",
      "Intenta recordar la traducción sin mirar el texto en español.",
    ],
  },

  /*
   * =====================================================
   * LECCIÓN 5
   * =====================================================
   */
  "frases-utiles": {
    number: 5,
    title: "Frases útiles del día",
    category: "Conversación",
    objective:
      "Construir un diálogo corto utilizando expresiones cotidianas.",
    introduction:
      "Estas expresiones pueden utilizarse para saludar, responder, agradecer y despedirse durante una conversación sencilla.",
    items: [
      {
        maya: "Ba'ax ka wa'alik",
        spanish: "¿Qué dices? / ¿Cómo estás?",
      },
      {
        maya: "Bix a beel",
        spanish: "¿Cómo estás?",
      },
      {
        maya: "Ma'alob",
        spanish: "Bien",
      },
      {
        maya: "Asab ma'alob",
        spanish: "Muy bien",
      },
      {
        maya: "Yuum bo'otik",
        spanish: "Gracias",
      },
      {
        maya: "Mix ba'al",
        spanish: "De nada",
      },
      {
        maya: "Ka xi'ik tech utsil",
        spanish: "Que te vaya bien",
      },
      {
        maya: "Sáamal",
        spanish: "Mañana / hasta mañana",
      },
    ],
    practice: [
      "Inicia preguntando Ba'ax ka wa'alik.",
      "Responde Ma'alob o Asab ma'alob.",
      "Agradece diciendo Yuum bo'otik.",
      "Despídete utilizando Ka xi'ik tech utsil.",
    ],
  },
};

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = LESSONS[slug];

  if (!lesson) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-gold">
          Lección próximamente
        </h1>

        <p className="mt-4 text-muted-foreground">
          Esta lección todavía se encuentra en preparación.
        </p>

        <Link
          to="/aprende"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cinnabar/40 bg-cinnabar/10 px-5 py-3 text-cinnabar transition hover:bg-cinnabar hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a las lecciones
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/aprende"
        className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-cinnabar"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Lecciones A1
      </Link>

      <header className="rounded-[28px] border border-gold/20 bg-card/40 p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cinnabar/30 bg-cinnabar/10 px-3 py-1 text-xs uppercase tracking-[0.15em] text-cinnabar">
            Lección {lesson.number}
          </span>

          <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-gold">
            {lesson.category}
          </span>
        </div>

        <h1 className="font-display text-3xl text-gold sm:text-5xl">
          {lesson.title}
        </h1>

        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {lesson.introduction}
        </p>
      </header>

      <section className="mt-6 rounded-2xl border border-cinnabar/25 bg-cinnabar/5 p-5">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cinnabar/10 text-cinnabar">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cinnabar">
              Objetivo de aprendizaje
            </p>

            <p className="mt-2 leading-relaxed">
              {lesson.objective}
            </p>
          </div>
        </div>
      </section>

      {lesson.instruction && (
        <section className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 p-5">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold">
                Escucha y repite
              </p>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                {lesson.instruction}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-cinnabar">
            Contenido de la lección
          </p>

          <h2 className="mt-2 font-display text-2xl text-gold sm:text-3xl">
            Escucha y aprende
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {lesson.items.map((item, index) => (
            <article
              key={`${item.maya}-${index}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition hover:border-cinnabar/40"
            >
              {item.audio !== false ? (
                <SpeakerButton word={item.maya} />
              ) : (
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
              )}

              <div className="min-w-0">
                <h3 className="font-display text-xl text-gold">
                  {item.maya}
                </h3>

                <p className="mt-1 text-sm">
                  {item.spanish}
                </p>

                {item.note && (
                  <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {lesson.explanation && (
        <section className="mt-8 rounded-2xl border border-gold/20 bg-card/40 p-5">
          <div className="flex items-start gap-4">
            <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-gold" />

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold">
                Recuerda
              </p>

              <p className="mt-2 leading-relaxed text-muted-foreground">
                {lesson.explanation}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mt-8 rounded-[26px] border border-cinnabar/25 bg-cinnabar/5 p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-cinnabar">
          Actividad rápida
        </p>

        <h2 className="mt-2 font-display text-2xl text-gold">
          Ponlo en práctica
        </h2>

        <div className="mt-5 space-y-3">
          {lesson.practice.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/20 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cinnabar" />

              <p className="text-sm leading-relaxed">
                <strong className="mr-1 text-gold">
                  {index + 1}.
                </strong>

                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/aprende"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm transition hover:border-cinnabar/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Regresar
        </Link>

        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Lección disponible
        </div>
      </footer>
    </main>
  );
}