import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education?: {
    id: string;
    level: string;
    institution: string;
    year: string;
    grade: string;
  };
}

export const EducationModal: React.FC<EducationModalProps> = ({ isOpen, onClose, education }) => {
  const [formData, setFormData] = useState({
    level: education?.level || '',
    institution: education?.institution || '',
    year: education?.year || '',
    grade: education?.grade || '',
  });

  const educationLevels = [
    'X (10th Grade)',
    'XII (12th Grade)',
    'Diploma',
    "Bachelor's Degree",
    "Master's Degree",
    'Doctorate (PhD)',
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Education data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-90 zoom-in-90">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{education ? 'Edit Education' : 'Add Education'}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-teal-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            <div className="w-12 h-1 bg-teal-300 rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Education Level Dropdown */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-left"
              >
                <span className={formData.level ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.level || 'Select education level'}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                  {educationLevels.map((level) => (
                    <div
                      key={level}
                      onClick={() => {
                        handleInputChange('level', level);
                        setDropdownOpen(false);
                      }}
                      className={`px-4 py-2.5 hover:bg-teal-50 cursor-pointer transition-colors ${
                        formData.level === level ? 'bg-teal-50 text-teal-700 font-medium' : ''
                      }`}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
              Institution/School Name
            </label>
            <input
              id="institution"
              value={formData.institution}
              onChange={(e) => handleInputChange('institution', e.target.value)}
              placeholder="Enter institution name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year of Completion
            </label>
            <input
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="e.g., 2023 or 2020-2024"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade/Percentage
            </label>
            <input
              id="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              placeholder="e.g., 85% or 8.5 CGPA"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              required
            />
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
              className="px-5 py-2.5 text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
            >
              {education ? 'Update' : 'Add'} Education
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
