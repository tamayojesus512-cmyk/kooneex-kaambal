export function GlyphDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-cinnabar/60" />
      <span className="font-display text-2xl text-gold">◊</span>
      <span className="font-display text-3xl text-cinnabar">⊛</span>
      <span className="font-display text-2xl text-gold">◊</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-cinnabar/60" />
    </div>
  );
}
