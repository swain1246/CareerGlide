import { useState, ReactNode, useEffect, useRef } from 'react';
import {
  Home,
  Briefcase,
  Users,
  User,
  Settings,
  PlusCircle,
  FileText,
  BookOpen,
  Star,
  BarChart3,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Target,
  Bell,
  Menu,
  Bookmark,
  Lock,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { APP_ROUTE } from '@src/constants';
import { useRouter } from 'next/router';

interface Application {
  id: string;
  studentId: string;
  jobId: string;
  status: 'accepted' | 'interview' | 'reviewing' | 'rejected';
}

interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  skills: string[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  role: string;
}

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const navigationConfig = {
  student: [
    {
      label: 'Main',
      items: [
        { title: 'Dashboard', url: '/student/dashboard', icon: Home },
        { title: 'Browse Jobs', url: '/jobs', icon: Briefcase },
        { title: 'My Applications', url: '/student/applications', icon: FileText },
        { title: 'Find Mentors', url: '/student/mentors', icon: Users },
      ],
    },
    {
      label: 'Profile',
      items: [
        { title: 'Edit Profile', url: APP_ROUTE.STUDENT_PROFILE, icon: User },
        { title: 'Settings', url: '/student/settings', icon: Settings },
      ],
    },
  ],
};

// Mock data
const students: Student[] = [
  {
    id: 's1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    role: 'student',
  },
];

const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Frontend Developer',
    companyName: 'TechCorp',
    companyLogo: '',
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 'j2',
    title: 'UX Designer',
    companyName: 'DesignHub',
    companyLogo: '',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
  },
  {
    id: 'j3',
    title: 'Backend Engineer',
    companyName: 'ServerStack',
    companyLogo: '',
    skills: ['Node.js', 'Python', 'SQL'],
  },
];

const applications: Application[] = [
  {
    id: 'a1',
    studentId: 's1',
    jobId: 'j1',
    status: 'reviewing',
  },
  {
    id: 'a2',
    studentId: 's1',
    jobId: 'j2',
    status: 'interview',
  },
  {
    id: 'a3',
    studentId: 's1',
    jobId: 'j3',
    status: 'rejected',
  },
];

