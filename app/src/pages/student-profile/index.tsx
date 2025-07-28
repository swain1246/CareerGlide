import React, { useState, useCallback, useEffect } from 'react';
import {
    Edit,
    Plus,
    Trash2,
    User,
    GraduationCap,
    Award,
    Briefcase,
    Code,
    FolderOpen,
    Upload,
    Mail,
    Phone,
    MapPin,
    Calendar,
    FileText,
    Search,
    ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { EducationModal } from '@src/components/modals/EducationModal';
import { ProfileEditModal } from '@src/components/modals/ProfileEditModal';
import { CertificationModal } from '@src/components/modals/CertificationModal';
import { InternshipModal } from '@src/components/modals/InternshipModal';
import { SkillsModal } from '@src/components/modals/SkillsModal';
import { ProjectModal } from '@src/components/modals/ProjectModal';
import { ResumeUploadModal } from '@src/components/modals/ResumeUploadModal';
import ScoreRing from '@src/components/pages/StudentProfile/ScoreRing';
import PrivateLayout from '@src/components/layout/private_layout';
import { useRouter } from 'next/router';
import { APP_ROUTE } from '@src/constants';

// Custom Button Component
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'default', size = 'default', className = '', children, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variantStyles: Record<ButtonVariant, string> = {
            default: 'bg-blue-600 text-white hover:bg-blue-700 shadow hover:shadow-md',
            destructive: 'bg-red-600 text-white hover:bg-red-700 shadow hover:shadow-md',
            outline:
                'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 shadow-sm hover:shadow-md',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md',
            ghost: 'hover:bg-gray-100 hover:text-gray-900',
            link: 'underline-offset-4 hover:underline text-blue-600',
        };

        const sizeStyles: Record<ButtonSize, string> = {
            default: 'h-10 py-2 px-4',
            sm: 'h-9 px-3 rounded-md',
            lg: 'h-11 px-8 rounded-md',
            icon: 'h-10 w-10',
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    },
);

// Custom Card Components
const Card = ({ className, children, ...props }: any) => (
    <div
        className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-shadow hover:shadow-md ${className}`}
        {...props}
    >
        {children}
    </div>
);

const CardHeader = ({ className, children, ...props }: any) => (
    <div className={`flex flex-col space-y-1.5 p-6 pb-3 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ className, children, ...props }: any) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

const CardContent = ({ className, children, ...props }: any) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

// Custom Badge Component
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'skill';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    className?: string;
    children: React.ReactNode;
}

