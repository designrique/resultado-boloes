import { Template } from './types';
import TemplateModerno from './components/templates/TemplateModerno';
import TemplateClassico from './components/templates/TemplateClassico';
import TemplateFestivo from './components/templates/TemplateFestivo';
import ModernoThumbnail from './components/thumbnails/ModernoThumbnail';
import ClassicoThumbnail from './components/thumbnails/ClassicoThumbnail';
import FestivoThumbnail from './components/thumbnails/FestivoThumbnail';


export const AVAILABLE_TEMPLATES: Template[] = [
  {
    id: 't-oficial',
    name: 'Oficial',
    thumbnail: ModernoThumbnail,
    component: TemplateModerno,
  },
  {
    id: 't-classico',
    name: 'Clássico',
    thumbnail: ClassicoThumbnail,
    component: TemplateClassico,
  },
  {
    id: 't-festivo',
    name: 'Festivo',
    thumbnail: FestivoThumbnail,
    component: TemplateFestivo,
  },
];