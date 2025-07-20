import CTASection from '@src/components/Home/CTASection';
import FeatureSection from '@src/components/Home/FeatureSection';
import HeroSection from '@src/components/Home/HeroSection';
import RecentJobSection from '@src/components/Home/RecentJobSection';
import PublicLayout from '@src/components/layout/public_layout/PublicLayout';

export const Home = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* Recent Jobs Section */}
        <RecentJobSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </PublicLayout>
  );
};

export default Home;
