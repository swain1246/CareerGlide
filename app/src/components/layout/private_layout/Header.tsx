import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  LogOut,
  Menu,
  X,
  Briefcase,
  User as UserIcon,
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  Lock,
  Bookmark,
  MessageSquare
} from 'lucide-react';

export const Header = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get user initials
  const getInitials = (name: string | null) => {
    if (!name) return '?';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    if (user.userId) {
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const userName = userData.studentName || userData.companyName || userData.mentorName || userData.adminName || 'User';
  const userInitials = getInitials(userName);
  const userEmail = userData.email || 'user@example.com';
  const userRole = userData.userTypeId === 3 ? 'Student' :
    userData.userTypeId === 2 ? 'Company' :
      userData.userTypeId === 4 ? 'Mentor' :
        userData.userTypeId === 1 ? 'Admin' : 'User';

  const isActive = (path: string) => router.pathname === path;

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
    sessionStorage.removeItem('userData');
    setIsAuthenticated(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                CareerGlide
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4 relative">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full py-1.5 pr-3 pl-1.5 transition cursor-pointer"
                  aria-label="User Menu"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-semibold flex items-center justify-center">
                    {userInitials}
                  </div>
                  <span className="font-medium text-gray-800 text-sm hidden lg:block">{userName}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {dropdownOpen && (
                  <div
                    id="user-dropdown"
                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{userName}</p>
                      <p className="text-gray-500 text-xs truncate">{userEmail}</p>
                      <p className="text-xs text-blue-600 capitalize font-medium mt-1">{userRole}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/student-profile">
                        <div className="px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700">
                          <UserIcon className="w-4 h-4 mr-3 text-gray-500" />
                          <span>My Profile</span>
                        </div>
                      </Link>
                      <Link href="/saved">
                        <div className="px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700">
                          <Bookmark className="w-4 h-4 mr-3 text-gray-500" />
                          <span>Saved Items</span>
                        </div>
                      </Link>
                      <Link href="/change-password">
                        <div className="px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700">
                          <Lock className="w-4 h-4 mr-3 text-gray-500" />
                          <span>Change Password</span>
                        </div>
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700"
                      >
                        <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-md text-sm font-medium hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition ml-2"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-100">
            <div className="px-4 py-3">
              <div className="flex flex-col space-y-1">
                {navLinks.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition ${isActive(href) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {icon}
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="border-t border-gray-100 mt-3 pt-3">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/student-profile"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/saved"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>Saved Items</span>
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Messages</span>
                    </Link>
                    <Link
                      href="/change-password"
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Lock className="w-4 h-4" />
                      <span>Change Password</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/auth/login"
                      className="text-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="text-center px-4 py-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;