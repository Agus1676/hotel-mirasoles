/**
 * MAIN JAVASCRIPT - HOTEL MIRASOLES (NECOCHEA)
 * Interacciones generales de UI, Navegación, Calculadora de Estadía, Prefill de Fechas y Botón WhatsApp Flotante
 */

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupStickyNav();
  setupRoomFilters();
  setupReservationForm();
  setupFAQAccordion();
  setupFloatingWhatsApp();
});

/**
 * Menú Móvil
 */
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        menu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    }

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }
}

/**
 * Navbar con sombra al hacer scroll
 */
function setupStickyNav() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-md', 'py-3');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('shadow-md', 'py-3');
      navbar.classList.add('py-4');
    }
  });
}

/**
 * Filtros de Habitaciones (en habitaciones.html)
 */
function setupRoomFilters() {
  const filterBtns = document.querySelectorAll('[data-filter-capacity]');
  const roomCards = document.querySelectorAll('.room-card');

  if (!filterBtns.length || !roomCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-mirasoles-gold', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-mirasoles-navy', 'hover:bg-mirasoles-sand');
      });
      btn.classList.add('bg-mirasoles-gold', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-mirasoles-navy', 'hover:bg-mirasoles-sand');

      const targetCapacity = btn.getAttribute('data-filter-capacity');

      roomCards.forEach(card => {
        const capacity = parseInt(card.getAttribute('data-capacity') || '0', 10);
        if (targetCapacity === 'all') {
          card.classList.remove('hidden');
        } else if (targetCapacity === '4+') {
          if (capacity >= 4) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        } else {
          if (capacity === parseInt(targetCapacity, 10)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
}

/**
 * Calculadora de Noches y Envío a WhatsApp (reservas.html)
 * Soporta precarga automática desde query params de index.html (?in=...&out=...&guests=...)
 */
function setupReservationForm() {
  const form = document.getElementById('reserva-cotizador-form');
  if (!form) return;

  const checkinInput = document.getElementById('res-checkin');
  const checkoutInput = document.getElementById('res-checkout');
  const roomSelect = document.getElementById('res-room');
  const adultsSelect = document.getElementById('res-adults');
  const childrenSelect = document.getElementById('res-children');
  const nightsDisplay = document.getElementById('res-nights-display');
  const guestNameInput = document.getElementById('res-name');
  const commentsInput = document.getElementById('res-comments');
  const parkingCheckbox = document.getElementById('res-parking');

  // Leer posibles parámetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const paramIn = urlParams.get('in');
  const paramOut = urlParams.get('out');
  const paramGuests = urlParams.get('guests');

  // Configurar fecha mínima hoy
  const today = new Date().toISOString().split('T')[0];
  if (checkinInput) {
    checkinInput.min = today;
    
    // Si viene por parámetro URL válido usarlo, sino mañana
    if (paramIn && paramIn >= today) {
      checkinInput.value = paramIn;
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      checkinInput.value = tomorrow.toISOString().split('T')[0];
    }

    if (checkoutInput) {
      checkoutInput.min = checkinInput.value;
      if (paramOut && paramOut > checkinInput.value) {
        checkoutInput.value = paramOut;
      } else {
        const nextDay = new Date(checkinInput.value);
        nextDay.setDate(nextDay.getDate() + 3);
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
    }
  }

  // Precarga de huéspedes si viene por URL
  if (paramGuests && adultsSelect) {
    const guestsNum = parseInt(paramGuests, 10);
    if (guestsNum >= 1 && guestsNum <= 5) {
      adultsSelect.value = String(guestsNum);
    }
    if (roomSelect) {
      if (guestsNum === 2) roomSelect.value = 'matrimonial';
      else if (guestsNum === 3) roomSelect.value = 'triple';
      else if (guestsNum >= 4) roomSelect.value = 'familiar';
    }
  }

  function calculateNights() {
    if (!checkinInput || !checkoutInput) return 0;
    const cin = new Date(checkinInput.value);
    const cout = new Date(checkoutInput.value);
    if (isNaN(cin) || isNaN(cout)) return 0;
    const diffTime = cout - cin;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  function updateNightsView() {
    const nights = calculateNights();
    if (nightsDisplay) {
      if (nights > 0) {
        nightsDisplay.textContent = `${nights} ${nights === 1 ? 'noche' : 'noches'}`;
        nightsDisplay.parentElement.classList.remove('text-red-500');
        nightsDisplay.parentElement.classList.add('text-mirasoles-gold');
      } else {
        nightsDisplay.textContent = 'Fecha inválida (Check-out debe ser posterior)';
        nightsDisplay.parentElement.classList.remove('text-mirasoles-gold');
        nightsDisplay.parentElement.classList.add('text-red-500');
      }
    }
  }

  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener('change', () => {
      checkoutInput.min = checkinInput.value;
      if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
        const nextDay = new Date(checkinInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
      updateNightsView();
    });

    checkoutInput.addEventListener('change', updateNightsView);
    updateNightsView();
  }

  // Enviar por WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nights = calculateNights();
    if (nights <= 0) {
      alert('Por favor selecciona una fecha de Check-out posterior a la de Check-in.');
      return;
    }

    const content = (typeof getHotelContent === 'function') ? getHotelContent() : {};
    const waNumber = content.contact?.whatsappNumber || '5492262324248';

    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const roomName = roomSelect ? roomSelect.options[roomSelect.selectedIndex].text : 'A definir';
    const adults = adultsSelect ? adultsSelect.value : '2';
    const children = childrenSelect ? childrenSelect.value : '0';
    const guestName = guestNameInput?.value ? guestNameInput.value.trim() : 'Huésped';
    const requiresParking = parkingCheckbox && parkingCheckbox.checked ? 'Sí, solicito cochera' : 'No requiero cochera';
    const comments = commentsInput?.value ? commentsInput.value.trim() : 'Sin comentarios adicionales';

    const formatDate = (isoStr) => {
      if (!isoStr) return '';
      const [y, m, d] = isoStr.split('-');
      return `${d}/${m}/${y}`;
    };

    const message = 
`☀️ *CONSULTA DE RESERVA - HOTEL MIRASOLES (NECOCHEA)* 🌊

👤 *Nombre:* ${guestName}
📅 *Ingreso (Check-in 14 hs):* ${formatDate(checkin)}
📅 *Egreso (Check-out 10 hs):* ${formatDate(checkout)}
🌙 *Estadía:* ${nights} ${nights === 1 ? 'noche' : 'noches'}
🛏️ *Habitación de interés:* ${roomName}
👥 *Pasajeros:* ${adults} adulto(s)${children !== '0' ? ` y ${children} menor(es)` : ''}
🚗 *Cochera:* ${requiresParking}
🥐 *Desayuno Buffet:* Incluido
💬 *Comentarios:* ${comments}

_Hola! Me gustaría conocer tarifas y disponibilidad para las fechas indicadas. ¡Muchas gracias!_`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

/**
 * Acordeón de FAQs
 */
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        faqItems.forEach(other => {
          other.querySelector('.faq-answer')?.classList.add('hidden');
          other.querySelector('.faq-icon')?.classList.remove('rotate-180');
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });
}

/**
 * Botón Flotante de WhatsApp para Todas las Páginas
 */
function setupFloatingWhatsApp() {
  // No mostrar en la pantalla de administración
  if (window.location.pathname.includes('/admin')) return;
  if (document.getElementById('mirasoles-wa-float')) return;

  const content = (typeof getHotelContent === 'function') ? getHotelContent() : {};
  const waNumber = content.contact?.whatsappNumber || '5492262324248';
  const defaultText = encodeURIComponent('Hola Hotel Mirasoles, me comunico desde el sitio web para consultar por disponibilidad y tarifas.');
  const waUrl = `https://wa.me/${waNumber}?text=${defaultText}`;

  const container = document.createElement('div');
  container.id = 'mirasoles-wa-float';
  container.className = 'fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none group';
  container.innerHTML = `
    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-mirasoles-navy px-4 py-2 rounded-full shadow-xl border border-gray-200 text-xs font-bold hover:text-mirasoles-wa transition transform hover:-translate-x-1">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
      <span class="w-2 h-2 rounded-full bg-emerald-500 -ml-4"></span>
      <span>¿Dudas o reservas? Escribinos</span>
    </a>
    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition transform duration-200" aria-label="Escribinos por WhatsApp a Recepción">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.54 2.012.827 3.064.827 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.518-4.482 10-10 10-1.748 0-3.411-.452-4.887-1.258l-5.113 1.34 1.365-4.992c-.895-1.536-1.365-3.29-1.365-5.09 0-5.518 4.482-10 10-10s10 4.482 10 10z"/>
      </svg>
    </a>
  `;
  document.body.appendChild(container);
}
