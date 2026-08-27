import { ModakProduct, DeliverySlot, WorkshopSession, Review } from '../types';

import heroImg from '../assets/images/hero_modak_platter_1787344190381.jpg';
import assortedBoxImg from '../assets/images/assorted_modak_box_1787344207719.jpg';
import ukadicheImg from '../assets/images/ukadiche_steaming_1787344223990.jpg';
import craftImg from '../assets/images/craft_making_modak_1787344241893.jpg';

export const HERO_IMAGE = heroImg;
export const ASSORTED_BOX_IMAGE = assortedBoxImg;
export const UKADICHE_STEAMING_IMAGE = ukadicheImg;
export const CRAFT_MAKING_IMAGE = craftImg;

export const PRODUCTS: ModakProduct[] = [
  {
    id: 'signature-21-kalya-ukadiche',
    name: 'Signature 21 Kalya Ukadiche Modak',
    marathiName: '२१ कळ्यांचे अस्सल उकडीचे मोदक',
    category: 'ukadiche',
    tagline: 'Hand-pleated with exactly 21 artisan folds. Steamed fresh in studio daily.',
    description: 'Our crown jewel recipe taught in our masterclasses. Delicate, paper-thin steamed Ambemohar rice flour shell encasing freshly grated Konkan coconut braised with organic Kolhapuri jaggery, nutmeg, cardamom, and finished with warm saffron pure cow ghee.',
    marathiDescription: 'आंबेमोहर तांदळाची मऊ लुसलुशीत पारी, त्यात ओला नारळ आणि सेंद्रिय गुळाचे सुगंधी सारण. २१ अस्सल कळ्यांची कारागिरी.',
    image: ukadicheImg,
    rating: 5.0,
    reviewCount: 480,
    isBestseller: true,
    isSignature21Kalya: true,
    isWorkshopFavorite: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Taster Box (7 Pcs)', price: 349, originalPrice: 385 },
      { quantity: 11, label: 'Family Box (11 Pcs)', price: 549, originalPrice: 599 },
      { quantity: 21, label: 'Master 21 Box (21 Pcs)', price: 999, originalPrice: 1150 },
      { quantity: 51, label: 'Studio Feast Box (51 Pcs)', price: 2350, originalPrice: 2650 }
    ],
    ingredients: ['Ambemohar Rice Flour', 'Fresh Coconut (ओला नारळ)', 'Organic Kolhapuri Jaggery', 'Green Cardamom (वेलची)', 'Nutmeg (जायफळ)', 'Pure A2 Cow Ghee', 'Kashmir Kesar'],
    shelfLife: 'Freshly steamed: Consume within 24 hours. Re-steaming warms it to peak softness.',
    servingSuggestion: 'Serve hot with a liberal drizzle of warm Sajuk Toop (clarified butter) and a pinch of saffron.',
    dietary: ['100% Vegetarian', 'Pure Ghee', 'Organic Jaggery', 'Artisan Crafted', 'Studio Fresh', 'Gluten Free'],
    caloriesPerPiece: 145
  },
  {
    id: 'shahi-kesar-pista-ukadiche',
    name: 'Shahi Kesar Pista Ukadiche Modak',
    marathiName: 'शाही केशर पिस्ता उकडीचे मोदक',
    category: 'ukadiche',
    tagline: 'Infused with royal Kashmiri Saffron and slivered Iranian pistachios.',
    description: 'A regal twist on our classic steamed modak. The rice dough is steeped in authentic saffron milk giving it a rich golden hue, stuffed with saffron-spiced coconut and roasted pistachio chunks.',
    marathiDescription: 'कश्मिरी केशराच्या दुधात मळलेली पिवळसर पारी आणि पिस्त्याचे तुकडे घातलेले सुगंधी सारण.',
    image: heroImg,
    rating: 4.9,
    reviewCount: 312,
    isBestseller: true,
    isWorkshopFavorite: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Taster Box (7 Pcs)', price: 399, originalPrice: 440 },
      { quantity: 11, label: 'Family Box (11 Pcs)', price: 629, originalPrice: 690 },
      { quantity: 21, label: 'Master 21 Box (21 Pcs)', price: 1149, originalPrice: 1299 }
    ],
    ingredients: ['Saffron-infused Rice Flour', 'Fresh Grated Coconut', 'Organic Jaggery', 'Kashmiri Kesar', 'Iranian Pistachios', 'Cardamom', 'Pure Cow Ghee'],
    shelfLife: 'Best consumed within 24 hours. Keep refrigerated if consuming next day.',
    servingSuggestion: 'Steam for 2 minutes before serving or enjoy warm with warm kesar milk.',
    dietary: ['100% Vegetarian', 'Pure Ghee', 'Organic Jaggery', 'Artisan Crafted'],
    caloriesPerPiece: 160
  },
  {
    id: 'diy-masterclass-kit',
    name: '21 Kalya DIY Modak Masterclass Kit',
    marathiName: '२१ कळ्या मोदक DIY मास्टरक्लास किट',
    category: 'workshops_kits',
    tagline: 'Everything you need to craft 21 pleats at home with chef video access & brass tools.',
    description: 'Complete hands-on culinary workshop in a box! Includes 500g heirloom stone-ground Ambemohar rice flour, pure organic Kolhapuri jaggery block, spice blend (cardamom & nutmeg), Kashmiri saffron vial, artisanal brass modak pleat guide, cotton chef apron, step-by-step recipe booklet, and full HD video masterclass streaming access.',
    marathiDescription: 'घरी बसून २१ कळ्यांचे मोदक बनवण्यासाठी संपूर्ण किट: आंबेमोहर पीठ, सेंद्रिय गूळ, केशर, पितळी मोदक साधन, शेफ ॲप्रन आणि व्हिडिओ क्लास.',
    image: craftImg,
    rating: 5.0,
    reviewCount: 142,
    isNew: true,
    isBestseller: true,
    isWorkshopFavorite: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 1, label: 'Standard DIY Kit (Makes 25 Modaks)', price: 899, originalPrice: 1050 },
      { quantity: 2, label: 'Masterclass Deluxe Kit + Brass Steamer (Makes 50 Modaks)', price: 1499, originalPrice: 1750 }
    ],
    ingredients: ['Ambemohar Flour 500g', 'Kolhapuri Jaggery 400g', 'Pure Kashmiri Saffron', 'Chef Apron', 'Brass Tool', 'HD Masterclass Video Access'],
    shelfLife: 'Ingredients shelf life: 6 months. Access to video tutorial is lifetime.',
    servingSuggestion: 'Follow the 25-minute video tutorial to pinch and steam 21 pleats with ease.',
    dietary: ['100% Vegetarian', 'Organic Jaggery', 'Artisan Crafted'],
    caloriesPerPiece: 145
  },
  {
    id: 'royal-kesar-pista-mawa',
    name: 'Rajbhog Kesar Mawa Modak',
    marathiName: 'राजभोग केशर खवा मोदक',
    category: 'dryfruit_mawa',
    tagline: 'Slow-simmered Buffalo milk khoya with pure saffron and slivered pistachios.',
    description: 'Slowly cooked artisanal mawa (khoya) infused with fragrant saffron strands, green cardamom, and garnished with finely chopped pistachios. Melts effortlessly on the palate.',
    marathiDescription: 'हळुवार आचेवर आटवलेला शुद्ध खवा, केशर आणि पिस्त्याची समृद्ध चव.',
    image: assortedBoxImg,
    rating: 4.9,
    reviewCount: 284,
    isBestseller: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Pack of 7', price: 320, originalPrice: 350 },
      { quantity: 11, label: 'Pack of 11', price: 490, originalPrice: 550 },
      { quantity: 21, label: 'Royal Box (21 Pcs)', price: 899, originalPrice: 999 }
    ],
    ingredients: ['Pure Full-Cream Mawa', 'Kashmiri Saffron', 'Slivered Pistachios', 'Mishri / Cane Sugar', 'Cardamom'],
    shelfLife: '7 days at room temperature, 15 days refrigerated in airtight container.',
    servingSuggestion: 'Perfect for gifting, dessert platters, and gourmet entertaining.',
    dietary: ['100% Vegetarian', 'Gluten Free', 'Artisan Crafted'],
    caloriesPerPiece: 175
  },
  {
    id: 'roasted-dryfruit-anjeer-modak',
    name: 'Panchmeva Roasted Dryfruit & Anjeer Modak',
    marathiName: 'पंचमेवा अंजीर ड्रायफ्रूट मोदक (बिनसाखरेचे)',
    category: 'sugarfree',
    tagline: 'Zero added sugar. 100% natural Turkish Figs, Dates, Almonds, Cashews & Walnuts.',
    description: 'Guilt-free gourmet indulgence crafted purely from naturally sweet sun-dried Turkish figs (anjeer), Medjool dates, slow-roasted California almonds, cashews, and Kashmiri walnuts bound with pure ghee.',
    marathiDescription: 'साखरेचा कणही न वापरता बनवलेले नैसर्गिक अंजीर, खजूर, बदाम, काजू आणि अक्रोडाचे मोदक.',
    image: assortedBoxImg,
    rating: 4.8,
    reviewCount: 195,
    isWorkshopFavorite: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Pack of 7', price: 420, originalPrice: 470 },
      { quantity: 11, label: 'Pack of 11', price: 650, originalPrice: 720 },
      { quantity: 21, label: 'Grand Box (21 Pcs)', price: 1199, originalPrice: 1350 }
    ],
    ingredients: ['Sun-dried Figs (अंजीर)', 'Medjool Dates', 'California Almonds', 'Cashew Nuts', 'Kashmiri Walnuts', 'Chironji', 'Pure A2 Cow Ghee'],
    shelfLife: '30 days shelf life. High energy and nutrient dense.',
    servingSuggestion: 'Enjoy anytime as a wholesome healthy gourmet snack or fitness energy treat.',
    dietary: ['100% Vegetarian', 'No Added Sugar', 'Gluten Free', 'Pure Ghee', 'Artisan Crafted'],
    caloriesPerPiece: 130
  },
  {
    id: 'rose-gulkand-stuffed-modak',
    name: 'Chaitanya Rose & Praval Gulkand Modak',
    marathiName: 'चैतन्य गुलाब आणि प्रवाल गुलकंद मोदक',
    category: 'dryfruit_mawa',
    tagline: 'Damask rose petal preserve core with a smooth almond-cashew crust.',
    description: 'An enchanting culinary creation featuring a velvety outer shell of cashew-pistachio marzipan and a refreshing molten center of sun-cooked organic desi gulab gulkand with cardamom seeds.',
    marathiDescription: 'काजू-पिस्त्याच्या पारीत भरलेला सुगंधी देशी गुलाब पाकळ्यांचा अस्सल गुलकंद.',
    image: assortedBoxImg,
    rating: 4.9,
    reviewCount: 160,
    isNew: true,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Pack of 7', price: 380, originalPrice: 420 },
      { quantity: 11, label: 'Pack of 11', price: 580, originalPrice: 640 },
      { quantity: 21, label: 'Royal Box (21 Pcs)', price: 1050, originalPrice: 1180 }
    ],
    ingredients: ['Premium Cashews', 'Organic Damask Rose Gulkand', 'Fennel Seed Extract', 'Cardamom', 'Pure Ghee'],
    shelfLife: '14 days at room temperature.',
    servingSuggestion: 'Serve slightly chilled for an aromatic floral burst.',
    dietary: ['100% Vegetarian', 'Gluten Free', 'Artisan Crafted'],
    caloriesPerPiece: 155
  },
  {
    id: 'belgian-dark-chocolate-modak',
    name: 'Belgian Dark Chocolate & Roasted Nut Modak',
    marathiName: 'बेल्जियन डार्क चॉकलेट व भाजलेले ड्रायफ्रूट मोदक',
    category: 'dryfruit_mawa',
    tagline: 'Rich 70% dark cocoa blended with slow-roasted hazelnuts and crunchy almonds.',
    description: 'The modern favourite created in our fusion workshop modules. Premium Belgian dark cocoa ganache paired with freshly roasted chopped nuts in a classic 21-fluted modak mould.',
    marathiDescription: 'लहानथोर सर्वांचा आवडता ७०% डार्क चॉकलेट आणि कुरकुरीत ड्रायफ्रूट्सचा मोदक.',
    image: assortedBoxImg,
    rating: 4.8,
    reviewCount: 220,
    pleatCount: 21,
    priceTiers: [
      { quantity: 7, label: 'Pack of 7', price: 360, originalPrice: 400 },
      { quantity: 11, label: 'Pack of 11', price: 560, originalPrice: 620 },
      { quantity: 21, label: 'Party Box (21 Pcs)', price: 990, originalPrice: 1120 }
    ],
    ingredients: ['70% Belgian Dark Cocoa', 'Khoya / Roasted Milk Solids', 'Roasted Hazelnuts', 'Almonds', 'Natural Vanilla'],
    shelfLife: '20 days in a cool, dry place.',
    servingSuggestion: 'Best enjoyed at room temperature or gently warmed for 5 seconds for a soft molten center.',
    dietary: ['100% Vegetarian', 'Gluten Free', 'Artisan Crafted'],
    caloriesPerPiece: 168
  }
];


