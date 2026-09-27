import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ImpactSection } from "@/components/landing/impact-section";
import { ModulesTeaser } from "@/components/landing/modules-teaser";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

/**
 * Landing page pública (F1). Acessível sem autenticação.
 */
export default function LandingPage() {
  return (
    <>
      <a
        href="#conteudo"
        className="bg-primary text-primary-foreground focus:ring-ring sr-only rounded-md px-3 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:ring-3"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <HowItWorks />
        <ModulesTeaser />
        <ImpactSection />
      </main>
      <SiteFooter />
    </>
  );
}
