/**
 * MAIN JAVASCRIPT - HOTEL MIRASOLES (NECOCHEA)
 * Interacciones generales de UI, Navegación, Calculadora de Estadía y Filtros
 */

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupStickyNav();
  setupRoomFilters();
  setupReservationForm();
  setupFAQAccordion();
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

    // Cerrar al clickear cualquier link del menú
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
      // Activar estilo botón
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
  const summaryBox = document.getElementById('res-summary-box');
  const guestNameInput = document.getElementById('res-name');
  const commentsInput = document.getElementById('res-comments');
  const parkingCheckbox = document.getElementById('res-parking');

  // Configurar fecha mínima hoy
  const today = new Date().toISOString().split('T')[0];
  if (checkinInput) {
    checkinInput.min = today;
    // Por defecto mañana
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 4);

    checkinInput.value = tomorrow.toISOString().split('T')[0];
    if (checkoutInput) {
      checkoutInput.min = tomorrow.toISOString().split('T')[0];
      checkoutInput.value = dayAfter.toISOString().split('T')[0];
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

    // Formatear fechas en formato DD/MM/AAAA
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
        // Cerrar todos los demás
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
