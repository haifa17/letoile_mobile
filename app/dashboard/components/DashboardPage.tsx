"use client";
import { Clock, FolderOpen, Plus, QrCode } from "lucide-react";
import { StatCard } from "../cards/stat-card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { QuickActionCard } from "../cards/quick-action-card";
import { useTab } from "@/components/contexts/TabContext";
import { useContacts } from "../queries/useContacts";
import { usePortability } from "../queries/usePortability";
import { DashboardCharts } from "./Dashboardcharts";

export function DashboardPage() {
  const { setActiveTab } = useTab();
  const { data: contacts = [], isLoading: contactsLoading } = useContacts();
  const { data: portability = [], isLoading: portabiliesLoading } =
    usePortability();

  if (contactsLoading || portabiliesLoading) return <div>Loading..</div>;

  const stats = {
    totalContactsForms: contacts.length,
    totalPortabilityForms: portability.length,
    // totalItems: menuItems.length,
    lastCreated: portability.length
      ? portability[0].createdAt
      : new Date().toISOString(),
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-heading">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue ! Voici un aperçu de votre plateforme.{" "}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total des formulaires de contact"
          value={stats.totalContactsForms}
          icon={<FolderOpen className="h-5 w-5 text-white" />}
          description="Formulaires soumis"
        />
        <StatCard
          title="Total des formulaires de portabilité"
          value={stats.totalPortabilityForms}
          icon={<FolderOpen className="h-5 w-5 text-white" />}
          description="Formulaires soumis"
        />

        <StatCard
          title="Dernière formulaire de portabilité crée"
          value={formatDistanceToNow(
            new Date(stats.lastCreated ?? new Date().toISOString()),
            { addSuffix: false, locale: fr },
          )}
          icon={<Clock className="h-5 w-5 text-white" />}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-heading  font-semibold text-foreground mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Télécharger le code QR"
            description="Obtenez votre code QR "
            icon={<QrCode className="h-5 w-5" />}
            onClick={() => setActiveTab("qr")}
          />
          <QuickActionCard
            title="Consulter les formulaires de portabilité"
            description="Afficher tous les formulaires de portabilité"
            icon={<FolderOpen className="h-5 w-5" />}
            onClick={() => setActiveTab("form")}
          />
          <QuickActionCard
            title="Consulter les formulaires de contact"
            description="Afficher tous les formulaires de contact"
            icon={<FolderOpen className="h-5 w-5" />}
            onClick={() => setActiveTab("contact")}
          />
        </div>
      </div>
            {/* Charts */}
      <DashboardCharts contacts={contacts} portability={portability} />
    </div>
  );
}
