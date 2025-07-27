import React from 'react';
import { ArrowRight, Users, Briefcase, GraduationCap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-orange-300 overflow-hidden px-6 pt-10 pb-28">
      {/* Background Pattern Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Abstract Blobs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-[160px] z-0" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[160px] z-0" />
      <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-yellow-200/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-pink-200/30 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Hero Text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 mr-2" />
              The Future of Career Development
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Launch Careers.
              <br />
              <span className="text-blue-600">Build Skills.</span>
              <br />
              Get Hired.
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-xl mx-auto lg:mx-0">
              Connect students with mentors, companies with talent, and build the future workforce
              through skill-based learning and meaningful connections.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center hover:bg-blue-700 transition">
                Join as Student
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button className="px-6 py-3 border border-blue-200 text-blue-700 bg-white/50 backdrop-blur-md rounded-lg font-semibold text-sm flex items-center justify-center hover:bg-white hover:border-blue-300 transition">
                Post Jobs (Company)
                <Briefcase className="w-4 h-4 ml-2" />
              </button>

              <button className="px-6 py-3 border border-orange-200 text-orange-700 bg-white/50 backdrop-blur-md rounded-lg font-semibold text-sm flex items-center justify-center hover:bg-white hover:border-orange-300 transition">
                Mentor Talent
                <Users className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center text-gray-800">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-gray-600">Partner Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2K+</div>
                <div className="text-sm text-gray-600">Expert Mentors</div>
              </div>
            </div>
          </div>

          {/* Right: Testimonial Card */}
          <div className="relative">
            <div className="relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Testimonial */}
              <div className="bg-white/30 rounded-2xl p-6 mb-4 shadow-inner">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Story</h3>
                <p className="text-gray-700 text-sm mb-4">
                  &quot;CareerGlide connected me with an amazing mentor who helped me land my dream
                  internship at a Fortune 500 company!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3 font-medium">
                    SA
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Sarah Anderson</div>
                    <div className="text-xs text-gray-600">Computer Science Student</div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/40 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-700">Job Placement Rate</div>
                </div>
                <div className="bg-white/40 backdrop-blur rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">4.9</div>
                  <div className="text-sm text-gray-700">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Glow Effects */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
