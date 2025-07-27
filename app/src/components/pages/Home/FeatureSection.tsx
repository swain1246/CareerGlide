import { Briefcase, GraduationCap, Search, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

const FeatureSection = () => {
  const features = [
    {
      title: 'Personalized Mentorship',
      description:
        'Connect 1-on-1 with industry experts who guide your career path with practical advice.',
      icon: Zap,
      bgColor: 'bg-yellow-100',
      color: 'text-yellow-600',
    },
    {
      title: 'Verified Projects',
      description: 'Build real-world projects that are verified by companies and mentors.',
      icon: Zap,
      bgColor: 'bg-green-100',
      color: 'text-green-600',
    },
    {
      title: 'Job Matching',
      description: 'Smart algorithms match your profile with the best job opportunities.',
      icon: Zap,
      bgColor: 'bg-blue-100',
      color: 'text-blue-600',
    },
    // Add more features as needed
  ];

  return (
    <>
      {/* FeatureSection */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
        {/* Decorative Blur Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Everything You Need to <span className="text-blue-600">Succeed</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform brings together students, mentors, and companies in one
              seamless ecosystem designed for career growth and success.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-gray-100 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${feature.bgColor}`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-24">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-10 text-white shadow-xl">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to Transform Your Career?
              </h3>
              <p className="mb-6 max-w-2xl mx-auto text-white/90">
                Join thousands of students, mentors, and companies who are already building the
                future of work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Get Started Today
                </button>
                <button className="border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
