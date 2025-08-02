// Mock product data - In a real app, this would come from a database
export const mockProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    slug: "paracetamol-500mg",
    description: "Effective pain relief and fever reducer. Each tablet contains 500mg of paracetamol.",
    shortDescription: "Pain relief and fever reducer tablets",
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    image: "https://via.placeholder.com/400x400?text=Paracetamol",
    images: [
      "https://via.placeholder.com/400x400?text=Paracetamol+1",
      "https://via.placeholder.com/400x400?text=Paracetamol+2",
      "https://via.placeholder.com/400x400?text=Paracetamol+3"
    ],
    categoryId: 1,
    category: {
      id: 1,
      name: "Pain Relief",
      slug: "pain-relief"
    },
    brand: "PharmaCorp",
    stock: 150,
    sku: "PAR500-24",
    featured: true,
    prescription: false,
    rating: 4.5,
    reviewCount: 127,
    tags: ["pain relief", "fever", "headache", "over-the-counter"],
    specifications: {
      "Active Ingredient": "Paracetamol 500mg",
      "Pack Size": "24 tablets",
      "Dosage Form": "Tablet",
      "Administration": "Oral"
    },
    sideEffects: [
      "Nausea",
      "Vomiting", 
      "Constipation",
      "Dizziness"
    ],
    contraindications: [
      "Severe liver disease",
      "Severe kidney disease",
      "Allergy to paracetamol"
    ],
    dosage: "Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.",
    storage: "Store below 25°C in a dry place. Keep out of reach of children."
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    slug: "ibuprofen-400mg",
    description: "Anti-inflammatory pain relief tablets. Effective for headaches, muscle pain, and fever.",
    shortDescription: "Anti-inflammatory pain relief",
    price: 16.50,
    originalPrice: 19.99,
    discount: 17,
    image: "https://via.placeholder.com/400x400?text=Ibuprofen",
    images: [
      "https://via.placeholder.com/400x400?text=Ibuprofen+1",
      "https://via.placeholder.com/400x400?text=Ibuprofen+2"
    ],
    categoryId: 1,
    category: {
      id: 1,
      name: "Pain Relief",
      slug: "pain-relief"
    },
    brand: "MediCore",
    stock: 89,
    sku: "IBU400-20",
    featured: false,
    prescription: false,
    rating: 4.3,
    reviewCount: 89,
    tags: ["anti-inflammatory", "pain relief", "fever", "muscle pain"],
    specifications: {
      "Active Ingredient": "Ibuprofen 400mg",
      "Pack Size": "20 tablets",
      "Dosage Form": "Tablet",
      "Administration": "Oral"
    },
    sideEffects: [
      "Stomach upset",
      "Nausea",
      "Heartburn",
      "Dizziness"
    ],
    contraindications: [
      "Stomach ulcers",
      "Severe heart disease",
      "Kidney disease",
      "Allergy to NSAIDs"
    ],
    dosage: "Adults: 1 tablet every 6-8 hours. Maximum 3 tablets in 24 hours.",
    storage: "Store below 25°C in a dry place. Keep out of reach of children."
  },
  {
    id: 3,
    name: "Vitamin D3 1000IU",
    slug: "vitamin-d3-1000iu",
    description: "Essential vitamin D3 supplement to support bone health and immune system.",
    shortDescription: "Bone health and immune support",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    image: "https://via.placeholder.com/400x400?text=Vitamin+D3",
    images: [
      "https://via.placeholder.com/400x400?text=Vitamin+D3+1",
      "https://via.placeholder.com/400x400?text=Vitamin+D3+2"
    ],
    categoryId: 2,
    category: {
      id: 2,
      name: "Vitamins & Supplements",
      slug: "vitamins-supplements"
    },
    brand: "NutriHealth",
    stock: 245,
    sku: "VIT-D3-60",
    featured: true,
    prescription: false,
    rating: 4.7,
    reviewCount: 203,
    tags: ["vitamin", "supplement", "bone health", "immune system"],
    specifications: {
      "Active Ingredient": "Cholecalciferol (Vitamin D3) 1000IU",
      "Pack Size": "60 capsules",
      "Dosage Form": "Soft capsule",
      "Administration": "Oral"
    },
    sideEffects: [
      "Nausea (rare)",
      "Vomiting (rare)",
      "Loss of appetite (rare)"
    ],
    contraindications: [
      "Hypercalcemia",
      "Kidney stones",
      "Sarcoidosis"
    ],
    dosage: "Adults: 1 capsule daily with food.",
    storage: "Store in a cool, dry place. Keep out of reach of children."
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    slug: "omeprazole-20mg",
    description: "Proton pump inhibitor for treating heartburn, acid reflux, and stomach ulcers.",
    shortDescription: "Heartburn and acid reflux treatment",
    price: 18.75,
    originalPrice: 22.50,
    discount: 17,
    image: "https://via.placeholder.com/400x400?text=Omeprazole",
    images: [
      "https://via.placeholder.com/400x400?text=Omeprazole+1"
    ],
    categoryId: 3,
    category: {
      id: 3,
      name: "Digestive Health",
      slug: "digestive-health"
    },
    brand: "GastroMed",
    stock: 67,
    sku: "OME20-28",
    featured: false,
    prescription: true,
    rating: 4.4,
    reviewCount: 156,
    tags: ["acid reflux", "heartburn", "stomach", "ulcers"],
    specifications: {
      "Active Ingredient": "Omeprazole 20mg",
      "Pack Size": "28 capsules",
      "Dosage Form": "Gastro-resistant capsule",
      "Administration": "Oral"
    },
    sideEffects: [
      "Headache",
      "Diarrhea",
      "Stomach pain",
      "Nausea"
    ],
    contraindications: [
      "Allergy to omeprazole",
      "Severe liver disease"
    ],
    dosage: "Adults: 1 capsule daily before breakfast. Take as directed by physician.",
    storage: "Store below 25°C in original package. Keep out of reach of children."
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    slug: "cetirizine-10mg",
    description: "Antihistamine for treating allergies, hay fever, and urticaria (hives).",
    shortDescription: "Allergy and hay fever relief",
    price: 8.99,
    originalPrice: 11.99,
    discount: 25,
    image: "https://via.placeholder.com/400x400?text=Cetirizine",
    images: [
      "https://via.placeholder.com/400x400?text=Cetirizine+1",
      "https://via.placeholder.com/400x400?text=Cetirizine+2"
    ],
    categoryId: 4,
    category: {
      id: 4,
      name: "Allergy",
      slug: "allergy"
    },
    brand: "AllergyFree",
    stock: 134,
    sku: "CET10-30",
    featured: false,
    prescription: false,
    rating: 4.2,
    reviewCount: 98,
    tags: ["allergy", "hay fever", "antihistamine", "hives"],
    specifications: {
      "Active Ingredient": "Cetirizine Hydrochloride 10mg",
      "Pack Size": "30 tablets",
      "Dosage Form": "Tablet",
      "Administration": "Oral"
    },
    sideEffects: [
      "Drowsiness",
      "Dry mouth",
      "Fatigue",
      "Headache"
    ],
    contraindications: [
      "Severe kidney disease",
      "Allergy to cetirizine"
    ],
    dosage: "Adults: 1 tablet daily. Children 6-12 years: Half tablet daily.",
    storage: "Store below 25°C in a dry place. Keep out of reach of children."
  }
];

