import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lecciones, type Leccion } from "../lib/maya-data";
import { SpeakerButton } from "../components/SpeakerButton";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/aprende/$slug")({
  head: ({ params }) => {
    const l = lecciones.find((x: Leccion) => x.slug === params.slug);
    return {
      meta: [
        { title: `${l?.titulo ?? "Lección"} · Aprende · ¡Ko'one'ex Kaambal!` },
        { name: "description", content: l?.resumen ?? "Lección de maya yucateco" },
      ],
    };
  },
  loader: ({ params }) => {
    const l = lecciones.find((x: Leccion) => x.slug === params.slug);
    if (!l) throw notFound();
    return l;
  },
  component: LeccionPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <p className="text-muted-foreground">Lección no encontrada.</p>
      <Link to="/aprende" className="mt-4 inline-block text-cinnabar">← Volver a lecciones</Link>
    </div>
  ),
});

function LeccionPage() {
const l = Route.useLoaderData();
  const idx = lecciones.findIndex((x: Leccion) => x.slug === l.slug);
  const prev = lecciones[idx - 1];
  const next = lecciones[idx + 1];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <Link to="/aprende" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-3 w-3" /> todas las lecciones
      </Link>
      <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Lección {String(idx + 1).padStart(2, "0")}</p>
      <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-3">{l.titulo}</h1>
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">{l.intro}</p>

      <ul className="divide-y divide-border/50 rounded-2xl border border-border bg-card/40 mb-8">
      
{l.contenido.map((c: { maya: string; es: string; nota?: string }, i: number) => (
          <li key={i} className="p-4 sm:p-5 flex items-start gap-3">
            <SpeakerButton word={c.maya} />
            <div className="flex-1 min-w-0">
              <div className="font-display text-lg text-gold">{c.maya}</div>
              <div className="text-sm">{c.es}</div>
              {c.nota && <div className="mt-1 text-xs text-muted-foreground italic">{c.nota}</div>}
            </div>
          </li>
        ))}
      </ul>

      {l.gramatica && (
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5 mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold mb-2">
            <Lightbulb className="h-3.5 w-3.5" /> Nota gramatical
          </div>
          <p className="text-sm">{l.gramatica}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link to="/aprende/$slug" params={{ slug: prev.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> {prev.titulo}
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/aprende/$slug" params={{ slug: next.slug }} className="inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-5 py-2.5 text-sm font-medium ml-auto">
            {next.titulo} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <Link to="/juegos/quiz" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cinnabar to-gold text-obsidian px-5 py-2.5 text-sm font-bold ml-auto">
            Probar quiz <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}