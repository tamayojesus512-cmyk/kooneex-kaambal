import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-obsidian/40 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 grid place-items-center rounded-full bg-gradient-to-br from-cinnabar to-gold text-obsidian font-display text-lg font-bold">K</div>
            <div>
              <div className="font-display text-lg">¡Ko'one'ex Kaambal!</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Vamos a aprender</div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Plataforma libre para aprender lengua y cultura maya yucateca. Basada en las 
            <em> Normas de escritura para la lengua maya</em> (INALI · SEP, 2014) y el diccionario UADY.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-cinnabar mb-3">Aprender</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/vocabulario" className="hover:text-foreground transition">Vocabulario</Link></li>
            <li><Link to="/diccionario" className="hover:text-foreground transition">Diccionario</Link></li>
            <li><Link to="/aprende" className="hover:text-foreground transition">Aprende</Link></li>
            <li><Link to="/escucha" className="hover:text-foreground transition">Escucha</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-cinnabar mb-3">Explorar</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/juegos" className="hover:text-foreground transition">Juegos</Link></li>
            <li><Link to="/cultura" className="hover:text-foreground transition">Cultura</Link></li>
            <li><Link to="/relatos" className="hover:text-foreground transition">Relatos</Link></li>
            <li><Link to="/palabra-del-dia" className="hover:text-foreground transition">Palabra del día</Link></li>
            <li><Link to="/contribuir" className="hover:text-foreground transition">Contribuir</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ¡Ko'one'ex Kaambal! · Hecho con respeto · <span className="text-cinnabar">In Lak'ech</span>
      </div>
    </footer>
  );
}