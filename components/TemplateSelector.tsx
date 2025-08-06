
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
        <div key={template.id} className="text-center">
            <div
                role="button"
                tabIndex={0}
                aria-label={`Selecionar template ${template.name}`}
                onClick={() => onSelect(template)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect(template);
                    }
                }}
                className={`w-full aspect-square rounded-lg cursor-pointer transition-all duration-200 overflow-hidden border-4 focus:outline-none focus:ring-4 focus:ring-blue-300
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