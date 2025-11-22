// ... at the top of lib/data.ts, with your other types ...

export type BlogPost = {
  slug: string;
  image: string;
  title: BilingualText;
  excerpt: BilingualText;
  content: BilingualText;
};


type BilingualText = {
  fr: string;
  en: string;
};

export type Job = {
  id: string;
  title: BilingualText;
  location: BilingualText;
  description: BilingualText;
};

// REPLACE the old servicesData with this one
export const servicesData = [
  {
    id: 'ai-strategy',
    image: '/images/service-ai-strategy.jpg',
    title: {
      fr: 'Stratégie IA & Conseil',
      en: 'AI Strategy & Consulting',
    },
    description: {
      fr: 'Nous définissons une feuille de route IA alignée sur vos objectifs pour maximiser votre retour sur investissement et assurer une adoption éthique.',
      en: 'We define an AI roadmap aligned with your goals to maximize your return on investment and ensure ethical adoption.',
    },
  },
  {
    id: 'digital-transformation',
    image: '/images/service-digital-transformation.jpg',
    title: {
      fr: 'Transformation Numérique',
      en: 'Digital Transformation',
    },
    description: {
      fr: 'Modernisez vos opérations avec des technologies de pointe pour une efficacité et une agilité accrues, de la PME à la grande entreprise.',
      en: 'Modernize your operations with cutting-edge technologies for increased efficiency and agility, from SMBs to large enterprises.',
    },
  },
  {
    id: 'data-analytics',
    image: '/images/service-data-analytics.jpg',
    title: {
      fr: 'Analyse de Données & BI',
      en: 'Data Analytics & BI',
    },
    description: {
      fr: 'Transformez vos données brutes en informations exploitables et en visualisations claires pour une prise de décision éclairée.',
      en: 'Turn your raw data into actionable insights and clear visualizations for informed decision-making.',
    },
  },
  {
    id: 'custom-ai-solutions',
    image: '/images/service-custom-ai.jpg', // You will need to add this image
    title: {
      fr: 'Solutions IA sur Mesure',
      en: 'Custom AI Solutions',
    },
    description: {
      fr: 'Développement de modèles d\'IA et d\'apprentissage automatique personnalisés pour résoudre vos défis commerciaux les plus complexes.',
      en: 'Development of custom AI and machine learning models to solve your most complex business challenges.',
    },
  },
  {
    id: 'process-automation',
    image: '/images/service-automation.jpg', // You will need to add this image
    title: {
      fr: 'Automatisation des Processus',
      en: 'Process Automation (RPA)',
    },
    description: {
      fr: 'Automatisez les tâches répétitives et manuelles pour libérer vos employés et leur permettre de se concentrer sur des activités à plus forte valeur ajoutée.',
      en: 'Automate repetitive and manual tasks to free up your employees to focus on higher-value activities.',
    },
  },
  {
    id: 'ai-training',
    image: '/images/service-training.jpg', // You will need to add this image
    title: {
      fr: 'Formation & Accompagnement',
      en: 'AI Training & Support',
    },
    description: {
      fr: 'Nous formons vos équipes pour qu\'elles comprennent et utilisent efficacement les nouveaux outils d\'IA, garantissant une transition en douceur.',
      en: 'We train your teams to understand and effectively use new AI tools, ensuring a smooth transition and adoption.',
    },
  },
];


// Testimonials section

export const testimonialsData = [
  {
    image: '/images/testimonial-person1.jpg',
    name: 'Marie Tremblay',
    company: {
      fr: 'Chef de la Direction, Innovatec Inc.',
      en: 'CEO, Innovatec Inc.',
    },
    quote: {
      fr: "Intel-Ar a transformé notre approche de la donnée. Leur expertise en IA nous a ouvert des portes que nous ne pensions pas possibles. Un partenaire stratégique indispensable.",
      en: "Intel-Ar transformed our approach to data. Their AI expertise opened doors we didn't think were possible. An indispensable strategic partner.",
    },
  },
  {
    image: '/images/testimonial-person2.jpg',
    name: 'John Smith',
    company: {
      fr: 'Directeur des Opérations, Solutions Logistiques Globales',
      en: 'Director of Operations, Global Logistics Solutions',
    },
    quote: {
      fr: "Le processus de transformation numérique était intimidant, mais l'équipe d'Intel-Ar l'a rendu simple et efficace. Nos résultats ont dépassé toutes nos attentes.",
      en: "The digital transformation process was daunting, but the Intel-Ar team made it simple and effective. Our results have exceeded all our expectations.",
    },
  },
];



// blog post

