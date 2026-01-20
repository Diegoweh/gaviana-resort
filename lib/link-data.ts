type Locale = 'es' | 'en';

const roomTranslations = {
  es: {
    poolView: "Vista a la alberca",
    partialOceanView: "Vista parcial al mar",
    oceanView: "Vista al mar",
    cityView: "Vista a la ciudad",
    approx: "aprox",
    ac: "AA",
    hairDryer: "Secadora de cabello",
    safe: "Caja de seguridad",
    iron: "Plancha",
    ironingBoard: "Tabla de planchar",
    microwave: "Horno de microondas",
    refrigerator: "Refrigerador",
    coffeeMaker: "Cafetera eléctrica",
    smartTV: "SMART TV",
    electricSkillet: "Sartén eléctrico",
  },
  en: {
    poolView: "Pool view",
    partialOceanView: "Partial ocean view",
    oceanView: "Ocean view",
    cityView: "City view",
    approx: "approx",
    ac: "AC",
    hairDryer: "Hair dryer",
    safe: "Safe",
    iron: "Iron",
    ironingBoard: "Ironing board",
    microwave: "Microwave oven",
    refrigerator: "Refrigerator",
    coffeeMaker: "Electric coffee maker",
    smartTV: "SMART TV",
    electricSkillet: "Electric skillet",
  }
};

export const getLinkData = (locale: Locale = 'es') => {
  const t = roomTranslations[locale];

  return [
    {
      id: 1,
      title: "Estefanos",
      slug: "estefanos",
      images: [
        "/img/estefano.jpg",
        "/img/estefano2.jpg",
      ],
      description: locale === 'es'
        ? "Esta JR Suite tiene el Sello Gaviana. Está conformada por una habitación con una amplia y cómoda cama king size. Además, la Suite Estefanos incluye una práctica estancia. Resulta ideal para viaje en pareja."
        : "This JR Suite has the Gaviana Seal. It consists of a room with a spacious and comfortable king size bed. In addition, the Estefanos Suite includes a practical living room. It is ideal for couples traveling.",
      guests: 2,
      amenities: [t.poolView],
      size: `341 ft² ${t.approx}`,
      included: [
        t.ac,
        t.hairDryer,
        t.safe,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 2,
      title: "Patmos",
      slug: "patmos",
      images: [
        "/img/patmoss.jpg",
        "/img/patmoss2.jpg",
        "/img/patmoss3.jpg",
      ],
      description: locale === 'es'
        ? "Ideal para quienes buscan practicidad y sencillez, Patmos ofrece todo lo básico para pasar una estancia agradable. Con dos camas queen size, tiene capacidad para 4 huéspedes."
        : "Ideal for those seeking practicality and simplicity, Patmos offers all the basics for a pleasant stay. With two queen size beds, it has capacity for 4 guests.",
      guests: 4,
      amenities: [t.poolView],
      size: `280 ft² ${t.approx}`,
      included: [
        t.ac,
        t.hairDryer,
        t.safe,
        t.smartTV,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 3,
      title: "Cristiana",
      slug: "cristiana",
      images: [
        "/img/cristiana.jpg",
        "/img/cristiana2.jpg",
      ],
      description: locale === 'es'
        ? "Cristiana está pensada en quienes buscan una habitación donde puedan estar cómodos con el equipamiento básico y un ambiente agradable. Cuenta con una cama king size y Smart TV."
        : "Cristiana is designed for those looking for a room where they can be comfortable with basic equipment and a pleasant atmosphere. It has a king size bed and Smart TV.",
      guests: 2,
      amenities: [t.poolView],
      size: `245 ft² ${t.approx}`,
      included: [
        t.ac,
        t.hairDryer,
        t.safe,
        t.smartTV,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 4,
      title: "Rodas",
      slug: "rodas",
      images: [
        "/img/rodas.jpg",
        "/img/rodas2.jpg",
        "/img/rodas3.jpg",
      ],
      description: locale === 'es'
        ? "Amplia suite con 2 camas queen en una de las habitaciones, 1 cama queen en la otra recámara, cuenta con baño y medio y garantiza vista al mar. Además de contar con un amplio balcón."
        : "Spacious suite with 2 queen beds in one of the bedrooms, 1 queen bed in the other bedroom, has one and a half bathrooms and guarantees ocean view. In addition to having a large balcony.",
      guests: 6,
      amenities: [t.partialOceanView],
      size: `352 ft² ${t.approx}`,
      included: [
        t.microwave,
        t.refrigerator,
        t.coffeeMaker,
        t.smartTV,
        t.hairDryer,
        t.safe,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 5,
      title: "Milos",
      slug: "milos",
      images: [
        "/img/milos.jpg",
        "/img/milos2.jpg",
      ],
      description: locale === 'es'
        ? "Amplia Suite ideal para disfrutarla en familia o con amigos que desean aprovechar al máximo el tiempo juntos. Cuenta con dos camas queen size, sala con sofá-cama, cocina semi-equipada y vista al mar garantizada. Además de contar con un amplio balcón."
        : "Spacious suite ideal to enjoy with family or friends who want to make the most of their time together. It has two queen size beds, living room with sofa bed, semi-equipped kitchen and guaranteed ocean view. In addition to having a large balcony.",
      guests: 4,
      amenities: [t.oceanView],
      size: `352 ft² ${t.approx}`,
      included: [
        t.electricSkillet,
        t.microwave,
        t.refrigerator,
        t.coffeeMaker,
        t.ac,
        t.hairDryer,
        t.safe,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 6,
      title: "Creta",
      slug: "creta",
      images: [
        "/img/creta.jpg",
        "/img/creta2.jpg",
      ],
      description: locale === 'es'
        ? "La Suite Creta es la mejor opción para viaje en parejas. Cuenta con dos habitaciones, cada una con cama king size. La suite tiene dos baños completos, sala, comedor, cocina semi-equipada con refrigerador y Smart TV. Además de contar con un amplio balcón."
        : "The Creta Suite is the best option for couples traveling. It has two bedrooms, each with a king size bed. The suite has two full bathrooms, living room, dining room, semi-equipped kitchen with refrigerator and Smart TV. In addition to having a large balcony.",
      guests: 5,
      amenities: [t.cityView],
      size: `330 ft² ${t.approx}`,
      included: [
        t.electricSkillet,
        t.microwave,
        t.refrigerator,
        t.coffeeMaker,
        t.smartTV,
        t.hairDryer,
        t.safe,
        t.iron,
        t.ironingBoard,
      ],
    },
    {
      id: 7,
      title: "Mykonos",
      slug: "mykonos",
      images: [
        "/img/mykonos.jpg",
        "/img/mykonos2.jpg",
        "/img/mykonos3.jpg",
      ],
      description: locale === 'es'
        ? "Diseñada para quienes gustan de confort y privacidad, excelente opción para parejas, cuenta con una pequeña estancia, recámara privada con una cama King."
        : "Designed for those who like comfort and privacy, excellent option for couples, it has a small living room, private bedroom with a King bed.",
      guests: 2,
      amenities: [t.poolView],
      size: `326 ft² ${t.approx}`,
      included: [
        t.microwave,
        t.refrigerator,
        t.coffeeMaker,
        t.smartTV,
        t.safe,
        t.hairDryer,
        t.iron,
        t.ironingBoard,
      ],
    },
  ];
};

// Para mantener compatibilidad con código existente
export const linkData = getLinkData('es');
