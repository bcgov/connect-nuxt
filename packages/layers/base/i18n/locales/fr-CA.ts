export default {
  btn: {
    appVersion: "Version de l'Application",
    bcRegHome: 'Accueil des Registres de la CB',
    createAccount: 'Créer un Compte',
    editProfile: 'Editer le Profil',
    logout: 'Se déconnecter',
    login: 'Se connecter',
    accountInfo: 'Infos Compte',
    teamMembers: 'Membres Équipe',
    transactions: 'Transactions',
    notifications: {
      main: 'Notifications',
      aria: 'Notifications, {count} Nouveau'
    },
    accountOptionsMenu: 'Menu Options du Compte',
    whatsNew: 'Quoi de Neuf',
    mainMenu: 'Menu principal',
    goHome: "Retour à l'Accueil"
  },
  label: {
    accountSettings: 'Paramètres Compte',
    bcRegOLServices: 'Registres et Services en ligne de la CB',
    switchAccount: 'Changer de Compte',
    selectLoginMethod: 'Sélectionnez la méthode de connexion',
    bcsc: 'BC Services Card',
    bceid: 'BCeID',
    idir: 'IDIR',
    whatsNewSlideover: 'Nouveautés aux Registres de la CB'
  },
  notifications: {
    none: 'Aucune Notification',
    teamMemberApproval: "{count} membre de l'équipe doit être approuvé pour accéder à ce compte. | {count} membres de l'équipe doivent être approuvés pour accéder à ce compte."
  },
  ConnectFooter: {
    navLabel: 'Liens utiles', // <nav> aria-label
    home: 'Accueil',
    releaseNotes: 'Notes de Version',
    fees: 'Frais',
    disclaimer: 'Clause de non-responsabilité',
    privacy: 'Confidentialité',
    ally: 'Accessibilité',
    copyright: "Droits d'auteur",
    bcApp: 'Une application en ligne CB'
  },
  ConnectHeader: {
    title: 'Service Connect CB',
    logoBtnLabel: 'Accueil', // <img> link aria-label
    navLabel: 'Navigation principale', // <nav> aria-label
    homeLink: 'Home'
  },
  ConnectBCGovLogo: {
    alt: 'Logo du gouvernement de la Colombie-Britannique' // <img> alt
  },
  ConnectLocaleSelect: {
    // aria-label
    label: 'Sélectionnez une langue, langue courante: Français'
  },
  ConnectBreadcrumb: {
    default: 'Service Connect CB',
    backBtn: 'Retour',
    arialabel: "Fil d'Ariane"
  },
  ConnectPage: {
    error: {
      404: {
        title: 'Page Introuvable - Service Connect CB',
        h1: '404 Page Introuvable',
        content: 'Cette page est introuvable ou n’existe pas.'
      },
      unknown: {
        title: 'Erreur Inconnue - Service Connect CB',
        h1: 'Erreur Inconnue',
        content: 'Une erreur inconnue s’est produite, veuillez actualiser la page ou réessayer plus tard.'
      }
    }
  },
  ConnectModalSessionExpiring: {
    title: "Session Sur Le Point D'Expirer",
    content: "Votre session est sur le point d'expirer en raison d'inactivité. Vous serez déconnecté dans {boldStart}0{boldEnd} secondes. Appuyez sur n’importe quelle touche pour continuer votre session. | Votre session est sur le point d'expirer en raison d'inactivité. Vous serez déconnecté dans {boldStart}1{boldEnd} seconde. Appuyez sur n’importe quelle touche pour continuer votre session. | Votre session est sur le point d'expirer en raison d'inactivité. Vous serez déconnecté dans {boldStart}{count}{boldEnd} secondes. Appuyez sur n’importe quelle touche pour continuer votre session.",
    sessionExpired: 'Session Expirée',
    continueBtn: {
      main: 'Continuer la Session',
      aria: "Votre session est sur le point d'expirer, appuyez sur n'importe quelle touche pour continuer votre session."
    }
  }
}
