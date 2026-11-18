/**
 * CONTENT MANAGER - HOTEL MIRASOLES (NECOCHEA)
 * Motor reactivo client-side para sincronización con localStorage y CMS
 */

const STORAGE_KEY = 'mirasoles_hotel_content_v1';

/**
 * Obtener contenido activo desde localStorage o fallback a defaults
 */
function getHotelContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Guardar defaults por primera vez para asegurar persistencia
      if (typeof DEFAULT_HOTEL_CONTENT !== 'undefined') {
        saveHotelContent(DEFAULT_HOTEL_CONTENT);
        return JSON.parse(JSON.stringify(DEFAULT_HOTEL_CONTENT));
      }
      return {};
    }
    const parsed = JSON.parse(raw);
    // Merge seguro con defaults por si se agregaron nuevas claves
    if (typeof DEFAULT_HOTEL_CONTENT !== 'undefined') {
      return deepMerge(DEFAULT_HOTEL_CONTENT, parsed);
    }
    return parsed;
  } catch (e) {
    console.error('Error al leer contenido de localStorage:', e);
    return typeof DEFAULT_HOTEL_CONTENT !== 'undefined' ? DEFAULT_HOTEL_CONTENT : {};
  }
}

/**
 * Guardar contenido en localStorage y disparar evento custom
 */
function saveHotelContent(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('hotelContentUpdated', { detail: data }));
    return true;
  } catch (e) {
    console.error('Error al persistir contenido:', e);
    return false;
  }
}

/**
 * Resetear contenido a los valores iniciales de fábrica
 */
function resetHotelContentToDefault() {
  if (typeof DEFAULT_HOTEL_CONTENT !== 'undefined') {
    saveHotelContent(DEFAULT_HOTEL_CONTENT);
    return DEFAULT_HOTEL_CONTENT;
  }
  return null;
}

/**
 * Exportar archivo de respaldo JSON
 */
function exportContentAsJSON() {
  const content = getHotelContent();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `mirasoles-contenido-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Importar archivo de respaldo JSON y restaurar
 */
function importContentFromJSON(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No se seleccionó ningún archivo"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!json.hotel || !json.contact) {
          throw new Error("El archivo no tiene el formato válido de Hotel Mirasoles.");
        }
        saveHotelContent(json);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

/**
 * Utilidad para resolver propiedades anidadas tipo "hotel.name"
 */
function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : undefined), obj);
}

/**
 * Fusión recursiva de objetos
 */
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Sincronización automática de todos los elementos data-cms en el DOM
 */
function syncDOMWithContent() {
  const content = getHotelContent();
  if (!content) return;

  // 1. Textos: [data-cms="path.to.key"]
  document.querySelectorAll('[data-cms]').forEach(el => {
    const key = el.getAttribute('data-cms');
    const val = getNestedValue(content, key);
    if (val !== undefined && val !== null) {
      el.textContent = val;
    }
  });

  // 2. Imágenes: [data-cms-img="path.to.key"]
  document.querySelectorAll('[data-cms-img]').forEach(el => {
    const key = el.getAttribute('data-cms-img');
    const val = getNestedValue(content, key);
    if (val) {
      el.src = val;
    }
  });

  // 3. Enlaces WhatsApp: [data-cms-whatsapp]
  const waNumber = content.contact?.whatsappNumber || '5492262324248';
  const waDisplay = content.contact?.whatsappDisplay || '+54 9 2262 32-4248';
  document.querySelectorAll('[data-cms-whatsapp]').forEach(el => {
    if (el.tagName === 'A') {
      const currentHref = el.getAttribute('href') || '';
      // Si el enlace tiene un texto personalizado en el query (?text=...) preservarlo
      let queryPart = '';
      if (currentHref.includes('?text=')) {
        queryPart = '?' + currentHref.split('?')[1];
      } else {
        queryPart = `?text=${encodeURIComponent('Hola Hotel Mirasoles, me comunico desde su sitio web para consultar disponibilidad.')}`;
      }
      el.setAttribute('href', `https://wa.me/${waNumber}${queryPart}`);
      // Si el enlace tiene el texto por defecto o número, actualizarlo
      if (el.getAttribute('data-cms-whatsapp-text') === 'true') {
        el.textContent = waDisplay;
      }
    } else {
      el.textContent = waDisplay;
    }
  });

  // 4. Enlaces Email: [data-cms-email]
  const email = content.contact?.email || 'Mirasoles.necochea@gmail.com';
  document.querySelectorAll('[data-cms-email]').forEach(el => {
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${email}`);
      if (el.getAttribute('data-cms-email-text') === 'true') {
        el.textContent = email;
      }
    } else {
      el.textContent = email;
    }
  });

  // 5. Barra Promocional: [data-cms-promo]
  const promoEl = document.querySelector('[data-cms-promo]');
  if (promoEl) {
    if (content.promo && content.promo.active) {
      promoEl.classList.remove('hidden');
      const textEl = promoEl.querySelector('[data-cms-promo-text]');
      if (textEl) textEl.textContent = content.promo.text;
      const btnEl = promoEl.querySelector('[data-cms-promo-btn]');
      if (btnEl) {
        btnEl.textContent = content.promo.btnText || 'Consultar';
        btnEl.setAttribute('href', content.promo.link || `https://wa.me/${waNumber}`);
      }
    } else {
      promoEl.classList.add('hidden');
    }
  }

  // 6. Galerías automáticas: [data-cms-gallery="path.to.array"]
  document.querySelectorAll('[data-cms-gallery]').forEach(container => {
    const key = container.getAttribute('data-cms-gallery');
    const images = getNestedValue(content, key);
    if (Array.isArray(images) && images.length > 0) {
      renderGalleryElement(container, images);
    }
  });
}

