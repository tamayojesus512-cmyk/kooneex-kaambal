import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { categorias } from "../lib/maya-data";
import { HandHeart, Check, Trash2 } from "lucide-react";

export const Route = createFileRoute("/contribuir")({
  head: () => ({
    meta: [
      { title: "Contribuir · ¡Ko'one'ex Kaambal!" },
      { name: "description", content: "Sugiere nuevas palabras y frases en maya yucateco para que la comunidad las revise y agregue al diccionario." },
      { property: "og:title", content: "Contribuir al diccionario maya" },
      { property: "og:description", content: "Sugiere palabras nuevas en maya yucateco." },
    ],
  }),
  component: ContribuirPage,
});

const schema = z.object({
  maya: z.string().trim().min(1, "Escribe la palabra en maya").max(80),
  es: z.string().trim().min(1, "Escribe el significado en español").max(160),
  categoria: z.string().min(1),
  ejemplo: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().email("Email no válido").max(120).optional().or(z.literal("")),
});
type FormState = z.infer<typeof schema>;

type Suggestion = FormState & { ts: number };

function ContribuirPage() {
  const [form, setForm] = useState<FormState>({ maya: "", es: "", categoria: "Saludos", ejemplo: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [list, setList] = useState<Suggestion[]>([]);

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem("kaambal.suggestions") || "[]")); } catch { setList([]); }
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const next: Suggestion = { ...r.data, ts: Date.now() };
    const updated = [next, ...list].slice(0, 50);
    setList(updated);
    localStorage.setItem("kaambal.suggestions", JSON.stringify(updated));
    setSent(true);
    setForm({ maya: "", es: "", categoria: "Saludos", ejemplo: "", email: "" });
    setTimeout(() => setSent(false), 3000);
  }
  function remove(ts: number) {
    const updated = list.filter(s => s.ts !== ts);
    setList(updated);
    localStorage.setItem("kaambal.suggestions", JSON.stringify(updated));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cinnabar mb-3">— Contribuir</p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight">Suma tu <em className="text-gradient-gold">palabra</em>.</h1>
        <p className="mt-3 text-muted-foreground text-sm sm:text-base">
          Si conoces una palabra o frase que no está en el diccionario, sugiérela. Las sugerencias se guardan
          localmente en este dispositivo mientras la comunidad las revisa.
        </p>
      </header>

      <form onSubmit={submit} className="card-ritual rounded-2xl p-5 sm:p-6 grid gap-4">
        <Field label="Palabra en maya *" err={errors.maya}>
          <input value={form.maya} onChange={e => setForm(f => ({ ...f, maya: e.target.value }))}
            placeholder="ej. Yáaxche'" className="input" />
        </Field>
        <Field label="Significado en español *" err={errors.es}>
          <input value={form.es} onChange={e => setForm(f => ({ ...f, es: e.target.value }))}
            placeholder="ej. árbol sagrado, ceiba" className="input" />
        </Field>
        <Field label="Categoría *">
          <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} className="input">
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Ejemplo de uso (opcional)" err={errors.ejemplo}>
          <input value={form.ejemplo} onChange={e => setForm(f => ({ ...f, ejemplo: e.target.value }))}
            placeholder="ej. Le yáaxche'o' jach nojoch." className="input" />
        </Field>
        <Field label="Tu email (opcional)" err={errors.email}>
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="por si queremos contactarte" className="input" />
        </Field>

        <div className="flex items-center gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-cinnabar text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition">
            <HandHeart className="h-4 w-4" /> Enviar sugerencia
          </button>
          {sent && <span className="inline-flex items-center gap-2 text-sm text-jade"><Check className="h-4 w-4" /> ¡Yuum bo'otik! Guardada.</span>}
        </div>
      </form>

      {list.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl mb-4">Tus sugerencias ({list.length})</h2>
          <ul className="divide-y divide-border/50 rounded-2xl border border-border bg-card/40">
            {list.map(s => (
              <li key={s.ts} className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-lg text-gold">{s.maya}</span>
                    <span className="text-[10px] uppercase tracking-wider text-cinnabar">{s.categoria}</span>
                  </div>
                  <p className="text-sm">{s.es}</p>
                  {s.ejemplo && <p className="mt-1 text-xs italic text-muted-foreground">«{s.ejemplo}»</p>}
                </div>
                <button onClick={() => remove(s.ts)} aria-label="Eliminar" className="text-muted-foreground hover:text-cinnabar p-1">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <style>{`.input { width:100%; background: var(--background); border:1px solid var(--border); border-radius: 0.625rem; padding: 0.65rem 0.85rem; font-size: 0.875rem; outline: none; transition: border-color .2s; } .input:focus { border-color: var(--cinnabar); }`}</style>
    </div>
  );
}

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
      {children}
      {err && <span className="block mt-1 text-xs text-cinnabar">{err}</span>}
    </label>
  );
}
