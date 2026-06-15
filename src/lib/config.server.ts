/// <reference types="node" />
import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Aquí puedes añadir tus secretos o configuraciones de servidor:
    // databaseUrl: process.env.DATABASE_URL,
    // stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}