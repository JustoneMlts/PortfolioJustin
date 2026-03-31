export type Lang = "fr" | "en" | "es" | "it"

export interface Translation {
  nav: {
    home: string
    about: string
    projects: string
    experience: string
    skills: string
    aiChat: string
    contact: string
  }
  hero: {
    greeting: string
    role: string
    description: string
    seeProjects: string
    contactMe: string
    available: string
    tapForInfo: string
    discoverProfile: string
    badges: {
      experience: string
      level: string
      degree: string
    }
  }
  about: {
    title: string
    subtitle: string
    p1: string
    p2: string
    skills: string[]
  }
  projects: {
    title: string
    view: string
    viewProject: string
    code: string
    comingSoon: string
    items: { id: string; title: string; description: string }[]
  }
  experience: {
    title: string
    items: {
      title: string
      company: string
      period: string
      description: string
      technologies: string[]
    }[]
  }
  skills: {
    title: string
    other: string
    categoryNames: string[]
  }
  showreel: {
    title: string
    subtitle: string
    placeholder: string
    tip: string
    initialMessage: string
    responses: string[]
  }
  contact: {
    title: string
    subtitle: string
    description: string
    phone: string
    location: string
    name: string
    namePlaceholder: string
    emailPlaceholder: string
    subject: string
    subjectPlaceholder: string
    message: string
    messagePlaceholder: string
    send: string
  }
  footer: {
    role: string
    rights: string
  }
}

