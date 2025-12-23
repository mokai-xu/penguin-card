import { Template } from '../types/card';

export const templates: Template[] = [
  {
    id: 'green-border',
    name: 'Green Border',
    color: '#386641',
    style: 'double',
  },
  {
    id: 'red-border',
    name: 'Red Border',
    color: '#bc4749',
    style: 'double',
  },
  {
    id: 'teal-border',
    name: 'Teal Border',
    color: '#73ba9b',
    style: 'double',
    hasDots: true,
  },
  {
    id: 'thick-border',
    name: 'Super Thick Border',
    color: '#386641',
    style: 'thick',
  },
  {
    id: 'polka-dots-border',
    name: 'Polka Dots Border',
    color: '#bc4749',
    style: 'polka-dots',
  },
  {
    id: 'stripes-triangles-border',
    name: 'Stripes & Triangles',
    color: '#73ba9b',
    style: 'stripes-triangles',
  },
];
