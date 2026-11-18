/**
 * SERVE.JS - SERVIDOR LOCAL PARA HOTEL MIRASOLES
 * Soporte para Clean URLs y tipos MIME estándar (Node.js nativo sin dependencias)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Manejo de URL y query string
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  // Raíz por defecto index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Soporte para Clean URLs: si la ruta no tiene extensión y no termina en /, probar con .html
  let filePath = path.join(PUBLIC_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || stats.isDirectory()) {
      const htmlPath = path.join(PUBLIC_DIR, `${pathname}.html`);
      fs.stat(htmlPath, (htmlErr, htmlStats) => {
        if (!htmlErr && htmlStats.isFile()) {
          serveFile(htmlPath, '.html', res);
        } else {
          // 404 Not Found
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head><meta charset="UTF-8"><title>404 - Página no encontrada</title></head>
            <body style="font-family: sans-serif; text-align: center; padding: 50px;">
              <h1>404 - Página no encontrada</h1>
              <p>La página que buscas no existe en Hotel Mirasoles.</p>
              <a href="/" style="color: #C99738; text-decoration: underline;">Volver al inicio</a>
            </body>
            </html>
          `);
        }
      });
    } else {
      const ext = path.extname(filePath).toLowerCase();
      serveFile(filePath, ext, res);
    }
  });
});

function serveFile(filePath, ext, res) {
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error interno del servidor: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

server.listen(PORT, () => {
  console.log(`🏨 Servidor Hotel Mirasoles ejecutándose en: http://localhost:${PORT}`);
  console.log(`✨ Clean URLs habilitadas (/habitaciones, /servicios, /reservas, /admin)`);
});