const translations: Record<Lang, Translation> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      experience: "Expérience",
      skills: "Compétences",
      aiChat: "Chat IA",
      contact: "Contact",
    },
    hero: {
      greeting: "Bonjour, je suis",
      role: "Développeur Full Stack",
      description:
        "Je crée des applications web modernes, performantes et accessibles avec les dernières technologies.",
      seeProjects: "Voir mes projets",
      contactMe: "Me contacter",
      available: "Disponible",
      tapForInfo: "Tap pour plus d'infos",
      discoverProfile: "Découvrir mon profil",
      badges: {
        experience: "3 ans",
        level: "Expert",
        degree: "Bac + 5",
      },
    },
    about: {
      title: "À propos de moi",
      subtitle: "Développeur Full Stack passionné",
      p1: "Avec plus de 3 ans d'expérience dans le développement web, je me spécialise dans la création d'applications web modernes et performantes. Ma passion pour les nouvelles technologies me pousse à constamment apprendre et à me perfectionner.",
      p2: "Je m'efforce de créer des expériences utilisateur exceptionnelles en combinant un design attrayant avec des fonctionnalités robustes et une architecture solide.",
      skills: [
        "Développement Front-end",
        "Développement Back-end",
        "Architecture logicielle",
        "UI/UX Design",
        "Optimisation des performances",
        "Responsive Design",
      ],
    },
    projects: {
      title: "Mes Projets",
      view: "Voir",
      viewProject: "Voir le projet",
      code: "Code",
      comingSoon: "Mise en production...",
      items: [
        {
          id: "geneailogy",
          title: "GeneAiLogy",
          description: "Renouez avec votre histoire familiale avec une touche d'IA.",
        },
        {
          id: "italingo",
          title: "Italingo",
          description: "Apprenez facilement l'italien avec une app interactive.",
        },
        {
          id: "pfg",
          title: "PFG",
          description: "Application de gestion de factures et de suivi des paiements.",
        },
        {
          id: "Lexia",
          title: "Lexia",
          description:
            "Une app mobile de lexique interactif utilisant l'IA pour vous accompagner dans votre apprentissage.",
        },
        {
          id: "tiip",
          title: "TIIP",
          description:
            "Application web de gestion d'incidents et de tracking de données avec analyse par IA.",
        },
      ],
    },
    experience: {
      title: "Mon Parcours",
      items: [
        {
          title: "Développeur Full Stack",
          company: "Indépendant",
          period: "2023 - Aujourd'hui",
          description:
            "Travail en freelance sur des projets personnels. Montée en compétences en UX/UI (maquettage), DevOps, intégration continue, nouvelles technologies et bonnes pratiques de développement pour devenir un profil polyvalent.",
          technologies: ["React", "Node.js", "Firebase", "Docker", "Figma"],
        },
        {
          title: "Développeur Full Stack",
          company: "SmartEvo",
          period: "2021 - 2023",
          description:
            "Développement complet de la plateforme Smartevo, un outil de gestion de projets audiovisuels. Participation à l'architecture, l'implémentation de fonctionnalités clés et à l'amélioration continue de l'interface et des performances.",
          technologies: ["React", "Node.js", "Postgre", "Docker"],
        },
        {
          title: "Développeur Junior",
          company: "Digidom",
          period: "2020 - 2021",
          description:
            "Refonte complète du site web et mise à jour de l'API principale. Développement de nouvelles fonctionnalités majeures pour améliorer l'expérience utilisateur et la performance globale du service.",
          technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
        },
        {
          title: "Obtention de mon bac+5 en informatique.",
          company: "Institut G4",
          period: "2020 - 2023",
          description:
            "Obtention d'un Master en Informatique avec une spécialisation en développement web. Réalisation de projets pour de véritables clients : gestion de projet, développement d'applications web, travail en équipe, et respect des délais. Solide expérience acquise en conditions professionnelles.",
          technologies: [],
        },
      ],
    },
    skills: {
      title: "Mes Compétences",
      other: "Autres compétences",
      categoryNames: ["Front-end", "Back-end", "Outils & Autres"],
    },
    showreel: {
      title: "Chat IA",
      subtitle: "Découvrez l'intégration d'intelligence artificielle dans mes projets",
      placeholder: "Posez-moi une question sur Justin ou ses compétences...",
      tip: "💡 Essayez de me demander des informations sur les compétences de Justin, ses projets ou ses technologies préférées",
      initialMessage: "Bonjour ! Je suis un assistant IA. Comment puis-je vous aider aujourd'hui ?",
      responses: [
        "C'est une excellente question ! En tant que démo, je peux vous dire que Justin maîtrise parfaitement l'intégration d'IA dans ses applications.",
        "Intéressant ! Justin utilise les dernières technologies comme React, Next.js et TypeScript pour créer des interfaces modernes.",
        "Absolument ! L'expérience utilisateur est au cœur de chaque projet de Justin. Il privilégie toujours la simplicité et l'efficacité.",
        "Parfait ! Justin peut vous aider à concrétiser vos idées avec des solutions techniques innovantes et performantes.",
        "Excellente remarque ! Justin a une expertise particulière dans l'intégration d'APIs d'IA comme OpenAI, Claude ou Gemini.",
        "Tout à fait ! Justin développe des chatbots intelligents et des interfaces conversationnelles pour améliorer l'expérience utilisateur.",
        "Bonne question ! Justin maîtrise l'architecture full-stack nécessaire pour déployer des solutions IA robustes et scalables.",
        "Précisément ! Justin combine design moderne et intelligence artificielle pour créer des applications vraiment innovantes.",
      ],
    },
    contact: {
      title: "Me Contacter",
      subtitle: "Discutons de votre projet",
      description:
        "Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter. Je suis toujours à la recherche de nouvelles opportunités passionnantes.",
      phone: "Téléphone",
      location: "Localisation",
      name: "Nom",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      subject: "Sujet",
      subjectPlaceholder: "Sujet de votre message",
      message: "Message",
      messagePlaceholder: "Votre message...",
      send: "Envoyer le message",
    },
    footer: {
      role: "Développeur Full Stack",
      rights: "Tous droits réservés.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      aiChat: "AI Chat",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      role: "Full Stack Developer",
      description:
        "I build modern, high-performance, and accessible web applications using the latest technologies.",
      seeProjects: "See my projects",
      contactMe: "Contact me",
      available: "Available",
      tapForInfo: "Tap for more info",
      discoverProfile: "Discover my profile",
      badges: {
        experience: "3 years",
        level: "Expert",
        degree: "Master's",
      },
    },
    about: {
      title: "About me",
      subtitle: "Passionate Full Stack Developer",
      p1: "With over 3 years of experience in web development, I specialize in building modern and high-performance web applications. My passion for new technologies pushes me to constantly learn and improve.",
      p2: "I strive to create exceptional user experiences by combining attractive design with robust functionality and solid architecture.",
      skills: [
        "Front-end Development",
        "Back-end Development",
        "Software Architecture",
        "UI/UX Design",
        "Performance Optimization",
        "Responsive Design",
      ],
    },
    projects: {
      title: "My Projects",
      view: "View",
      viewProject: "View project",
      code: "Code",
      comingSoon: "Coming soon...",
      items: [
        {
          id: "geneailogy",
          title: "GeneAiLogy",
          description: "Reconnect with your family history with an AI touch.",
        },
        {
          id: "italingo",
          title: "Italingo",
          description: "Learn Italian easily with an interactive app.",
        },
        {
          id: "pfg",
          title: "PFG",
          description: "Invoice management and payment tracking application.",
        },
        {
          id: "Lexia",
          title: "Lexia",
          description:
            "An interactive vocabulary mobile app using AI to guide you in your learning journey.",
        },
        {
          id: "tiip",
          title: "TIIP",
          description:
            "Web application for incident management and data tracking with AI-powered analysis.",
        },
      ],
    },
    experience: {
      title: "My Journey",
      items: [
        {
          title: "Full Stack Developer",
          company: "Independent",
          period: "2023 - Present",
          description:
            "Freelance work on personal projects. Skill development in UX/UI (wireframing), DevOps, continuous integration, new technologies and best development practices to become a versatile profile.",
          technologies: ["React", "Node.js", "Firebase", "Docker", "Figma"],
        },
        {
          title: "Full Stack Developer",
          company: "SmartEvo",
          period: "2021 - 2023",
          description:
            "Full development of the Smartevo platform, an audiovisual project management tool. Participation in architecture, implementation of key features and continuous improvement of the interface and performance.",
          technologies: ["React", "Node.js", "Postgre", "Docker"],
        },
        {
          title: "Junior Developer",
          company: "Digidom",
          period: "2020 - 2021",
          description:
            "Complete redesign of the website and update of the main API. Development of major new features to improve the user experience and overall service performance.",
          technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
        },
        {
          title: "Master's degree in Computer Science.",
          company: "Institut G4",
          period: "2020 - 2023",
          description:
            "Obtained a Master's degree in Computer Science with a specialization in web development. Completed projects for real clients: project management, web application development, teamwork, and meeting deadlines. Solid experience gained in professional conditions.",
          technologies: [],
        },
      ],
    },
    skills: {
      title: "My Skills",
      other: "Other skills",
      categoryNames: ["Front-end", "Back-end", "Tools & Other"],
    },
    showreel: {
      title: "AI Chat",
      subtitle: "Discover the integration of artificial intelligence in my projects",
      placeholder: "Ask me a question about Justin or his skills...",
      tip: "💡 Try asking me about Justin's skills, his projects or his favorite technologies",
      initialMessage: "Hello! I'm an AI assistant. How can I help you today?",
      responses: [
        "That's an excellent question! As a demo, I can tell you that Justin perfectly masters AI integration in his applications.",
        "Interesting! Justin uses the latest technologies like React, Next.js and TypeScript to create modern interfaces.",
        "Absolutely! User experience is at the heart of every Justin project. He always prioritizes simplicity and efficiency.",
        "Perfect! Justin can help you bring your ideas to life with innovative and high-performance technical solutions.",
        "Great point! Justin has particular expertise in integrating AI APIs like OpenAI, Claude or Gemini.",
        "Indeed! Justin develops intelligent chatbots and conversational interfaces to enhance the user experience.",
        "Good question! Justin masters the full-stack architecture needed to deploy robust and scalable AI solutions.",
        "Precisely! Justin combines modern design and artificial intelligence to create truly innovative applications.",
      ],
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's discuss your project",
      description:
        "Have a project in mind? Feel free to contact me to discuss it. I'm always looking for exciting new opportunities.",
      phone: "Phone",
      location: "Location",
      name: "Name",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Subject of your message",
      message: "Message",
      messagePlaceholder: "Your message...",
      send: "Send message",
    },
    footer: {
      role: "Full Stack Developer",
      rights: "All rights reserved.",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      skills: "Habilidades",
      aiChat: "Chat IA",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy",
      role: "Desarrollador Full Stack",
      description:
        "Creo aplicaciones web modernas, de alto rendimiento y accesibles con las últimas tecnologías.",
      seeProjects: "Ver mis proyectos",
      contactMe: "Contáctame",
      available: "Disponible",
      tapForInfo: "Toca para más info",
      discoverProfile: "Descubrir mi perfil",
      badges: {
        experience: "3 años",
        level: "Experto",
        degree: "Máster",
      },
    },
    about: {
      title: "Sobre mí",
      subtitle: "Desarrollador Full Stack apasionado",
      p1: "Con más de 3 años de experiencia en desarrollo web, me especializo en la creación de aplicaciones web modernas y de alto rendimiento. Mi pasión por las nuevas tecnologías me impulsa a aprender y mejorar constantemente.",
      p2: "Me esfuerzo por crear experiencias de usuario excepcionales combinando un diseño atractivo con funcionalidades robustas y una arquitectura sólida.",
      skills: [
        "Desarrollo Front-end",
        "Desarrollo Back-end",
        "Arquitectura de software",
        "UI/UX Design",
        "Optimización del rendimiento",
        "Diseño Responsive",
      ],
    },
    projects: {
      title: "Mis Proyectos",
      view: "Ver",
      viewProject: "Ver el proyecto",
      code: "Código",
      comingSoon: "En producción...",
      items: [
        {
          id: "geneailogy",
          title: "GeneAiLogy",
          description: "Reconéctate con tu historia familiar con un toque de IA.",
        },
        {
          id: "italingo",
          title: "Italingo",
          description: "Aprende italiano fácilmente con una app interactiva.",
        },
        {
          id: "pfg",
          title: "PFG",
          description: "Aplicación de gestión de facturas y seguimiento de pagos.",
        },
        {
          id: "Lexia",
          title: "Lexia",
          description:
            "Una app móvil de vocabulario interactivo que usa IA para acompañarte en tu aprendizaje.",
        },
        {
          id: "tiip",
          title: "TIIP",
          description:
            "Aplicación web de gestión de incidentes y seguimiento de datos con análisis por IA.",
        },
      ],
    },
    experience: {
      title: "Mi Trayectoria",
      items: [
        {
          title: "Desarrollador Full Stack",
          company: "Independiente",
          period: "2023 - Actualidad",
          description:
            "Trabajo freelance en proyectos personales. Adquisición de habilidades en UX/UI (maquetación), DevOps, integración continua, nuevas tecnologías y buenas prácticas de desarrollo para convertirse en un perfil versátil.",
          technologies: ["React", "Node.js", "Firebase", "Docker", "Figma"],
        },
        {
          title: "Desarrollador Full Stack",
          company: "SmartEvo",
          period: "2021 - 2023",
          description:
            "Desarrollo completo de la plataforma Smartevo, una herramienta de gestión de proyectos audiovisuales. Participación en la arquitectura, implementación de funcionalidades clave y mejora continua de la interfaz y el rendimiento.",
          technologies: ["React", "Node.js", "Postgre", "Docker"],
        },
        {
          title: "Desarrollador Junior",
          company: "Digidom",
          period: "2020 - 2021",
          description:
            "Rediseño completo del sitio web y actualización de la API principal. Desarrollo de nuevas funcionalidades importantes para mejorar la experiencia de usuario y el rendimiento general del servicio.",
          technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
        },
        {
          title: "Obtención de mi máster en informática.",
          company: "Institut G4",
          period: "2020 - 2023",
          description:
            "Obtención de un Máster en Informática con especialización en desarrollo web. Realización de proyectos para clientes reales: gestión de proyectos, desarrollo de aplicaciones web, trabajo en equipo y cumplimiento de plazos. Sólida experiencia adquirida en condiciones profesionales.",
          technologies: [],
        },
      ],
    },
    skills: {
      title: "Mis Habilidades",
      other: "Otras habilidades",
      categoryNames: ["Front-end", "Back-end", "Herramientas y otros"],
    },
    showreel: {
      title: "Chat IA",
      subtitle: "Descubre la integración de inteligencia artificial en mis proyectos",
      placeholder: "Hazme una pregunta sobre Justin o sus habilidades...",
      tip: "💡 Prueba a preguntarme sobre las habilidades de Justin, sus proyectos o sus tecnologías favoritas",
      initialMessage: "¡Hola! Soy un asistente de IA. ¿Cómo puedo ayudarte hoy?",
      responses: [
        "¡Excelente pregunta! Como demostración, puedo decirte que Justin domina perfectamente la integración de IA en sus aplicaciones.",
        "¡Interesante! Justin utiliza las últimas tecnologías como React, Next.js y TypeScript para crear interfaces modernas.",
        "¡Absolutamente! La experiencia de usuario está en el centro de cada proyecto de Justin. Siempre prioriza la simplicidad y la eficiencia.",
        "¡Perfecto! Justin puede ayudarte a materializar tus ideas con soluciones técnicas innovadoras y de alto rendimiento.",
        "¡Estupendo! Justin tiene una experiencia particular en la integración de APIs de IA como OpenAI, Claude o Gemini.",
        "¡Exactamente! Justin desarrolla chatbots inteligentes e interfaces conversacionales para mejorar la experiencia de usuario.",
        "¡Buena pregunta! Justin domina la arquitectura full-stack necesaria para desplegar soluciones de IA robustas y escalables.",
        "¡Precisamente! Justin combina diseño moderno e inteligencia artificial para crear aplicaciones verdaderamente innovadoras.",
      ],
    },
    contact: {
      title: "Contáctame",
      subtitle: "Hablemos de tu proyecto",
      description:
        "¿Tienes un proyecto en mente? No dudes en contactarme para discutirlo. Siempre estoy buscando nuevas oportunidades emocionantes.",
      phone: "Teléfono",
      location: "Ubicación",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      subject: "Asunto",
      subjectPlaceholder: "Asunto de tu mensaje",
      message: "Mensaje",
      messagePlaceholder: "Tu mensaje...",
      send: "Enviar mensaje",
    },
    footer: {
      role: "Desarrollador Full Stack",
      rights: "Todos los derechos reservados.",
    },
  },

  it: {
    nav: {
      home: "Home",
      about: "Chi sono",
      projects: "Progetti",
      experience: "Esperienza",
      skills: "Competenze",
      aiChat: "Chat IA",
      contact: "Contatti",
    },
    hero: {
      greeting: "Ciao, sono",
      role: "Sviluppatore Full Stack",
      description:
        "Creo applicazioni web moderne, performanti e accessibili con le ultime tecnologie.",
      seeProjects: "Vedi i miei progetti",
      contactMe: "Contattami",
      available: "Disponibile",
      tapForInfo: "Tocca per più info",
      discoverProfile: "Scopri il mio profilo",
      badges: {
        experience: "3 anni",
        level: "Esperto",
        degree: "Laurea Mag.",
      },
    },
    about: {
      title: "Chi sono",
      subtitle: "Sviluppatore Full Stack appassionato",
      p1: "Con oltre 3 anni di esperienza nello sviluppo web, mi specializzo nella creazione di applicazioni web moderne e performanti. La mia passione per le nuove tecnologie mi spinge a imparare e perfezionarmi costantemente.",
      p2: "Mi impegno a creare esperienze utente eccezionali combinando un design accattivante con funzionalità robuste e un'architettura solida.",
      skills: [
        "Sviluppo Front-end",
        "Sviluppo Back-end",
        "Architettura software",
        "UI/UX Design",
        "Ottimizzazione delle performance",
        "Responsive Design",
      ],
    },
    projects: {
      title: "I Miei Progetti",
      view: "Vedi",
      viewProject: "Vedi il progetto",
      code: "Codice",
      comingSoon: "In produzione...",
      items: [
        {
          id: "geneailogy",
          title: "GeneAiLogy",
          description: "Riconnettiti con la tua storia familiare con un tocco di IA.",
        },
        {
          id: "italingo",
          title: "Italingo",
          description: "Impara l'italiano facilmente con un'app interattiva.",
        },
        {
          id: "pfg",
          title: "PFG",
          description: "Applicazione per la gestione delle fatture e il monitoraggio dei pagamenti.",
        },
        {
          id: "Lexia",
          title: "Lexia",
          description:
            "Un'app mobile di vocabolario interattivo che usa l'IA per guidarti nel tuo apprendimento.",
        },
        {
          id: "tiip",
          title: "TIIP",
          description:
            "Applicazione web per la gestione degli incidenti e il tracciamento dei dati con analisi tramite IA.",
        },
      ],
    },
    experience: {
      title: "Il Mio Percorso",
      items: [
        {
          title: "Sviluppatore Full Stack",
          company: "Indipendente",
          period: "2023 - Oggi",
          description:
            "Lavoro freelance su progetti personali. Sviluppo di competenze in UX/UI (prototipazione), DevOps, integrazione continua, nuove tecnologie e buone pratiche di sviluppo per diventare un profilo versatile.",
          technologies: ["React", "Node.js", "Firebase", "Docker", "Figma"],
        },
        {
          title: "Sviluppatore Full Stack",
          company: "SmartEvo",
          period: "2021 - 2023",
          description:
            "Sviluppo completo della piattaforma Smartevo, uno strumento di gestione dei progetti audiovisivi. Partecipazione all'architettura, all'implementazione di funzionalità chiave e al miglioramento continuo dell'interfaccia e delle prestazioni.",
          technologies: ["React", "Node.js", "Postgre", "Docker"],
        },
        {
          title: "Sviluppatore Junior",
          company: "Digidom",
          period: "2020 - 2021",
          description:
            "Rifacimento completo del sito web e aggiornamento dell'API principale. Sviluppo di nuove funzionalità importanti per migliorare l'esperienza utente e le prestazioni generali del servizio.",
          technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
        },
        {
          title: "Conseguimento della laurea magistrale in informatica.",
          company: "Institut G4",
          period: "2020 - 2023",
          description:
            "Conseguimento di una Laurea Magistrale in Informatica con specializzazione in sviluppo web. Realizzazione di progetti per veri clienti: gestione di progetti, sviluppo di applicazioni web, lavoro in team e rispetto delle scadenze. Solida esperienza acquisita in condizioni professionali.",
          technologies: [],
        },
      ],
    },
    skills: {
      title: "Le Mie Competenze",
      other: "Altre competenze",
      categoryNames: ["Front-end", "Back-end", "Strumenti e altro"],
    },
    showreel: {
      title: "Chat IA",
      subtitle: "Scopri l'integrazione dell'intelligenza artificiale nei miei progetti",
      placeholder: "Fammi una domanda su Justin o le sue competenze...",
      tip: "💡 Prova a chiedermi delle competenze di Justin, i suoi progetti o le sue tecnologie preferite",
      initialMessage: "Ciao! Sono un assistente IA. Come posso aiutarti oggi?",
      responses: [
        "Ottima domanda! Come demo, posso dirti che Justin padroneggia perfettamente l'integrazione dell'IA nelle sue applicazioni.",
        "Interessante! Justin usa le ultime tecnologie come React, Next.js e TypeScript per creare interfacce moderne.",
        "Assolutamente! L'esperienza utente è al centro di ogni progetto di Justin. Privilegia sempre la semplicità e l'efficienza.",
        "Perfetto! Justin può aiutarti a concretizzare le tue idee con soluzioni tecniche innovative e performanti.",
        "Eccellente! Justin ha una particolare competenza nell'integrazione di API di IA come OpenAI, Claude o Gemini.",
        "Esatto! Justin sviluppa chatbot intelligenti e interfacce conversazionali per migliorare l'esperienza utente.",
        "Buona domanda! Justin padroneggia l'architettura full-stack necessaria per distribuire soluzioni IA robuste e scalabili.",
        "Precisamente! Justin combina design moderno e intelligenza artificiale per creare applicazioni davvero innovative.",
      ],
    },
    contact: {
      title: "Contattami",
      subtitle: "Parliamo del tuo progetto",
      description:
        "Hai un progetto in mente? Non esitare a contattarmi per discuterne. Sono sempre alla ricerca di nuove entusiasmanti opportunità.",
      phone: "Telefono",
      location: "Posizione",
      name: "Nome",
      namePlaceholder: "Il tuo nome",
      emailPlaceholder: "tuo@email.com",
      subject: "Oggetto",
      subjectPlaceholder: "Oggetto del tuo messaggio",
      message: "Messaggio",
      messagePlaceholder: "Il tuo messaggio...",
      send: "Invia messaggio",
    },
    footer: {
      role: "Sviluppatore Full Stack",
      rights: "Tutti i diritti riservati.",
    },
  },
}

export default translations
