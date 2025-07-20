import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HeroSection = () => {
  const stats = [
    { number: '10,000+', label: 'Active Jobs' },
    { number: '5,000+', label: 'Companies' },
    { number: '50,000+', label: 'Job Seekers' },
    { number: '95%', label: 'Success Rate' },
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 to-purple-100 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Dream
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Career
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with top companies, discover exciting opportunities, and take the next step in
              your professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg rounded-lg flex items-center hover:opacity-90 transition">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
              <Link href="/jobs">
                <button className="border border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  Browse Jobs
                </button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
