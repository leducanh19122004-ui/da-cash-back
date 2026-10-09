import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ExchangesSection from './components/ExchangesSection';
import HowItWorks from './components/HowItWorks';
import CashbackActivity from './components/CashbackActivity';
import CashbackLookup from './components/CashbackLookup';
import TrustCompactSection from './components/TrustCompactSection';
import Testimonials from './components/Testimonials';
import MemberPrivilegesSection from './components/MemberPrivilegesSection';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Order follows the conversion path: what it is → compare offers → how it
 * works → the record → check status → safety → feedback → ecosystem → FAQ →
 * support. The ecosystem/signal section sits after the core product content.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <ExchangesSection />
        <HowItWorks />
        <CashbackActivity />
        <CashbackLookup />
        <TrustCompactSection />
        <Testimonials />
        <MemberPrivilegesSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
