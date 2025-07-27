import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship?: {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
  };
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  isOpen,
  onClose,
  internship,
}) => {
  const [formData, setFormData] = useState({
    company: internship?.company || '',
    role: internship?.role || '',
    duration: internship?.duration || '',
    description: internship?.description || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Internship data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-90 zoom-in-90">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {internship ? 'Edit Internship' : 'Add Internship'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-indigo-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            <div className="w-12 h-1 bg-indigo-300 rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role/Position
            </label>
            <input
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="e.g., Software Development Intern"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="e.g., Jun 2023 - Aug 2023 or 3 months"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of your work, responsibilities, and achievements..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              Describe your key contributions and what you learned
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
            >
              {internship ? 'Update' : 'Add'} Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
