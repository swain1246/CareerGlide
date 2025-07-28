import CTASection from '@src/components/pages/Home/CTASection';
import FeatureSection from '@src/components/pages/Home/FeatureSection';
import HeroSection from '@src/components/pages/Home/HeroSection';
import RecentJobSection from '@src/components/pages/Home/RecentJobSection';
import TestimonialSection from '@src/components/pages/Home/TestimonialSection';
import PublicLayout from '@src/components/layout/public_layout';

export const Home = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* Testimonial Section */}
        <TestimonialSection />

        {/* Recent Jobs Section */}
        <RecentJobSection />
      </div>
    </PublicLayout>
  );
};

export default Home;