/**
 * Renderiza galería con Lightbox
 */
function renderGalleryElement(container, images) {
  container.innerHTML = '';
  images.forEach((imgUrl, idx) => {
    const thumb = document.createElement('div');
    thumb.className = 'relative group cursor-pointer overflow-hidden rounded-xl bg-gray-100 aspect-video shadow-sm transition transform hover:-translate-y-1 hover:shadow-md';
    thumb.innerHTML = `
      <img src="${imgUrl}" alt="Foto de Hotel Mirasoles ${idx + 1}" class="w-full h-full object-cover transition duration-300 group-hover:scale-105" loading="lazy">
      <div class="absolute inset-0 bg-mirasoles-navy/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
        <svg class="w-8 h-8 filter drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
        </svg>
      </div>
    `;
    thumb.addEventListener('click', () => openLightbox(images, idx));
    container.appendChild(thumb);
  });
}

/**
 * LIGHTBOX GLOBAL MODAL
 */
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function setupLightboxDOM() {
  if (document.getElementById('mirasoles-lightbox')) return;
  const modal = document.createElement('div');
  modal.id = 'mirasoles-lightbox';
  modal.className = 'fixed inset-0 z-[100] bg-black/95 backdrop-blur-md hidden flex flex-col items-center justify-center p-4 select-none';
  modal.innerHTML = `
    <!-- Barra superior -->
    <div class="absolute top-4 right-4 flex items-center gap-3 z-10">
      <span id="lb-counter" class="text-white/80 text-sm font-medium tracking-wide"></span>
      <button id="lb-close" class="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition" aria-label="Cerrar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Flecha Anterior -->
    <button id="lb-prev" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition" aria-label="Anterior">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>

    <!-- Imagen Principal -->
    <div class="max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden">
      <img id="lb-img" src="" alt="Vista previa" class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition duration-200">
    </div>

    <!-- Flecha Siguiente -->
    <button id="lb-next" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition" aria-label="Siguiente">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  `;
  document.body.appendChild(modal);

  // Listeners
  modal.querySelector('#lb-close').addEventListener('click', closeLightbox);
  modal.querySelector('#lb-prev').addEventListener('click', prevLightboxImage);
  modal.querySelector('#lb-next').addEventListener('click', nextLightboxImage);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    const m = document.getElementById('mirasoles-lightbox');
    if (!m || m.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
  });
}

function openLightbox(images, index = 0) {
  setupLightboxDOM();
  currentLightboxImages = images;
  currentLightboxIndex = index;
  updateLightboxView();
  const modal = document.getElementById('mirasoles-lightbox');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeLightbox() {
  const modal = document.getElementById('mirasoles-lightbox');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function prevLightboxImage() {
  if (!currentLightboxImages.length) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
  updateLightboxView();
}

function nextLightboxImage() {
  if (!currentLightboxImages.length) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
  updateLightboxView();
}

function updateLightboxView() {
  const img = document.getElementById('lb-img');
  const counter = document.getElementById('lb-counter');
  if (img && currentLightboxImages[currentLightboxIndex]) {
    img.src = currentLightboxImages[currentLightboxIndex];
    counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
  }
}

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  syncDOMWithContent();
});

// Reactivar si el contenido cambia desde otra pestaña o desde el admin
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    syncDOMWithContent();
  }
});

window.addEventListener('hotelContentUpdated', () => {
  syncDOMWithContent();
});

// Exportaciones globales
window.getHotelContent = getHotelContent;
window.saveHotelContent = saveHotelContent;
window.resetHotelContentToDefault = resetHotelContentToDefault;
window.exportContentAsJSON = exportContentAsJSON;
window.importContentFromJSON = importContentFromJSON;
window.syncDOMWithContent = syncDOMWithContent;
window.openLightbox = openLightbox;
