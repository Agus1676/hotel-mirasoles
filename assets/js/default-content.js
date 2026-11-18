/**
 * DEFAULT HOTEL CONTENT - HOTEL MIRASOLES (NECOCHEA)
 * Fuente única de verdad inicial para el CMS client-side
 */
const DEFAULT_HOTEL_CONTENT = {
  version: "2.0",
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
    breakfastSummary: "Desayuno Buffet continental incluido todos los días (con opciones sin TACC)"
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
    text: "✨ ¡Temporada en Necochea! Reservá directo por WhatsApp y asegurá 15% OFF en estadías de 5+ noches con Desayuno Buffet incluido.",
    btnText: "Reservar por WhatsApp",
    link: "https://wa.me/5492262324248?text=Hola%20Hotel%20Mirasoles%2C%20quisiera%20consultar%20por%20la%20promoci%C3%B3n%20especial%20de%20estad%C3%ADas%20largas."
  },
  hero: {
    badge: "Hotel Costero & Familiar · Necochea",
    title: "Donde el sonido del mar abraza tu descanso",
    subtitle: "Despertá con el aroma del café recién tostado y nuestras medialunas artesanales. A sólo 250 metros de las amplias playas de Necochea y del místico Parque Miguel Lillo.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
    highlightOne: "Desayuno Buffet Continental Incluido",
    highlightTwo: "A 250m de la Playa y Centro Comercial",
    highlightThree: "Cocheras Propias & Wi-Fi Dedicado"
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
        "Smart TV 43'' con Flow y canales HD",
        "Aire acondicionado split frío/calor individual",
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
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "2 Sommiers individuales de alta densidad",
        "Smart TV 43'' con Flow",
        "Aire acondicionado frío/calor",
        "Baño privado completo",
        "Wi-Fi libre de alta velocidad",
        "Servicio diario de mucama y ropa blanca"
      ]
    },
    {
      id: "triple-superior",
      name: "Habitación Triple Superior",
      category: "Triple",
      capacity: 3,
      capacityText: "Hasta 3 personas",
      bedConfig: "1 Cama Matrimonial + 1 Cama Individual (o 3 Twin)",
      description: "Amplitud y comodidad para familias pequeñas o grupos de tres. Excelente circulación, placard amplio y baño completo con ventilación natural.",
      priceFrom: "$ 78.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "Configuración versátil de camas sommier",
        "Smart TV 43''",
        "Climatización split frío/calor",
        "Frigobar y pava eléctrica",
        "Baño privado amplio",
        "Wi-Fi de fibra óptica",
        "Caja de seguridad"
      ]
    },
    {
      id: "departamento-familiar",
      name: "Departamento Familiar (2 Ambientes)",
      category: "Familiar",
      capacity: 5,
      capacityText: "Hasta 4 o 5 personas",
      bedConfig: "Dormitorio matrimonial + Dormitorio con 2 o 3 camas",
      description: "La opción preferida por familias que visitan Necochea. Dos ambientes independientes comunicados que garantizan privacidad para los adultos y comodidad para los niños.",
      priceFrom: "$ 98.000",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80"
      ],
      amenities: [
        "2 Ambientes independientes comunicados",
        "2 Smart TVs (uno en cada ambiente)",
        "Aire acondicionado en ambos sectores",
        "Frigobar y microondas",
        "Baño privado completo de doble acceso",
        "Cochera cubierta asignada (opcional)",
        "Wi-Fi familiar de alta velocidad"
      ]
    }
  ],
  services: [
    {
      id: "desayuno-buffet",
      title: "Desayuno Buffet Continental",
      subtitle: "Horario: 07:30 a 10:30 hs",
      description: "Empezá cada mañana frente al mar con medialunas y facturas recién horneadas, variedad de panes artesanales, tostadas, mermeladas regionales, cereales, yogur, frutas de estación, jamón cocido, quesos seleccionados y café de grano molido en el momento. Contamos con sector exclusivo y seguro para celíacos (sin TACC).",
      icon: "coffee",
      highlight: true,
      image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80",
      badge: "Incluido en tu estadía"
    },
    {
      id: "cocheras-estacionamiento",
      title: "Cocheras & Estacionamiento",
      subtitle: "Acceso seguro y protegido",
      description: "Disponemos de espacios de cocheras cubiertas y semicubiertas dentro del predio del hotel para su vehículo, brindando tranquilidad absoluta durante sus vacaciones en la costa.",
      icon: "car",
      highlight: false,
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
      badge: "Sujeto a disponibilidad"
    },
    {
      id: "wifi-fibra-optica",
      title: "Wi-Fi Fibra Óptica Dedicada",
      subtitle: "Conexión de alta velocidad libre",
      description: "Cobertura inalámbrica de fibra óptica en todas las habitaciones, lobby, salón desayunador y espacios comunes, ideal para compartir tus recuerdos o trabajar a distancia.",
      icon: "wifi",
      highlight: false,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
      badge: "Sin costo adicional"
    },
    {
      id: "recepcion-24hs",
      title: "Recepción & Asistencia 24 Horas",
      subtitle: "Personal cálido a tu servicio",
      description: "Check-in a partir de las 14:00 hs y check-out hasta las 10:00 hs. Atención permanente las 24 horas para resolver cualquier necesidad, custodia de equipaje y recomendaciones turísticas.",
      icon: "clock",
      highlight: false,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      badge: "Siempre a tu disposición"
    },
    {
      id: "asesoramiento-turistico",
      title: "Asesoramiento Turístico Necochea",
      subtitle: "Las mejores playas, dunas y paseos",
      description: "Te guiamos para descubrir los mejores atractivos: las playas del centro, el Balneario Los Ángeles, las Termas del Campo, el Faro Quequén, Cascadas y el increíble Parque Miguel Lillo.",
      icon: "map",
      highlight: false,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      badge: "Consejos locales"
    },
    {
      id: "servicio-mucama",
      title: "Servicio Diario de Mucama",
      subtitle: "Higiene y confort impecables",
      description: "Limpieza y desinfección diaria de habitaciones, cambio periódico de sábanas de percal y toallas de algodón de alto gramaje para que sólo te preocupes por descansar.",
      icon: "sparkles",
      highlight: false,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      badge: "Estándar de calidad"
    }
  ],
  faqs: [
    {
      q: "¿Cuáles son los horarios oficiales de Check-in y Check-out?",
      a: "El horario oficial de Check-in es a partir de las 14:00 hs y el Check-out es hasta las 10:00 hs. Si llega antes o desea disfrutar de la playa luego de entregar la habitación, disponemos de servicio gratuito de custodia de equipaje."
    },
    {
      q: "¿El desayuno buffet está incluido en todas las tarifas?",
      a: "Sí, todas nuestras tarifas incluyen el Desayuno Buffet continental artesanal servido todas las mañanas de 07:30 a 10:30 hs. Contamos además con opciones seguras sin TACC para personas celíacas."
    },
    {
      q: "¿Cómo reservo con descuento directo?",
      a: "Reservando directamente a través de nuestro WhatsApp oficial (+54 9 2262 32-4248) o formulario web, accedes a las mejores tarifas garantizadas sin comisiones de intermediarios y hasta 15% OFF en estadías prolongadas."
    },
    {
      q: "¿Disponen de estacionamiento o cocheras?",
      a: "Sí, contamos con cocheras cubiertas y semicubiertas. Al momento de solicitar su cotización, indíquenos si viaja con vehículo para reservar su lugar."
    },
    {
      q: "¿A qué distancia están de la playa y del centro comercial?",
      a: "Hotel Mirasoles está ubicado sobre Calle 83 Nº 342, en pleno centro comercial y gastronómico de la Villa Balnearia de Necochea, a sólo 250 metros de las playas principales y a pocas cuadras del Parque Miguel Lillo."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEFAULT_HOTEL_CONTENT;
}