export  const  blogPostsData:  BlogPost[] = [
  {
    slug: 'future-of-ai-in-business',
    image: '/images/blog-post-1.jpg',
    title: {
      fr: "L'Avenir de l'IA dans le Monde des Affaires",
      en: "The Future of AI in Business",
    },
    excerpt: {
      fr: "Découvrez comment l'intelligence artificielle est en train de remodeler les industries et ce que cela signifie pour votre entreprise...",
      en: "Explore how artificial intelligence is reshaping industries and what it means for your business...",
    },
    content: {
      fr: "L'intelligence artificielle n'est plus un concept de science-fiction ; c'est une réalité commerciale tangible qui transforme les opérations, la stratégie et l'engagement client.\n\nDe l'automatisation des tâches répétitives à la fourniture d'analyses prédictives, l'IA permet aux entreprises de prendre des décisions plus intelligentes et plus rapides. Chez Intel-Ar, nous croyons que l'adoption stratégique de l'IA est la clé pour débloquer un avantage concurrentiel durable.",
      en: "Artificial intelligence is no longer a science fiction concept; it's a tangible business reality transforming operations, strategy, and customer engagement.\n\nFrom automating repetitive tasks to providing predictive analytics, AI empowers companies to make smarter, faster decisions. At Intel-Ar, we believe that the strategic adoption of AI is the key to unlocking a sustainable competitive advantage.",
    },
  },
  {
    slug: 'navigating-data-privacy',
    image: '/images/blog-post-2.jpg',
    // --- FIX: ADDED THE MISSING title AND excerpt PROPERTIES ---
    title: {
      fr: "Naviguer dans la Confidentialité des Données à l'Ère de l'IA",
      en: "Navigating Data Privacy in the Age of AI",
    },
    excerpt: {
      fr: "La confidentialité des données est plus critique que jamais. Voici les stratégies clés pour protéger les informations de vos clients...",
      en: "Data privacy is more critical than ever. Here are the key strategies to protect your customers' information...",
    },
    content: {
      fr: "Avec la montée de l'IA, la gestion et la protection des données sont devenues primordiales. Les entreprises doivent naviguer dans un paysage complexe de réglementations comme le GDPR et la LPRPDE.\n\nUne stratégie de gouvernance des données robuste n'est pas seulement une obligation légale, c'est un gage de confiance pour vos clients. Il est essentiel de mettre en œuvre des pratiques de 'privacy by design' pour garantir que la technologie sert vos clients de manière éthique.",
      en: "With the rise of AI, managing and protecting data has become paramount. Companies must navigate a complex landscape of regulations like GDPR and PIPEDA.\n\nA robust data governance strategy is not just a legal requirement; it's a foundation of trust with your customers. Implementing 'privacy by design' practices is essential to ensure technology serves your clients ethically.",
    },
  },
  {
    slug: 'ai-for-small-business',
    image: '/images/blog-post-3.jpg',
    // --- FIX: ADDED THE MISSING title AND excerpt PROPERTIES ---
    title: {
      fr: "Comment l'IA Peut Aider les Petites Entreprises à Prospérer",
      en: "How AI Can Help Small Businesses Thrive",
    },
    excerpt: {
      fr: "L'IA n'est pas seulement pour les grandes entreprises. Découvrez des outils et des tactiques accessibles pour les PME...",
      en: "AI isn't just for large corporations. Discover accessible tools and tactics for small and medium-sized enterprises...",
    },
    content: {
      fr: "Beaucoup pensent que l'IA est réservée aux géants de la technologie, mais c'est un mythe. Aujourd'hui, de nombreux outils d'IA sont accessibles et abordables pour les PME.\n\nQue ce soit pour optimiser le marketing, améliorer le service client avec des chatbots, ou rationaliser la gestion des stocks, l'IA peut offrir un retour sur investissement significatif pour les petites entreprises cherchant à innover et à se développer.",
      en: "Many believe AI is reserved for tech giants, but that's a myth. Today, numerous AI tools are accessible and affordable for SMEs.\n\nWhether it's optimizing marketing, enhancing customer service with chatbots, or streamlining inventory management, AI can provide a significant ROI for small businesses looking to innovate and grow.",
    },
  },
];

// (servicesData, testimonialsData, blogPostsData should be here)

export const teamData = [
  {
    image: '/images/team-member-1.jpg',
    name: 'Kawar Ahmad', // Example Name
    role: {
      fr: 'Ingénieur IA Principal',
      en: 'Lead AI Engineer',
    },
  },
  {
    image: '/images/team-member-2.jpg',
    name: 'Karina Fatema', // Example Name
    role: {
      fr: 'Spécialiste en Transformation Numérique',
      en: 'Digital Transformation Specialist',
    },
  },
  {
    image: '/images/team-member-3.jpg',
    name: 'Alex Prosto', // Example Name
    role: {
      fr: 'Consultant Stratégique',
      en: 'Strategic Consultant',
    },
  },
];



// (servicesData, testimonialsData, blogPostsData, teamData should be here)

