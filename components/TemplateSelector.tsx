
import React from 'react';
import { Template } from '../types';

interface TemplateSelectorProps {
  templates: Template[];
  selected: Template;
  onSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, selected, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map(template => (
        <div key={template.id} className="text-center" onClick={() => onSelect(template)}>
            <div
                className={`w-full aspect-square rounded-lg cursor-pointer transition-all duration-200 overflow-hidden border-4
                    ${selected.id === template.id ? 'border-brand-primary scale-105' : 'border-transparent hover:border-slate-300'}`}
            >
                <template.thumbnail />
            </div>
            <p className={`mt-2 font-semibold text-sm transition-colors ${selected.id === template.id ? 'text-brand-primary' : 'text-slate-600'}`}>
                {template.name}
            </p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