const Badge = ({ variant = 'default', className = '', children, ...props }: BadgeProps) => {
    const variantStyles: Record<BadgeVariant, string> = {
        default: 'bg-blue-600 text-white',
        secondary: 'bg-gray-100 text-gray-900',
        destructive: 'bg-red-600 text-white',
        outline: 'text-gray-900 border border-gray-300',
        skill: 'bg-blue-100 text-blue-800',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

// Custom Avatar Component
const Avatar = ({ className, src, alt, fallback, ...props }: any) => {
    const [error, setError] = useState(false);

    return (
        <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
            {src && !error ? (
                <img
                    src={src}
                    alt={alt}
                    className="aspect-square h-full w-full object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    {fallback}
                </div>
            )}
        </div>
    );
};

// Profile Detail Item component
const ProfileDetailItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex items-center gap-2">
        <span className="text-gray-500">{icon}</span>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-sm">{value}</p>
        </div>
    </div>
);

interface StudentProfileProps {
    student: {
        name: string;
        profileScore: number;
        college: string;
        registrationNo: string;
        gender: string;
        dateOfBirth: string;
        email: string;
        phone: string;
        location: string;
        summary: string;
        education: Array<{
            id: string;
            level: string;
            institution: string;
            year: string;
            grade: string;
        }>;
        certifications: Array<{
            id: string;
            name: string;
            issuer: string;
            date: string;
        }>;
        internships: Array<{
            id: string;
            company: string;
            role: string;
            duration: string;
            description: string;
        }>;
        skills: string[];
        projects: Array<{
            id: string;
            title: string;
            description: string;
            techStack: string[];
            links: string[];
        }>;
        resume?: {
            fileName: string;
            uploadDate: string;
        };
    };
}

// Sample student data
const sampleStudentData = {
    name: 'Aryan Sharma',
    profileScore: 85,
    college: 'Indian Institute of Technology, Delhi',
    registrationNo: 'IITD2021CS101',
    gender: 'Male',
    dateOfBirth: 'June 15, 2001',
    email: 'aryan.sharma@example.com',
    phone: '+91-9876543210',
    location: 'New Delhi, India',
    summary:
        'Passionate computer science student with expertise in full-stack development and machine learning. Seeking internship opportunities to apply my skills in real-world projects and contribute to innovative solutions.',
    education: [
        {
            id: 'edu1',
            level: 'B.Tech Computer Science',
            institution: 'IIT Delhi',
            year: '2021-2025',
            grade: '9.2 CGPA',
        },
        {
            id: 'edu2',
            level: 'Higher Secondary',
            institution: 'Delhi Public School',
            year: '2021',
            grade: '96%',
        },
    ],
    certifications: [
        {
            id: 'cert1',
            name: 'AWS Certified Developer',
            issuer: 'Amazon Web Services',
            date: 'August 2023',
        },
        {
            id: 'cert2',
            name: 'Google Cloud Fundamentals',
            issuer: 'Google Cloud',
            date: 'May 2023',
        },
    ],
    internships: [
        {
            id: 'int1',
            company: 'Tech Innovations Ltd.',
            role: 'Software Development Intern',
            duration: 'May 2023 - July 2023',
            description:
                'Developed RESTful APIs using Node.js and Express, and implemented front-end features with React.',
        },
        {
            id: 'int2',
            company: 'Data Analytics Inc.',
            role: 'Data Science Intern',
            duration: 'Dec 2022 - Feb 2023',
            description:
                'Created machine learning models for customer segmentation and sales prediction.',
        },
    ],
    skills: [
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'PostgreSQL',
        'AWS',
        'Machine Learning',
        'Data Analysis',
    ],
    projects: [
        {
            id: 'proj1',
            title: 'E-commerce Platform',
            description:
                'Full-featured e-commerce platform with user authentication, product management, and payment integration.',
            techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            links: ['https://github.com/aryan/ecommerce-platform'],
        },
        {
            id: 'proj2',
            title: 'Health Monitoring App',
            description:
                'Mobile application for tracking health metrics with data visualization and personalized recommendations.',
            techStack: ['React Native', 'Firebase', 'TensorFlow.js'],
            links: ['https://github.com/aryan/health-monitor'],
        },
    ],
    resume: {
        fileName: 'Aryan_Sharma_Resume.pdf',
        uploadDate: 'October 15, 2023',
    },
};

const StudentProfile = ({ student = sampleStudentData }: StudentProfileProps) => {
    type ModalName =
        | 'profile'
        | 'education'
        | 'certification'
        | 'internship'
        | 'skills'
        | 'project'
        | 'resume';

    const [modals, setModals] = useState<Record<ModalName, boolean>>({
        profile: false,
        education: false,
        certification: false,
        internship: false,
        skills: false,
        project: false,
        resume: false,
    });
    const [showImageActions, setShowImageActions] = useState(false);

    const toggleModal = useCallback((modalName: ModalName) => {
        setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('');
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
        if (!user.userId) {
            router.push(APP_ROUTE.HOME);
        }
    }, [router])

    return (
        <PrivateLayout>
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
                <div className="max-w-6xl mx-auto gap-6 flex flex-col">
                    {/* Quick Actions */}
                    <div className="flex flex-wrap justify-end gap-3 mb-6">
                        <Link href="/jobs">
                            <Button className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer">
                                <Search className="h-4 w-4" />
                                Search Jobs
                            </Button>
                        </Link>
                        <Link href="/applications">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                            >
                                <FileText className="h-4 w-4" />
                                My Applications
                            </Button>
                        </Link>
                    </div>

                    {/* Hero Section */}
                    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Profile Image with Ring Border */}
                                <div
                                    className="relative self-start group"
                                    onMouseEnter={() => setShowImageActions(true)}
                                    onMouseLeave={() => setShowImageActions(false)}
                                >
                                    {/* ScoreRing as border */}
                                    <div className="relative w-32 h-32">
                                        <ScoreRing
                                            score={student.profileScore}
                                            size={130}
                                            strokeWidth={6}
                                            showText={false}
                                        >
                                            <Avatar
                                                className="w-28 h-28 rounded-full bg-white border border-gray-200"
                                                src="/student-profile.jpg"
                                                alt={student.name}
                                                fallback={initials}
                                            />
                                        </ScoreRing>
                                        <div className="text-center mt-2 text-sm font-medium text-gray-700">
                                            Score: {student.profileScore}%
                                        </div>
                                    </div>

                                    {/* Edit/Delete Buttons */}
                                    {showImageActions && (
                                        <div className="absolute top-1 right-1 flex gap-1 z-20">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-6 w-6 p-[2px] min-w-0"
                                            >
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="h-6 w-6 p-[2px] min-w-0"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}

                                </div>

                                {/* Profile Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                                {student.name}
                                            </h1>
                                            <p className="text-gray-600 mb-3">{student.college}</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleModal('profile')}
                                            className="flex items-center gap-2 self-start cursor-pointer"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit Profile
                                        </Button>
                                    </div>

                                    {/* Profile Details Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                        <ProfileDetailItem
                                            icon={<GraduationCap className="h-4 w-4" />}
                                            label="College"
                                            value={student.college}
                                        />
                                        <ProfileDetailItem
                                            icon={<FileText className="h-4 w-4" />}
                                            label="Registration No"
                                            value={student.registrationNo}
                                        />
                                        <ProfileDetailItem
                                            icon={<User className="h-4 w-4" />}
                                            label="Gender"
                                            value={student.gender}
                                        />
                                        <ProfileDetailItem
                                            icon={<Calendar className="h-4 w-4" />}
                                            label="Date of Birth"
                                            value={student.dateOfBirth}
                                        />
                                        <ProfileDetailItem
                                            icon={<Mail className="h-4 w-4" />}
                                            label="Email"
                                            value={student.email}
                                        />
                                        <ProfileDetailItem
                                            icon={<Phone className="h-4 w-4" />}
                                            label="Phone"
                                            value={student.phone}
                                        />
                                        <ProfileDetailItem
                                            icon={<MapPin className="h-4 w-4" />}
                                            label="Location"
                                            value={student.location}
                                        />
                                    </div>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Profile Summary */}
                    <Card className="shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 rounded-xl bg-white">
                        <CardHeader className="flex flex-col items-start space-y-2 px-6 pt-6 pb-4">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                <h3 className="text-xl font-semibold text-gray-800">Profile Summary</h3>
                            </div>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic bg-blue-50 p-4 rounded-lg w-full border-l-4 border-blue-400">
                                {student.summary}
                            </p>
                        </CardHeader>
                    </Card>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Education Section */}
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Education
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleModal('education')}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Plus className="h-4 w-4 " />
                                    Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {student.education.map((edu) => (
                                    <div
                                        key={edu.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div>
                                            <p className="font-medium">{edu.level}</p>
                                            <p className="text-sm text-gray-600">{edu.institution}</p>
                                            <div className="flex gap-2 mt-1">
                                                <Badge variant="outline" className="text-xs">
                                                    {edu.year}
                                                </Badge>
                                                <Badge variant="secondary" className="text-xs">
                                                    {edu.grade}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 cursor-pointer"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Certification Section */}
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Certifications
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleModal('certification')}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {student.certifications.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div>
                                            <p className="font-medium">{cert.name}</p>
                                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                                            <Badge variant="outline" className="mt-1 text-xs">
                                                {cert.date}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 cursor-pointer"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Internship Section */}
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Internships
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleModal('internship')}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Plus className="h-4 w-4 " />
                                    Add
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {student.internships.map((internship) => (
                                    <div
                                        key={internship.id}
                                        className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="font-medium">{internship.role}</p>
                                                <p className="text-sm text-gray-600">{internship.company}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 cursor-pointer"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="mt-2 text-xs">
                                            {internship.duration}
                                        </Badge>
                                        <p className="mt-2 text-sm text-gray-700">{internship.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Skills Section */}
                        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="h-5 w-5" />
                                    Skills
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleModal('skills')}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {student.skills.map((skill, index) => (
                                        <Badge key={index} variant="skill">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Projects Section */}
                    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <FolderOpen className="h-5 w-5" />
                                Projects
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleModal('project')}
                                className="flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4 cursor-pointer" />
                                Add Project
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {student.projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-semibold">{project.title}</h3>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 cursor-pointer"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {project.techStack.map((tech, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            {project.links.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link}
                                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    View Project
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resume Upload Section */}
                    <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5" />
                                Resume
                            </CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleModal('resume')}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Upload className="h-4 w-4" />
                                {student.resume ? 'Update' : 'Upload'}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {student.resume ? (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FileText className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{student.resume.fileName}</p>
                                            <p className="text-sm text-gray-600">Uploaded on {student.resume.uploadDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="cursor-pointer">
                                            View
                                        </Button>
                                        <Button variant="destructive" size="sm" className="cursor-pointer">
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No resume uploaded yet</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Upload your resume to increase your profile score
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-4 flex items-center gap-2 mx-auto"
                                        onClick={() => toggleModal('resume')}
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload Resume
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Modals */}
                <ProfileEditModal
                    isOpen={modals.profile}
                    onClose={() => toggleModal('profile')}
                    student={student}
                />
                <EducationModal isOpen={modals.education} onClose={() => toggleModal('education')} />
                <CertificationModal
                    isOpen={modals.certification}
                    onClose={() => toggleModal('certification')}
                />
                <InternshipModal isOpen={modals.internship} onClose={() => toggleModal('internship')} />
                <SkillsModal
                    isOpen={modals.skills}
                    onClose={() => toggleModal('skills')}
                    currentSkills={student.skills}
                />
                <ProjectModal isOpen={modals.project} onClose={() => toggleModal('project')} />
                <ResumeUploadModal isOpen={modals.resume} onClose={() => toggleModal('resume')} />
            </div>
        </PrivateLayout>
    );
};

export default StudentProfile;
