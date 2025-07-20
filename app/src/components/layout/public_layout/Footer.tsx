import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Branding */}
          <div>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CareerGlide</span>
            </Link>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Connecting students, recruiters, and admins on a unified job platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/jobs" className="hover:text-indigo-600 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/internships" className="hover:text-indigo-600 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-indigo-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-indigo-600 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-500 hover:text-sky-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-gray-500 hover:text-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:support@CareerGlide.com"
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">support@CareerGlide.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CareerGlide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
