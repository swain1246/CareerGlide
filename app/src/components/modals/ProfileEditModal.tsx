import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    name: string;
    college: string;
    registrationNo: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState(student);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Updated profile:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-amber-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            <div className="w-12 h-1 bg-amber-300 rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                College
              </label>
              <input
                id="college"
                value={formData.college}
                onChange={(e) => handleInputChange('college', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="registrationNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registration Number
              </label>
              <input
                id="registrationNo"
                value={formData.registrationNo}
                onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-left"
                >
                  <span className={formData.gender ? 'text-gray-900' : 'text-gray-500'}>
                    {formData.gender || 'Select gender'}
                  </span>
                  <svg
                    className={`h-5 w-5 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    {genders.map((gender) => (
                      <div
                        key={gender}
                        onClick={() => {
                          handleInputChange('gender', gender);
                          setDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 hover:bg-amber-50 cursor-pointer transition-colors ${
                          formData.gender === gender ? 'bg-amber-50 text-amber-700 font-medium' : ''
                        }`}
                      >
                        {gender}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-700"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Current Location
              </label>
              <input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Summary
              <span className="ml-1 text-xs text-gray-500">(max 300 characters)</span>
            </label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Write a brief summary about yourself..."
              rows={3}
              maxLength={300}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            ></textarea>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                Describe your background, skills, and interests
              </p>
              <p
                className={`text-xs ${
                  formData.summary.length >= 290 ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {formData.summary.length}/300
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
