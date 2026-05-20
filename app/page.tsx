import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MemberPrivilegesSection from './components/MemberPrivilegesSection';
import StatsSection from './components/StatsSection';
import ExchangesSection from './components/ExchangesSection';
import HowItWorks from './components/HowItWorks';
import CashbackActivity from './components/CashbackActivity';
import SafetySection from './components/SafetySection';
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
        {/* ⭐ Merged flagship: Đặc quyền thành viên DA Cashback */}
        <MemberPrivilegesSection />
        <StatsSection />
        <ExchangesSection />
        <HowItWorks />
        <CashbackActivity />
        <SafetySection />
        <TrustSafety />
        <FAQ />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
