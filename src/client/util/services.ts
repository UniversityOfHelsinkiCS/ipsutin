import { Service } from '../types'

export const services: Service[] = [
  {
    id: 'disclosure',
    label: 'disclosure',
    title: {
      fi: 'Invention disclosure',
      en: 'Invention disclosure',
      sv: 'Invention disclosure',
    },
    colors: {
      background: '#5D576B',
    },
  },
  {
    id: 'clinic',
    label: 'clinic',
    title: {
      fi: 'Idea clinic',
      en: 'Idea clinic',
      sv: 'Idea clinic',
    },
    colors: {
      background: '#8261a1',
    },
  },
  {
    id: 'relations',
    label: 'relations',
    title: {
      fi: 'Industry relations',
      en: 'Industry relations',
      sv: 'Industry relations',
    },
    colors: {
      background: '#23439b',
    },
  },
  {
    id: 'incubator',
    label: 'incubator',
    title: {
      fi: 'Incubator',
      en: 'Incubator',
      sv: 'Incubator',
    },
    colors: {
      background: '#199995',
    },
  },
  {
    id: 'legal',
    label: 'legal',
    title: {
      fi: 'Legal',
      en: 'Legal',
      sv: 'Legal',
    },
    colors: {
      background: '#afd255',
    },
  },
]

export const recommendations = [
  ...services,
  {
    id: 'restrictive',
    label: 'restrictive',
    title: {
      fi: 'Restrictive',
      en: 'Restrictive',
      sv: 'Restrictive',
    },
    colors: {
      background: '#eb4034',
    },
  },
  {
    id: 'permissive',
    label: 'permissive',
    title: {
      fi: 'Permissive',
      en: 'Permissive',
      sv: 'Permissive',
    },
    colors: {
      background: '#f18235',
    },
  },
]
