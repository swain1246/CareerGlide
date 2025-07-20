import { Briefcase, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const RecentJobSection = () => {
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
  return (
    <>
      {/* RecentJobSection */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the newest job postings from top companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-xl border relative bg-white hover:shadow-lg transition"
              >
                {job.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-indigo-600 font-medium mb-4">{job.company}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                  <span className="text-lg font-semibold text-gray-900">{job.salary}</span>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm rounded-lg hover:opacity-90 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/jobs">
              <button className="border border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-lg hover:bg-gray-100 transition">
                View All Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentJobSection;
