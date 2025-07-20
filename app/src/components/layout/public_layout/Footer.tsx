import { Briefcase, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Branding */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              Connecting students, recruiters, and admins on a unified job platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/jobs" className="hover:text-blue-600">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-blue-600">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-600">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-500 hover:text-blue-600"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-500 hover:text-blue-500"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-500 hover:text-blue-700"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:support@jobportal.com"
                className="text-gray-500 hover:text-red-500"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">support@jobportal.com</p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
