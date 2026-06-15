import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/juegos")({
  head: () => ({
    meta: [
      { title: "Juegos · ¡Ko'one'ex Kaambal!" },
      { name: "description", content: "Quiz, memorama, flashcards y sopa de letras para aprender maya yucateco jugando." },
      { property: "og:title", content: "Juegos · Káaxal Maaya" },
      { property: "og:description", content: "Aprende maya yucateco jugando." },
    ],
  }),
  component: () => <Outlet />,
});
