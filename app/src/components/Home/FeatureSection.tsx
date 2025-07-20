import { Briefcase, Search, TrendingUp, Users } from 'lucide-react';
import React from 'react';

const FeatureSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Job Search',
      description:
        'Find opportunities that match your skills and preferences with our intelligent filtering system.',
    },
    {
      icon: Briefcase,
      title: 'Quality Opportunities',
      description: 'Access verified job postings from top companies and growing startups.',
    },
    {
      icon: Users,
      title: 'Connect with Recruiters',
      description: 'Build meaningful connections with hiring managers and expand your network.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your application progress and get insights to improve your success rate.',
    },
  ];
  return (
    <>
      {/* FeatureSection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re revolutionizing the way people find jobs and companies hire talent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border hover:shadow-lg transition text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
