import type { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';
import Exchanges from './components/Exchanges';
import HowItWorks from './components/HowItWorks';
import Rebates from './components/Rebates';
import Guides from './components/Guides';
import Ecosystem from './components/Ecosystem';
import AccountSafety from './components/AccountSafety';
import FAQ from './components/FAQ';
import Disclosures from './components/Disclosures';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Canonical is set per page (not in the root layout) so legal pages don't inherit '/'.
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * V3.2 order: hero → exchanges → how it works → rebates & payout history →
 * guides → DA ecosystem → account safety → FAQ → disclosures → contact.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Exchanges />
        <HowItWorks />
        <Rebates />
        <Guides />
        <Ecosystem />
        <AccountSafety />
        <FAQ />
        <Disclosures />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
