import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: string[];
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose, currentSkills }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentSkills);
  const [customSkill, setCustomSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const predefinedSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Git',
    'Docker',
    'AWS',
    'Azure',
    'Machine Learning',
    'Data Analysis',
    'UI/UX Design',
    'HTML/CSS',
    'TypeScript',
    'Vue.js',
    'Angular',
    'Spring Boot',
    'Django',
    'Flask',
    'Kubernetes',
    'Jenkins',
    'GraphQL',
    'Redis',
    'Elasticsearch',
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Selected skills:', selectedSkills);
    onClose();
  };

  const filteredSkills = predefinedSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Skills</h2>
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
          {/* Selected Skills */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Skills
              <span className="ml-1 text-xs text-gray-500">({selectedSkills.length})</span>
            </label>
            <div className="flex flex-wrap gap-2 p-4 bg-teal-50 border border-teal-100 rounded-lg min-h-[60px]">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-white rounded-full text-sm font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-teal-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {selectedSkills.length === 0 && (
                <p className="text-gray-500 text-sm">No skills selected yet</p>
              )}
            </div>
          </div>

          {/* Add Custom Skill */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Skill</label>
            <div className="flex gap-2">
              <input
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Enter a skill not listed below"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && addCustomSkill(e)}
              />
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Predefined Skills */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Predefined Skills</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search skills..."
                  className="w-40 px-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-teal-500 text-white border-teal-500 shadow-md transform scale-[0.98]'
                      : 'bg-white hover:bg-teal-50 border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
              {filteredSkills.length === 0 && (
                <p className="col-span-3 text-center py-4 text-gray-500">
                  No skills match your search
                </p>
              )}
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
              className="px-5 py-2.5 text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 rounded-lg font-medium shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Save Skills
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
