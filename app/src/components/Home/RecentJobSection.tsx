import { Briefcase, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const recentJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$80,000 - $120,000',
    posted: '2 days ago',
    featured: true,
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'DataLab',
    location: 'Remote',
    type: 'Internship',
    salary: '$25/hour',
    posted: '1 week ago',
    featured: false,
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100,000 - $140,000',
    posted: '3 days ago',
    featured: true,
  },
];

const RecentJobSection = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-bl from-orange-100 via-white to-blue-100 overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-200 opacity-20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest <span className="text-blue-600">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the newest job postings from top companies and startups across the globe.
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="relative bg-white/80 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6"
            >
              {/* Featured Badge */}
              {job.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full shadow">
                    <Star className="w-3.5 h-3.5 mr-1" />
                    Featured
                  </div>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-indigo-600 font-medium mb-4">{job.company}</p>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {job.posted}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-800">{job.salary}</span>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/jobs">
            <button className="border border-gray-300 text-gray-800 px-8 py-4 text-base md:text-lg rounded-lg hover:bg-gray-100 transition">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentJobSection;
