export const LOCALE_COOKIE = "shipkit-locale";

export type Locale = "en" | "fr";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "fr" ? "fr" : "en";
}

export function getMarketingNavigation(locale: Locale) {
  return [
    { href: "/", label: locale === "fr" ? "Accueil" : "Home" },
    { href: "/dashboard", label: locale === "fr" ? "Espace" : "Workspace" },
    { href: "/account", label: locale === "fr" ? "Compte" : "Account" },
    { href: "/billing", label: locale === "fr" ? "Offre" : "Plan" },
    { href: "/pricing", label: locale === "fr" ? "Tarifs" : "Pricing" },
  ] as const;
}

export function getDashboardNavigation(locale: Locale) {
  return [
    {
      href: "/dashboard",
      label: locale === "fr" ? "Espace" : "Workspace",
      description: locale === "fr" ? "Vue d'ensemble" : "Overview",
    },
    {
      href: "/account",
      label: locale === "fr" ? "Compte" : "Account",
      description: locale === "fr" ? "Détails" : "Details",
    },
    {
      href: "/billing",
      label: locale === "fr" ? "Offre" : "Plan",
      description: locale === "fr" ? "Accès" : "Access",
    },
  ] as const;
}

export function getLocaleCopy(locale: Locale) {
  return {
    common: {
      signIn: locale === "fr" ? "Se connecter" : "Sign in",
      getStarted: locale === "fr" ? "Commencer" : "Get started",
      viewPricing: locale === "fr" ? "Voir les tarifs" : "View pricing",
      managePlan: locale === "fr" ? "Gérer votre offre" : "Manage your plan",
      viewAccountDetails: locale === "fr" ? "Voir les détails du compte" : "View account details",
      oneTimeForever: locale === "fr" ? "Paiement unique, accès à vie" : "Pay once, use forever",
      earlyAccessPrice: locale === "fr" ? "Prix de lancement" : "Early access price",
      mostPopular: locale === "fr" ? "Le plus populaire" : "Most popular",
      bestValue: locale === "fr" ? "Meilleur rapport qualité-prix" : "Best value",
      essentialFoundation: locale === "fr" ? "Base essentielle" : "Essential foundation",
      chooseStarter: locale === "fr" ? "Choisir Starter" : "Choose Starter",
      choosePro: locale === "fr" ? "Choisir Pro" : "Choose Pro",
      switchToStarter: locale === "fr" ? "Passer à Starter" : "Switch to Starter",
      switchToPro: locale === "fr" ? "Passer à Pro" : "Switch to Pro",
      redirecting: locale === "fr" ? "Redirection..." : "Redirecting...",
      current: locale === "fr" ? "Actuel" : "Current",
      openBillingPortal: locale === "fr" ? "Ouvrir le portail de facturation" : "Open billing portal",
      light: locale === "fr" ? "Clair" : "Light",
      dark: locale === "fr" ? "Sombre" : "Dark",
      toggleTheme: locale === "fr" ? "Changer le thème" : "Toggle dark mode",
      language: locale === "fr" ? "Langue" : "Language",
      french: "FR",
      english: "EN",
      workspace: locale === "fr" ? "Espace" : "Workspace",
      account: locale === "fr" ? "Compte" : "Account",
      plan: locale === "fr" ? "Offre" : "Plan",
      pricing: locale === "fr" ? "Tarifs" : "Pricing",
      home: locale === "fr" ? "Accueil" : "Home",
      addStripeEnv: locale === "fr" ? "Ajoutez vos variables Stripe pour activer le paiement." : "Add your Stripe environment variables to enable checkout.",
      reviewInvoices: locale === "fr" ? "Consultez vos factures, moyens de paiement et informations client dans Stripe." : "Review invoices, payment details, and customer information in Stripe.",
    },
    brand: {
      tagline: locale === "fr" ? "Starter SaaS pour développeurs" : "Developer SaaS starter",
    },
    landing: {
      eyebrow: locale === "fr" ? "Starter SaaS moderne" : "Modern SaaS starter",
      pain: locale === "fr" ? "Arrêtez de reconstruire la même base produit pour chaque SaaS." : "Stop rebuilding the same product foundation for every SaaS.",
      title: locale === "fr" ? "Lancez votre SaaS en quelques jours, pas en quelques semaines" : "Launch your SaaS in days, not weeks",
      subtitle: locale === "fr" ? "Un starter premium pour les développeurs qui veulent une architecture propre, une mise en place rapide et une base évolutive pour des SaaS sérieux." : "A premium starter for developers who want clean architecture, a fast setup, and a scalable base for serious SaaS products.",
      ctaPrimary: locale === "fr" ? "Commencer avec ShipKit" : "Get started with ShipKit",
      ctaSecondary: locale === "fr" ? "Voir les tarifs" : "View pricing",
      trust: locale === "fr"
        ? ["Construit avec de vrais patterns SaaS", "Pensé pour les développeurs qui veulent aller vite", "Architecture prête pour la production"]
        : ["Built with real SaaS patterns", "Designed for developers shipping fast", "Production-ready architecture"],
      stackDescription: locale === "fr" ? "Une stack applicative moderne avec les patterns essentiels déjà structurés et prêts à être étendus." : "A modern application stack with the core patterns already organized and ready to extend.",
      billingDescription: locale === "fr" ? "La facturation est déjà intégrée, pour vous éviter la mise en place habituelle et vous laisser avancer directement sur le produit." : "Billing is already integrated, so you can avoid the usual setup work and move directly into product development.",
      experienceDescription: locale === "fr" ? "Des primitives UI soignées et des écrans de dashboard vous donnent une base polie dès le premier commit." : "Thoughtful UI primitives and dashboard screens give you a polished base from the first commit.",
      whyEyebrow: locale === "fr" ? "Pourquoi le choisir" : "Why teams use it",
      whyTitle: locale === "fr" ? "Évitez la spirale de setup" : "Skip the setup spiral",
      whyBody: locale === "fr" ? "ShipKit vous apporte l’infrastructure produit que la plupart des équipes SaaS finissent par reconstruire: authentification, facturation, surfaces de compte et shell applicatif propre." : "ShipKit gives you the product infrastructure most SaaS teams end up rebuilding: authentication, billing, account surfaces, and a clean application shell.",
      included: locale === "fr" ? "Inclus" : "Included",
      includedBody: locale === "fr" ? "Les flux essentiels de l’application sont déjà implémentés et connectés." : "The essential application flows are already implemented and connected.",
      builtForSpeed: locale === "fr" ? "Pensé pour aller vite" : "Built for speed",
      builtForSpeedBody: locale === "fr" ? "Une structure claire et des primitives typées rendent la personnalisation simple à mesure que le produit grandit." : "A clear structure and typed primitives make customization straightforward as the product grows.",
      readyNow: locale === "fr" ? "Prêt maintenant" : "Ready now",
      featuresEyebrow: locale === "fr" ? "Fonctionnalités" : "Features",
      featuresTitle: locale === "fr" ? "Un meilleur point de départ pour un vrai SaaS" : "A better starting point for serious SaaS work",
      pricingEyebrow: locale === "fr" ? "Tarifs" : "Pricing",
      pricingTitle: locale === "fr" ? "Des tarifs simples pour un starter premium" : "Simple pricing for a premium starter",
      faqEyebrow: locale === "fr" ? "FAQ" : "FAQ",
      faqTitle: locale === "fr" ? "Questions fréquentes" : "Common questions",
      ctaEyebrow: locale === "fr" ? "Prêt à démarrer ?" : "Ready to launch?",
      ctaTitle: locale === "fr" ? "Commencez avec les briques difficiles déjà prêtes" : "Start with the hard parts already done",
      ctaBody: locale === "fr" ? "Partez d’une base de code qui respecte votre temps de développeur et donne à votre produit une fondation plus solide dès le premier jour." : "Start from a codebase that respects developer time and gives your product a stronger foundation from day one.",
      features: locale === "fr"
        ? [
            { title: "Une base solide", description: "Authentification, facturation, flux de compte et dashboard sont déjà structurés pour un vrai produit." },
            { title: "Pensé pour le flux de développement", description: "Consacrez votre temps aux choix produit plutôt qu’à recâbler la même infrastructure à chaque projet." },
            { title: "Prêt à évoluer", description: "Une architecture claire, des routes protégées, des flux de paiement et une UI réutilisable facilitent l’extension du codebase." },
          ]
        : [
            { title: "A solid foundation", description: "Authentication, billing, account flows, and a polished dashboard are already structured for real product work." },
            { title: "Built for developer flow", description: "Spend your time on product decisions, not wiring together the same infrastructure on every new project." },
            { title: "Ready to scale with you", description: "Clear architecture, protected routes, billing flows, and reusable UI make the codebase easier to extend over time." },
          ],
      plans: locale === "fr"
        ? [
            { name: "Starter", price: "29 €", description: "Un starter ciblé pour livrer un SaaS bien structuré sans perdre plusieurs jours en setup.", features: ["Authentification et flux de compte", "Base de facturation", "Dashboard responsive"] },
            { name: "Pro", price: "59 €", description: "La fondation complète pour les équipes et indépendants qui veulent toute la surface produit dès le départ.", features: ["Tout ce qui est dans Starter", "Flux de facturation avancés", "Email et portail client"] },
          ]
        : [
            { name: "Starter", price: "€29", description: "A focused starter for shipping a well-structured SaaS without spending days on setup.", features: ["Auth and account flows", "Billing foundation", "Responsive dashboard UI"] },
            { name: "Pro", price: "€59", description: "The complete foundation for teams and independents who want the full product surface from the start.", features: ["Everything in Starter", "Advanced billing flows", "Email and customer portal support"] },
          ],
      faqs: locale === "fr"
        ? [
            { question: "Qu'est-ce que j'obtiens dès le départ ?", answer: "Auth, facturation, dashboard, mode sombre et hooks email sont déjà inclus." },
            { question: "Puis-je adapter la stack ensuite ?", answer: "Oui. La structure est pensée pour évoluer, afin que vous puissiez adapter la stack à votre produit." },
            { question: "Pour qui est-ce conçu ?", answer: "Pour les développeurs, freelances et builders indépendants qui veulent une base propre et durable." },
            { question: "Est-ce prêt pour la production ?", answer: "Oui. Le projet repose sur de vrais patterns SaaS, avec auth, billing et architecture évolutive. Ce n’est pas une démo." },
          ]
        : [
            { question: "What do I get out of the box?", answer: "Auth, billing, dashboard UI, dark mode, and email hooks are already included." },
            { question: "Can I customize the stack later?", answer: "Yes. The structure is designed to be extended, so you can adapt the stack to your product over time." },
            { question: "Who is this built for?", answer: "Developers, freelancers, and indie builders who care about code quality and want to start from a strong base." },
            { question: "Is this production-ready?", answer: "Yes — it's built with real SaaS patterns, including auth, billing, and scalable architecture. This is not a demo project." },
          ],
    },
    preview: {
      eyebrow: locale === "fr" ? "Aperçu produit" : "Product preview",
      title: locale === "fr" ? "Voyez ce que vous obtenez dès le départ" : "See what you get out of the box",
      body: locale === "fr" ? "Un shell applicatif propre avec compte, facturation et écrans produit déjà assemblés." : "A clean application shell with account, billing, and core product screens already composed.",
      dashboardHome: locale === "fr" ? "Accueil de l'espace" : "Dashboard home",
      dashboardTitle: locale === "fr" ? "L’essentiel, au même endroit" : "Everything important, in one place",
      dashboardBody: locale === "fr" ? "Le compte, la facturation et les surfaces produit cohabitent dans une interface conçue pour rester claire quand le produit grandit." : "Account state, billing, and core product surfaces live in one interface designed to stay clear as the product grows.",
      proActive: locale === "fr" ? "Accès Pro actif" : "Pro access active",
      launchChecklist: locale === "fr" ? "Checklist de lancement" : "Launch checklist",
      checklistBody: locale === "fr" ? "Les briques plateforme essentielles sont déjà en place." : "The essential platform work is already in place.",
      includedSurfaces: locale === "fr" ? "Surfaces incluses" : "Included surfaces",
      plan: locale === "fr" ? "Offre" : "Plan",
      payments: locale === "fr" ? "Paiements" : "Payments",
      email: "Email",
      ready: locale === "fr" ? "Prêt" : "Ready",
      connected: locale === "fr" ? "Connecté" : "Connected",
      complete: locale === "fr" ? "3/4 terminé" : "3/4 complete",
      done: locale === "fr" ? "Fait" : "Done",
      next: locale === "fr" ? "À faire" : "Next",
      nav: locale === "fr" ? ["Espace", "Compte", "Offre"] : ["Dashboard", "Account", "Billing"],
      checklist: locale === "fr"
        ? ["Authentification et sessions", "Checkout et portail de facturation", "Emails transactionnels", "Votre logique produit"]
        : ["Authentication and sessions", "Billing checkout and portal", "Transactional email", "Your product logic"],
      surfaces: locale === "fr"
        ? ["Sidebar responsive", "Pages compte et offre", "Primitives UI typées", "Support du mode sombre"]
        : ["Responsive sidebar layout", "Account and billing pages", "Typed UI primitives", "Dark mode support"],
    },
    pricingPage: {
      eyebrow: locale === "fr" ? "Tarifs" : "Pricing",
      title: locale === "fr" ? "Tarifs simples en paiement unique" : "Simple one-time pricing",
      body: locale === "fr" ? "Choisissez l’offre adaptée à votre stade de produit, payez une fois, et obtenez un accès immédiat au starter." : "Choose the tier that fits your build stage, pay once, and get immediate access to the starter.",
    },
    auth: {
      loginEyebrow: locale === "fr" ? "Connexion" : "Sign in",
      loginTitle: locale === "fr" ? "Accédez à votre espace" : "Access your workspace",
      loginHint: locale === "fr" ? "Utilisez le mot de passe associé à votre compte." : "Use the password connected to your account.",
      loginFooter: locale === "fr" ? "Nouveau sur ShipKit ?" : "New to ShipKit?",
      signupEyebrow: locale === "fr" ? "Commencer" : "Get started",
      signupTitle: locale === "fr" ? "Créez votre espace" : "Create your workspace",
      signupHint: locale === "fr" ? "Utilisez au moins 8 caractères. Vous recevrez un email de confirmation pour terminer la configuration." : "Use at least 8 characters. You will receive a confirmation email to finish setup.",
      signupFooter: locale === "fr" ? "Déjà configuré ?" : "Already set up?",
      workEmail: locale === "fr" ? "Email professionnel" : "Work email",
      password: locale === "fr" ? "Mot de passe" : "Password",
    },
    dashboard: {
      title: locale === "fr" ? "Votre espace" : "Your workspace",
      eyebrow: locale === "fr" ? "Espace" : "Workspace",
      description: locale === "fr" ? "Une vue claire de votre espace produit, de l’état du compte et de l’offre en un seul endroit." : "A clear view of your product workspace, account state, and plan details in one place.",
      activePlan: locale === "fr" ? "Offre active" : "Active plan",
      planStatus: locale === "fr" ? "Statut de l’offre" : "Plan status",
      workspaceCreated: locale === "fr" ? "Espace créé" : "Workspace created",
      provisioned: locale === "fr" ? "Provisionné depuis votre compte d’authentification synchronisé." : "Provisioned from your synced authentication record.",
      primaryEmail: locale === "fr" ? "Email principal" : "Primary email",
      primaryEmailBody: locale === "fr" ? "Utilisé pour l’accès, les mises à jour d’offre et les communications produit." : "Used for access, plan updates, and product communication.",
      overviewEyebrow: locale === "fr" ? "Vue d'ensemble de l'espace" : "Workspace overview",
      overviewTitle: locale === "fr" ? "Vue d’ensemble de l’environnement" : "Environment overview",
      workspaceId: locale === "fr" ? "ID de l’espace" : "Workspace ID",
      emailVerified: locale === "fr" ? "Email vérifié" : "Email verified",
      recommendedNext: locale === "fr" ? "Étape recommandée" : "Recommended next step",
      nextBody: locale === "fr" ? "Utilisez cet espace comme base pour l’analytics, l’onboarding et les surfaces produit propres à votre SaaS." : "Use this workspace as the base for analytics, onboarding flows, and the product surfaces specific to your SaaS.",
      access: locale === "fr" ? "Accès" : "Access",
      theme: locale === "fr" ? "Thème" : "Theme",
      adaptive: locale === "fr" ? "Adaptatif" : "Adaptive",
      live: locale === "fr" ? "Actif" : "Live",
      sessionEyebrow: locale === "fr" ? "État d’auth côté client" : "Client auth state",
      sessionTitle: locale === "fr" ? "Instantané de session" : "Session snapshot",
      state: locale === "fr" ? "État" : "State",
      signedIn: locale === "fr" ? "Connecté" : "Signed in",
      sessionExpires: locale === "fr" ? "Expiration de session" : "Session expires",
      unknown: locale === "fr" ? "Inconnu" : "Unknown",
    },
    accountPage: {
      title: locale === "fr" ? "Détails du compte" : "Account details",
      description: locale === "fr" ? "Consultez l’identité et les détails d’offre liés à votre espace ShipKit." : "Review the identity and plan details connected to your ShipKit workspace.",
      identity: locale === "fr" ? "Identité" : "Identity",
      created: locale === "fr" ? "Créé" : "Created",
      planDetails: locale === "fr" ? "Détails de l’offre" : "Plan details",
      billingCustomerId: locale === "fr" ? "ID client facturation" : "Billing customer ID",
      notCreatedYet: locale === "fr" ? "Pas encore créé" : "Not created yet",
    },
    billingPage: {
      title: locale === "fr" ? "Gérer votre offre" : "Manage your plan",
      description: locale === "fr" ? "Consultez votre offre actuelle, choisissez le bon niveau pour votre produit, ou ouvrez Stripe pour gérer la facturation." : "Review your current plan, choose the right tier for your product, or open Stripe to manage billing details.",
      purchaseConfirmed: locale === "fr" ? "Achat confirmé. L’accès sera mis à jour dès que Stripe aura terminé le traitement du paiement." : "Purchase confirmed. Access will refresh as soon as Stripe finishes processing the payment.",
      checkoutCanceled: locale === "fr" ? "Le paiement a été annulé avant validation." : "Checkout was canceled before completion.",
      portalUnavailable: locale === "fr" ? "Le portail de facturation n’est pas encore disponible pour cet espace." : "The billing portal is not available for this workspace yet.",
      activePlan: locale === "fr" ? "Offre active" : "Active plan",
      accessStatus: locale === "fr" ? "Statut d’accès" : "Access status",
      planPrice: locale === "fr" ? "Prix de l’offre" : "Plan price",
      connectedYet: locale === "fr" ? "Pas encore connecté" : "Not connected yet",
      activeSuffix: locale === "fr" ? "actif" : "active",
    },
    starterKit: {
      title: locale === "fr" ? "Votre starter kit est prêt" : "Your starter kit is ready",
      description: locale === "fr" ? "Téléchargez la dernière livraison du starter kit et poursuivez votre installation localement." : "Download the latest starter kit delivery and continue setup locally.",
      button: locale === "fr" ? "Télécharger le starter kit" : "Download starter kit",
      note: locale === "fr" ? "Disponible uniquement pour les comptes avec un accès actif." : "Available only for accounts with active access.",
      fileDescription: locale === "fr" ? "Cette livraison contient le lien ou les instructions de téléchargement du starter kit." : "This delivery contains the starter kit download link or handoff instructions.",
    },
  };
}
