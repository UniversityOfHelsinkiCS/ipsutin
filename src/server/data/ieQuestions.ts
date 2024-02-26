import { Question } from '../types'

const getIeQuestions = (): Question[] => [
  {
    id: 301,
    surveyId: 3,
    parentId: null,
    priority: 0,
    title: {
      fi: 'Is your idea based on a research or a research project (at UH)?',
      sv: 'Is your idea based on a research or a research project (at UH)?',
      en: 'Is your idea based on a research or a research project (at UH)?',
    },
    text: {
      fi: 'Results based on research are eligible and prioritized for patentability and commercialization services. Please schedule an Idea Clinic when uncertain',
      sv: 'Results based on research are eligible and prioritized for patentability and commercialization services. Please schedule an Idea Clinic when uncertain',
      en: 'Results based on research are eligible and prioritized for patentability and commercialization services. Please schedule an Idea Clinic when uncertain',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'basedOnResearchProject',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notBasedOnResearchProject',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 302,
    surveyId: 3,
    parentId: null,
    priority: 1,
    title: {
      fi: 'Are you aware of this idea or related ideas published somewhere?',
      sv: 'Are you aware of this idea or related ideas published somewhere?',
      en: 'Are you aware of this idea or related ideas published somewhere?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'ideaPublished',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'ideaNotPublished',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 303,
    surveyId: 3,
    parentId: null,
    priority: 2,
    title: {
      fi: 'Is your idea potentially patentable, for best of your knowledge?',
      sv: 'Is your idea potentially patentable, for best of your knowledge?',
      en: 'Is your idea potentially patentable, for best of your knowledge?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'potentiallyPatentable',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notPotentiallyPatentable',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 304,
    surveyId: 3,
    parentId: null,
    priority: 3,
    title: {
      fi: 'Are you aware of related patents?',
      sv: 'Are you aware of related patents?',
      en: 'Are you aware of related patents?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'awareOfPatents',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notAwareOfPatents',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 305,
    surveyId: 3,
    parentId: null,
    priority: 4,
    title: {
      fi: 'Is there a need to further mature the idea before patentability is more clear?',
      sv: 'Is there a need to further mature the idea before patentability is more clear?',
      en: 'Is there a need to further mature the idea before patentability is more clear?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'needToMatureIdea',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'noNeedToMatureIdea',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 306,
    surveyId: 3,
    parentId: null,
    priority: 5,
    title: {
      fi: 'Are you aware of businesses with an interest to use the idea?',
      sv: 'Are you aware of businesses with an interest to use the idea?',
      en: 'Are you aware of businesses with an interest to use the idea?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'businessInterest',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'noBusinessInterest',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 307,
    surveyId: 3,
    parentId: null,
    priority: 6,
    title: {
      fi: 'Are you seeking to commercialize the idea (license, partnering or own company)?',
      sv: 'Are you seeking to commercialize the idea (license, partnering or own company)?',
      en: 'Are you seeking to commercialize the idea (license, partnering or own company)?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'commercializing',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notCommercializing',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 308,
    surveyId: 3,
    parentId: null,
    priority: 7,
    title: {
      fi: 'Are you in hurry to publish your results?',
      sv: 'Are you in hurry to publish your results?',
      en: 'Are you in hurry to publish your results?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'publishingSoon',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notPublishingSoon',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 309,
    surveyId: 3,
    parentId: null,
    priority: 8,
    title: {
      fi: 'Are you planning to make your idea or code available as public domain knowledge?',
      sv: 'Are you planning to make your idea or code available as public domain knowledge?',
      en: 'Are you planning to make your idea or code available as public domain knowledge?',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isPublicDomain',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notPublicDomain',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
  {
    id: 310,
    surveyId: 3,
    parentId: null,
    priority: 9,
    title: {
      fi: 'Are you interested in learning more about creating impact through idea commercialization?​',
      sv: 'Are you interested in learning more about creating impact through idea commercialization?​',
      en: 'Are you interested in learning more about creating impact through idea commercialization?​',
    },
    text: {
      fi: '',
      sv: '',
      en: '',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'interestInCommercialization',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'noInterestInCommercialization',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {},
  },
]

export default getIeQuestions
