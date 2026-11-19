import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/lib/ariba/progress";
import Shell from "@/components/ariba/Shell";

export const metadata: Metadata = {
  title: "Parcours SAP Ariba — BlueBox Academy",
  description: "Programme structuré de formation SAP Ariba technico-fonctionnel sur 8 semaines : P2P, Sourcing, RFI/RFQ, Contrats, SLP, Ariba Network, Catalogues, Intégration S/4HANA, CIG, cXML, Administration et préparation à la certification.",
};

export default function AribaLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="fr">
      <ProgressProvider>
        <Shell>{children}</Shell>
      </ProgressProvider>
    </div>
  );
}