export const mockCategories = [
  {
    id: 1,
    name: "Pain Relief",
    slug: "pain-relief",
    description: "Over-the-counter and prescription pain relief medications",
    image: "https://via.placeholder.com/300x200?text=Pain+Relief",
    productCount: 15
  },
  {
    id: 2,
    name: "Vitamins & Supplements",
    slug: "vitamins-supplements", 
    description: "Essential vitamins, minerals, and dietary supplements",
    image: "https://via.placeholder.com/300x200?text=Vitamins",
    productCount: 32
  },
  {
    id: 3,
    name: "Digestive Health",
    slug: "digestive-health",
    description: "Medications for digestive issues and stomach problems",
    image: "https://via.placeholder.com/300x200?text=Digestive",
    productCount: 18
  },
  {
    id: 4,
    name: "Allergy",
    slug: "allergy",
    description: "Antihistamines and allergy relief medications",
    image: "https://via.placeholder.com/300x200?text=Allergy",
    productCount: 12
  },
  {
    id: 5,
    name: "Cold & Flu",
    slug: "cold-flu",
    description: "Treatments for cold, flu, and respiratory symptoms",
    image: "https://via.placeholder.com/300x200?text=Cold+Flu",
    productCount: 24
  },
  {
    id: 6,
    name: "Skin Care",
    slug: "skin-care",
    description: "Skincare products and dermatological treatments",
    image: "https://via.placeholder.com/300x200?text=Skin+Care",
    productCount: 28
  }
];