export const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: 'slot-morning',
    title: 'Morning Studio & Fresh Batch',
    marathiTitle: 'सकाळची ताजी बॅच व वर्कशॉप',
    timeRange: '8:30 AM – 11:00 AM',
    icon: 'Sun',
    idealFor: 'Morning Hands-on Workshop & Fresh Breakfast Dispatches',
    available: true
  },
  {
    id: 'slot-afternoon',
    title: 'Afternoon Masterclass Batch',
    marathiTitle: 'दुपारची मास्टरक्लास बॅच',
    timeRange: '1:30 PM – 4:00 PM',
    icon: 'Flame',
    idealFor: 'Intensive Culinary Sessions & Lunch Gifting Deliveries',
    available: true
  },
  {
    id: 'slot-evening',
    title: 'Evening Gourmet Tasting Slot',
    marathiTitle: 'संध्याकाळची टेस्टिंग बॅच',
    timeRange: '5:30 PM – 8:00 PM',
    icon: 'Sparkles',
    idealFor: 'Evening Family Workshops, Corporate Mixers & Fresh Boxes',
    available: true
  }
];

export const WORKSHOP_SESSIONS: WorkshopSession[] = [
  {
    id: 'ws-signature-21',
    title: 'The 21-Fold Masterclass: Authentic Ukadiche Modak',
    marathiTitle: 'अचूक २१ कळ्यांची उकडीचे मोदक कार्यशाळा (मास्टरक्लास)',
    level: 'Masterclass',
    date: 'Upcoming Saturday & Sunday',
    day: 'Weekend Intensive',
    timeRange: '10:00 AM – 12:30 PM',
    duration: '2.5 Hours',
    location: 'Pune Heritage Studio & Mumbai Culinary Lab (Hybrid Live)',
    instructor: 'Executive Chef Vasant Deshmukh (35+ Yrs Master Halwai)',
    pricePerSeat: 799,
    originalPrice: 1200,
    totalSeats: 25,
    bookedSeats: 19,
    description: 'Master the secret geometry of pinching exact 21 pleats with fingertips, Ambemohar rice flour steaming science, and the authentic coconut-jaggery caramelization technique. You craft & take home 21 self-made modaks in a luxury box with a certificate.',
    highlights: [
      'Hands-on individual chef workstation with all raw ingredients provided',
      'Step-by-step 21 pleats pinching geometry technique',
      'Steam temperature calibration & dough moisture secrets',
      'Take home your 21 self-made handcrafted modaks in gift box',
      '21 Kalya Masterclass Certificate & printed recipe book'
    ],
    syllabus: [
      'Ambemohar Dough Science: Perfect water-to-flour ratio and kneading to eliminate cracks',
      'Traditional Grating & Braising: Balancing fresh Konkan coconut with chemical-free Kolhapuri jaggery',
      'The 21-Pleat Technique: Thumb & index finger fold sequence and concentric sealing',
      'Steaming & Sajuk Toop Drizzle: Banana leaf lining and steam timing for translucent tenderness'
    ],
    includesKit: true,
    urgency: 'high',
    image: craftImg
  },
  {
    id: 'ws-gourmet-fusion',
    title: 'Gourmet Fusion & Royal Khoya Modak Workshop',
    marathiTitle: 'रॉयल खवा व फ्युजन मोदक मेकिंग कार्यशाळा',
    level: 'Beginner',
    date: 'Every Wednesday & Friday',
    day: 'Weekday Evening',
    timeRange: '4:30 PM – 7:00 PM',
    duration: '2.5 Hours',
    location: '21 Kalya Culinary Studio (Pune / Mumbai)',
    instructor: 'Pastry Chef Sneha Kulkarni',
    pricePerSeat: 899,
    originalPrice: 1350,
    totalSeats: 20,
    bookedSeats: 14,
    description: 'Explore 4 contemporary artisan varieties: Shahi Kesar Pista, Damask Rose Gulkand marzipan, Sugar-Free Fig & Date Panchmeva, and 70% Belgian Dark Chocolate Hazelnut ganache.',
    highlights: [
      'Craft 4 gourmet fusion fillings and artisanal shells',
      'Natural food coloring with saffron, beetroot & organic cocoa',
      'Proper shelf-life packaging and gift hampers arrangement',
      'Take home an assorted 16-modak royal gift box',
      'Gourmet Recipe Booklet & Workshop Certificate'
    ],
    syllabus: [
      'Mawa Roasting Secrets: Achieving velvety smooth khoya base without burning',
      'Gulkand Marzipan Core: Rolling and encasing fragile rose petal preserve',
      'Sugar-free Binding: Nut paste emulsions with sun-dried Turkish figs',
      'Tempered Cocoa Blends: 70% dark chocolate balance with roasted nuts'
    ],
    includesKit: true,
    urgency: 'medium',
    image: assortedBoxImg
  },
  {
    id: 'ws-kids-family',
    title: 'Kids & Family Modak Art & Sculpting Studio',
    marathiTitle: 'मुले व पालकांसाठी मोदक कला कार्यशाळा',
    level: 'Family & Kids',
    date: 'Every Sunday Morning',
    day: 'Sunday Special',
    timeRange: '11:00 AM – 1:00 PM',
    duration: '2 Hours',
    location: 'All Studio Hubs (Pune, Mumbai, Thane)',
    instructor: 'Chef Ananya & Team',
    pricePerSeat: 599,
    originalPrice: 850,
    totalSeats: 30,
    bookedSeats: 26,
    description: 'A delightful interactive session for parents and children (ages 6+). Learn the cultural history of modaks, playful shaping, mini-pleats, chocolate stuffing, and enjoy warm tasting.',
    highlights: [
      'Parent + Child combo stations with mini rolling pins & aprons',
      'Safe, non-flame interactive kneading and shaping games',
      'Fun chocolate & dry fruit stuffings kids love',
      'Junior Chef Badges & certificates for all children',
      'Pack of 12 kid-crafted modaks to take home'
    ],
    syllabus: [
      'Story of the 21 folds and Maharashtrian culinary heritage',
      'Fun dough textures with natural colorful fruit powders',
      'Mini pleating and mould shaping techniques',
      'Creative tasting and plating with honey and Sajuk Toop'
    ],
    includesKit: true,
    urgency: 'high',
    image: heroImg
  },
  {
    id: 'ws-chef-intensive',
    title: 'Advanced Chef Intensive: Commercial 21-Fold Mastery',
    marathiTitle: 'व्यावसायिक शेफ व उद्योजकांसाठी प्रगत कार्यशाळा',
    level: 'Chef Intensive',
    date: 'Monthly 2-Day Masterclass',
    day: '2-Day Bootcamp',
    timeRange: '9:30 AM – 4:00 PM',
    duration: 'Full Day Immersion',
    location: 'Pune Central Culinary Academy',
    instructor: 'Master Halwai Vasant Deshmukh & Culinary Director',
    pricePerSeat: 2499,
    originalPrice: 3500,
    totalSeats: 15,
    bookedSeats: 11,
    description: 'For home-chefs, food entrepreneurs, and culinary students. Master high-volume batch steaming, high-speed 21-pleat hand sculpting, shelf-life stabilization, commercial packaging, and business costing.',
    highlights: [
      'Commercial kitchen equipment & large steamer operations',
      'Speed-pleating: achieve under 45 seconds per 21-pleat modak',
      'Standardizing moisture retention for cold storage & deliveries',
      'Cost calculation, recipe scaling & FSSAI hygiene guidelines',
      'Professional Master Culinary Artisan Certification'
    ],
    syllabus: [
      'Grain selection: Ambemohar vs Indrayani vs Wada Kolam gluten tests',
      'High-speed ergonomic finger movements for rapid pleat formation',
      'Steam thermodynamic management: avoiding condensation drops on modak tips',
      'Catering logistics, insulated box packing, and temperature maintenance'
    ],
    includesKit: true,
    urgency: 'medium',
    image: craftImg
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Priyanka Kulkarni',
    city: 'Pune (Prabhat Road)',
    rating: 5,
    date: 'Last Weekend',
    occasion: '21-Fold Ukadiche Masterclass Participant',
    comment: 'I always struggled with my modak pleats tearing or turning hard. Chef Vasant explained the dough temperature science so simply! By the end of the 2.5-hour workshop, I made 21 flawless, delicate pleats on my own. Brought them home and my family was stunned!',
    verified: true,
    productName: 'The 21-Fold Masterclass'
  },
  {
    id: 'rev-2',
    author: 'Rohan & Shalini Deshmukh',
    city: 'Mumbai (Dadar)',
    rating: 5,
    date: '3 days ago',
    occasion: 'Kids & Family Workshop',
    comment: 'Attended the Sunday family studio workshop with our 8-year-old daughter. The atmosphere was so warm and vibrant! The chefs were incredibly patient with kids. She made chocolate-filled modaks and proudly showed off her Junior Chef certificate.',
    verified: true,
    productName: 'Kids & Family Modak Art Workshop'
  },
  {
    id: 'rev-3',
    author: 'Chef Nikhil Mehta',
    city: 'Thane',
    rating: 5,
    date: '1 week ago',
    occasion: 'DIY Masterclass Kit Buyer',
    comment: 'Ordered the 21 Kalya DIY Masterclass Kit online. The heirloom Ambemohar flour quality is exceptional, and the video masterclass leaves no step unexplained. The included brass tool made pleating look like second nature!',
    verified: true,
    productName: '21 Kalya DIY Modak Masterclass Kit'
  },
  {
    id: 'rev-4',
    author: 'Anjali S. Patil',
    city: 'Navi Mumbai',
    rating: 5,
    date: '2 weeks ago',
    occasion: 'Corporate Team Culinary Event',
    comment: 'We booked a private 25-person corporate workshop for our leadership team. It was the most engaging, unique team bonding event we have ever had! The 21 Kalya team arranged everything seamlessly from aprons to warm tasting boxes.',
    verified: true,
    productName: 'Corporate Workshop & Masterclass'
  }
];