export const faqData = [
  {
    question: {
      fr: 'Où devrais-je commencer ma transformation numérique ?',
      en: 'Where should I start my digital transformation?',
    },
    answer: {
      fr: "Le meilleur point de départ est une évaluation complète de vos processus actuels et de vos objectifs commerciaux. Notre consultation initiale gratuite est conçue pour identifier les domaines à plus fort impact pour une transformation rapide et efficace.",
      en: "The best starting point is a comprehensive assessment of your current processes and business goals. Our free initial consultation is designed to identify the highest-impact areas for a fast and effective transformation.",
    },
  },
  {
    question: {
      fr: "Combien de temps faut-il pour voir des résultats avec l'IA ?",
      en: 'How long does it take to see results with AI?',
    },
    answer: {
      fr: "Les résultats peuvent varier en fonction de la complexité du projet. Cependant, de nombreux clients constatent des améliorations mesurables en matière d'efficacité et d'analyse dans les 3 à 6 mois suivant la mise en œuvre.",
      en: "Results can vary depending on project complexity. However, many clients see measurable improvements in efficiency and insights within 3 to 6 months of implementation.",
    },
  },
  {
    question: {
      fr: "L'IA est-elle abordable pour une petite entreprise ?",
      en: 'Is AI affordable for a small business?',
    },
    answer: {
      fr: "Absolument. Il existe de nombreuses solutions d'IA évolutives et des stratégies qui peuvent être adaptées au budget et aux besoins des petites et moyennes entreprises. Notre objectif est de démocratiser l'accès à ces technologies de pointe.",
      en: "Absolutely. There are many scalable AI solutions and strategies that can be tailored to the budget and needs of small to medium-sized businesses. Our goal is to democratize access to these powerful technologies.",
    },
  },
];



// (about us)

export const aboutData = [
  {
    title: {
      fr: 'Notre Mission',
      en: 'Our Mission',
    },
    content: {
      fr: "Rendre l'intelligence artificielle accessible et bénéfique pour chaque entreprise, en favorisant une croissance durable et une performance humaine augmentée.",
      en: 'To make artificial intelligence accessible and beneficial for every business, fostering sustainable growth and augmented human performance.',
    },
  },
  {
    title: {
      fr: 'Notre Vision',
      en: 'Our Vision',
    },
    content: {
      fr: "Être le leader de confiance en transformation numérique au Québec, reconnu pour notre approche éthique et notre impact positif sur la société.",
      en: 'To be the trusted leader in digital transformation in Quebec, recognized for our ethical approach and positive impact on society.',
    },
  },
  {
    title: {
      fr: 'Nos Valeurs',
      en: 'Our Values',
    },
    content: {
      fr: "Innovation, Intégrité, Partenariat, Humanité. Ces piliers guident chacune de nos actions et collaborations.",
      en: 'Innovation, Integrity, Partnership, Humanity. These pillars guide every one of our actions and collaborations.',
    },
  },
];

// --- ADD THIS ENTIRE BLOCK TO THE END of lib/data.ts ---
export const jobsData: Job[] = [
  {
    id: 'full-stack-dev',
    title: {
      fr: 'Développeur(se) Full-Stack',
      en: 'Full-Stack Developer',
    },
    location: {
      fr: 'Lévis, QC (Hybride)',
      en: 'Lévis, QC (Hybrid)',
    },
    description: {
      fr: 'Vous développerez des plateformes web innovantes en utilisant des technologies modernes. Expérience avec React, Node.js et PostgreSQL requise.',
      en: 'You will develop innovative web platforms using modern technologies. Experience with React, Node.js, and PostgreSQL is required.',
    },
  },
  {
    id: 'ai-engineer',
    title: {
      fr: 'Ingénieur(e) en Intelligence Artificielle',
      en: 'Artificial Intelligence Engineer',
    },
    location: {
      fr: 'Lévis, QC (Hybride)',
      en: 'Lévis, QC (Hybrid)',
    },
    description: {
      fr: 'Concevez et mettez en œuvre des modèles d\'apprentissage automatique pour résoudre des problèmes complexes. Maîtrise de Python et des frameworks comme TensorFlow ou PyTorch.',
      en: 'Design and implement machine learning models to solve complex problems. Proficiency in Python and frameworks like TensorFlow or PyTorch is essential.',
    },
  },
];

// lib/data.ts

// --- MOCK DASHBOARD DATA ---

export const clientProjectsData = [
  {
    id: 'proj-alpha',
    name: 'Project Alpha - AI Integration',
    status: 'In Progress',
    progress: 60,
    leadConsultant: 'Alex Prosto',
    documents: [
      { id: 'doc1', name: 'Project Proposal.pdf', date: '2025-10-15' },
      { id: 'doc2', name: 'Initial Dataset.csv', date: '2025-10-20' },
    ],
  },
  {
    id: 'proj-beta',
    name: 'Project Beta - Digital Transformation',
    status: 'Completed',
    progress: 100,
    leadConsultant: 'Karina Fatema',
    documents: [
      { id: 'doc3', name: 'Final Report.pdf', date: '2025-09-01' },
    ],
  },
];

export const clientChatHistoryData = [
  { id: 'msg1', sender: 'user', text: 'What services do you offer?' },
  { id: 'msg2', sender: 'bot', text: 'We offer services in AI Strategy, Digital Transformation, and Data Analytics.' },
  { id: 'msg3', sender: 'user', text: 'Tell me more about data analytics.' },
];