import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Allow nested translation objects (homepage.*) so dot-notation lookups work
const translations: Record<Language, any> = {
  en: {
    home: 'Home',
    events: 'Events',
    enroll: 'Enroll',
    contact: 'Contact',
    legal: 'Legal',
    manageAccount: 'Manage Account',
    nav: {
      home: 'Home',
      events: 'Events',
      enroll: 'Enroll',
      contact: 'Contact',
      terms: 'Terms & Conditions',
    },
    header: {
      manageAccount: 'Manage Account',
    },
    footer: {
      linkedin: 'LinkedIn',
    },
    hero_title: 'Welcome to Kai',
    hero_subtitle: 'Knowledge & Innovation for Everyone',
    learn_more: 'Learn More',
    view_events: 'View Events',
    get_started: 'Get Started',
    pricing_title: 'Choose Your Plan',
    pricing_subtitle: 'Select the perfect plan for your learning journey',
    basic_plan: 'Basic',
    standard_plan: 'Standard',
    premium_plan: 'Premium',
    subscribe: 'Subscribe',
    contact_us: 'Contact Us',
    contact_title: 'Get in Touch',
    contact_subtitle: 'We\'d love to hear from you',
    book_meeting: 'Book a Meeting',
    send_message: 'Send Message',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    events_title: 'Upcoming Events',
    events_subtitle: 'Join us for exciting learning opportunities',
    view_all_events: 'View All Events',
    register: 'Register',
    terms_conditions: 'Terms & Conditions',
    privacy_policy: 'Privacy Policy',
    follow_us: 'Follow us on LinkedIn',
    homepage: {
      block1_title: 'Help your clients protect their business',
      block1_text:
        'Thorough risk identification combined with strategic proactive management to enhance business resilience and drive sustainable long-term value creation.',
      block2_title: 'What is Kai?',
      block2_text:
        'Aimed at Small & Medium Size Practices. Designed for Small & Medium Size Enterprises. Kai provides their clients with 3 fundamental pillars for a successful practice.',
      block3_1_title: 'Ready-to-use Kit',
      block3_1_text: 'To build a sustainability consultancy and compliance practice.',
      block3_2_title: 'Data Centre',
      block3_2_text:
        'A mutualised Data Computing and Competencies Centre, to ensure quality and low cost.',
      block3_3_title: 'Trusted Alliance',
      block3_3_text:
        'Reliable and professional experts to share cutting-edge knowledge and provide training.',
      our_story_title: 'OUR STORY',
      our_story_text:
        'Kai is an alliance of highly experienced professionals with more than 80 years of combined expertise in compliance consulting, accounting, auditing, and sustainability. Our multilingual and international team is dedicated to strengthening your practice by providing new skills and competencies aligned with the most recent industry best practices and international standards.',
      philosophy_title: 'Our Philosophy',
      philosophy_text:
        'Kai is named with intention, drawing from the Japanese term 改, which signifies "Renew" or "Change." It embodies progress and forward momentum. The name Kai appears in several Japanese words such as Sekai (world), Kaigai (overseas), and especially Kaizen—the philosophy of continuous incremental improvements that drive significant positive outcomes across business operations. At its core, Kai empowers you to assist your clients in managing risk effectively through both subtle and major changes, leveraging globally recognised compliance standards.',
    },
  },
  es: {
    home: 'Inicio',
    events: 'Eventos',
    enroll: 'Inscribirse',
    contact: 'Contacto',
    legal: 'Legal',
    manageAccount: 'Administrar Cuenta',
    nav: {
      home: 'Inicio',
      events: 'Eventos',
      enroll: 'Inscribirse',
      contact: 'Contacto',
      terms: 'Términos y Condiciones',
    },
    header: {
      manageAccount: 'Gestionar Cuenta',
    },
    footer: {
      linkedin: 'LinkedIn',
    },
    hero_title: 'Bienvenido a Kai',
    hero_subtitle: 'Conocimiento e Innovación para Todos',
    learn_more: 'Saber Más',
    view_events: 'Ver Eventos',
    get_started: 'Comenzar',
    pricing_title: 'Elige Tu Plan',
    pricing_subtitle: 'Selecciona el plan perfecto para tu viaje de aprendizaje',
    basic_plan: 'Básico',
    standard_plan: 'Estándar',
    premium_plan: 'Premium',
    subscribe: 'Suscribirse',
    contact_us: 'Contáctanos',
    contact_title: 'Ponte en Contacto',
    contact_subtitle: 'Nos encantaría saber de ti',
    book_meeting: 'Reservar Reunión',
    send_message: 'Enviar Mensaje',
    name: 'Nombre',
    email: 'Correo Electrónico',
    message: 'Mensaje',
    submit: 'Enviar',
    events_title: 'Próximos Eventos',
    events_subtitle: 'Únete a nosotros para emocionantes oportunidades de aprendizaje',
    view_all_events: 'Ver Todos los Eventos',
    register: 'Registrarse',
    terms_conditions: 'Términos y Condiciones',
    privacy_policy: 'Política de Privacidad',
    follow_us: 'Síguenos en LinkedIn',
    homepage: {
      block1_title: 'Ayude a sus clientes a proteger su negocio',
      block1_text:
        'Identificación exhaustiva de riesgos combinada con una gestión proactiva estratégica para mejorar la resiliencia empresarial y crear valor sostenible a largo plazo.',
      block2_title: '¿Qué es Kai?',
      block2_text:
        'Dirigido a pequeñas y medianas empresas. Kai proporciona a sus clientes 3 pilares fundamentales para una práctica exitosa.',
      block3_1_title: 'Kit listo para usar',
      block3_1_text: 'Para construir una consultoría de sostenibilidad y cumplimiento.',
      block3_2_title: 'Centro de Datos',
      block3_2_text:
        'Un Centro de Competencias y Computación de Datos mutualizado, para garantizar calidad y bajo costo.',
      block3_3_title: 'Alianza de Confianza',
      block3_3_text:
        'Expertos confiables y profesionales para compartir conocimientos de vanguardia y brindar capacitación.',
      our_story_title: 'NUESTRA HISTORIA',
      our_story_text:
        'Kai es una alianza de profesionales altamente experimentados con más de 80 años de experiencia combinada en consultoría de cumplimiento, contabilidad, auditoría y sostenibilidad. Nuestro equipo multilingüe e internacional está dedicado a fortalecer su práctica proporcionando nuevas habilidades y competencias alineadas con las mejores prácticas de la industria y los estándares internacionales más recientes.',
      philosophy_title: 'Nuestra Filosofía',
      philosophy_text:
        'Kai se nombra con intención, derivado del término japonés 改, que significa "Renovar" o "Cambiar". Encapsula el progreso y el impulso hacia adelante. El nombre Kai aparece en varias palabras japonesas como Sekai (mundo), Kaigai (extranjero) y especialmente Kaizen: la filosofía de mejoras incrementales continuas que impulsan resultados positivos significativos en las operaciones comerciales. En esencia, Kai le permite ayudar a sus clientes a gestionar el riesgo de manera efectiva a través de cambios sutiles y mayores, aprovechando los estándares de cumplimiento reconocidos globalmente.',
    },
  },
  fr: {
    home: 'Accueil',
    events: 'Événements',
    enroll: 'S\'inscrire',
    contact: 'Contact',
    legal: 'L\'égal',
    manageAccount: 'Gérer le Compte',
    nav: {
      home: 'Accueil',
      events: 'Événements',
      enroll: 'S\'inscrire',
      contact: 'Contact',
      terms: 'Conditions Générales',
    },
    header: {
      manageAccount: 'Gérer le Compte',
    },
    footer: {
      linkedin: 'LinkedIn',
    },
    hero_title: 'Bienvenue chez Kai',
    hero_subtitle: 'Connaissance et Innovation pour Tous',
    learn_more: 'En Savoir Plus',
    view_events: 'Voir les Événements',
    get_started: 'Commencer',
    pricing_title: 'Choisissez Votre Plan',
    pricing_subtitle: 'Sélectionnez le plan parfait pour votre parcours d\'apprentissage',
    basic_plan: 'Basique',
    standard_plan: 'Standard',
    premium_plan: 'Premium',
    subscribe: 'S\'abonner',
    contact_us: 'Contactez-nous',
    contact_title: 'Entrer en Contact',
    contact_subtitle: 'Nous aimerions avoir de vos nouvelles',
    book_meeting: 'Réserver une Réunion',
    send_message: 'Envoyer un Message',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    submit: 'Soumettre',
    events_title: 'Événements à Venir',
    events_subtitle: 'Rejoignez-nous pour des opportunités d\'apprentissage passionnantes',
    view_all_events: 'Voir Tous les Événements',
    register: 'S\'inscrire',
    terms_conditions: 'Termes et Conditions',
    privacy_policy: 'Politique de Confidentialité',
    follow_us: 'Suivez-nous sur LinkedIn',
    homepage: {
      block1_title: 'Aidez vos clients à protéger leur entreprise',
      block1_text:
        "Identification approfondie des risques combinée à une gestion proactive stratégique pour renforcer la résilience de l'entreprise et créer une valeur durable à long terme.",
      block2_title: "Qu'est-ce que Kai ?",
      block2_text:
        "Destiné aux petites et moyennes entreprises. Kai fournit à ses clients 3 piliers fondamentaux pour une pratique réussie.",
      block3_1_title: "Kit prêt à l'emploi",
      block3_1_text: "Pour construire un cabinet de conseil en durabilité et conformité.",
      block3_2_title: 'Centre de Données',
      block3_2_text:
        "Un Centre mutualisé de Compétences et de Calcul de Données, pour garantir qualité et faible coût.",
      block3_3_title: 'Alliance de Confiance',
      block3_3_text:
        "Des experts fiables et professionnels pour partager des connaissances de pointe et fournir une formation.",
      our_story_title: 'NOTRE HISTOIRE',
      our_story_text:
        "Kai est une alliance de professionnels hautement expérimentés avec plus de 80 ans d'expertise combinée en conseil en conformité, comptabilité, audit et durabilité. Notre équipe multilingue et internationale s'engage à renforcer votre pratique en fournissant de nouvelles compétences alignées sur les meilleures pratiques de l'industrie et les normes internationales les plus récentes.",
      philosophy_title: 'Notre Philosophie',
      philosophy_text:
        "Kai est nommé avec intention, tiré du terme japonais 改, qui signifie 'Renouveler' ou 'Changer'. Il incarne le progrès et l'élan en avant. Le nom Kai apparaît dans plusieurs mots japonais comme Sekai (monde), Kaigai (étranger) et surtout Kaizen : la philosophie des améliorations continues et incrémentales qui génèrent des résultats positifs significatifs dans les opérations commerciales. Au cœur, Kai vous permet d'aider vos clients à gérer efficacement les risques grâce à des changements subtils et majeurs, en tirant parti des normes de conformité reconnues mondialement.",
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('kai-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kai-language', lang);
  };

  // Support nested translation keys like 'homepage.block1_title'
  const t = (key: string): string => {
    // Try flat key first (for backward compatibility)
    if (translations[language][key]) return translations[language][key];

    // Support nested keys using dot notation
    const parts = key.split('.');
    let value: any = translations[language];
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return key; // fallback to key if not found
      }
    }
    if (typeof value === 'string') return value;
    return key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};