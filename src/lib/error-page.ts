export function renderErrorResponse(): Response {
  const htmlContent = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Error en Káaxal Maaya</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, sans-serif; background: #fafafa; display: grid; place-items: center; min-height: 100vh; margin: 0; }
      .card { max-width: 28rem; padding: 2rem; text-align: center; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>¡Uay! Algo salió mal</h1>
      <p>No pudimos cargar esta parte de Káaxal Maaya. Intenta de nuevo.</p>
      <button onclick="location.reload()">Reintentar</button>
    </div>
  </body>
</html>`;

  return new Response(htmlContent, {
    status: 500,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}