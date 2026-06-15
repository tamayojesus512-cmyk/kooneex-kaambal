import { createFileRoute, Link } from "@tanstack/react-router";
import heroGlyph from "@/assets/hero-glyph.jpg";
import { ArrowRight, BookOpen, Library, Compass, ScrollText, GraduationCap, Sparkles, Sun, Gamepad2, HandHeart, Headphones } from "lucide-react";
import { SmartSearch } from "../components/SmartSearch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¡Ko'one'ex Kaambal! · Aprende lengua y cultura maya yucateca" },
      { name: "description", content: "Diccionario bidireccional, vocabulario con audio, juegos, lecciones y cultura del Mayab. Aprende maya yucateco gratis." },
      { property: "og:title", content: "¡Ko'one'ex Kaambal! · Lengua viva del Mayab" },
      { property: "og:description", content: "Plataforma interactiva para aprender maya yucateco: diccionario, juegos, lecciones y cultura." },
    ],
  }),
  component: Home,
});

type Tile = { to: string; icon: typeof Library; title: string; desc: string; color: string; highlight?: boolean };
const tiles: Tile[] = [
  { to: "/diccionario", icon: Library, title: "Diccionario", desc: "Búsqueda bidireccional con fuzzy y filtros por categoría.", color: "from-cinnabar/30 to-gold/10" },
  { to: "/juegos", icon: Gamepad2, title: "Juegos", desc: "Quiz, memorama, flashcards y sopa de letras.", color: "from-gold/30 to-cinnabar/10", highlight: true },
  { to: "/vocabulario", icon: BookOpen, title: "Vocabulario", desc: "Palabras por categoría con pronunciación.", color: "from-jade/30 to-cinnabar/10" },
  { to: "/aprende", icon: GraduationCap, title: "Aprende", desc: "Lecciones de gramática, frases y pronunciación.", color: "from-cinnabar/30 to-jade/10" },
  { to: "/cultura", icon: Compass, title: "Cultura", desc: "Sabiduría, cosmovisión y memoria viva del Mayab.", color: "from-gold/20 to-cinnabar/20" },
  { to: "/relatos", icon: ScrollText, title: "Relatos", desc: "La Xtabay, los Aluxes y el Hanal Pixán.", color: "from-cinnabar/30 to-obsidian/10" },
  { to: "/escucha", icon: Headphones, title: "Escucha", desc: "Audios por categoría para entrenar el oído.", color: "from-jade/30 to-gold/10" },
  { to: "/palabra-del-dia", icon: Sparkles, title: "Palabra del día", desc: "Adivina la palabra y descubre su raíz.", color: "from-gold/30 to-jade/10" },
  { to: "/contribuir", icon: HandHeart, title: "Contribuir", desc: "Sugiere nuevas palabras para el diccionario.", color: "from-cinnabar/20 to-gold/20" },
];

const stats = [
  { value: "180+", label: "Palabras", sub: "con pronunciación" },
  { value: "4", label: "Juegos", sub: "interactivos" },
  { value: "6", label: "Lecciones", sub: "de gramática" },
  { value: "INALI", label: "Normas 2014", sub: "ortografía oficial" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate pt-12 pb-20 sm:pt-20 sm:pb-32" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <p className="flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cinnabar mb-4 sm:mb-6">
              <span className="h-px w-8 sm:w-10 bg-cinnabar" /> Maayat'aan · Lengua viva del Mayab
            </p>
            <h1 className="font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.95] font-medium">
              ¡Ko'one'ex
              <br />
              <span className="italic text-gradient-gold">Kaambal!</span>
            </h1>
            <p className="mt-5 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              "Vamos a aprender". Diccionario bidireccional, juegos, lecciones, audio y cultura del Mayab —
              todo en un solo lugar, hecho con respeto a la raíz.
            </p>

            {/* SMART SEARCH */}
            <div className="mt-6 sm:mt-8">
              <SmartSearch size="lg" />
              <p className="mt-2 text-[11px] text-muted-foreground/80 px-1">
                Búsqueda inteligente: ignora acentos y glotales · <span className="text-gold">tip:</span> ↑↓ para navegar, ⏎ para escuchar.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Link to="/juegos" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cinnabar to-gold text-obsidian pl-5 pr-2 py-2 font-bold shadow-[0_12px_40px_-12px_var(--cinnabar)] hover:scale-[1.02] transition">
                <Gamepad2 className="h-4 w-4" /> Jugar ahora
                <span className="grid place-items-center h-9 w-9 rounded-full bg-obsidian/20 group-hover:translate-x-0.5 transition">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/aprende" className="inline-flex items-center gap-2 rounded-full border border-gold text-gold px-5 py-3 font-medium hover:bg-gold/10 transition">
                Empezar lecciones
              </Link>
            </div>

            <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/40 rounded-xl overflow-hidden">
              {stats.map(s => (
                <div key={s.label} className="bg-background/80 p-4 sm:p-5">
                  <div className="font-display text-2xl sm:text-3xl text-gold">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
                  <div className="text-[9px] sm:text-[10px] text-cinnabar/80 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[520px] aspect-square animate-float-slow hidden md:block">
            <div className="absolute inset-0 rounded-full border border-cinnabar/60" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-cinnabar/30" />
            <div className="absolute -inset-10 rounded-full border border-gold/15" />
            <div className="absolute inset-6 rounded-full overflow-hidden shadow-[var(--shadow-deep)]">
              <img src={heroGlyph} alt="Glifo maya tallado en piedra con iluminación dorada" width={1280} height={1600} className="h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/40 via-transparent to-cinnabar/10" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur border border-border px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2">
              <Sun className="h-3.5 w-3.5 text-gold" /> K'iin · día sagrado
            </div>
          </div>
        </div>
      </section>

      {/* TILES */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-16">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3 sm:mb-4">— Nueve caminos para aprender</p>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl leading-[1.05]">
                Cada apartado es una <em className="text-gradient-gold">puerta</em> al Mayab.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm sm:text-base">
              Navega los apartados desde el menú o entra directo al que más te llame. Todo es gratuito y respetuoso de la raíz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tiles.map((t, i) => (
              <Link key={t.to} to={t.to as any} className={`card-ritual rounded-2xl p-5 sm:p-7 relative overflow-hidden group ${t.highlight ? "ring-1 ring-gold/40" : ""}`}>
                <div className={`absolute inset-0 -z-0 bg-gradient-to-br ${t.color} opacity-40 group-hover:opacity-60 transition`} />
                <div className="relative">
                  <div className="h-11 w-11 sm:h-12 sm:w-12 grid place-items-center rounded-xl bg-gradient-to-br from-cinnabar/20 to-gold/10 border border-cinnabar/30 mb-4 sm:mb-6">
                    <t.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">0{i+1}{t.highlight ? " · destacado" : ""}</div>
                  <h3 className="font-display text-xl sm:text-2xl mb-2 sm:mb-3">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">{t.desc}</p>
                  <div className="inline-flex items-center gap-2 text-sm text-cinnabar font-medium">
                    Entrar <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
