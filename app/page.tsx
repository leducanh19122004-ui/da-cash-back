import type { Metadata } from 'next';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Rewards from './components/Rewards';
import Exchanges from './components/Exchanges';
import HowToJoin from './components/HowToJoin';
import RewardRecord from './components/RewardRecord';
import ProgressLookup from './components/ProgressLookup';
import SignalRecord from './components/SignalRecord';
import AccountSafety from './components/AccountSafety';
import MemberFeedback from './components/MemberFeedback';
import Compare from './components/Compare';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Canonical is set per page (not in the root layout) so legal pages don't inherit '/'.
export const metadata: Metadata = { alternates: { canonical: '/' } };

/**
 * V3 order (owner doc): hero → what you get → how rewards work → exchanges →
 * how to join → reward record → progress → signal record → safety →
 * member feedback (hidden while empty) → comparison → FAQ → contact.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Benefits />
        <Rewards />
        <Exchanges />
        <HowToJoin />
        <RewardRecord />
        <ProgressLookup />
        <SignalRecord />
        <AccountSafety />
        <MemberFeedback />
        <Compare />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
