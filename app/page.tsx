import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ExchangesSection from './components/ExchangesSection';
import HowItWorks from './components/HowItWorks';
import CashbackLookup from './components/CashbackLookup';
import BenefitsSection from './components/BenefitsSection';
import TrustSafety from './components/TrustSafety';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ExchangesSection />
        <HowItWorks />
        <CashbackLookup />
        <BenefitsSection />
        <TrustSafety />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
