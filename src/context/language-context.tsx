"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Locale = "en" | "es";

export interface LanguageContextType {
  locale: Locale;
  isChanging: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, fallback?: string) => string;
}

export const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.about": "About Us",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.modern_teams": "Modern product teams",
    "nav.modern_teams_desc":
      "Mainline is built on the habits that make the best product teams successful",
    "nav.resource_allocation": "Resource Allocation",
    "nav.resource_allocation_desc":
      "Mainline your resource allocation and execution",

    // Hero
    "hero.badge": "Open source - MIT License",
    "hero.title": "Mainline Next.js template",
    "hero.description":
      "Mainline is an open-source website template built with shadcn/ui, Tailwind 4 & Next.js",
    "hero.get_template": "Get template",
    "hero.built_by": "Built by shadcnblocks.com",
    "hero.f1_title": "Tailored workflows",
    "hero.f1_desc": "Track progress across custom issue flows for your team.",
    "hero.f2_title": "Cross-team projects",
    "hero.f2_desc": "Collaborate across teams and departments.",
    "hero.f3_title": "Milestones",
    "hero.f3_desc": "Break projects down into concrete phases.",
    "hero.f4_title": "Progress insights",
    "hero.f4_desc": "Track scope, velocity, and progress over time.",

    // Logos / Social Proof
    "logos.title": "Powering the world's best product teams.",
    "logos.subtitle": "From next-gen startups to established enterprises.",

    // Features Section
    "features.tagline": "MEASURE TWICE. CUT ONCE.",
    "features.title": "Made for modern product teams",
    "features.desc":
      "Mainline is built on the habits that make the best product teams successful: staying focused, moving quickly, and always aiming for high-quality work.",
    "features.item1": "Purpose-built for product development",
    "features.item2": "Manage projects end-to-end",
    "features.item3": "Build momentum and healthy habits",

    // Resource Allocation
    "resource.title": "Mainline your resource allocation and execution",
    "resource.top1_title": "Reusable issue templates.",
    "resource.top1_desc":
      "Draft lightning-fast documents with our Smart Instructions and Templates.",
    "resource.top2_title": "Simplify your stack.",
    "resource.top2_desc": "No more Confluence, SharePoint, or Microsoft Word.",
    "resource.bot1_title": "Graveyard it.",
    "resource.bot1_desc":
      "Archive deprecated ideas and maintain clean project boards.",
    "resource.bot2_title": "Task discussions.",
    "resource.bot2_desc":
      "Keep contextual conversations tied directly to specific tasks.",
    "resource.bot3_title": "Notifications.",
    "resource.bot3_desc":
      "Stay in the loop with focused, distraction-free updates.",

    // Testimonials
    "testimonials.title": "Trusted by product builders",
    "testimonials.desc":
      "Mainline is built on the habits that make the best product teams successful: staying focused, moving quickly, and always aiming for high-quality work.",
    "testimonials.cta": "Read our Customer Stories",
    "testimonials.q1": "We're misusing Mainline as a CRM and it still works!",
    "testimonials.q2":
      "I was able to replace 80% of my team with Mainline bots.",
    "testimonials.q3":
      "Founder Mode is hard enough without having a really nice PM app.",
    "testimonials.q4": "I can use the tool as a substitute from my PM.",

    // Pricing
    "pricing.title": "Pricing",
    "pricing.desc":
      "Use Mainline for free with your whole team. Upgrade to enable unlimited issues, enhanced security controls, and additional features.",
    "pricing.annual_toggle": "Billed annually",
    "pricing.free_name": "Free",
    "pricing.free_desc": "Free for everyone",
    "pricing.startup_name": "Startup",
    "pricing.enterprise_name": "Enterprise",
    "pricing.per_user_year": "per user/year",
    "pricing.per_user_month": "per user/month",
    "pricing.get_started": "Get started",
    "pricing.get_demo": "Get a demo",
    "pricing.unlimited": "Unlimited",

    // Pricing Table
    "pricing_table.cat_usage": "Usage",
    "pricing_table.cat_features": "Features",
    "pricing_table.cat_support": "Support",
    "pricing_table.members": "Members",
    "pricing_table.transactions": "Transactions",
    "pricing_table.teams": "Teams",
    "pricing_table.reporting": "Reporting",
    "pricing_table.analytics": "Analytics",
    "pricing_table.import_export": "Import and export",
    "pricing_table.integrations": "Integrations",
    "pricing_table.ai": "Mainline AI",
    "pricing_table.admin_roles": "Admin roles",
    "pricing_table.audit_log": "Audit log",
    "pricing_table.priority_support": "Priority Support",
    "pricing_table.account_manager": "Account Manager",
    "pricing_table.uptime_sla": "Uptime SLA",

    // FAQ
    "faq.title": "Got Questions?",
    "faq.contact_prompt": "If you can't find what you're looking for, ",
    "faq.contact_link": "get in touch",
    "faq.cat_support": "Support",
    "faq.cat_account": "Your account",
    "faq.cat_other": "Other questions",
    "faq.q1": "How do I update my account without breaking my laptop?",
    "faq.a1":
      "Everything runs directly in your browser with secure cloud synchronization and automatic backups.",
    "faq.q2": "Is support free, or do I need to Google everything?",
    "faq.a2":
      "Our dedicated support team is available 24/7 with an average response time of under 10 minutes.",
    "faq.q3": "Are you going to be subsumed by AI?",
    "faq.a3":
      "Mainline is built with AI workflows from the ground up to empower people, not replace them.",

    // About Page
    "about.hero_title": "Democratising quality software",
    "about.hero_subtitle":
      "Mainline is bringing modern software to life with AI magic.",
    "about.hero_p1":
      "At Mainline, we are dedicated to transforming the way teams plan, execute, and deliver projects. Our mission is to provide our customers with an unbeatable edge over delays, inefficiencies, and disorganisation through actionable insights and seamless collaboration. We’ll stop at nothing to give you the tools you need to get every project across the finish line.",
    "about.hero_p2":
      "We’re customer-obsessed — investing the time to understand every aspect of your workflow so that we can help you operate better than ever before. We’re all in this together because your success is our success. In our history as a company, we’ve never lost a customer, because when your projects succeed, so do we.",
    "about.stat_raised": "Raised",
    "about.stat_companies": "Companies",
    "about.stat_transactions": "Monthly transactions",
    "about.stat_connections": "Connections per minute",
    "about.team_title": "The team",
    "about.team_p1":
      "We started building Mainline in 2019 and launched in 2022. Every endpoint has been designed from the ground up — with no technical debt or legacy systems. We are purpose-built to power project management innovation for the next hundred years.",
    "about.team_p2":
      "We are 100% founder and team-owned, profitable, and we keep our team lean. Over time, this page will become more polished, but for now, we're focused on delivering for developers.",
    "about.team_p3":
      "If you're interested in building the future of PM, check out our open roles below.",
    "about.open_roles": "View open roles",
    "about.investors_title": "Our investors",

    // Contact Page
    "contact.title": "Contact us",
    "contact.subtitle": "Hopefully this form gets through our spam filters.",
    "contact.office_title": "Corporate office",
    "contact.office_address": "1 Carlsberg Close\n1260 Hillview, Australia",
    "contact.email_title": "Email us",
    "contact.careers": "Careers",
    "contact.press": "Press",
    "contact.follow_us": "Follow us",
    "contact.inquiries": "Inquiries",
    "contact.full_name": "Full name *",
    "contact.full_name_ph": "First and last name",
    "contact.email": "Email address *",
    "contact.email_ph": "me@company.com",
    "contact.company": "Company name",
    "contact.company_ph": "Company name",
    "contact.employees": "Number of employees",
    "contact.employees_ph": "e.g. 11-50",
    "contact.message": "Your message *",
    "contact.message_ph": "Write your message",
    "contact.agree": "I agree to the terms and conditions",
    "contact.submit": "Submit",
    "contact.submitting": "Submitting...",
    "contact.thank_you": "Thank you",
    "contact.success_message":
      "Form submitted successfully, we will get back to you soon",

    // Login & Signup Pages
    "login.title": "Welcome back",
    "login.subtitle": "Please enter your details.",
    "login.email": "Enter your email",
    "login.password": "Enter your password",
    "login.remember": "Remember me",
    "login.forgot": "Forgot password",
    "login.button": "Sign in",
    "login.google": "Sign in with Google",
    "login.no_account": "Don't have an account?",
    "login.signup_link": "Sign up",

    "signup.title": "Start your free trial",
    "signup.subtitle": "Sign up in less than 2 minutes.",
    "signup.name": "Enter your name",
    "signup.email": "Enter your email",
    "signup.password": "Enter your password",
    "signup.password_hint": "Must be at least 8 characters.",
    "signup.button": "Create an account",
    "signup.google": "Sign up with Google",
    "signup.has_account": "Already have an account?",
    "signup.login_link": "Log in",

    // 404 Not Found
    "not_found.title": "Page Not Found",
    "not_found.desc":
      "Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.",
    "not_found.home": "Back to Home",
    "not_found.contact": "Contact Support",

    // Newsletter
    "newsletter.title": "Subscribe to our newsletter",
    "newsletter.subtitle":
      "Get the latest product updates, design articles, and engineering insights directly to your inbox.",
    "newsletter.placeholder": "Enter your email address",
    "newsletter.button": "Subscribe",
    "newsletter.submitting": "Submitting...",
    "newsletter.success":
      "Thanks for subscribing! Check your inbox for confirmation.",
    "newsletter.privacy": "We respect your privacy. No spam ever.",

    // Footer
    "footer.title": "Start your free trial today",
    "footer.desc":
      "Mainline is the fit-for-purpose tool for planning and building modern software products.",
    "footer.cta": "Get template",
    "footer.product": "Product",
    "footer.privacy": "Privacy Policy",

    // Language switcher
    "lang.switch_to_es": "Español",
    "lang.switch_to_en": "English",
    "lang.language": "Language",
  },
  es: {
    // Navigation
    "nav.features": "Funciones",
    "nav.about": "Nosotros",
    "nav.pricing": "Precios",
    "nav.faq": "Preguntas",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar sesión",
    "nav.signup": "Registrarse",
    "nav.modern_teams": "Equipos de producto modernos",
    "nav.modern_teams_desc":
      "Mainline se basa en los hábitos que hacen exitosos a los mejores equipos de producto",
    "nav.resource_allocation": "Asignación de Recursos",
    "nav.resource_allocation_desc":
      "Optimice la asignación y ejecución de sus recursos con Mainline",

    // Hero
    "hero.badge": "Código abierto - Licencia MIT",
    "hero.title": "Plantilla Next.js Mainline",
    "hero.description":
      "Mainline es una plantilla de sitio web de código abierto creada con shadcn/ui, Tailwind 4 y Next.js",
    "hero.get_template": "Obtener plantilla",
    "hero.built_by": "Creado por shadcnblocks.com",
    "hero.f1_title": "Flujos de trabajo a medida",
    "hero.f1_desc": "Siga el progreso en flujos personalizados para su equipo.",
    "hero.f2_title": "Proyectos interdepartamentales",
    "hero.f2_desc": "Colabore entre diferentes equipos y departamentos.",
    "hero.f3_title": "Hitos y metas",
    "hero.f3_desc": "Divida sus proyectos en fases y etapas concretas.",
    "hero.f4_title": "Información de progreso",
    "hero.f4_desc":
      "Supervise el alcance, velocidad y avance a lo largo del tiempo.",

    // Logos / Social Proof
    "logos.title": "Impulsando a los mejores equipos de producto del mundo.",
    "logos.subtitle":
      "Desde startups de nueva generación hasta empresas consolidadas.",

    // Features Section
    "features.tagline": "MIDE DOS VECES. CORTA UNA.",
    "features.title": "Hecho para equipos de producto modernos",
    "features.desc":
      "Mainline está diseñado según los hábitos que hacen triunfar a los mejores equipos: enfoque constante, agilidad y compromiso con el trabajo de calidad.",
    "features.item1":
      "Diseñado específicamente para el desarrollo de productos",
    "features.item2": "Gestione proyectos de principio a fin",
    "features.item3": "Genere impulso y desarrolle hábitos saludables",

    // Resource Allocation
    "resource.title": "Optimice su asignación y ejecución de recursos",
    "resource.top1_title": "Plantillas de tareas reutilizables.",
    "resource.top1_desc":
      "Redacte documentos ultrarrápidos con nuestras plantillas e instrucciones inteligentes.",
    "resource.top2_title": "Simplifique su infraestructura.",
    "resource.top2_desc":
      "Dígale adiós a Confluence, SharePoint o Microsoft Word.",
    "resource.bot1_title": "Archivo de proyectos.",
    "resource.bot1_desc":
      "Archive ideas obsoletas y mantenga sus paneles limpios y enfocados.",
    "resource.bot2_title": "Debates en tareas.",
    "resource.bot2_desc":
      "Mantenga conversaciones contextuales vinculadas directamente a cada tarea.",
    "resource.bot3_title": "Notificaciones.",
    "resource.bot3_desc":
      "Manténgase al día con alertas enfocadas y sin distracciones.",

    // Testimonials
    "testimonials.title": "La confianza de creadores de productos",
    "testimonials.desc":
      "Mainline se basa en los hábitos de los equipos más exitosos: mantenerse enfocados, avanzar con rapidez y buscar siempre la excelencia.",
    "testimonials.cta": "Leer historias de clientes",
    "testimonials.q1":
      "¡Estamos usando Mainline como CRM sin querer y funciona genial!",
    "testimonials.q2":
      "Pude automatizar el 80% de las tareas de mi equipo con bots de Mainline.",
    "testimonials.q3":
      "El 'Founder Mode' ya es difícil de por sí; contar con una app de PM tan buena marca la diferencia.",
    "testimonials.q4":
      "Puedo usar esta herramienta directamente como apoyo clave para mi PM.",

    // Pricing
    "pricing.title": "Precios",
    "pricing.desc":
      "Use Mainline gratis con todo su equipo. Actualice para disfrutar de tareas ilimitadas, seguridad avanzada y funciones exclusivas.",
    "pricing.annual_toggle": "Facturación anual",
    "pricing.free_name": "Gratis",
    "pricing.free_desc": "Gratis para siempre",
    "pricing.startup_name": "Startup",
    "pricing.enterprise_name": "Empresa",
    "pricing.per_user_year": "por usuario/año",
    "pricing.per_user_month": "por usuario/mes",
    "pricing.get_started": "Comenzar",
    "pricing.get_demo": "Solicitar demo",
    "pricing.unlimited": "Ilimitado",

    // Pricing Table
    "pricing_table.cat_usage": "Uso",
    "pricing_table.cat_features": "Características",
    "pricing_table.cat_support": "Soporte",
    "pricing_table.members": "Miembros",
    "pricing_table.transactions": "Transacciones",
    "pricing_table.teams": "Equipos",
    "pricing_table.reporting": "Informes",
    "pricing_table.analytics": "Analítica",
    "pricing_table.import_export": "Importar y exportar",
    "pricing_table.integrations": "Integraciones",
    "pricing_table.ai": "Mainline AI",
    "pricing_table.admin_roles": "Roles de administración",
    "pricing_table.audit_log": "Registro de auditoría",
    "pricing_table.priority_support": "Soporte prioritario",
    "pricing_table.account_manager": "Gerente de cuenta",
    "pricing_table.uptime_sla": "SLA de disponibilidad",

    // FAQ
    "faq.title": "¿Tiene preguntas?",
    "faq.contact_prompt": "Si no encuentra lo que busca, ",
    "faq.contact_link": "póngase en contacto",
    "faq.cat_support": "Soporte",
    "faq.cat_account": "Su cuenta",
    "faq.cat_other": "Otras preguntas",
    "faq.q1": "¿Cómo actualizo mi cuenta de forma segura?",
    "faq.a1":
      "Todo funciona directamente en su navegador con sincronización en la nube y copias de seguridad automáticas.",
    "faq.q2": "¿El soporte es gratuito o tengo que buscar todo?",
    "faq.a2":
      "Nuestro equipo de soporte está disponible las 24 horas con un tiempo promedio de respuesta inferior a 10 minutos.",
    "faq.q3": "¿Mainline será reemplazado por IA?",
    "faq.a3":
      "Mainline integra flujos de trabajo de IA para potenciar a las personas, no para reemplazarlas.",

    // About Page
    "about.hero_title": "Democratizando el software de alta calidad",
    "about.hero_subtitle":
      "Mainline da vida al software moderno con la magia de la inteligencia artificial.",
    "about.hero_p1":
      "En Mainline, nos dedicamos a transformar la manera en que los equipos planifican, ejecutan y entregan proyectos. Nuestra misión es brindar a nuestros clientes una ventaja insuperable frente a retrasos e ineficiencias mediante información procesable y colaboración continua.",
    "about.hero_p2":
      "Nos apasiona el éxito del cliente: invertimos tiempo en entender a fondo cada aspecto de su flujo de trabajo. En nuestra trayectoria, nunca hemos perdido un cliente, porque cuando sus proyectos triunfan, nosotros también.",
    "about.stat_raised": "Recaudados",
    "about.stat_companies": "Empresas",
    "about.stat_transactions": "Transacciones mensuales",
    "about.stat_connections": "Conexiones por minuto",
    "about.team_title": "El equipo",
    "about.team_p1":
      "Comenzamos a construir Mainline en 2019 y lanzamos en 2022. Cada punto de conexión se diseñó desde cero, sin deuda técnica ni sistemas obsoletos. Estamos concebidos para impulsar la innovación en gestión de proyectos para los próximos cien años.",
    "about.team_p2":
      "Somos 100% propiedad de los fundadores y del equipo, rentables y mantenemos un equipo ágil. Estamos totalmente enfocados en brindar la mejor experiencia a los desarrolladores.",
    "about.team_p3":
      "Si le interesa construir el futuro de la gestión de proyectos, explore nuestras vacantes abiertas a continuación.",
    "about.open_roles": "Ver puestos disponibles",
    "about.investors_title": "Nuestros inversores",

    // Contact Page
    "contact.title": "Contáctenos",
    "contact.subtitle":
      "Esperamos que este mensaje llegue directamente a nuestro buzón principal.",
    "contact.office_title": "Sede corporativa",
    "contact.office_address": "1 Carlsberg Close\n1260 Hillview, Australia",
    "contact.email_title": "Escríbanos",
    "contact.careers": "Empleo",
    "contact.press": "Prensa",
    "contact.follow_us": "Síganos",
    "contact.inquiries": "Consultas",
    "contact.full_name": "Nombre completo *",
    "contact.full_name_ph": "Nombre y apellidos",
    "contact.email": "Correo electrónico *",
    "contact.email_ph": "yo@empresa.com",
    "contact.company": "Nombre de empresa",
    "contact.company_ph": "Nombre de su empresa",
    "contact.employees": "Número de empleados",
    "contact.employees_ph": "ej. 11-50",
    "contact.message": "Su mensaje *",
    "contact.message_ph": "Escriba su mensaje aquí",
    "contact.agree": "Acepto los términos y condiciones de servicio",
    "contact.submit": "Enviar consulta",
    "contact.submitting": "Enviando...",
    "contact.thank_you": "Muchas gracias",
    "contact.success_message":
      "Formulario enviado con éxito, nos comunicaremos con usted muy pronto",

    // Login & Signup Pages
    "login.title": "Bienvenido de nuevo",
    "login.subtitle": "Por favor ingrese sus credenciales.",
    "login.email": "Ingrese su correo electrónico",
    "login.password": "Ingrese su contraseña",
    "login.remember": "Recordarme",
    "login.forgot": "¿Olvidó su contraseña?",
    "login.button": "Iniciar sesión",
    "login.google": "Iniciar sesión con Google",
    "login.no_account": "¿No tiene una cuenta?",
    "login.signup_link": "Regístrese",

    "signup.title": "Inicie su prueba gratuita",
    "signup.subtitle": "Regístrese en menos de 2 minutos.",
    "signup.name": "Ingrese su nombre",
    "signup.email": "Ingrese su correo electrónico",
    "signup.password": "Ingrese su contraseña",
    "signup.password_hint": "Debe tener al menos 8 caracteres.",
    "signup.button": "Crear una cuenta",
    "signup.google": "Registrarse con Google",
    "signup.has_account": "¿Ya tiene una cuenta?",
    "signup.login_link": "Iniciar sesión",

    // 404 Not Found
    "not_found.title": "Página no encontrada",
    "not_found.desc":
      "Disculpe, no pudimos encontrar la página solicitada. Es posible que haya sido eliminada o que la dirección sea incorrecta.",
    "not_found.home": "Volver al inicio",
    "not_found.contact": "Contactar soporte",

    // Newsletter
    "newsletter.title": "Suscríbase a nuestro boletín",
    "newsletter.subtitle":
      "Reciba las últimas novedades del producto, artículos de diseño y aprendizajes de ingeniería directamente en su correo.",
    "newsletter.placeholder": "Ingrese su correo electrónico",
    "newsletter.button": "Suscribirse",
    "newsletter.submitting": "Enviando...",
    "newsletter.success":
      "¡Gracias por suscribirse! Revise su correo para confirmar.",
    "newsletter.privacy": "Respetamos su privacidad. Cero spam, siempre.",

    // Footer
    "footer.title": "Comience su prueba gratuita hoy",
    "footer.desc":
      "Mainline es la herramienta ideal para planificar y crear productos de software modernos.",
    "footer.cta": "Obtener plantilla",
    "footer.product": "Producto",
    "footer.privacy": "Política de Privacidad",

    // Language switcher
    "lang.switch_to_es": "Español",
    "lang.switch_to_en": "English",
    "lang.language": "Idioma",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_language") as Locale | null;
      if (saved === "en" || saved === "es") {
        setLocaleState(saved);
      }
    } catch {
      // Ignore storage errors in SSR or restricted privacy settings
    }
  }, []);

  const triggerChangeEffect = useCallback(() => {
    setIsChanging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsChanging(false);
    }, 700);
  }, []);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      triggerChangeEffect();
      setLocaleState(newLocale);
      try {
        localStorage.setItem("app_language", newLocale);
      } catch {
        // Ignore storage errors
      }
    },
    [locale, triggerChangeEffect],
  );

  const toggleLocale = useCallback(() => {
    triggerChangeEffect();
    setLocaleState((prev) => {
      const next = prev === "en" ? "es" : "en";
      try {
        localStorage.setItem("app_language", next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, [triggerChangeEffect]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const currentDict = translations[locale] as Record<string, string>;
      if (currentDict && key in currentDict) {
        return currentDict[key];
      }
      const defaultDict = translations.en as Record<string, string>;
      if (defaultDict && key in defaultDict) {
        return defaultDict[key];
      }
      return fallback ?? key;
    },
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, isChanging, setLocale, toggleLocale, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
