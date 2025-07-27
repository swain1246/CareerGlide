import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LogOut, Settings, Menu, X, Briefcase, User as UserIcon, ChevronDown } from 'lucide-react';

export const Header = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => router.pathname === path;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    initials: 'JD',
  });

  const navLinks = [
    { href: '/jobs', label: 'Jobs' },
    { href: '/internships', label: 'Internships' },
    { href: '/search', label: 'Search' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      const button = document.getElementById('user-button');
      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        !button?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    alert('Logged out!');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur-lg shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition">
              CareerGlide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Home
            </Link>

            {/* For Students Dropdown */}
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                For Students
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ">
                <div className="py-2">
                  <Link
                    href="/student/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Student Registration
                  </Link>
                  <Link
                    href="/jobs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    href="/mentors"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Find Mentors
                  </Link>
                </div>
              </div>
            </div>

            {/* For Companies Dropdown */}
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                For Companies
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/company/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Company Registration
                  </Link>
                  <Link
                    href="/company/post-job"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Post Jobs
                  </Link>
                  <Link
                    href="/company/talent"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Browse Talent
                  </Link>
                </div>
              </div>
            </div>

            {/* Mentors */}
            <Link
              href="/mentors"
              className={`font-medium transition-colors ${
                isActive('/mentors') ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              Mentors
            </Link>
          </div>

          {/* Right Side: Auth or Profile */}
          <div className="flex items-center gap-4 relative">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-md transition cursor-pointer"
                  aria-label="User Menu"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {user.initials}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    id="user-dropdown"
                    className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                      <p className="text-xs text-blue-600 capitalize">{user.role}</p>
                    </div>
                    <Link href="/student/dashboard">
                      <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer transition">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Dashboard
                      </div>
                    </Link>
                    <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer transition">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40 animate-slideDown">
            <div className="flex flex-col py-3 px-4 space-y-3">
              {navLinks.map(({ href, label }) => {
                const isActive = router.asPath === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}

              {!isAuthenticated && (
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-center px-4 py-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
