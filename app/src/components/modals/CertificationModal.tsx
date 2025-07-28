import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certification?: {
    id: string;
    name: string;
    issuer: string;
    date: string;
  };
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  certification,
}) => {
  const [formData, setFormData] = useState({
    name: certification?.name || '',
    issuer: certification?.issuer || '',
    date: certification?.date || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Certification data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-90 zoom-in-90">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {certification ? 'Edit Certification' : 'Add Certification'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-blue-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2">
            <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name
            </label>
            <div className="relative">
              <input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., AWS Certified Developer"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization
            </label>
            <input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => handleInputChange('issuer', e.target.value)}
              placeholder="e.g., Amazon Web Services"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Date
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700"
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
              className="px-5 py-2.5 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
            >
              {certification ? 'Update' : 'Add'} Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
