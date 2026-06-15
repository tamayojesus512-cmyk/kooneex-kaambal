import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Search, Headphones, GraduationCap, UserCircle, Menu, X, Gamepad2, HandHeart } from "lucide-react";
import { useState } from "react";

type NavItem = { to: string; label: string; icon: typeof Home; exact?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Inicio", icon: Home, exact: true },
  { to: "/vocabulario", label: "Vocabulario", icon: BookOpen },
  { to: "/aprende", label: "Aprende", icon: GraduationCap },
  { to: "/cultura", label: "Cultura", icon: Sparkles },
  { to: "/diccionario", label: "Diccionario", icon: Search },
  { to: "/escucha", label: "Escucha", icon: Headphones },
  { to: "/contribuir", label: "Contribuir", icon: HandHeart },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 -z-10 bg-obsidian/70 backdrop-blur-2xl border-b border-cinnabar/20" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        <Link to="/" className="flex items-center gap-2.5 group min-w-0" onClick={() => setOpen(false)}>
          <div className="relative h-10 w-10 grid place-items-center rounded-full bg-gradient-to-br from-cinnabar to-gold text-obsidian font-display text-xl font-bold shadow-[0_0_24px_-4px_var(--cinnabar)] shrink-0">
            K
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-pulse" />
          </div>
          <div className="leading-tight min-w-0 hidden sm:block">
            <div className="font-display text-base sm:text-lg truncate">¡Ko'one'ex <span className="text-cinnabar">Kaambal!</span></div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Vamos a aprender</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-sm">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to as any}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-cinnabar/10 transition inline-flex items-center gap-2"
              activeOptions={n.exact ? { exact: true } : undefined}
              activeProps={{ className: "px-3 py-2 rounded-md text-cinnabar bg-cinnabar/10 inline-flex items-center gap-2" }}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/juegos"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cinnabar to-gold text-obsidian px-4 py-2 text-sm font-bold hover:scale-[1.03] transition shadow-[0_8px_24px_-6px_var(--cinnabar)]"
          >
            <Gamepad2 className="h-4 w-4" /> Juegos
          </Link>

          {/* El botón de Perfil ahora redirige de forma segura a /login */}
          <Link
            to="/login"
            aria-label="Perfil"
            className="hidden sm:grid place-items-center h-10 w-10 rounded-full border border-border bg-obsidian/40 hover:border-cinnabar transition hover:scale-[1.05]"
          >
            <UserCircle className="h-5 w-5 text-gold" />
          </Link>

          <button
            onClick={() => setOpen(o => !o)}
            className="xl:hidden h-10 w-10 grid place-items-center rounded-md border border-border bg-obsidian/40"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {open && (
        <div className="xl:hidden border-t border-border/60 bg-obsidian/95 backdrop-blur-xl">
          <nav className="px-4 sm:px-6 py-3 grid grid-cols-2 gap-1.5">
            {nav.map(n => (
              <Link
                key={n.to}
                to={n.to as any}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-cinnabar/10 transition inline-flex items-center gap-2 text-sm border border-transparent"
                activeOptions={n.exact ? { exact: true } : undefined}
                activeProps={{ className: "px-3 py-3 rounded-lg text-cinnabar bg-cinnabar/10 inline-flex items-center gap-2 text-sm border border-cinnabar/40" }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
            <Link
              to="/juegos"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-1 px-4 py-3 rounded-lg bg-gradient-to-r from-cinnabar to-gold text-obsidian font-bold inline-flex items-center justify-center gap-2 text-sm"
            >
              <Gamepad2 className="h-4 w-4" /> Juegos
            </Link>
            
            {/* Opción de acceso añadida para pantallas pequeñas */}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-1 px-4 py-3 rounded-lg border border-border bg-obsidian/40 text-gold font-bold inline-flex items-center justify-center gap-2 text-sm hover:border-cinnabar transition"
            >
              <UserCircle className="h-4 w-4" /> Mi Perfil / Acceso
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}