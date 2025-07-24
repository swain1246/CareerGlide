import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
export function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-blue-900 via-gray-900 to-orange-900 text-white relative">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 pointer-events-none -z-10" />

      {/* Newsletter */}
      <div className="border-b border-white/10 px-6 py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Stay Updated with CareerGlide</h3>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Get the latest career tips, job opportunities, and platform updates delivered straight to
          your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md bg-white/10 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-orange-500 text-white px-5 py-3 rounded-md font-medium hover:opacity-90 transition"
          >
            Subscribe
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
      </div>

      {/* Main Footer */}
      <div className="px-6 py-20 max-w-7xl mx-auto grid gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">CareerGlide</span>
          </div>
          <p className="text-white/70 mb-6">
            Connecting students, mentors, and companies to build the future workforce through
            skill-based learning and meaningful connections.
          </p>
          <div className="flex space-x-4">
            {[Twitter, Linkedin, Github, Facebook].map((Icon, idx) => (
              <div
                key={idx}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition"
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Platform</h4>
          <ul className="space-y-3 text-white/80">
            {['For Students', 'For Companies', 'For Mentors', 'Success Stories', 'Pricing'].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Resources</h4>
          <ul className="space-y-3 text-white/80">
            {['Career Guide', 'Interview Tips', 'Resume Builder', 'Skill Assessments', 'Blog'].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-orange-400" />
              hello@careerglide.com
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-orange-400" />
              +1 (555) 123-4567
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-orange-400" />
              San Francisco, CA
            </div>
          </div>

          <div className="mt-6">
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm text-white/70">
              {['Help Center', 'Community', 'Contact Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <span className="mb-4 md:mb-0">© 2025 CareerGlide. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
