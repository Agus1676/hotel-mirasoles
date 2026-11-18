/**
 * ADMIN CMS PANEL - HOTEL MIRASOLES (NECOCHEA)
 * Controlador del panel de administración interactivo client-side
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminTabs();
  initFormSync();
});

/**
 * Autenticación de Administrador
 */
function initAdminAuth() {
  const loginModal = document.getElementById('admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const loginError = document.getElementById('admin-login-error');
  const adminContent = document.getElementById('admin-dashboard');
  const logoutBtn = document.getElementById('admin-logout-btn');

  const content = getHotelContent();
  const currentPassword = content.security?.adminPassword || 'mirasoles2026';

  const isLoggedIn = sessionStorage.getItem('mirasoles_admin_auth') === 'true';

  if (isLoggedIn) {
    if (loginModal) loginModal.classList.add('hidden');
    if (adminContent) adminContent.classList.remove('blur-sm', 'pointer-events-none');
    loadAllFormData();
  } else {
    if (loginModal) loginModal.classList.remove('hidden');
    if (adminContent) adminContent.classList.add('blur-sm', 'pointer-events-none');
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = passwordInput.value.trim();
      const freshContent = getHotelContent();
      const pass = freshContent.security?.adminPassword || 'mirasoles2026';

      if (entered === pass) {
        sessionStorage.setItem('mirasoles_admin_auth', 'true');
        loginModal.classList.add('hidden');
        adminContent.classList.remove('blur-sm', 'pointer-events-none');
        loginError.classList.add('hidden');
        passwordInput.value = '';
        loadAllFormData();
        showToast('¡Bienvenido al Panel CMS de Hotel Mirasoles!');
      } else {
        loginError.textContent = 'Contraseña incorrecta. Por defecto es "mirasoles2026".';
        loginError.classList.remove('hidden');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('mirasoles_admin_auth');
      window.location.reload();
    });
  }
}

/**
 * Navegación por pestañas del panel
 */
function initAdminTabs() {
  const tabButtons = document.querySelectorAll('[data-admin-tab]');
  const tabPanels = document.querySelectorAll('.admin-tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-admin-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active', 'border-mirasoles-gold', 'text-mirasoles-gold', 'bg-amber-50/50');
        b.classList.add('border-transparent', 'text-gray-500', 'hover:text-mirasoles-navy');
      });

      btn.classList.add('active', 'border-mirasoles-gold', 'text-mirasoles-gold', 'bg-amber-50/50');
      btn.classList.remove('border-transparent', 'text-gray-500');

      tabPanels.forEach(p => {
        if (p.id === `tab-${target}`) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Cargar datos de localStorage a los formularios
 */
function loadAllFormData() {
  const content = getHotelContent();

  // 1. General & Contacto
  setVal('cfg-hotel-name', content.hotel?.name);
  setVal('cfg-hotel-tagline', content.hotel?.tagline);
  setVal('cfg-hotel-desc', content.hotel?.description);
  setVal('cfg-hotel-address', content.hotel?.address);
  setVal('cfg-hotel-mapurl', content.hotel?.mapEmbedUrl);
  setVal('cfg-hotel-checkin', content.hotel?.checkIn);
  setVal('cfg-hotel-checkout', content.hotel?.checkOut);
  setVal('cfg-hotel-breakfast-hours', content.hotel?.breakfastHours);

  setVal('cfg-contact-whatsapp-number', content.contact?.whatsappNumber);
  setVal('cfg-contact-whatsapp-display', content.contact?.whatsappDisplay);
  setVal('cfg-contact-email', content.contact?.email);
  setVal('cfg-contact-phone', content.contact?.phone);
  setVal('cfg-contact-reception', content.contact?.receptionHours);

  // 2. Hero & Inicio
  setVal('cfg-hero-badge', content.hero?.badge);
  setVal('cfg-hero-title', content.hero?.title);
  setVal('cfg-hero-subtitle', content.hero?.subtitle);
  setVal('cfg-hero-image', content.hero?.imageUrl);
  setVal('cfg-hero-hl1', content.hero?.highlightOne);
  setVal('cfg-hero-hl2', content.hero?.highlightTwo);
  setVal('cfg-hero-hl3', content.hero?.highlightThree);

  // 3. Aviso Promocional
  const promoCheck = document.getElementById('cfg-promo-active');
  if (promoCheck) promoCheck.checked = Boolean(content.promo?.active);
  setVal('cfg-promo-text', content.promo?.text);
  setVal('cfg-promo-btn', content.promo?.btnText);
  setVal('cfg-promo-link', content.promo?.link);

  // 4. Renderizar listas dinámicas
  renderRoomsAdminList(content.rooms || []);
  renderServicesAdminList(content.services || []);
  renderFaqsAdminList(content.faqs || []);
}

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) {
    el.value = value;
  }
}

