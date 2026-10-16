import type { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';
import Exchanges from './components/Exchanges';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import Payouts from './components/Payouts';
import AccountSafety from './components/AccountSafety';
import FAQ from './components/FAQ';
import Guides from './components/Guides';
import Ecosystem from './components/Ecosystem';
import Disclosures from './components/Disclosures';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Canonical is set per page (not in the root layout) so legal pages don't inherit '/'.
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * V3.3 conversion order: compact hero → exchanges (the central element) →
 * rebate calculator → how it works (+ existing accounts) → payouts → account
 * safety → FAQ → guides → DA ecosystem → disclosures → contact.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Exchanges />
        <Calculator />
        <HowItWorks />
        <Payouts />
        <AccountSafety />
        <FAQ />
        <Guides />
        <Ecosystem />
        <Disclosures />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
