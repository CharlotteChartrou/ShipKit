export const LOCALE_COOKIE = "starter-project-locale";

export type Locale = "en" | "fr";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "fr" ? "fr" : "en";
}

export function getMarketingNavigation(locale: Locale) {
  return [
    { href: "/dashboard", label: locale === "fr" ? "Espace" : "Workspace" },
    { href: "/account", label: locale === "fr" ? "Compte" : "Account" },
    { href: "/plan", label: locale === "fr" ? "Offre" : "Plan" },
  ] as const;
}

export function getDashboardNavigation(locale: Locale) {
  return [
    {
      href: "/dashboard",
      label: locale === "fr" ? "Espace" : "Workspace",
      description: locale === "fr" ? "Vue générale" : "Overview",
    },
    {
      href: "/account",
      label: locale === "fr" ? "Compte" : "Account",
      description: locale === "fr" ? "Identité" : "Identity",
    },
    {
      href: "/plan",
      label: locale === "fr" ? "Offre" : "Plan",
      description: locale === "fr" ? "Paiements" : "Payments",
    },
  ] as const;
}

export function getLocaleCopy(locale: Locale) {
  return {
    common: {
      signIn: locale === "fr" ? "Se connecter" : "Sign in",
      getStarted: locale === "fr" ? "Commencer" : "Get started",
      managePlan: locale === "fr" ? "Gérer votre offre" : "Manage your plan",
      viewAccountDetails: locale === "fr" ? "Voir le compte" : "View account",
      current: locale === "fr" ? "Actuel" : "Current",
      light: locale === "fr" ? "Clair" : "Light",
      dark: locale === "fr" ? "Sombre" : "Dark",
      toggleTheme: locale === "fr" ? "Changer le thème" : "Toggle theme",
      language: locale === "fr" ? "Langue" : "Language",
      french: "FR",
      english: "EN",
      workspace: locale === "fr" ? "Espace" : "Workspace",
      account: locale === "fr" ? "Compte" : "Account",
      plan: locale === "fr" ? "Offre" : "Plan",
      home: locale === "fr" ? "Accueil" : "Home",
      getStarterKit: locale === "fr" ? "Obtenir le starter kit" : "Get the starter kit",
      oneTimeForever: locale === "fr" ? "Paiement unique. Acces a vie." : "Pay once. Use forever.",
    },
    brand: {
      tagline: locale === "fr" ? "Base SaaS générique" : "Generic SaaS starter",
    },
    auth: {
      loginEyebrow: locale === "fr" ? "Connexion" : "Sign in",
      loginTitle: locale === "fr" ? "Accédez à votre application" : "Access your app",
      loginHint: locale === "fr" ? "Utilisez le mot de passe associé à votre compte." : "Use the password linked to your account.",
      loginFooter: locale === "fr" ? "Pas encore de compte ?" : "Need an account?",
      signupEyebrow: locale === "fr" ? "Commencer" : "Get started",
      signupTitle: locale === "fr" ? "Créer un projet" : "Create your project",
      signupHint:
        locale === "fr"
          ? "Utilisez au moins 8 caractères. Vous recevrez un email de confirmation pour terminer la configuration."
          : "Use at least 8 characters. You will receive a confirmation email to complete setup.",
      signupFooter: locale === "fr" ? "Déjà configuré ?" : "Already set up?",
      workEmail: locale === "fr" ? "Email" : "Email",
      password: locale === "fr" ? "Mot de passe" : "Password",
    },
    dashboard: {
      title: locale === "fr" ? "Votre espace" : "Your workspace",
      eyebrow: locale === "fr" ? "Workspace" : "Workspace",
      description:
        locale === "fr"
          ? "Une vue claire de votre application, de votre compte et de votre état d’accès."
          : "A clear view of your app, account, and current access state.",
      activePlan: locale === "fr" ? "Offre active" : "Active plan",
      planStatus: locale === "fr" ? "Statut d’accès" : "Access status",
      workspaceCreated: locale === "fr" ? "Projet créé" : "Project created",
      provisioned:
        locale === "fr"
          ? "Créé à partir de votre compte authentifié et prêt à être personnalisé."
          : "Created from your authenticated account and ready to customize.",
      primaryEmail: locale === "fr" ? "Email principal" : "Primary email",
      primaryEmailBody:
        locale === "fr"
          ? "Utilisé pour la connexion, les notifications et la facturation."
          : "Used for sign-in, notifications, and billing updates.",
      overviewEyebrow: locale === "fr" ? "Vue du projet" : "Project overview",
      overviewTitle: locale === "fr" ? "État actuel" : "Current state",
      workspaceId: locale === "fr" ? "ID du projet" : "Project ID",
      emailVerified: locale === "fr" ? "Email vérifié" : "Email verified",
      recommendedNext: locale === "fr" ? "Étape suivante" : "Recommended next step",
      nextBody:
        locale === "fr"
          ? "Personnalisez ce starter project avec vos écrans produit, votre onboarding et votre logique métier."
          : "Use this starter project as the base for your product screens, onboarding flow, and business logic.",
      access: locale === "fr" ? "Accès" : "Access",
      theme: locale === "fr" ? "Thème" : "Theme",
      adaptive: locale === "fr" ? "Adaptatif" : "Adaptive",
      live: locale === "fr" ? "Actif" : "Live",
      sessionEyebrow: locale === "fr" ? "État d’auth client" : "Client auth state",
      sessionTitle: locale === "fr" ? "Session active" : "Session snapshot",
      state: locale === "fr" ? "État" : "State",
      signedIn: locale === "fr" ? "Connecté" : "Signed in",
      sessionExpires: locale === "fr" ? "Expiration" : "Session expires",
      unknown: locale === "fr" ? "Inconnu" : "Unknown",
    },
    accountPage: {
      title: locale === "fr" ? "Compte" : "Account",
      description:
        locale === "fr"
          ? "Consultez les informations liées à votre espace et à votre accès."
          : "Review the identity and access details linked to your workspace.",
      identity: locale === "fr" ? "Identité" : "Identity",
      created: locale === "fr" ? "Créé" : "Created",
      planDetails: locale === "fr" ? "Détails d’offre" : "Plan details",
      billingCustomerId: locale === "fr" ? "ID client Stripe" : "Stripe customer ID",
      notCreatedYet: locale === "fr" ? "Pas encore créé" : "Not created yet",
    },
    planPage: {
      title: locale === "fr" ? "Offre" : "Plan",
      description:
        locale === "fr"
          ? "Une offre simple, sans comparaison inutile."
          : "A single clear offer with no extra decisions.",
      purchaseConfirmed:
        locale === "fr"
          ? "Paiement confirmé. Votre accès sera mis à jour dès que Stripe aura fini le traitement."
          : "Payment confirmed. Access will update as soon as Stripe finishes processing.",
      checkoutCanceled:
        locale === "fr"
          ? "Le paiement a été annulé avant validation."
          : "Checkout was canceled before completion.",
      portalUnavailable:
        locale === "fr"
          ? "Le portail de facturation n’est pas encore disponible pour ce projet."
          : "The billing portal is not available for this project yet.",
      activePlan: locale === "fr" ? "Offre active" : "Active plan",
      accessStatus: locale === "fr" ? "Statut d’accès" : "Access status",
      planPrice: locale === "fr" ? "Prix" : "Plan price",
      connectedYet: locale === "fr" ? "Pas encore connecté" : "Not connected yet",
      activeSuffix: locale === "fr" ? "actif" : "active",
      offerEyebrow: locale === "fr" ? "Offre unique" : "Single offer",
      offerTitle: "Starter Kit",
      offerBody:
        locale === "fr"
          ? "Tout ce qu’il vous faut pour lancer votre SaaS."
          : "Everything you need to launch your SaaS",
      purchaseSource: locale === "fr" ? "Achat" : "Purchase",
      purchaseSourceBody: locale === "fr" ? "Vendu via Gumroad" : "Sold through Gumroad",
    },
  };
}
