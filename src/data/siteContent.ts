// Every piece of marketing copy that's editable from Admin → Page Text.
// Each entry has a unique `key` (used to store the override in the
// database), a human `label` + `page` grouping for the admin UI, and a
// `default` — the original hardcoded copy — used whenever no override
// exists yet. Nothing breaks if the database has no overrides at all.
//
// To make more text editable later: add an entry here, then in the
// component read it via `content['your_key'] ?? 'fallback text'` (see
// useSiteContent.ts) instead of the hardcoded string.
export interface ContentField {
  key: string;
  label: string;
  page: string;
  type: 'text' | 'textarea';
  default: string;
}

export const CONTENT_SCHEMA: ContentField[] = [
  // ---- Home / Hero ----
  { key: 'hero_eyebrow_en', label: 'Eyebrow Badge (English)', page: 'Home — Hero', type: 'text', default: 'Authentic Culinary Specialties' },
  { key: 'hero_eyebrow_mr', label: 'Eyebrow Badge (Marathi)', page: 'Home — Hero', type: 'text', default: 'अस्सल पाककृती वैशिष्ट्ये' },
  { key: 'hero_headline_en', label: 'Headline Line 2 (English)', page: 'Home — Hero', type: 'text', default: '21 Kalya — स्वादः परमानन्दः' },
  { key: 'hero_headline_mr', label: 'Headline Line 2 (Marathi)', page: 'Home — Hero', type: 'text', default: '२१ Kalya — स्वादः परमानन्दः' },
  { key: 'hero_paragraph_en', label: 'Description Paragraph (English)', page: 'Home — Hero', type: 'textarea', default: 'Experience pure culinary ecstasy. Indulge in authentic home-cooked steamed Ukadiche Modaks handcrafted with 21 precise folds, master the time-honored art of traditional sweets, and launch your own culinary journey.' },
  { key: 'hero_paragraph_mr', label: 'Description Paragraph (Marathi)', page: 'Home — Hero', type: 'textarea', default: 'खऱ्या पाककलेच्या आनंदाचा अनुभव घ्या. २१ अचूक कळ्यांनी हाताने बनवलेले, घरगुती पद्धतीने वाफवलेले अस्सल उकडीचे मोदक चाखा, पारंपरिक मिठाईची शतकानुशतके जुनी कला शिका आणि स्वतःच्या पाककला प्रवासाला सुरुवात करा.' },
  { key: 'hero_cta1_en', label: 'Primary Button (English)', page: 'Home — Hero', type: 'text', default: 'Order Sweets' },
  { key: 'hero_cta1_mr', label: 'Primary Button (Marathi)', page: 'Home — Hero', type: 'text', default: 'मिठाई ऑर्डर करा' },
  { key: 'hero_cta2_en', label: 'Secondary Button (English)', page: 'Home — Hero', type: 'text', default: 'Book Workshops' },
  { key: 'hero_cta2_mr', label: 'Secondary Button (Marathi)', page: 'Home — Hero', type: 'text', default: 'कार्यशाळा बुक करा' },

  // ---- Home / Why Choose Us ----
  { key: 'why_eyebrow_en', label: 'Eyebrow (English)', page: 'Home — Why Choose Us', type: 'text', default: 'Why Choose Us' },
  { key: 'why_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: 'आम्हाला का निवडावे' },
  { key: 'why_heading_en', label: 'Heading (English)', page: 'Home — Why Choose Us', type: 'text', default: 'Crafted With Passion, Delivered With Pride' },
  { key: 'why_heading_mr', label: 'Heading (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: 'श्रद्धेने बनवलेले, अभिमानाने पोहोचवलेले' },
  { key: 'why_subheading_en', label: 'Subheading (English)', page: 'Home — Why Choose Us', type: 'textarea', default: "We don't just make modaks — we create experiences that connect you to your roots." },
  { key: 'why_subheading_mr', label: 'Subheading (Marathi)', page: 'Home — Why Choose Us', type: 'textarea', default: 'आम्ही फक्त मोदक बनवत नाही — आम्ही तुम्हाला तुमच्या मुळांशी जोडणारे अनुभव तयार करतो.' },
  { key: 'why_card1_title_en', label: 'Card 1 Title (English)', page: 'Home — Why Choose Us', type: 'text', default: '100% Fresh Ingredients' },
  { key: 'why_card1_title_mr', label: 'Card 1 Title (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: '१००% ताजी सामग्री' },
  { key: 'why_card1_desc_en', label: 'Card 1 Description (English)', page: 'Home — Why Choose Us', type: 'textarea', default: 'We source the finest natural ingredients directly from farms.' },
  { key: 'why_card1_desc_mr', label: 'Card 1 Description (Marathi)', page: 'Home — Why Choose Us', type: 'textarea', default: 'शेतातून थेट आणलेली सर्वोत्तम नैसर्गिक सामग्री.' },
  { key: 'why_card2_title_en', label: 'Card 2 Title (English)', page: 'Home — Why Choose Us', type: 'text', default: 'Handmade Daily' },
  { key: 'why_card2_title_mr', label: 'Card 2 Title (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: 'दररोज हाताने बनवलेले' },
  { key: 'why_card2_desc_en', label: 'Card 2 Description (English)', page: 'Home — Why Choose Us', type: 'textarea', default: 'Every modak is handcrafted fresh every morning with love.' },
  { key: 'why_card2_desc_mr', label: 'Card 2 Description (Marathi)', page: 'Home — Why Choose Us', type: 'textarea', default: 'प्रत्येक मोदक दररोज सकाळी प्रेमाने हाताने बनवला जातो.' },
  { key: 'why_card3_title_en', label: 'Card 3 Title (English)', page: 'Home — Why Choose Us', type: 'text', default: 'Premium Packaging' },
  { key: 'why_card3_title_mr', label: 'Card 3 Title (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: 'प्रीमियम पॅकेजिंग' },
  { key: 'why_card3_desc_en', label: 'Card 3 Description (English)', page: 'Home — Why Choose Us', type: 'textarea', default: 'Eco-friendly luxury packaging that preserves freshness.' },
  { key: 'why_card3_desc_mr', label: 'Card 3 Description (Marathi)', page: 'Home — Why Choose Us', type: 'textarea', default: 'ताजेपणा टिकवणारे पर्यावरणपूरक लक्झरी पॅकेजिंग.' },
  { key: 'why_card4_title_en', label: 'Card 4 Title (English)', page: 'Home — Why Choose Us', type: 'text', default: 'Authentic Taste' },
  { key: 'why_card4_title_mr', label: 'Card 4 Title (Marathi)', page: 'Home — Why Choose Us', type: 'text', default: 'अस्सल चव' },
  { key: 'why_card4_desc_en', label: 'Card 4 Description (English)', page: 'Home — Why Choose Us', type: 'textarea', default: 'Traditional family recipes crafted with the finest natural ingredients.' },
  { key: 'why_card4_desc_mr', label: 'Card 4 Description (Marathi)', page: 'Home — Why Choose Us', type: 'textarea', default: 'उत्तम नैसर्गिक घटकांसह बनवलेल्या पारंपरिक कौटुंबिक पाककृती.' },

  // ---- Workshops Page / Hero ----
  { key: 'workshops_hero_eyebrow_en', label: 'Eyebrow (English)', page: 'Workshops — Hero', type: 'text', default: 'Session Booking' },
  { key: 'workshops_hero_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Workshops — Hero', type: 'text', default: 'सत्र आरक्षण' },
  { key: 'workshops_hero_headline1_en', label: 'Headline Line 1 (English)', page: 'Workshops — Hero', type: 'text', default: 'Book a Workshop or' },
  { key: 'workshops_hero_headline1_mr', label: 'Headline Line 1 (Marathi)', page: 'Workshops — Hero', type: 'text', default: 'कार्यशाळा किंवा' },
  { key: 'workshops_hero_headline2_en', label: 'Headline Line 2 (English)', page: 'Workshops — Hero', type: 'text', default: 'Masterclass' },
  { key: 'workshops_hero_headline2_mr', label: 'Headline Line 2 (Marathi)', page: 'Workshops — Hero', type: 'text', default: 'मास्टरक्लास बुक करा' },
  { key: 'workshops_hero_paragraph_en', label: 'Description (English)', page: 'Workshops — Hero', type: 'textarea', default: 'Reserve your seat in a hands-on 21-pleat masterclass, taught live by our master artisans.' },
  { key: 'workshops_hero_paragraph_mr', label: 'Description (Marathi)', page: 'Workshops — Hero', type: 'textarea', default: 'आमच्या अनुभवी शेफकडून थेट शिका आणि तुमची जागा आताच आरक्षित करा.' },

  // ---- Home / Heritage & Craft Story ----
  { key: 'craft_eyebrow_en', label: 'Eyebrow (English)', page: 'Home — Craft Story', type: 'text', default: 'Artisan Craft & Studio Secrets' },
  { key: 'craft_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Home — Craft Story', type: 'text', default: 'पाककला रहस्य व तंत्र' },
  { key: 'craft_heading_en', label: 'Heading (English)', page: 'Home — Craft Story', type: 'text', default: 'The Secret Science of 21 Pleats: Master Halwai Technique' },
  { key: 'craft_heading_mr', label: 'Heading (Marathi)', page: 'Home — Craft Story', type: 'text', default: '२१ कळ्यांचे अचूक तंत्र आणि स्टुडिओ कारागिरी' },
  { key: 'craft_subheading_en', label: 'Subheading (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Combining centuries-old Maharashtrian confectionery heritage with modern culinary workshop precision for the ultimate taste.' },
  { key: 'craft_subheading_mr', label: 'Subheading (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'शतकानुशतके जपलेली पारंपरिक कारागिरी आणि आधुनिक पाककला स्टुडिओचे परिपूर्ण संयोजन — स्वादः परमानन्दः' },
  { key: 'craft_quote_label_en', label: 'Image Quote Label (English)', page: 'Home — Craft Story', type: 'text', default: 'The 21-Pleat Mastery' },
  { key: 'craft_quote_label_mr', label: 'Image Quote Label (Marathi)', page: 'Home — Craft Story', type: 'text', default: '२१ कळ्यांचे सूत्र' },
  { key: 'craft_quote_text_en', label: 'Image Quote Text (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Twenty-one precise folds crafted with rhythm, balance, and pure organic ingredients.' },
  { key: 'craft_quote_text_mr', label: 'Image Quote Text (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'अचूक २१ कळ्यांची घडी, प्रत्येक तुकड्यात शुद्ध चवीची गोडी.' },
  { key: 'craft_pillar1_title_en', label: 'Pillar 1 Title (English)', page: 'Home — Craft Story', type: 'text', default: 'Exact 21 Handcrafted Pleats' },
  { key: 'craft_pillar1_title_mr', label: 'Pillar 1 Title (Marathi)', page: 'Home — Craft Story', type: 'text', default: 'अचूक २१ कळ्यांची हस्तकला' },
  { key: 'craft_pillar1_desc_en', label: 'Pillar 1 Description (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Our master halwais skillfully teach the pinching sequence of exactly 21 distinct folds before encasing the sweet coconut core.' },
  { key: 'craft_pillar1_desc_mr', label: 'Pillar 1 Description (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'प्रत्येक मोदकात आमच्या कार्यशाळेत शिकवल्याप्रमाणे २१ सुरेख पाकळ्या समान अंतरावर बोटांच्या टोकाने कोरल्या जातात.' },
  { key: 'craft_pillar2_title_en', label: 'Pillar 2 Title (English)', page: 'Home — Craft Story', type: 'text', default: 'Aromatic Ambemohar Dough Science' },
  { key: 'craft_pillar2_title_mr', label: 'Pillar 2 Title (Marathi)', page: 'Home — Craft Story', type: 'text', default: 'सुगंधी आंबेमोहर तांदळाची उकड' },
  { key: 'craft_pillar2_desc_en', label: 'Pillar 2 Description (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Stone-ground fragrant Ambemohar rice flour steamed with precise hydration to achieve a delicate, crack-free silky shell.' },
  { key: 'craft_pillar2_desc_mr', label: 'Pillar 2 Description (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'मूळ कोकणातील आंबेमोहर तांदळाच्या पिठाची गरम पाण्याची मंद आचेवर मऊ लुसलुशीत उकड व लवचिकता तंत्र.' },
  { key: 'craft_pillar3_title_en', label: 'Pillar 3 Title (English)', page: 'Home — Craft Story', type: 'text', default: 'Fresh Coconut & Organic Jaggery' },
  { key: 'craft_pillar3_title_mr', label: 'Pillar 3 Title (Marathi)', page: 'Home — Craft Story', type: 'text', default: 'सेंद्रिय गूळ व ओल्या नारळाचे सारण' },
  { key: 'craft_pillar3_desc_en', label: 'Pillar 3 Description (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Freshly grated Konkan coconut slow-braised with organic chemical-free Kolhapuri jaggery, green cardamom, and fresh nutmeg.' },
  { key: 'craft_pillar3_desc_mr', label: 'Pillar 3 Description (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'ताज्या ओल्या नारळाचा चव, कोल्हापुरी रसायनमुक्त गूळ, वेलची व जायफळाचा मनमोहक नैसर्गिक सुगंध.' },
  { key: 'craft_pillar4_title_en', label: 'Pillar 4 Title (English)', page: 'Home — Craft Story', type: 'text', default: 'Pure A2 Cow Ghee & Kashmiri Saffron' },
  { key: 'craft_pillar4_title_mr', label: 'Pillar 4 Title (Marathi)', page: 'Home — Craft Story', type: 'text', default: 'साजूक तूप व काश्मिरी केशर' },
  { key: 'craft_pillar4_desc_en', label: 'Pillar 4 Description (English)', page: 'Home — Craft Story', type: 'textarea', default: 'Finished with authentic golden A2 cow ghee and hand-plucked Kashmiri saffron strands on the modak peak.' },
  { key: 'craft_pillar4_desc_mr', label: 'Pillar 4 Description (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'शुद्ध साजूक तुपाची धार आणि अस्सल काश्मिरी केशर मोदकाच्या शिखरावर.' },
  { key: 'craft_pledge_title_en', label: 'Purity Pledge Title (English)', page: 'Home — Craft Story', type: 'text', default: '100% Zero-Adulteration Culinary Pledge' },
  { key: 'craft_pledge_title_mr', label: 'Purity Pledge Title (Marathi)', page: 'Home — Craft Story', type: 'text', default: '१००% शून्य भेसळ हमीपत्र' },
  { key: 'craft_pledge_desc_en', label: 'Purity Pledge Description (English)', page: 'Home — Craft Story', type: 'textarea', default: 'No artificial flavors, zero chemical preservatives, no palm oil. Pure heirloom ingredients prepared in our sanitized culinary studio kitchen.' },
  { key: 'craft_pledge_desc_mr', label: 'Purity Pledge Description (Marathi)', page: 'Home — Craft Story', type: 'textarea', default: 'कृत्रिम रंग, प्रिझर्व्हेटिव्ह्ज किंवा रिफाइंड साखरेचा शून्य वापर. केवळ शुद्ध घटक.' },

  // ---- Home / Making Process ----
  { key: 'process_eyebrow_en', label: 'Eyebrow (English)', page: 'Home — Making Process', type: 'text', default: 'The Making Process' },
  { key: 'process_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Home — Making Process', type: 'text', default: 'निर्मिती प्रक्रिया' },
  { key: 'process_heading_en', label: 'Heading (English)', page: 'Home — Making Process', type: 'text', default: 'From Kitchen to Your Doorstep' },
  { key: 'process_heading_mr', label: 'Heading (Marathi)', page: 'Home — Making Process', type: 'text', default: 'स्वयंपाकघरापासून तुमच्या दारापर्यंत' },
  { key: 'process_subheading_en', label: 'Subheading (English)', page: 'Home — Making Process', type: 'textarea', default: 'Every modak goes through a meticulous process to ensure perfection in every bite.' },
  { key: 'process_subheading_mr', label: 'Subheading (Marathi)', page: 'Home — Making Process', type: 'textarea', default: 'प्रत्येक मोदक काटेकोर प्रक्रियेतून जातो, जेणेकरून प्रत्येक घासात परिपूर्णता मिळेल.' },
  { key: 'process_step1_title_en', label: 'Step 1 Title (English)', page: 'Home — Making Process', type: 'text', default: 'Selecting Ingredients' },
  { key: 'process_step1_title_mr', label: 'Step 1 Title (Marathi)', page: 'Home — Making Process', type: 'text', default: 'सामग्रीची निवड' },
  { key: 'process_step1_desc_en', label: 'Step 1 Description (English)', page: 'Home — Making Process', type: 'textarea', default: 'Sourcing farm-fresh coconut, Ambemohar rice & organic jaggery.' },
  { key: 'process_step1_desc_mr', label: 'Step 1 Description (Marathi)', page: 'Home — Making Process', type: 'textarea', default: 'ताजा नारळ, आंबेमोहर तांदूळ व सेंद्रिय गूळ यांची काळजीपूर्वक निवड.' },
  { key: 'process_step2_title_en', label: 'Step 2 Title (English)', page: 'Home — Making Process', type: 'text', default: 'Steaming the Ukad' },
  { key: 'process_step2_title_mr', label: 'Step 2 Title (Marathi)', page: 'Home — Making Process', type: 'text', default: 'उकड शिजवणे' },
  { key: 'process_step2_desc_en', label: 'Step 2 Description (English)', page: 'Home — Making Process', type: 'textarea', default: 'Rice flour is kneaded and steamed into a soft, silky dough.' },
  { key: 'process_step2_desc_mr', label: 'Step 2 Description (Marathi)', page: 'Home — Making Process', type: 'textarea', default: 'तांदळाच्या पिठाची मऊ, मुलायम उकड मंद वाफेवर तयार केली जाते.' },
  { key: 'process_step3_title_en', label: 'Step 3 Title (English)', page: 'Home — Making Process', type: 'text', default: 'Hand-Pleating 21 Folds' },
  { key: 'process_step3_title_mr', label: 'Step 3 Title (Marathi)', page: 'Home — Making Process', type: 'text', default: '२१ कळ्यांची हाताने घडण' },
  { key: 'process_step3_desc_en', label: 'Step 3 Description (English)', page: 'Home — Making Process', type: 'textarea', default: 'Master halwais hand-craft each of the signature 21 pleats.' },
  { key: 'process_step3_desc_mr', label: 'Step 3 Description (Marathi)', page: 'Home — Making Process', type: 'textarea', default: 'आमचे मास्टर कारागीर हाताने अस्सल २१ कळ्या घडवतात.' },
  { key: 'process_step4_title_en', label: 'Step 4 Title (English)', page: 'Home — Making Process', type: 'text', default: 'Packed Fresh & Delivered' },
  { key: 'process_step4_title_mr', label: 'Step 4 Title (Marathi)', page: 'Home — Making Process', type: 'text', default: 'ताजे पॅक, उबदार डिलिव्हरी' },
  { key: 'process_step4_desc_en', label: 'Step 4 Description (English)', page: 'Home — Making Process', type: 'textarea', default: 'Boxed in premium packaging and rushed straight to your doorstep.' },
  { key: 'process_step4_desc_mr', label: 'Step 4 Description (Marathi)', page: 'Home — Making Process', type: 'textarea', default: 'प्रीमियम पॅकेजिंगमध्ये बंद करून थेट तुमच्या दारी पोहोचवले जाते.' },

  // ---- Home / Founder Story ----
  { key: 'founder_eyebrow_en', label: 'Eyebrow (English)', page: 'Home — Founder Story', type: 'text', default: 'Our Journey' },
  { key: 'founder_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Home — Founder Story', type: 'text', default: 'आमचा प्रवास' },
  { key: 'founder_heading1_en', label: 'Heading Part 1 (English)', page: 'Home — Founder Story', type: 'text', default: 'Crafted with Devotion, ' },
  { key: 'founder_heading1_mr', label: 'Heading Part 1 (Marathi)', page: 'Home — Founder Story', type: 'text', default: 'श्रद्धेने बनवलेले, ' },
  { key: 'founder_heading2_en', label: 'Heading Part 2 (English)', page: 'Home — Founder Story', type: 'text', default: 'Shared with Pride' },
  { key: 'founder_heading2_mr', label: 'Heading Part 2 (Marathi)', page: 'Home — Founder Story', type: 'text', default: 'अभिमानाने वाटलेले' },
  { key: 'founder_paragraph1_en', label: 'Paragraph 1 (English)', page: 'Home — Founder Story', type: 'textarea', default: 'Founded by home chef and culinary mentor Akshata Bhatia Kedari, "२१ कळ्या — 21 Kalya™" represents the culmination of generations of traditional Maharashtrian sweets-making expertise.' },
  { key: 'founder_paragraph1_mr', label: 'Paragraph 1 (Marathi)', page: 'Home — Founder Story', type: 'textarea', default: 'गृह शेफ आणि पाककला मार्गदर्शक अक्षता भाटिया केदारी यांनी स्थापन केलेले "२१ कळ्या — 21 Kalya™" हे पिढ्यानपिढ्या जपलेल्या पारंपरिक महाराष्ट्रीयन मिठाई कलेचा कळस आहे.' },
  { key: 'founder_paragraph2_en', label: 'Paragraph 2 (English)', page: 'Home — Founder Story', type: 'textarea', default: 'What started as a kitchen-laboratory in Mumbai has expanded into a massive online community and culinary brand. Today, we specialize in supplying authentic melt-in-mouth steamed Ukadiche Modaks for festivals, organizing hands-on cooking classes, and helping domestic cooks launch their own sustainable culinary labels.' },
  { key: 'founder_paragraph2_mr', label: 'Paragraph 2 (Marathi)', page: 'Home — Founder Story', type: 'textarea', default: 'मुंबईतील एका छोट्या स्वयंपाकघरातून सुरू झालेला हा प्रवास आज एका मोठ्या ऑनलाइन समुदायात व पाककला ब्रँडमध्ये रूपांतरित झाला आहे. आज आम्ही सणांसाठी अस्सल उकडीचे मोदक पुरवतो, प्रत्यक्ष पाककला वर्ग आयोजित करतो आणि घरगुती शेफना स्वतःचा शाश्वत पाककला ब्रँड सुरू करण्यास मदत करतो.' },
  { key: 'founder_stat1_number', label: 'Stat 1 Number', page: 'Home — Founder Story', type: 'text', default: '78K+' },
  { key: 'founder_stat1_label_en', label: 'Stat 1 Label (English)', page: 'Home — Founder Story', type: 'text', default: 'Community Members' },
  { key: 'founder_stat1_label_mr', label: 'Stat 1 Label (Marathi)', page: 'Home — Founder Story', type: 'text', default: 'समुदाय सदस्य' },
  { key: 'founder_stat2_number', label: 'Stat 2 Number', page: 'Home — Founder Story', type: 'text', default: '10K+' },
  { key: 'founder_stat2_label_en', label: 'Stat 2 Label (English)', page: 'Home — Founder Story', type: 'text', default: 'Brand Followers' },
  { key: 'founder_stat2_label_mr', label: 'Stat 2 Label (Marathi)', page: 'Home — Founder Story', type: 'text', default: 'ब्रँड फॉलोअर्स' },
  { key: 'founder_quote_en', label: 'Quote (English)', page: 'Home — Founder Story', type: 'textarea', default: '"Cooking isn\u2019t just about recipes; it\u2019s about sharing pure love."' },
  { key: 'founder_quote_mr', label: 'Quote (Marathi)', page: 'Home — Founder Story', type: 'textarea', default: '"स्वयंपाक फक्त पाककृतींबद्दल नसतो; तो शुद्ध प्रेम वाटण्याबद्दल असतो."' },
  { key: 'founder_quote_attribution', label: 'Quote Attribution', page: 'Home — Founder Story', type: 'text', default: '— Akshata Bhatia Kedari' },

  // ---- About Page / Hero ----
  { key: 'about_hero_eyebrow_en', label: 'Eyebrow (English)', page: 'About — Hero', type: 'text', default: 'About Us' },
  { key: 'about_hero_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'About — Hero', type: 'text', default: 'आमच्याविषयी' },
  { key: 'about_hero_heading1_en', label: 'Heading Part 1 (English)', page: 'About — Hero', type: 'text', default: 'Our Story, Your ' },
  { key: 'about_hero_heading1_mr', label: 'Heading Part 1 (Marathi)', page: 'About — Hero', type: 'text', default: 'आमची कहाणी, तुमची ' },
  { key: 'about_hero_heading2_en', label: 'Heading Part 2 (English)', page: 'About — Hero', type: 'text', default: 'Tradition' },
  { key: 'about_hero_heading2_mr', label: 'Heading Part 2 (Marathi)', page: 'About — Hero', type: 'text', default: 'परंपरा' },
  { key: 'about_hero_paragraph_en', label: 'Description (English)', page: 'About — Hero', type: 'textarea', default: 'From a small kitchen in Mumbai to homes across India — our journey is rooted in authenticity, quality, and an unwavering commitment to tradition.' },
  { key: 'about_hero_paragraph_mr', label: 'Description (Marathi)', page: 'About — Hero', type: 'textarea', default: 'मुंबईतील एका छोट्या स्वयंपाकघरापासून ते संपूर्ण भारतातील घराघरांपर्यंत — आमचा प्रवास अस्सलपणा, गुणवत्ता आणि परंपरेशी असलेल्या अतूट बांधिलकीत रुजलेला आहे.' },

  // ---- About Page / Heritage ----
  { key: 'about_heritage_eyebrow_en', label: 'Eyebrow (English)', page: 'About — Heritage', type: 'text', default: 'Our Heritage' },
  { key: 'about_heritage_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'About — Heritage', type: 'text', default: 'आमचा वारसा' },
  { key: 'about_heritage_heading_en', label: 'Heading (English)', page: 'About — Heritage', type: 'text', default: 'A Legacy of 21-Pleat Modak Making' },
  { key: 'about_heritage_heading_mr', label: 'Heading (Marathi)', page: 'About — Heritage', type: 'text', default: '२१ कळ्यांच्या मोदककलेचा वारसा' },
  { key: 'about_heritage_p1_en', label: 'Paragraph 1 (English)', page: 'About — Heritage', type: 'textarea', default: "२१ कळ्या means '21 buds' — symbolizing the 21 varieties of modaks traditionally offered during Ganesh Chaturthi. Our journey began with a simple belief: that food made with love tastes better." },
  { key: 'about_heritage_p1_mr', label: 'Paragraph 1 (Marathi)', page: 'About — Heritage', type: 'textarea', default: "२१ कळ्या म्हणजे '२१ कळ्या' — गणेश चतुर्थीच्या वेळी अर्पण केल्या जाणाऱ्या २१ प्रकारच्या मोदकांचे प्रतीक. अन्न प्रेमाने बनवले की त्याची चव अधिक चांगली लागते या साध्या श्रद्धेने आमचा प्रवास सुरू झाला." },
  { key: 'about_heritage_p2_en', label: 'Paragraph 2 (English)', page: 'About — Heritage', type: 'textarea', default: "Founded by the Bhatia family, २१ कळ्या was born from a passion for authentic Maharashtrian sweets. In a short time, we've brought the traditional taste of Ukadiche Modaks to homes across India with love and dedication." },
  { key: 'about_heritage_p2_mr', label: 'Paragraph 2 (Marathi)', page: 'About — Heritage', type: 'textarea', default: 'भाटिया कुटुंबाने स्थापन केलेली २१ कळ्या ही अस्सल महाराष्ट्रीयन मिठाईंच्या आवडीतून जन्मली. काही काळातच आम्ही अस्सल उकडीच्या मोदकांची अस्सल चव प्रेमाने आणि समर्पणाने संपूर्ण भारतातील घराघरांपर्यंत पोहोचवली आहे.' },
  { key: 'about_heritage_p3_en', label: 'Paragraph 3 (English)', page: 'About — Heritage', type: 'textarea', default: 'Today, we continue to craft every modak with the finest ingredients, blending tradition with quality — because every bite should feel like a celebration.' },
  { key: 'about_heritage_p3_mr', label: 'Paragraph 3 (Marathi)', page: 'About — Heritage', type: 'textarea', default: 'आज, आम्ही सर्वोत्तम साहित्य वापरून प्रत्येक मोदक काळजीपूर्वक तयार करतो, परंपरा आणि गुणवत्तेची सांगड घालतो — कारण प्रत्येक घास हा उत्सवासारखा वाटला पाहिजे.' },

  // ---- About Page / Values ----
  { key: 'about_values_eyebrow_en', label: 'Eyebrow (English)', page: 'About — Values', type: 'text', default: 'Our Values' },
  { key: 'about_values_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'About — Values', type: 'text', default: 'आमची मूल्ये' },
  { key: 'about_values_heading_en', label: 'Heading (English)', page: 'About — Values', type: 'text', default: 'What Drives Us' },
  { key: 'about_values_heading_mr', label: 'Heading (Marathi)', page: 'About — Values', type: 'text', default: 'आम्हाला प्रेरणा देणारी तत्त्वे' },
  { key: 'about_values_subheading_en', label: 'Subheading (English)', page: 'About — Values', type: 'textarea', default: 'These principles guide everything we do, from sourcing ingredients to packaging your order.' },
  { key: 'about_values_subheading_mr', label: 'Subheading (Marathi)', page: 'About — Values', type: 'textarea', default: 'साहित्य निवडण्यापासून ते तुमची ऑर्डर पॅक करण्यापर्यंत — ही तत्त्वे आमच्या प्रत्येक कृतीला मार्गदर्शन करतात.' },
  { key: 'about_value1_title_en', label: 'Value 1 Title (English)', page: 'About — Values', type: 'text', default: 'Made with Love' },
  { key: 'about_value1_title_mr', label: 'Value 1 Title (Marathi)', page: 'About — Values', type: 'text', default: 'प्रेमाने बनवलेले' },
  { key: 'about_value1_desc_en', label: 'Value 1 Description (English)', page: 'About — Values', type: 'textarea', default: 'Every modak carries the warmth of home and generations of love.' },
  { key: 'about_value1_desc_mr', label: 'Value 1 Description (Marathi)', page: 'About — Values', type: 'textarea', default: 'प्रत्येक मोदकात घराची ऊब आणि पिढ्यानपिढ्याचे प्रेम असते.' },
  { key: 'about_value2_title_en', label: 'Value 2 Title (English)', page: 'About — Values', type: 'text', default: 'Handcrafted Excellence' },
  { key: 'about_value2_title_mr', label: 'Value 2 Title (Marathi)', page: 'About — Values', type: 'text', default: 'हस्तकलेतील उत्कृष्टता' },
  { key: 'about_value2_desc_en', label: 'Value 2 Description (English)', page: 'About — Values', type: 'textarea', default: 'No machines — only skilled hands that have perfected the art over decades.' },
  { key: 'about_value2_desc_mr', label: 'Value 2 Description (Marathi)', page: 'About — Values', type: 'textarea', default: 'यंत्रांचा वापर नाही — दशकांचा अनुभव असलेल्या कुशल हातांनीच घडवलेले.' },
  { key: 'about_value3_title_en', label: 'Value 3 Title (English)', page: 'About — Values', type: 'text', default: 'Quality First' },
  { key: 'about_value3_title_mr', label: 'Value 3 Title (Marathi)', page: 'About — Values', type: 'text', default: 'गुणवत्ता प्रथम' },
  { key: 'about_value3_desc_en', label: 'Value 3 Description (English)', page: 'About — Values', type: 'textarea', default: 'We never compromise on ingredients or process. Only the best for our customers.' },
  { key: 'about_value3_desc_mr', label: 'Value 3 Description (Marathi)', page: 'About — Values', type: 'textarea', default: 'साहित्य किंवा प्रक्रियेत कधीही तडजोड नाही. फक्त सर्वोत्तम.' },
  { key: 'about_value4_title_en', label: 'Value 4 Title (English)', page: 'About — Values', type: 'text', default: 'Pure & Natural' },
  { key: 'about_value4_title_mr', label: 'Value 4 Title (Marathi)', page: 'About — Values', type: 'text', default: 'शुद्ध व नैसर्गिक' },
  { key: 'about_value4_desc_en', label: 'Value 4 Description (English)', page: 'About — Values', type: 'textarea', default: 'No preservatives, no artificial flavors — just pure, wholesome goodness.' },
  { key: 'about_value4_desc_mr', label: 'Value 4 Description (Marathi)', page: 'About — Values', type: 'textarea', default: 'कोणतेही प्रिझर्व्हेटिव्ह्ज नाही, कृत्रिम स्वाद नाही — फक्त शुद्ध, सात्त्विक चव.' },

  // ---- About Page / Team ----
  { key: 'about_team_eyebrow_en', label: 'Eyebrow (English)', page: 'About — Team', type: 'text', default: 'Our Team' },
  { key: 'about_team_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'About — Team', type: 'text', default: 'आमची टीम' },
  { key: 'about_team_heading_en', label: 'Heading (English)', page: 'About — Team', type: 'text', default: 'Behind Every Great Modak' },
  { key: 'about_team_heading_mr', label: 'Heading (Marathi)', page: 'About — Team', type: 'text', default: 'प्रत्येक उत्तम मोदकामागे' },
  { key: 'about_team_subheading_en', label: 'Subheading (English)', page: 'About — Team', type: 'textarea', default: 'Meet the passionate people who make २१ कळ्या possible.' },
  { key: 'about_team_subheading_mr', label: 'Subheading (Marathi)', page: 'About — Team', type: 'textarea', default: '२१ कळ्या शक्य करणाऱ्या समर्पित माणसांना भेटा.' },

  // ---- Home / Testimonials Header ----
  { key: 'testimonials_eyebrow_en', label: 'Eyebrow (English)', page: 'Home — Testimonials', type: 'text', default: 'Verified Reviews & Customer Love' },
  { key: 'testimonials_eyebrow_mr', label: 'Eyebrow (Marathi)', page: 'Home — Testimonials', type: 'text', default: 'ग्राहक व कार्यशाळा विद्यार्थी अनुभव' },
  { key: 'testimonials_heading_en', label: 'Heading (English)', page: 'Home — Testimonials', type: 'text', default: 'Loved by Over 10,000+ Modak Connoisseurs' },
  { key: 'testimonials_heading_mr', label: 'Heading (Marathi)', page: 'Home — Testimonials', type: 'text', default: 'हजारो तृप्त खवय्ये व शिकणाऱ्यांचे अभिप्राय' },
  { key: 'testimonials_subheading_en', label: 'Subheading (English)', page: 'Home — Testimonials', type: 'textarea', default: 'Real verified reviews from pooja orders, festive celebrations, and culinary workshop participants.' },
  { key: 'testimonials_subheading_mr', label: 'Subheading (Marathi)', page: 'Home — Testimonials', type: 'textarea', default: 'मुंबई, पुणे व महाराष्ट्रातील भाविक आणि खवय्यांनी अनुभवलेली २१ कळ्यांची पवित्र परंपरा व अप्रतिम चव.' },

  // ---- Footer ----
  { key: 'footer_philosophy_en', label: 'Brand Philosophy (English)', page: 'Footer', type: 'textarea', default: 'Dedicated to the culinary art of handcrafting genuine 21-pleated Ukadiche Modaks, live masterclasses, and gourmet DIY artisan kits.' },
  { key: 'footer_philosophy_mr', label: 'Brand Philosophy (Marathi)', page: 'Footer', type: 'textarea', default: 'महाराष्ट्राची अस्सल पाककला ओळख असलेले २१ कळ्यांचे उकडीचे मोदक, शेफ मास्टरक्लास कार्यशाळा आणि DIY किट्स. आंबेमोहर तांदूळ, सेंद्रिय गूळ आणि १००% शुद्ध साजूक तूप.' },
  { key: 'footer_studios_heading_en', label: 'Studios Heading (English)', page: 'Footer', type: 'text', default: 'Culinary Studios & Outlets' },
  { key: 'footer_studios_heading_mr', label: 'Studios Heading (Marathi)', page: 'Footer', type: 'text', default: 'आमचे प्रमुख स्टुडिओ व स्वयंपाकघर' },
  { key: 'footer_studio1', label: 'Studio 1 Address', page: 'Footer', type: 'text', default: 'Pune Studio: Prabhat Road, Lane 4, Deccan Gymkhana, Pune – 411004.' },
  { key: 'footer_studio2', label: 'Studio 2 Address', page: 'Footer', type: 'text', default: 'Mumbai Kitchen & Studio: Ranade Road, Dadar West, Mumbai – 400028.' },
  { key: 'footer_studio3', label: 'Studio 3 Address', page: 'Footer', type: 'text', default: 'Thane Workshop Counter: Naupada, Gokhale Road, Thane – 400602.' },
  { key: 'footer_helpline_heading_en', label: 'Helpline Heading (English)', page: 'Footer', type: 'text', default: 'Workshop & Order Helpline' },
  { key: 'footer_helpline_heading_mr', label: 'Helpline Heading (Marathi)', page: 'Footer', type: 'text', default: 'कार्यशाळा नोंदणी व ग्राहक सेवा' },
  { key: 'footer_studio_hours', label: 'Studio Hours', page: 'Footer', type: 'text', default: 'Studio Hours: 9:00 AM – 8:00 PM' },
];

export function groupContentSchemaByPage() {
  const groups: Record<string, ContentField[]> = {};
  for (const field of CONTENT_SCHEMA) {
    if (!groups[field.page]) groups[field.page] = [];
    groups[field.page].push(field);
  }
  return groups;
}