/**
 * Inicializar eventos de guardado por formulario
 */
function initFormSync() {
  // Form General
  const formGeneral = document.getElementById('form-admin-general');
  if (formGeneral) {
    formGeneral.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = getHotelContent();
      content.hotel = content.hotel || {};
      content.contact = content.contact || {};

      content.hotel.name = document.getElementById('cfg-hotel-name').value;
      content.hotel.tagline = document.getElementById('cfg-hotel-tagline').value;
      content.hotel.description = document.getElementById('cfg-hotel-desc').value;
      content.hotel.address = document.getElementById('cfg-hotel-address').value;
      content.hotel.mapEmbedUrl = document.getElementById('cfg-hotel-mapurl').value;
      content.hotel.checkIn = document.getElementById('cfg-hotel-checkin').value;
      content.hotel.checkOut = document.getElementById('cfg-hotel-checkout').value;
      content.hotel.breakfastHours = document.getElementById('cfg-hotel-breakfast-hours').value;

      content.contact.whatsappNumber = document.getElementById('cfg-contact-whatsapp-number').value.replace(/\D/g, '');
      content.contact.whatsappDisplay = document.getElementById('cfg-contact-whatsapp-display').value;
      content.contact.email = document.getElementById('cfg-contact-email').value;
      content.contact.phone = document.getElementById('cfg-contact-phone').value;
      content.contact.receptionHours = document.getElementById('cfg-contact-reception').value;

      saveHotelContent(content);
      showToast('Información General y Contacto actualizada');
    });
  }

  // Form Hero
  const formHero = document.getElementById('form-admin-hero');
  if (formHero) {
    formHero.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = getHotelContent();
      content.hero = content.hero || {};

      content.hero.badge = document.getElementById('cfg-hero-badge').value;
      content.hero.title = document.getElementById('cfg-hero-title').value;
      content.hero.subtitle = document.getElementById('cfg-hero-subtitle').value;
      content.hero.imageUrl = document.getElementById('cfg-hero-image').value;
      content.hero.highlightOne = document.getElementById('cfg-hero-hl1').value;
      content.hero.highlightTwo = document.getElementById('cfg-hero-hl2').value;
      content.hero.highlightThree = document.getElementById('cfg-hero-hl3').value;

      saveHotelContent(content);
      showToast('Página de Inicio / Hero actualizado');
    });
  }

  // Form Promo
  const formPromo = document.getElementById('form-admin-promo');
  if (formPromo) {
    formPromo.addEventListener('submit', (e) => {
      e.preventDefault();
      const content = getHotelContent();
      content.promo = content.promo || {};

      content.promo.active = document.getElementById('cfg-promo-active').checked;
      content.promo.text = document.getElementById('cfg-promo-text').value;
      content.promo.btnText = document.getElementById('cfg-promo-btn').value;
      content.promo.link = document.getElementById('cfg-promo-link').value;

      saveHotelContent(content);
      showToast('Aviso promocional actualizado');
    });
  }

  // Form Seguridad (Cambio de contraseña)
  const formSec = document.getElementById('form-admin-security');
  if (formSec) {
    formSec.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPass = document.getElementById('cfg-new-password').value.trim();
      const confirmPass = document.getElementById('cfg-confirm-password').value.trim();

      if (!newPass || newPass.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }
      if (newPass !== confirmPass) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const content = getHotelContent();
      content.security = content.security || {};
      content.security.adminPassword = newPass;
      saveHotelContent(content);

      document.getElementById('cfg-new-password').value = '';
      document.getElementById('cfg-confirm-password').value = '';
      showToast('Contraseña de administrador actualizada con éxito');
    });
  }

  // Botón Exportar JSON
  const btnExport = document.getElementById('btn-admin-export-json');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      exportContentAsJSON();
      showToast('Archivo JSON de respaldo descargado');
    });
  }

  // Input Importar JSON
  const inputImport = document.getElementById('input-admin-import-json');
  if (inputImport) {
    inputImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (confirm('¿Desea restaurar el contenido desde este archivo JSON? Se sobrescribirán los datos actuales.')) {
        importContentFromJSON(file)
          .then(() => {
            loadAllFormData();
            showToast('¡Datos restaurados con éxito desde el archivo!');
          })
          .catch((err) => {
            alert('Error al importar archivo: ' + err.message);
          });
      }
      inputImport.value = '';
    });
  }

  // Botón Restaurar Valores de Fábrica
  const btnReset = document.getElementById('btn-admin-reset-default');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('¿Está seguro de restablecer todos los textos, fotos y habitaciones a los valores originales de Hotel Mirasoles? Esta acción reemplazará sus modificaciones.')) {
        resetHotelContentToDefault();
        loadAllFormData();
        showToast('Valores restablecidos a los originales de fábrica');
      }
    });
  }
}

