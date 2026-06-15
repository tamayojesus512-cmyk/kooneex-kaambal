import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Ajustamos la ruta para que apunte a tu archivo de configuración en src/lib/
import { getServerConfig } from "../config.server";

export const getGreeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ name: z.string().min(1) }))
  .handler(async ({ data }) => {
    const config = getServerConfig();
    return {
      greeting: `Hello, ${data.name}!`,
      mode: config.nodeEnv ?? "unknown",
    };
  });