import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
  Settings,
  User,
  Lock,
  Briefcase,
  FileText,
  HelpCircle,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative border-t border-gray-700">
      {/* Main Footer */}
      <div className="px-6 py-12 max-w-7xl mx-auto grid gap-10 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold">CareerGlide</span>
          </div>
          <p className="text-gray-400 mb-6 text-sm">
            Elevating your career journey with personalized tools, resources, and connections.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: Twitter, color: 'hover:bg-blue-500', label: 'Twitter' },
              { icon: Linkedin, color: 'hover:bg-blue-700', label: 'LinkedIn' },
              { icon: Github, color: 'hover:bg-gray-700', label: 'GitHub' },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center transition ${item.color}`}
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Account Management */}
        <div>
          <h4 className="text-lg font-semibold mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-400" />
            My Account
          </h4>
          <ul className="space-y-3 text-gray-400">
            {[
              { text: 'Dashboard', icon: <Briefcase className="w-4 h-4 mr-2 text-blue-400" /> },
              {
                text: 'Profile Settings',
                icon: <Settings className="w-4 h-4 mr-2 text-purple-400" />,
              },
              {
                text: 'Privacy & Security',
                icon: <Lock className="w-4 h-4 mr-2 text-green-400" />,
              },
              { text: 'Subscription', icon: <FileText className="w-4 h-4 mr-2 text-yellow-400" /> },
            ].map((item) => (
              <li key={item.text} className="flex items-center">
                {item.icon}
                <a href="#" className="hover:text-white transition-colors">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-6 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-orange-400" />
            Resources
          </h4>
          <ul className="space-y-3 text-gray-400">
            {[
              'Career Pathways',
              'Skill Assessments',
              'Resume Builder',
              'Interview Prep',
              'Mentor Connections',
            ].map((item) => (
              <li key={item}>
                <a href="#" className="flex items-center hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 mr-2 text-gray-500" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-6 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-400" />
            Support
          </h4>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-indigo-400" />
              <a href="mailto:support@careerglide.com" className="hover:text-white">
                support@careerglide.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-indigo-400" />
              <a href="tel:+15551234567" className="hover:text-white">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="mt-6">
              <ul className="space-y-2 text-sm">
                {['Help Center', 'FAQs', 'Report an Issue'].map((item) => (
                  <li key={item} className="flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2 text-gray-500" />
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <span>© 2025 CareerGlide. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">v2.8.4</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
