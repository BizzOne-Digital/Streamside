import Hero from '../components/sections/Hero';
import FeaturesBar from '../components/sections/FeaturesBar';
import AboutPreview from '../components/sections/AboutPreview';
import PricingSection from '../components/sections/PricingSection';
import WhyStreamside from '../components/sections/WhyStreamside';
import Testimonials from '../components/sections/Testimonials';
import ResourcesPreview from '../components/sections/ResourcesPreview';
import CTABanner from '../components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesBar />
      <AboutPreview />
      <PricingSection />
      <WhyStreamside />
      <Testimonials />
      <ResourcesPreview />
      <CTABanner
        title="Ready for Clearer Books and Better Decisions?"
        subtitle="Book your free Bookkeeping Fit Call today. No obligation. Just a friendly chat."
        cta1="Book Your Free Consultation"
      />
    </>
  );
}
