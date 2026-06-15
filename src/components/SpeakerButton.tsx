import { Volume2 } from "lucide-react";

export function playMayaAudio(word: string) {
  const slug = word.toLowerCase().replace(/['']/g, "").replace(/\s+/g, "-");
  const audio = new Audio(`/audio/${slug}.mp3`);
  audio.play().catch(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "es-MX";
      u.rate = 0.75;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  });
}

export function SpeakerButton({ word, size = "md" }: { word: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const ic = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); playMayaAudio(word); }}
      aria-label={`Escuchar pronunciación de ${word}`}
      className={`inline-grid place-items-center ${dim} rounded-full border border-cinnabar/40 bg-cinnabar/10 text-cinnabar hover:bg-cinnabar hover:text-primary-foreground transition shrink-0`}
    >
      <Volume2 className={ic} />
    </button>
  );
}
