import React from 'react';
import Header from './components/Header';
import SEOHead from './components/SEOHead';
import Hero from './pages/Hero';
import Services from './pages/Services';
import EInspection from './pages/EInspection';
import Rewards from './pages/Rewards';
import WhyMeineke from './pages/WhyMeineke';
import Coupons from './pages/Coupons';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <Services />
        <EInspection />
        <Rewards />
        <WhyMeineke />
        <Coupons />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
