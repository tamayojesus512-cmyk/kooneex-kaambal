import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

import {
  BookOpen,
  CheckCircle2,
  FileText,
  Gamepad2,
  Gift,
  GraduationCap,
  Lock,
  Mic2,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/aprende")({
  head: () => ({
    meta: [
      {
        title: "Lecciones A1 · ¡Ko'one'ex Kaambal!",
      },
      {
        name: "description",
        content:
          "Ruta de aprendizaje de maya yucateco para principiantes.",
      },
    ],
  }),

  component: AprendePage,
});

type TipoLeccion =
  | "leccion"
  | "pronunciacion"
  | "lectura"
  | "juego"
  | "cofre"
  | "evaluacion";

type EstadoLeccion =
  | "completada"
  | "activa"
  | "disponible"
  | "bloqueada";

type LeccionA1 = {
  id: number;
  tipo: TipoLeccion;
  titulo: string;
  estado: EstadoLeccion;
  slug?: string;
};

const leccionesA1: LeccionA1[] = [
  {
    id: 1,
    tipo: "leccion",
    titulo: "Saludos y presentaciones",
    estado: "completada",
    slug: "saludos",
  },
  {
    id: 2,
    tipo: "leccion",
    titulo: "Números del 1 al 10",
    estado: "completada",
    slug: "numeros",
  },
  {
    id: 3,
    tipo: "pronunciacion",
    titulo: "Alfabeto y pronunciación",
    estado: "activa",
    slug: "alfabeto",
  },
  {
    id: 4,
    tipo: "leccion",
    titulo: "Familia y parentesco",
    estado: "disponible",
    slug: "familia",
  },
  {
    id: 5,
    tipo: "lectura",
    titulo: "Frases útiles del día",
    estado: "disponible",
    slug: "frases-utiles",
  },
  {
    id: 6,
    tipo: "lectura",
    titulo: "Partes del cuerpo",
    estado: "bloqueada",
  },
  {
    id: 7,
    tipo: "cofre",
    titulo: "Animales comunes",
    estado: "bloqueada",
  },
  {
    id: 8,
    tipo: "leccion",
    titulo: "Comida básica",
    estado: "bloqueada",
  },
  {
    id: 9,
    tipo: "leccion",
    titulo: "Acciones cotidianas",
    estado: "bloqueada",
  },
  {
    id: 10,
    tipo: "pronunciacion",
    titulo: "Pronombres y frases simples",
    estado: "bloqueada",
  },
  {
    id: 11,
    tipo: "leccion",
    titulo: "La casa",
    estado: "bloqueada",
  },
  {
    id: 12,
    tipo: "juego",
    titulo: "Naturaleza y clima",
    estado: "bloqueada",
  },
  {
    id: 13,
    tipo: "lectura",
    titulo: "Repaso general",
    estado: "bloqueada",
  },
  {
    id: 14,
    tipo: "cofre",
    titulo: "Vocabulario adicional",
    estado: "bloqueada",
  },
  {
    id: 15,
    tipo: "evaluacion",
    titulo: "Evaluación A1",
    estado: "bloqueada",
  },
];

const iconos: Record<TipoLeccion, LucideIcon> = {
  leccion: BookOpen,
  pronunciacion: Mic2,
  lectura: FileText,
  juego: Gamepad2,
  cofre: Gift,
  evaluacion: GraduationCap,
};

const etiquetas: Record<TipoLeccion, string> = {
  leccion: "LECCIÓN",
  pronunciacion: "PRONUNCIACIÓN",
  lectura: "LECTURA",
  juego: "JUEGO",
  cofre: "COFRE",
  evaluacion: "EVALUACIÓN",
};

function AprendePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  /*
   * Cuando la dirección sea algo como:
   *
   * /aprende/saludos
   * /aprende/numeros
   * /aprende/alfabeto
   *
   * se mostrará la interfaz de aprende.$slug.tsx.
   */
  const mostrandoUnaLeccion =
    pathname !== "/aprende" && pathname !== "/aprende/";

  if (mostrandoUnaLeccion) {
    return <Outlet />;
  }

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[30px] border border-gold/20 bg-card/30 p-5 sm:p-8">
        <header className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cinnabar">
            — Ruta de aprendizaje
          </p>

          <h1 className="font-display text-3xl text-gold sm:text-4xl">
            Lecciones A1
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            15 paradas hasta la evaluación.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {leccionesA1.map((leccion) => {
            const Icon = iconos[leccion.tipo];
            const bloqueada = leccion.estado === "bloqueada";

            const tarjeta = (
              <article
                className={`
                  group min-h-[155px] rounded-[28px] border p-5
                  transition duration-200

                  ${
                    leccion.estado === "completada"
                      ? "border-emerald-500/30 bg-emerald-500/5 hover:-translate-y-1 hover:border-emerald-400/60"
                      : ""
                  }

                  ${
                    leccion.estado === "activa"
                      ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(234,179,8,0.08)] hover:-translate-y-1"
                      : ""
                  }

                  ${
                    leccion.estado === "disponible"
                      ? "border-border bg-card/50 hover:-translate-y-1 hover:border-cinnabar/50"
                      : ""
                  }

                  ${
                    bloqueada
                      ? "cursor-not-allowed border-border/60 bg-card/20 opacity-55"
                      : "cursor-pointer"
                  }
                `}
              >
                <div className="mb-7 flex items-start justify-between">
                  <div
                    className={`
                      grid h-12 w-12 place-items-center rounded-full border

                      ${
                        leccion.estado === "completada"
                          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                          : ""
                      }

                      ${
                        leccion.estado === "activa"
                          ? "border-cinnabar/40 bg-cinnabar/15 text-gold"
                          : ""
                      }

                      ${
                        leccion.estado === "disponible"
                          ? "border-gold/20 bg-gold/5 text-gold"
                          : ""
                      }

                      ${
                        bloqueada
                          ? "border-border bg-muted/30 text-muted-foreground"
                          : ""
                      }
                    `}
                  >
                    {bloqueada ? (
                      <Lock className="h-5 w-5" />
                    ) : leccion.estado === "completada" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {etiquetas[leccion.tipo]} · {leccion.id}
                </p>

                <h2
                  className={`
                    text-base font-semibold leading-snug sm:text-lg

                    ${
                      bloqueada
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }
                  `}
                >
                  {leccion.titulo}
                </h2>

                {!bloqueada && (
                  <p className="mt-3 text-xs text-cinnabar opacity-0 transition group-hover:opacity-100">
                    Abrir lección →
                  </p>
                )}
              </article>
            );

            if (!bloqueada && leccion.slug) {
              return (
                <Link
                  key={leccion.id}
                  to="/aprende/$slug"
                  params={{
                    slug: leccion.slug,
                  }}
                  className="block"
                >
                  {tarjeta}
                </Link>
              );
            }

            return <div key={leccion.id}>{tarjeta}</div>;
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {["A2", "B1", "B2"].map((nivel) => (
          <article
            key={nivel}
            className="rounded-2xl border border-border bg-card/30 p-5 opacity-65"
          >
            <div className="mb-4 flex items-center justify-between">
              <GraduationCap className="h-5 w-5 text-gold" />
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-cinnabar">
              Próximamente
            </p>

            <h2 className="mt-2 font-display text-2xl text-gold">
              Nivel {nivel}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Nuevas lecciones, prácticas y evaluaciones.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}