/**
 * Renderizar y Administrar Habitaciones
 */
function renderRoomsAdminList(rooms) {
  const container = document.getElementById('admin-rooms-list');
  if (!container) return;

  container.innerHTML = '';
  rooms.forEach((room, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4';
    card.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <span class="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 mb-1">Capacidad: ${room.capacity} personas (${room.category})</span>
          <h4 class="text-lg font-serif font-bold text-mirasoles-navy">${room.name}</h4>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" class="btn-save-room px-3 py-1.5 text-xs font-medium rounded-lg bg-mirasoles-navy text-white hover:bg-mirasoles-navy-dark transition">Guardar cambios</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Nombre de Habitación</label>
          <input type="text" class="room-name-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent" value="${room.name}">
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Tarifa Referencia</label>
          <input type="text" class="room-price-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent" value="${room.priceFrom || ''}">
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Capacidad (Pasajeros)</label>
          <input type="number" min="1" max="10" class="room-cap-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent" value="${room.capacity}">
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">Configuración de Camas / Sommiers</label>
        <input type="text" class="room-beds-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent" value="${room.bedConfig}">
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">Descripción</label>
        <textarea rows="2" class="room-desc-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent">${room.description}</textarea>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">URLs de Fotos (separadas por salto de línea)</label>
        <textarea rows="3" class="room-imgs-input w-full font-mono text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent">${(room.images || []).join('\n')}</textarea>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">Amenidades (separadas por coma o salto de línea)</label>
        <textarea rows="2" class="room-amenities-input w-full text-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mirasoles-gold focus:border-transparent">${(room.amenities || []).join('\n')}</textarea>
      </div>
    `;

    // Botón guardar habitación específica
    card.querySelector('.btn-save-room').addEventListener('click', () => {
      const content = getHotelContent();
      if (!content.rooms || !content.rooms[idx]) return;

      content.rooms[idx].name = card.querySelector('.room-name-input').value.trim();
      content.rooms[idx].priceFrom = card.querySelector('.room-price-input').value.trim();
      content.rooms[idx].capacity = parseInt(card.querySelector('.room-cap-input').value, 10) || 2;
      content.rooms[idx].bedConfig = card.querySelector('.room-beds-input').value.trim();
      content.rooms[idx].description = card.querySelector('.room-desc-input').value.trim();

      const rawImgs = card.querySelector('.room-imgs-input').value.split('\n').map(s => s.trim()).filter(Boolean);
      content.rooms[idx].images = rawImgs;

      const rawAmenities = card.querySelector('.room-amenities-input').value.split('\n').map(s => s.trim()).filter(Boolean);
      content.rooms[idx].amenities = rawAmenities;

      saveHotelContent(content);
      showToast(`Habitación "${content.rooms[idx].name}" guardada con éxito`);
    });

    container.appendChild(card);
  });
}

/**
 * Renderizar y Administrar Servicios
 */
function renderServicesAdminList(services) {
  const container = document.getElementById('admin-services-list');
  if (!container) return;

  container.innerHTML = '';
  services.forEach((service, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3';
    card.innerHTML = `
      <div class="flex items-center justify-between border-b border-gray-100 pb-2">
        <h4 class="font-serif font-bold text-mirasoles-navy">${service.title}</h4>
        <button type="button" class="btn-save-srv px-3 py-1.5 text-xs font-medium rounded-lg bg-mirasoles-navy text-white hover:bg-mirasoles-navy-dark transition">Guardar</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Título</label>
          <input type="text" class="srv-title-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" value="${service.title}">
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-700 mb-1">Subtítulo / Etiqueta</label>
          <input type="text" class="srv-sub-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" value="${service.subtitle || ''}">
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">Descripción</label>
        <textarea rows="2" class="srv-desc-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">${service.description}</textarea>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">URL de Imagen</label>
        <input type="text" class="srv-img-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" value="${service.image || ''}">
      </div>
    `;

    card.querySelector('.btn-save-srv').addEventListener('click', () => {
      const content = getHotelContent();
      if (!content.services || !content.services[idx]) return;

      content.services[idx].title = card.querySelector('.srv-title-input').value.trim();
      content.services[idx].subtitle = card.querySelector('.srv-sub-input').value.trim();
      content.services[idx].description = card.querySelector('.srv-desc-input').value.trim();
      content.services[idx].image = card.querySelector('.srv-img-input').value.trim();

      saveHotelContent(content);
      showToast(`Servicio "${content.services[idx].title}" actualizado`);
    });

    container.appendChild(card);
  });
}

/**
 * Renderizar y Administrar Preguntas Frecuentes
 */
function renderFaqsAdminList(faqs) {
  const container = document.getElementById('admin-faqs-list');
  if (!container) return;

  container.innerHTML = '';
  faqs.forEach((faq, idx) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-gray-400">Pregunta #${idx + 1}</span>
        <div class="flex gap-2">
          <button type="button" class="btn-save-faq px-2.5 py-1 text-xs rounded bg-mirasoles-navy text-white hover:bg-mirasoles-navy-dark">Guardar</button>
          <button type="button" class="btn-del-faq px-2.5 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200">Eliminar</button>
        </div>
      </div>
      <input type="text" class="faq-q-input w-full px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg" value="${faq.question}">
      <textarea rows="2" class="faq-a-input w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg">${faq.answer}</textarea>
    `;

    card.querySelector('.btn-save-faq').addEventListener('click', () => {
      const content = getHotelContent();
      if (!content.faqs || !content.faqs[idx]) return;
      content.faqs[idx].question = card.querySelector('.faq-q-input').value.trim();
      content.faqs[idx].answer = card.querySelector('.faq-a-input').value.trim();
      saveHotelContent(content);
      showToast('Pregunta frecuente guardada');
    });

    card.querySelector('.btn-del-faq').addEventListener('click', () => {
      if (confirm('¿Eliminar esta pregunta frecuente?')) {
        const content = getHotelContent();
        content.faqs.splice(idx, 1);
        saveHotelContent(content);
        renderFaqsAdminList(content.faqs);
        showToast('Pregunta eliminada');
      }
    });

    container.appendChild(card);
  });

  // Botón para agregar nueva pregunta
  const addBtn = document.getElementById('btn-add-faq');
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.dataset.bound = 'true';
    addBtn.addEventListener('click', () => {
      const content = getHotelContent();
      content.faqs = content.faqs || [];
      content.faqs.push({
        question: 'Nueva Pregunta Frecuente',
        answer: 'Respuesta detallada para los huéspedes...'
      });
      saveHotelContent(content);
      renderFaqsAdminList(content.faqs);
      showToast('Nueva pregunta agregada');
    });
  }
}

/**
 * Toast flotante de confirmación
 */
function showToast(message) {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-mirasoles-navy text-white px-5 py-3.5 rounded-xl shadow-2xl border border-mirasoles-gold/30 flex items-center gap-3 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </span>
    <span class="text-sm font-medium tracking-wide">${message}</span>
  `;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3500);
}
