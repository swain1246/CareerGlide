import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Software Engineering Student',
    company: 'Stanford University',
    avatar: 'AC',
    rating: 5,
    content:
      'CareerGlide connected me with a senior engineer at Google who became my mentor. The guidance I received was invaluable, and I landed my dream internship!',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Talent Acquisition Manager',
    company: 'Microsoft',
    avatar: 'MR',
    rating: 5,
    content:
      "We've hired 15 exceptional interns through CareerGlide this year. The quality of candidates and the platform's efficiency is outstanding.",
  },
  {
    name: 'David Kim',
    role: 'Senior Data Scientist',
    company: 'Netflix',
    avatar: 'DK',
    rating: 5,
    content:
      'Mentoring students through CareerGlide has been incredibly rewarding. The platform makes it easy to share knowledge and help the next generation.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Student',
    company: 'NYU Stern',
    avatar: 'SJ',
    rating: 5,
    content:
      'The project collaboration feature helped me work with students from different universities. We built an amazing portfolio together!',
  },
  {
    name: 'James Wilson',
    role: 'Startup Founder',
    company: 'TechStart Inc.',
    avatar: 'JW',
    rating: 5,
    content:
      'CareerGlide helped us find talented interns who brought fresh perspectives to our startup. Highly recommend for growing companies.',
  },
  {
    name: 'Emily Davis',
    role: 'Computer Science Student',
    company: 'MIT',
    avatar: 'ED',
    rating: 5,
    content:
      'The skill-based matching is incredible. I found mentors who were experts in exactly the areas I wanted to grow in.',
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-orange-200 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Loved by <span className="text-orange-500">Students</span>,{' '}
            <span className="text-blue-600">Companies</span>, and{' '}
            <span className="text-purple-600">Mentors</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See what our community has to say about their CareerGlide experience and how it
            transformed their career journey.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Rating */}
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                ))}
              </div>

              {/* Content */}
              <div className="relative mb-6">
                <Quote className="absolute -top-3 -left-3 w-8 h-8 text-gray-300 opacity-20" />
                <p className="text-gray-600 leading-relaxed relative z-10">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-400 text-white flex items-center justify-center font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-xs font-medium text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-500">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">5,000+</div>
            <div className="text-gray-500">Successful Placements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-500">Platform Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-500">Partner Universities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
