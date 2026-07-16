// src/lib/aprende-data.ts
export type AprendeCard = {
  id: number;
  tipo: "leccion" | "pronunciacion" | "lectura" | "juego" | "cofre" | "evaluacion";
  titulo: string;
  slug?: string;
  estado: "completada" | "activa" | "desbloqueada" | "bloqueada";
};

export const leccionesA1: AprendeCard[] = [
  {
    id: 1,
    tipo: "leccion",
    titulo: "Saludos y presentaciones",
    slug: "saludos",
    estado: "completada",
  },
  {
    id: 2,
    tipo: "leccion",
    titulo: "Números del 1 al 10",
    slug: "numeros",
    estado: "completada",
  },
  {
    id: 3,
    tipo: "pronunciacion",
    titulo: "Pronunciación básica",
    slug: "alfabeto",
    estado: "activa",
  },
  {
    id: 4,
    tipo: "leccion",
    titulo: "Familia",
    slug: "familia",
    estado: "desbloqueada",
  },
  {
    id: 5,
    tipo: "lectura",
    titulo: "Frases útiles",
    slug: "frases-utiles",
    estado: "desbloqueada",
  },

  // Relleno visual
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
    titulo: "Vocabulario extra",
    estado: "bloqueada",
  },
  {
    id: 15,
    tipo: "evaluacion",
    titulo: "Evaluación A1",
    estado: "bloqueada",
  },
];