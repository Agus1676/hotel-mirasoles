# Hotel Mirasoles · Necochea, Buenos Aires

> Sitio web institucional de alto impacto, responsivo y con panel de administración (CMS) integrado en el cliente para **Hotel Mirasoles** en **Necochea, Provincia de Buenos Aires, Argentina**.

---

## 🌻 Ficha Técnica & Identidad de Marca

- **Establecimiento**: Hotel Mirasoles
- **Ubicación**: Calle 83 Nº 342, Necochea, Provincia de Buenos Aires, Argentina
- **Concepto**: Hotel costero cálido, familiar, luminoso y acogedor, inspirado en el sol, la arena dorada y el mar.
- **Horarios Oficiales**:
  - **Check-in**: 14:00 hs
  - **Check-out**: 10:00 hs
- **Gastronomía**: Desayuno Buffet continental incluido (cafetería de grano, medialunas calientes horneadas a diario, frutas frescas, pastelería artesanal y sector libre de gluten certificado para celíacos).
- **Canales Oficiales**:
  - **WhatsApp**: +54 9 2262 32-4248 (Número API: `5492262324248`)
  - **Email**: Mirasoles.necochea@gmail.com
- **Paleta de Colores**:
  - Canvas / Fondo: `#FAF8F5`
  - Superficies: `#FFFFFF` y `#F4EFEA`
  - Acento Sol / Mirasol: `#C99738` y `#DDAA44`
  - Marino Contraste: `#1B2A4A`
  - Éxito / WhatsApp: `#15803D` y `#25D366`

---

## 🚀 Arquitectura y Tecnologías

1. **Frontend Moderno & Sin Dependencias Pesadas**:
   - HTML5 Semántico y Accesible.
   - Tailwind CSS (CDN configurado con la paleta de identidad de Mirasoles).
   - Tipografía Google Fonts: *Playfair Display* (elegancia clásica hotelera) y *Plus Jakarta Sans* (claridad contemporánea).
   - Componentes interactivos: Lightbox para fotos en pantalla completa, selector de filtros por capacidad, cotizador de noches y acordeón FAQ.
2. **Motor CMS Reactivo Client-Side**:
   - `assets/js/default-content.js`: Fuente única de verdad inicial.
   - `assets/js/content-manager.js`: Persistencia en `localStorage`, exportación e importación de backups en JSON y data binding automático con atributos `data-cms-*`.
   - `assets/js/admin.js`: Control del panel con clave de acceso, previsualización y toast flotante de confirmación.
3. **Clean URLs & Despliegue**:
   - `vercel.json`: Reglas de reescritura para rutas limpias (`/habitaciones`, `/servicios`, `/reservas`, `/admin`).
   - `serve.js`: Servidor nativo Node.js sin paquetes externos en el puerto 3000 para testing local.

---

## 🔐 Panel de Control CMS

- **Ruta de acceso**: `/admin`
- **Contraseña por defecto**: `mirasoles2026`
- **Funcionalidades**:
  - Modificación de datos generales, horarios y números de contacto.
  - Edición de la portada (títulos, bajada, fotos y badges).
  - Gestión de habitaciones, amenidades y URLs de imágenes.
  - Configuración del Desayuno Buffet continental y cocheras.
  - Activación / desactivación de la barra promocional superior.
  - Preguntas frecuentes editables.
  - Descarga de respaldo en archivo `mirasoles-contenido.json` e importación en 1 clic.
  - Cambio seguro de contraseña de administrador.

---

## 🛠️ Ejecución Local

```bash
# Iniciar servidor local
npm start
# o:
node serve.js
```

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)
Rutas limpias de prueba:
- [http://localhost:3000/habitaciones](http://localhost:3000/habitaciones)
- [http://localhost:3000/servicios](http://localhost:3000/servicios)
- [http://localhost:3000/reservas](http://localhost:3000/reservas)
- [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Despliegue en Producción

El proyecto está preparado para desplegarse instantáneamente en **Vercel**:
```bash
vercel --prod --yes
```
Y sincronizarse con **GitHub**:
```bash
git push -u origin main
```
