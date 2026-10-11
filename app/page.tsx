import type { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Exchanges from './components/Exchanges';
import CashbackLookup from './components/CashbackLookup';
import CashbackRecord from './components/CashbackRecord';
import AccountSafety from './components/AccountSafety';
import TraderBenefitsLink from './components/TraderBenefitsLink';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Canonical is set per page (not in the root layout) so legal pages don't inherit '/'.
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * V3.1 order (fee-rebate platform): hero → what you get → how cashback works →
 * exchanges → status lookup → cashback record → safety → DA Network for
 * traders cross-link → FAQ → contact.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Benefits />
        <HowItWorks />
        <Exchanges />
        <CashbackLookup />
        <CashbackRecord />
        <AccountSafety />
        <TraderBenefitsLink />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
