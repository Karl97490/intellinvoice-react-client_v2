import { Badge, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  ReceiptText,
  Users,
  BarChart3,
  ShieldCheck,
  Clock3,
  FileText,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Facturation intelligente",
    description:
      "Crée, modifie et envoie des factures en quelques clics avec une interface claire.",
    icon: ReceiptText,
  },
  {
    title: "Suivi clients centralisé",
    description:
      "Retrouve toutes les infos client et leur historique de facturation au même endroit.",
    icon: Users,
  },
  {
    title: "Vue performance",
    description:
      "Visualise rapidement revenus, statuts de paiement et tendances mensuelles.",
    icon: BarChart3,
  },
];

const quickPoints = [
  {
    label: "Sécurisé",
    value: "Accès privé",
    icon: ShieldCheck,
  },
  {
    label: "Rapide",
    value: "Workflow simplifié",
    icon: Clock3,
  },
  {
    label: "Professionnel",
    value: "Docs propres",
    icon: FileText,
  },
];

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Connexion", to: "/login" },
  { label: "Inscription", to: "/signup" },
];

const Home = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-12">
        <Badge color="purple" className="mb-4 w-fit">
          Customer Invoice Management
        </Badge>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
          Gère tes clients et tes factures simplement.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
          IntellInvoice est une solution MERN moderne pour suivre tes clients,
          générer tes factures et garder le contrôle sur ton activité.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as={Link} to="/signup" size="lg" color="purple">
            Commencer
          </Button>
          <Button as={Link} to="/login" size="lg" color="light">
            Se connecter
          </Button>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {quickPoints.map((point) => {
          const Icon = point.icon;
          return (
            <Card
              key={point.label}
              className="border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/50">
                  <Icon className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {point.label}
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {point.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Une base solide pour ton pilotage
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Tout le nécessaire pour une gestion simple, moderne et épurée.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="h-full border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4 inline-flex w-fit rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                  <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-purple-200 bg-purple-50/60 p-6 dark:border-purple-800 dark:bg-purple-900/20 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge color="purple" className="mb-3 w-fit">
              Productivité
            </Badge>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
              Une gestion plus fluide dès aujourd’hui
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
              Passe moins de temps sur l’administratif et plus de temps sur ton
              business.
            </p>
          </div>
          <Button as={Link} to="/signup" color="purple" size="lg">
            Créer un compte
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <footer className="mt-14 border-t border-gray-200 py-8 dark:border-gray-700">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              IntellInvoice
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Customer invoice management system
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                as={Link}
                to={link.to}
                size="xs"
                color="light"
                pill
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} IntellInvoice. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default Home;
