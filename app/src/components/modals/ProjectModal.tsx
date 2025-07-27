import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    links: string[];
  };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    techStack: project?.techStack || [],
    links: project?.links || [],
  });
  const [newTech, setNewTech] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  const addLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.trim() && !formData.links.includes(newLink.trim())) {
      setFormData((prev) => ({
        ...prev,
        links: [...prev.links, newLink.trim()],
      }));
      setNewLink('');
    }
  };

  const removeLink = (link: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l !== link),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Project data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{project ? 'Edit Project' : 'Add Project'}</h2>
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
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., E-commerce Website"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
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
              placeholder="Describe your project, its features, and your role..."
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              required
            ></textarea>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology (e.g., React)"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && addTech(e)}
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 hover:text-amber-900 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Links</label>
            <div className="flex gap-2 mb-2">
              <input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Add project URL (GitHub, Demo, etc.)"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && addLink(e)}
              />
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {formData.links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{link}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(link)}
                    className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              ))}
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
              {project ? 'Update' : 'Add'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
