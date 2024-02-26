import { Question } from '../types'

const getLicenceQuestions = (): Question[] => [
  {
    id: 201,
    surveyId: 2,
    parentId: null,
    priority: 0,
    title: {
      fi: 'Are you planning to release only software?',
      sv: 'Are you planning to release only software?',
      en: 'Are you planning to release only software?',
    },
    text: {
      fi: 'For the purposes of this questionnaire, the focus is software only. Many questions are relevant for data, algorithms, machine learning models, or HW schematics, but focus is on software licenses.',
      sv: 'For the purposes of this questionnaire, the focus is software only. Many questions are relevant for data, algorithms, machine learning models, or HW schematics, but focus is on software licenses.',
      en: 'For the purposes of this questionnaire, the focus is software only. Many questions are relevant for data, algorithms, machine learning models, or HW schematics, but focus is on software licenses.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'releaseOnlySoftware',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'dontReleaseOnlySoftware',
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
    id: 202,
    surveyId: 2,
    parentId: null,
    priority: 1,
    title: {
      fi: 'Are there any other developers for the software?',
      sv: 'Are there any other developers for the software?',
      en: 'Are there any other developers for the software?',
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
          id: 'hasOtherDevelopers',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'hasNoOtherDevelopers',
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
    id: 203,
    surveyId: 2,
    parentId: null,
    priority: 2,
    title: {
      fi: 'Does the software include code from your work at a previous institute or company?',
      sv: 'Does the software include code from your work at a previous institute or company?',
      en: 'Does the software include code from your work at a previous institute or company?',
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
          id: 'hasCodeFromPrevious',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'hasNoCodeFromPrevious',
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
    id: 204,
    surveyId: 2,
    parentId: null,
    priority: 3,
    title: {
      fi: 'Do the terms of any relevant contracts state how any generated software is to be released?',
      sv: 'Do the terms of any relevant contracts state how any generated software is to be released?',
      en: 'Do the terms of any relevant contracts state how any generated software is to be released?',
    },
    text: {
      fi: 'Relevant contracts may include terms and conditions of your funding decisions, such as Academy of Finland, Business Finland (BF), or EU funding. Contracts with academic partners or industry partners may have clauses on management of the research/project results.',
      sv: 'Relevant contracts may include terms and conditions of your funding decisions, such as Academy of Finland, Business Finland (BF), or EU funding. Contracts with academic partners or industry partners may have clauses on management of the research/project results.',
      en: 'Relevant contracts may include terms and conditions of your funding decisions, such as Academy of Finland, Business Finland (BF), or EU funding. Contracts with academic partners or industry partners may have clauses on management of the research/project results.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'fundingDictatesRelease',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'fundingDoesNotDictateRelease',
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
    id: 205,
    surveyId: 2,
    parentId: null,
    priority: 4,
    title: {
      fi: 'Do the funding terms explicitly specify which license shall be used when releasing the software?',
      sv: 'Do the funding terms explicitly specify which license shall be used when releasing the software?',
      en: 'Do the funding terms explicitly specify which license shall be used when releasing the software?',
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
          id: 'fundingTermsSpecifyLicense',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'fundingTermsDoNotSpecifyLicense',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {
      options: ['fundingDictatesRelease'],
    },
  },
  {
    id: 206,
    surveyId: 2,
    parentId: null,
    priority: 5,
    title: {
      fi: 'Does the software require the use of other libraries or software to work (dependencies)?',
      sv: 'Does the software require the use of other libraries or software to work (dependencies)?',
      en: 'Does the software require the use of other libraries or software to work (dependencies)?',
    },
    text: {
      fi: 'Direct use of some software libraries may have an impact on license selection, most notably GPL licensed software. Such dependencies must be considered carefully.',
      sv: 'Direct use of some software libraries may have an impact on license selection, most notably GPL licensed software. Such dependencies must be considered carefully.',
      en: 'Direct use of some software libraries may have an impact on license selection, most notably GPL licensed software. Such dependencies must be considered carefully.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'hasDependencies',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'hasNoDependencies',
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
    id: 207,
    surveyId: 2,
    parentId: null,
    priority: 6,
    title: {
      fi: 'Do you have a patent associated with the software that is being published or commercialized?',
      sv: 'Do you have a patent associated with the software that is being published or commercialized?',
      en: 'Do you have a patent associated with the software that is being published or commercialized?',
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
          id: 'hasPatent',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'hasNoPatent',
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
    id: 211,
    surveyId: 2,
    parentId: null,
    priority: 7,
    title: {
      fi: 'Do you wish to develop the software further?',
      sv: 'Do you wish to develop the software further?',
      en: 'Do you wish to develop the software further?',
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
          id: 'wantDevelopFurther',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'doesNotWantDevelopFurther',
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
    id: 212,
    surveyId: 2,
    parentId: null,
    priority: 8,
    title: {
      fi: 'Do you wish to exploit the software yourself by founding a company?',
      sv: 'Do you wish to exploit the software yourself by founding a company?',
      en: 'Do you wish to exploit the software yourself by founding a company?',
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
          id: 'wantToExploitFurther',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'doesNotWantToExploitFurther',
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
    id: 208,
    surveyId: 2,
    parentId: null,
    priority: 9,
    title: {
      fi: 'Do you want to release the software under an open source licence?',
      sv: 'Do you want to release the software under an open source licence?',
      en: 'Do you want to release the software under an open source licence?',
    },
    text: {
      fi: 'Open source licences are typically restrictive or permissive. Sometimes parts of a large software solution are licenced with restrictive licences, while other parts may be licenced with a permissive licence to enable proprietary variants. At the other times some parts may be kept proprietary for commercial purposes.',
      sv: 'Open source licences are typically restrictive or permissive. Sometimes parts of a large software solution are licenced with restrictive licences, while other parts may be licenced with a permissive licence to enable proprietary variants. At the other times some parts may be kept proprietary for commercial purposes.',
      en: 'Open source licences are typically restrictive or permissive. Sometimes parts of a large software solution are licenced with restrictive licences, while other parts may be licenced with a permissive licence to enable proprietary variants. At the other times some parts may be kept proprietary for commercial purposes.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isOpenSource',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'isNotOpenSource',
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
    id: 209,
    surveyId: 2,
    parentId: 208,
    priority: 0,
    title: {
      fi: 'Do you want to ensure that all derivative products are also released under an open source licence?',
      sv: 'Do you want to ensure that all derivative products are also released under an open source licence?',
      en: 'Do you want to ensure that all derivative products are also released under an open source licence?',
    },
    text: {
      fi: 'Selecting a restrictive license helps to maintain the community effort of the software development. Thus, commercial applications will often shift to service operations, such as well-known wordpress.org',
      sv: 'Selecting a restrictive license helps to maintain the community effort of the software development. Thus, commercial applications will often shift to service operations, such as well-known wordpress.org',
      en: 'Selecting a restrictive license helps to maintain the community effort of the software development. Thus, commercial applications will often shift to service operations, such as well-known wordpress.org',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'ensureDerivates',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'doesNotEnsureDerivates',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {
      options: ['isOpenSource'],
    },
  },
  {
    id: 210,
    surveyId: 2,
    parentId: 209,
    priority: 0,
    title: {
      fi: 'Do you want a simple, commonly used licence that has a disclaimer?',
      sv: 'Do you want a simple, commonly used licence that has a disclaimer?',
      en: 'Do you want a simple, commonly used licence that has a disclaimer?',
    },
    text: {
      fi: 'Selecting a permissive license will enable businesses to freely modify and use the software without a need for consultancy of the software authors.',
      sv: 'Selecting a permissive license will enable businesses to freely modify and use the software without a need for consultancy of the software authors.',
      en: 'Selecting a permissive license will enable businesses to freely modify and use the software without a need for consultancy of the software authors.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isDisclaimerLicence',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'isNotDisclaimerLicence',
          label: {
            fi: 'No',
            sv: 'No',
            en: 'No',
          },
        },
      ],
    },
    visibility: {
      options: ['doesNotEnsureDerivates'],
    },
  },
]

export default getLicenceQuestions
