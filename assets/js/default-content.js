/**
 * DEFAULT HOTEL CONTENT - HOTEL MIRASOLES (NECOCHEA)
 * Fuente única de verdad inicial para el CMS client-side
 */
const DEFAULT_HOTEL_CONTENT = {
  version: "1.0",
  hotel: {
    name: "Hotel Mirasoles",
    tagline: "Calidez costera, sol y confort familiar en Necochea",
    description: "Ubicado en el corazón turístico de Necochea, Hotel Mirasoles le ofrece una estadía luminosa, acogedora y serena a pocos metros del mar y del Parque Miguel Lillo. Disfrute de nuestro afamado Desayuno Buffet continental artesanal y la calidez de un equipo dedicado a su descanso.",
    city: "Necochea",
    province: "Buenos Aires",
    country: "Argentina",
    address: "Calle 83 Nº 342, Necochea, Prov. de Buenos Aires",
    mapQuery: "Calle 83 342, Necochea, Buenos Aires",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.666750393247!2d-58.7185!3d-38.5794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9589d81d2e1b10a9%3A0x67c5147ff0f215d2!2sNecochea%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar",
    checkIn: "14:00 hs",
    checkOut: "10:00 hs",
    breakfastHours: "07:30 a 10:30 hs",
    breakfastSummary: "Desayuno Buffet continental incluido todos los días"
  },
  contact: {
    phone: "+54 9 2262 32-4248",
    whatsappNumber: "5492262324248",
    whatsappDisplay: "+54 9 2262 32-4248",
    email: "Mirasoles.necochea@gmail.com",
    receptionHours: "Atención 24 Horas",
    instagram: "https://instagram.com/hotelmirasolesnecochea",
    facebook: "https://facebook.com/hotelmirasolesnecochea"
  },
  promo: {
    active: true,
    text: "✨ ¡Viví Necochea! Reservá directo por WhatsApp con 15% OFF en estadías de 5+ noches y Desayuno Buffet incluido.",
    btnText: "Reservar por WhatsApp",
    link: "https://wa.me/5492262324248?text=Hola%20Hotel%20Mirasoles%2C%20quisiera%20consultar%20por%20la%20promoci%C3%B3n%20especial%20de%20estad%C3%ADas%20largas."
  },
  hero: {
    badge: "Hotel Costero & Familiar en Necochea",
    title: "La calidez del sol y el encanto del mar en tu estadía",
    subtitle: "Despertá con el aroma del café recién molido y nuestras medialunas artesanales. A minutos de las mejores playas de la Costa Atlántica y el místico Parque Miguel Lillo.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
    highlightOne: "Desayuno Buffet Continental Incluido",
    highlightTwo: "A 200m del Centro y Playas",
    highlightThree: "Cocheras & Wi-Fi de Alta Velocidad"
  },
  rooms: [
    {
      id: "doble-matrimonial",
      name: "Habitación Doble Matrimonial",
      category: "Doble",
      capacity: 2,
      capacityText: "Hasta 2 personas",
      bedConfig: "1 Cama Matrimonial King Size / Sommier 1.80m",
      description: "Espaciosa, luminosa y armoniosa. Diseñada para parejas que buscan descanso pleno con sommier de alta densidad, sábanas de percal de algodón y vista abierta a la brisa costera.",
      priceFrom: "$ 58.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Sommier King Size de resortes pocket",
        "Smart TV 43'' con Flow / cable",
        "Aire acondicionado split frío/calor",
        "Baño privado con secador de pelo y amenities",
        "Frigobar silencioso",
        "Wi-Fi de fibra óptica dedicado",
        "Caja de seguridad digital"
      ]
    },
    {
      id: "doble-twin",
      name: "Habitación Doble Twin",
      category: "Twin",
      capacity: 2,
      capacityText: "Hasta 2 personas",
      bedConfig: "2 Camas Individuales Sommier (0.90 x 1.90m)",
      description: "Ideal para amigos, compañeros de viaje o colegas. Disposición funcional con dos sommiers individuales de excelente confort, escritorio de trabajo y abundante luz natural.",
      priceFrom: "$ 55.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "2 Sommiers individuales de alta densidad",
        "Smart TV 32'' con cable digital",
        "Aire acondicionado split frío/calor",
        "Baño privado completo",
        "Wi-Fi de alta velocidad",
        "Caja de seguridad digital"
      ]
    },
    {
      id: "triple-superior",
      name: "Habitación Triple Superior",
      category: "Triple",
      capacity: 3,
      capacityText: "Hasta 3 personas",
      bedConfig: "1 Cama Matrimonial + 1 Cama Individual (o 3 Individuales)",
      description: "Amplitud y comodidad para familias pequeñas o grupos reducidos. Excelente circulación, placard amplio, escritorio y vistas agradables para una estadía placentera.",
      priceFrom: "$ 78.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Configuración versátil de camas",
        "Smart TV 43'' con cable y streaming",
        "Aire acondicionado split frío/calor",
        "Frigobar",
        "Baño privado amplio con bañera",
        "Wi-Fi de alta velocidad",
        "Caja fuerte individual"
      ]
    },
    {
      id: "departamento-familiar",
      name: "Departamento Familiar Suite",
      category: "Familiar",
      capacity: 5,
      capacityText: "Hasta 4 o 5 personas",
      bedConfig: "2 Ambientes: Dormitorio matrimonial + Dormitorio con 3 camas",
      description: "La opción predilecta de las familias que visitan Necochea. Dos ambientes independientes conectados, que aseguran la privacidad de los padres y el confort y diversión de los niños.",
      priceFrom: "$ 98.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Dos dormitorios separados e intercomunicados",
        "2 Smart TVs independientes (en ambos ambientes)",
        "Climatización split frío/calor individual",
        "Frigobar y pava eléctrica para mate/café",
        "Baño completo con antebaño",
        "Mobiliario para guardado de equipaje de playa",
        "Wi-Fi de alta velocidad"
      ]
    }
  ],
  services: [
    {
      id: "desayuno",
      title: "Desayuno Buffet Continental",
      subtitle: "Pastelería casera y opciones sin TACC",
      description: "Comenzá tus mañanas en Necochea con medialunas horneadas a diario, panes de masa madre, frutas frescas de estación, yogur, cereales, fiambres seleccionados, mermeladas regionales, cafetería de grano y rincón exclusivo para celíacos.",
      icon: "coffee",
      badge: "Incluido en tu tarifa",
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Medialunas de manteca y de grasa recién horneadas",
        "Tostadas artesanales con dulces regionales y queso crema",
        "Selección de frutas frescas y ensaladas de estación",
        "Café espresso, café con leche, tés variados y jugos cítricos",
        "Opciones certificadas sin TACC (gluten free) y leches vegetales",
        "Horario extendido de 07:30 a 10:30 hs para tu descanso"
      ]
    },
    {
      id: "cocheras",
      title: "Cocheras Cubiertas y Semicubiertas",
      subtitle: "Seguridad y tranquilidad para tu vehículo",
      description: "Estacionamiento propio y exclusivo dentro del predio del hotel, con acceso controlado y monitoreo para que disfrutes de tu estadía sin preocuparte por tu auto.",
      icon: "car",
      badge: "Sujeto a disponibilidad",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Espacios cubiertos y semicubiertos protegidos",
        "Portón automatizado con control de acceso",
        "Monitoreo perimetral y nocturno permanente",
        "Reserva anticipada recomendada en temporada alta"
      ]
    },
    {
      id: "wifi",
      title: "Conectividad Wi-Fi Libre de Fibra Óptica",
      subtitle: "Alta velocidad en todo el hotel",
      description: "Red inalámbrica con cobertura total tanto en habitaciones como en el lobby, desayunador y áreas de descanso, ideal tanto para relax como para nómades digitales.",
      icon: "wifi",
      badge: "100% Libre y Gratuito",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Banda ancha simétrica por fibra óptica",
        "Puntos de acceso dedicados en cada piso",
        "Ideal para videollamadas, streaming y trabajo remoto"
      ]
    },
    {
      id: "recepcion",
      title: "Recepción y Asistencia 24 Horas",
      subtitle: "Atención personalizada y custodia de equipaje",
      description: "Nuestro equipo de conserjería está a su entera disposición durante todo el día y la noche para resolver requerimientos, brindar asesoramiento y cuidar sus pertenencias.",
      icon: "clock",
      badge: "24/7",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Check-in ágil a partir de las 14:00 hs",
        "Check-out tranquilo hasta las 10:00 hs",
        "Custodia de equipaje gratuita antes del check-in o tras el check-out",
        "Guarda y recarga de termos para la playa"
      ]
    },
    {
      id: "mucama",
      title: "Servicio Diario de Mucama",
      subtitle: "Higiene y confort hospitalario",
      description: "Limpieza profunda diaria de habitaciones y áreas comunes, con recambio de toallas y sábanas de alta calidad para garantizar una experiencia fresca e impecable.",
      icon: "sparkles",
      badge: "Diario",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Acondicionamiento y ventilación diaria de habitaciones",
        "Blanquería de alta gama de puro algodón",
        "Amenities biodegradables de cortesía"
      ]
    },
    {
      id: "turismo",
      title: "Asesoramiento Turístico Necochea",
      subtitle: "Descubrí los mejores secretos de la ciudad",
      description: "Te guiamos para que vivas lo mejor de Necochea: las playas del sur, las excursiones a las dunas del Médano Blanco, las caminatas por el Parque Miguel Lillo y la mejor gastronomía de mar.",
      icon: "compass",
      badge: "Recomendaciones Locales",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      details: [
        "Descuentos en carpas de balnearios asociados",
        "Rutas guiadas por el Parque Miguel Lillo y Jardín Japonés",
        "Información de pesca deportiva, surf y escuelas náuticas",
        "Recomendaciones gastronómicas en Puerto Quequén y el centro"
      ]
    }
  ],
  experiences: {
    title: "Viví una experiencia costera inolvidable",
    subtitle: "Necochea combina las playas más extensas y tranquilas de la provincia con bosques de pinos, dunas milenarias y la calidez de su gente.",
    points: [
      {
        title: "A pasos de la playa y el sol",
        desc: "Caminá relajadamente hacia la rambla costera para disfrutar del mar, los atardeceres y las brisas marinas.",
        icon: "sun"
      },
      {
        title: "Parque Miguel Lillo",
        desc: "Más de 600 hectáreas de bosques de pinos y eucaliptos para hacer trekking, bicicleta y conectar con la naturaleza.",
        icon: "tree"
      },
      {
        title: "Gastronomía Marplatense & Quequén",
        desc: "Saboreá mariscos frescos, pescados del día y las tradicionales carnes argentinas en la zona portuaria y costera.",
        icon: "utensils"
      },
      {
        title: "Ambiente Familiar y Apacible",
        desc: "Un destino seguro, amigable y distendido pensado para el descanso integral de chicos y grandes.",
        icon: "heart"
      }
    ]
  },
  faqs: [
    {
      question: "¿Cuáles son los horarios oficiales de Check-in y Check-out?",
      answer: "El horario oficial de Check-in es a partir de las 14:00 hs y el Check-out es hasta las 10:00 hs. Si llega antes de las 14:00 hs, puede dejar su equipaje en custodia en recepción sin costo y comenzar a disfrutar de la ciudad o la playa."
    },
    {
      question: "¿El desayuno buffet está incluido en todas las tarifas?",
      answer: "Sí, todas las tarifas de Hotel Mirasoles incluyen nuestro exquisito Desayuno Buffet continental servido todos los días de 07:30 a 10:30 hs. Contamos además con opciones sin TACC para personas celíacas."
    },
    {
      question: "¿El hotel cuenta con cochera para vehículos?",
      answer: "Contamos con cocheras cubiertas y semicubiertas dentro del predio. Al ser con cupos limitados, recomendamos solicitar la reserva de cochera al momento de consultar por WhatsApp."
    },
    {
      question: "¿A qué distancia se encuentra el hotel de la playa?",
      answer: "Hotel Mirasoles se encuentra en una ubicación estratégica inmejorable sobre la Calle 83, en el corazón del circuito turístico de Necochea, a solo unos 250 metros de las amplias playas y a minutos a pie del Parque Miguel Lillo."
    },
    {
      question: "¿Cómo se confirma una reserva y qué medios de pago aceptan?",
      answer: "Las reservas se confirman vía WhatsApp coordinando con recepción mediante una seña bancaria por transferencia (alias / CBU). El saldo restante se abona al momento de realizar el check-in (efectivo, débito, crédito o transferencia)."
    },
    {
      question: "¿Aceptan mascotas o cunas para bebés?",
      answer: "Disponemos de practicunas para bebés menores de 2 años bajo solicitud previa al momento de reservar. Respecto a mascotas, por protocolo de higiene y tranquilidad de todos los huéspedes, consultar previamente con recepción sobre razas pequeñas y condiciones."
    }
  ],
  security: {
    adminPassword: "mirasoles2026"
  }
};

// Exportar globalmente
if (typeof window !== "undefined") {
  window.DEFAULT_HOTEL_CONTENT = DEFAULT_HOTEL_CONTENT;
}