const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 's1',
    title: 'New Job Match',
    message: 'A new job matches your skills: Full Stack Developer at WebSolutions',
    createdAt: '2023-07-15T10:30:00Z',
    isRead: false,
  },
  {
    id: 'n2',
    userId: 's1',
    title: 'Application Update',
    message: 'Your application at TechCorp has moved to the next stage',
    createdAt: '2023-07-14T14:20:00Z',
    isRead: false,
  },
];

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({} as any);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentStudent = students[0];
  const userApplications = applications.filter((app) => app.studentId === currentStudent.id);
  const userNotifications = notifications.filter(
    (notif) => notif.userId === currentStudent.id && !notif.isRead,
  );

  const recommendedJobs = jobs
    .filter((job) => job.skills.some((skill) => currentStudent.skills.includes(skill)))
    .slice(0, 3);

  const stats = [
    {
      title: 'Applications Sent',
      value: userApplications.length,
      icon: <Briefcase className="h-5 w-5" />,
      trend: '+2 this week',
      color: 'text-blue-500',
    },
    {
      title: 'Profile Views',
      value: 47,
      icon: <Users className="h-5 w-5" />,
      trend: '+12 this week',
      color: 'text-green-500',
    },
    {
      title: 'Skill Score',
      value: '85%',
      icon: <Star className="h-5 w-5" />,
      trend: '+5% this month',
      color: 'text-yellow-500',
    },
    {
      title: 'Response Rate',
      value: '78%',
      icon: <TrendingUp className="h-5 w-5" />,
      trend: 'Above average',
      color: 'text-purple-500',
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-500';
      case 'interview':
        return 'text-yellow-500';
      case 'reviewing':
        return 'text-blue-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'reviewing':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
    router.push(APP_ROUTE.HOME);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
      } catch (e) {
        console.error('Error parsing user data:', e);
        router.push(APP_ROUTE.HOME);
      }
    } else {
      router.push(APP_ROUTE.HOME);
    }
  }, [router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-white shadow-md text-gray-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileSidebar}></div>
          <div className="relative bg-white w-64 h-full shadow-lg z-50">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerGlide
                </div>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  Student
                </span>
              </div>
            </div>

            <div className="p-4 overflow-y-auto">
              {navigationConfig.student.map((group, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xs font-semibold uppercase mb-2 text-gray-700">
                    {group.label}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700"
                        onClick={toggleMobileSidebar}
                      >
                        <item.icon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white border-r transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-14'
        }`}
      >
        <div className="p-4 border-b">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CareerGlide
              </div>
              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                Student
              </span>
            </div>
          ) : (
            <div className="text-xl font-bold text-center text-blue-600">CG</div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {navigationConfig.student.map((group, index) => (
            <div key={index} className="mb-6">
              {sidebarOpen && (
                <h3 className="text-xs font-semibold uppercase text-gray-500 px-4 mb-2">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center space-x-3 p-2 mx-2 hover:bg-gray-100 rounded-md transition-colors text-gray-700 ${
                      sidebarOpen ? '' : 'justify-center'
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-gray-500" />
                    {sidebarOpen && <span className="text-gray-700">{item.title}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:ml-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between w-full">
            {/* Left section - Logo and sidebar toggle */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-3 p-2 rounded-lg hover:bg-gray-50 text-gray-600 transition-all"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">CG</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerGlide
                </h1>
              </div>
            </div>

            {/* Right section - User controls */}
            <div className="flex items-center space-x-5">
              <button className="relative p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="h-6 w-6" />
                {userNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                    {userNotifications.length}
                  </span>
                )}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center group cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                      {currentUser?.studentName?.charAt(0)}
                    </div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {currentUser?.studentName?.split(' ')[0]}
                    </p>
                    <p className="text-xs text-black font-bold ">
                      {currentUser?.studentName
                        ?.toLowerCase()
                        .split(' ')
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <h3 className="text-xs text-black font-bold">
                        {currentUser?.studentName
                          ?.toLowerCase()
                          .split(' ')
                          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ')}
                      </h3>
                      <p className="text-gray-500 text-xs truncate">{currentUser.email}</p>
                      <p className="text-xs text-blue-600 capitalize font-medium mt-1">
                        {currentUser.role}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link href={APP_ROUTE.STUDENT_PROFILE}>
                        <div className="px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700">
                          <User className="w-4 h-4 mr-3 text-gray-500" />
                          <span>My Profile</span>
                        </div>
                      </Link>
                      <Link href="/student/saved">
                        <div className="px-4 py-2.5 hover:bg-gray-50 flex items-center cursor-pointer transition text-gray-700">
                          <Bookmark className="w-4 h-4 mr-3 text-gray-500" />
                          <span>Saved Items</span>
                        </div>
                      </Link>
                      <Link href="/student/change-password">
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
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back,{' '}
                {currentUser?.studentName
                  ?.toLowerCase()
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}{' '}
                !
              </h1>

              <p className="text-gray-500">
                Here's what's happening with your career journey today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-700">{stat.title}</p>
                      <p className="text-xl font-bold mt-1 text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Applications */}
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-4 py-5 border-b sm:px-6">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Track the status of your job applications
                    </p>
                  </div>
                  <div className="p-4 space-y-4">
                    {userApplications.slice(0, 3).map((application) => {
                      const job = jobs.find((j) => j.id === application.jobId);
                      if (!job) return null;

                      return (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 border flex items-center justify-center text-gray-500">
                              {job.companyName.substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{job.title}</h4>
                              <p className="text-sm text-gray-500">{job.companyName}</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center space-x-1 ${getStatusColor(application.status)}`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="text-sm font-medium capitalize">
                              {application.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <button className="w-full py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      View All Applications
                    </button>
                  </div>
                </div>

                {/* Recommended Jobs */}
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-4 py-5 border-b sm:px-6">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-gray-600 mr-2" />
                      <h3 className="text-lg font-bold text-gray-900">Recommended for You</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Jobs that match your skills and interests
                    </p>
                  </div>
                  <div className="p-4 grid gap-4">
                    {recommendedJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            <p className="text-sm text-gray-500">{job.companyName}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {job.companyName.substring(0, 2)}
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 text-gray-700">
                            View Details
                          </button>
                          <button className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Completion */}
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-4 py-5 border-b sm:px-6">
                    <h3 className="text-lg font-bold text-gray-900">Profile Strength</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Complete your profile to attract more opportunities
                    </p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Profile Completion</span>
                        <span className="font-medium text-gray-500">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Basic information</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Skills added</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Resume uploaded</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Add portfolio projects</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Connect social profiles</span>
                      </div>
                    </div>
                    <button className="w-full py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      Complete Profile
                    </button>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-4 py-5 border-b sm:px-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Updates</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {userNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.createdAt.slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      View All Notifications
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border rounded-lg shadow-sm">
                  <div className="px-4 py-5 border-b sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <button className="w-full flex items-center justify-start py-2 px-3 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                      Browse New Jobs
                    </button>
                    <button className="w-full flex items-center justify-start py-2 px-3 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      Find Mentors
                    </button>
                    <button className="w-full flex items-center justify-start py-2 px-3 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                      <Star className="h-4 w-4 mr-2 text-gray-500" />
                      Take Skill Assessment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
