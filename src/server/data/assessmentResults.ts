import { IPAssessmentResult } from '../types'

const getAssessmentResults = (): IPAssessmentResult[] => [
  {
    id: 1,
    surveyId: 1,
    optionLabel: 'isTechnicalSolution',
    isSelected: {
      fi: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Yes***',
      sv: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Yes***',
      en: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Yes***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 2,
    surveyId: 1,
    optionLabel: 'maybeTechnicalSolution',
    isSelected: {
      fi: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Maybe***',
      sv: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Maybe***',
      en: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***Maybe***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 3,
    surveyId: 1,
    optionLabel: 'notTechnicalSolution',
    isSelected: {
      fi: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***No***',
      sv: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***No***',
      en: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena? ***No***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 4,
    surveyId: 1,
    optionLabel: 'isNovel',
    isSelected: {
      fi: 'Is the invention novel? ***Yes***',
      sv: 'Is the invention novel? ***Yes***',
      en: 'Is the invention novel? ***Yes***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 5,
    surveyId: 1,
    optionLabel: 'maybeNovel',
    isSelected: {
      fi: 'Is the invention novel? ***Maybe***',
      sv: 'Is the invention novel? ***Maybe***',
      en: 'Is the invention novel? ***Maybe***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 6,
    surveyId: 1,
    optionLabel: 'notNovel',
    isSelected: {
      fi: 'Is the invention novel? ***No***',
      sv: 'Is the invention novel? ***No***',
      en: 'Is the invention novel? ***No***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 7,
    surveyId: 1,
    optionLabel: 'isInventive',
    isSelected: {
      fi: 'Does the invention involve an inventive step? ***Yes***',
      sv: 'Does the invention involve an inventive step? ***Yes***',
      en: 'Does the invention involve an inventive step? ***Yes***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 8,
    surveyId: 1,
    optionLabel: 'maybeInventive',
    isSelected: {
      fi: 'Does the invention involve an inventive step? ***Maybe***',
      sv: 'Does the invention involve an inventive step? ***Maybe***',
      en: 'Does the invention involve an inventive step? ***Maybe***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 9,
    surveyId: 1,
    optionLabel: 'notInventive',
    isSelected: {
      fi: 'Does the invention involve an inventive step? ***No***',
      sv: 'Does the invention involve an inventive step? ***No***',
      en: 'Does the invention involve an inventive step? ***No***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 10,
    surveyId: 1,
    optionLabel: 'industriallyApplicable',
    isSelected: {
      fi: 'Is the invention industrially applicable? ***Yes***',
      sv: 'Is the invention industrially applicable? ***Yes***',
      en: 'Is the invention industrially applicable? ***Yes***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 11,
    surveyId: 1,
    optionLabel: 'maybeIndustriallyApplicable',
    isSelected: {
      fi: 'Is the invention industrially applicable? ***Maybe***',
      sv: 'Is the invention industrially applicable? ***Maybe***',
      en: 'Is the invention industrially applicable? ***Maybe***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 12,
    surveyId: 1,
    optionLabel: 'notIndustriallyApplicable',
    isSelected: {
      fi: 'Is the invention industrially applicable? ***No***',
      sv: 'Is the invention industrially applicable? ***No***',
      en: 'Is the invention industrially applicable? ***No***',
    },
    data: {
      type: 'technical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 13,
    surveyId: 1,
    optionLabel: 'machineLearningIncluded',
    isSelected: {
      fi: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Yes***',
      sv: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Yes***',
      en: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Yes***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 14,
    surveyId: 1,
    optionLabel: 'maybeMachineLearning',
    isSelected: {
      fi: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Maybe***',
      sv: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Maybe***',
      en: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***Maybe***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 15,
    surveyId: 1,
    optionLabel: 'noMachineLearningIncluded',
    isSelected: {
      fi: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***No***',
      sv: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***No***',
      en: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling? ***No***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 16,
    surveyId: 1,
    optionLabel: 'hasTechnicalCharacter',
    isSelected: {
      fi: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Yes***',
      sv: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Yes***',
      en: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Yes***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 17,
    surveyId: 1,
    optionLabel: 'maybeTechnicalCharacter',
    isSelected: {
      fi: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Maybe***',
      sv: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Maybe***',
      en: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***Maybe***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 18,
    surveyId: 1,
    optionLabel: 'noTechnicalCharacter',
    isSelected: {
      fi: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***No***',
      sv: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***No***',
      en: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept? ***No***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 19,
    surveyId: 1,
    optionLabel: 'technicalEffect',
    isSelected: {
      fi: 'Does the mathemathical method produce a technical effect? ***Yes***',
      sv: 'Does the mathemathical method produce a technical effect? ***Yes***',
      en: 'Does the mathemathical method produce a technical effect? ***Yes***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 20,
    surveyId: 1,
    optionLabel: 'maybeTechnicalEffect',
    isSelected: {
      fi: 'Does the mathemathical method produce a technical effect? ***Maybe***',
      sv: 'Does the mathemathical method produce a technical effect? ***Maybe***',
      en: 'Does the mathemathical method produce a technical effect? ***Maybe***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 21,
    surveyId: 1,
    optionLabel: 'noTechnicalEffect',
    isSelected: {
      fi: 'Does the mathemathical method produce a technical effect? ***No***',
      sv: 'Does the mathemathical method produce a technical effect? ***No***',
      en: 'Does the mathemathical method produce a technical effect? ***No***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 22,
    surveyId: 1,
    optionLabel: 'mathematicalMethodNovel',
    isSelected: {
      fi: 'Is the mathemathical method novel? ***Yes***',
      sv: 'Is the mathemathical method novel? ***Yes***',
      en: 'Is the mathemathical method novel? ***Yes***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 23,
    surveyId: 1,
    optionLabel: 'mathematicalMethodMaybeNovel',
    isSelected: {
      fi: 'Is the mathemathical method novel? ***Maybe***',
      sv: 'Is the mathemathical method novel? ***Maybe***',
      en: 'Is the mathemathical method novel? ***Maybe***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 24,
    surveyId: 1,
    optionLabel: 'mathematicalMethodNotNovel',
    isSelected: {
      fi: 'Is the mathemathical method novel? ***No***',
      sv: 'Is the mathemathical method novel? ***No***',
      en: 'Is the mathemathical method novel? ***No***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 25,
    surveyId: 1,
    optionLabel: 'provideSolution',
    isSelected: {
      fi: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Yes***',
      sv: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Yes***',
      en: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Yes***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 26,
    surveyId: 1,
    optionLabel: 'maybeProvideSolution',
    isSelected: {
      fi: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Maybe***',
      sv: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Maybe***',
      en: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***Maybe***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 27,
    surveyId: 1,
    optionLabel: 'notProvideSolution',
    isSelected: {
      fi: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***No***',
      sv: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***No***',
      en: 'Does it provide a solution to a technical problem in a non-obvious / inventive way? ***No***',
    },
    data: {
      type: 'mathematical',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 28,
    surveyId: 1,
    optionLabel: 'isComputerProgram',
    isSelected: {
      fi: 'Have developed a computer program? ***Yes***',
      sv: 'Have developed a computer program? ***Yes***',
      en: 'Have developed a computer program? ***Yes***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 29,
    surveyId: 1,
    optionLabel: 'notComputerProgram',
    isSelected: {
      fi: 'Have developed a computer program? ***No***',
      sv: 'Have developed a computer program? ***No***',
      en: 'Have developed a computer program? ***No***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 30,
    surveyId: 1,
    optionLabel: 'furtherTechnicalEffect',
    isSelected: {
      fi: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Yes***',
      sv: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Yes***',
      en: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Yes***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 31,
    surveyId: 1,
    optionLabel: 'maybeFurtherTechnicalEffect',
    isSelected: {
      fi: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Maybe***',
      sv: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Maybe***',
      en: 'Does the computer program have a technical character by producing a ”further technical effect”? ***Maybe***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 32,
    surveyId: 1,
    optionLabel: 'noFurtherTechnicalEffect',
    isSelected: {
      fi: 'Does the computer program have a technical character by producing a ”further technical effect”? ***No***',
      sv: 'Does the computer program have a technical character by producing a ”further technical effect”? ***No***',
      en: 'Does the computer program have a technical character by producing a ”further technical effect”? ***No***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 33,
    surveyId: 1,
    optionLabel: 'inventiveWay',
    isSelected: {
      fi: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Yes***',
      sv: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Yes***',
      en: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Yes***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 34,
    surveyId: 1,
    optionLabel: 'maybeInventiveWay',
    isSelected: {
      fi: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Maybe***',
      sv: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Maybe***',
      en: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***Maybe***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: true,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 35,
    surveyId: 1,
    optionLabel: 'notInventiveWay',
    isSelected: {
      fi: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***No***',
      sv: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***No***',
      en: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way? ***No***',
    },
    data: {
      type: 'computerProgram',
      potentiallyPatentable: false,
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: '',
          sv: '',
          en: '',
        },
        clinic: {
          fi: '',
          sv: '',
          en: '',
        },
      },
    },
  },
  {
    id: 36,
    surveyId: 1,
    optionLabel: 'common',
    isSelected: {
      fi: '',
      sv: '',
      en: '',
    },
    data: {
      resultData: {
        allDimensions: {
          fi: '',
          sv: '',
          en: '',
        },
        disclosure: {
          fi: 'Overall recommendation is to file an invention disclosure to HIS.',
          sv: 'Overall recommendation is to file an invention disclosure to HIS.',
          en: 'Overall recommendation is to file an invention disclosure to HIS.',
        },
        clinic: {
          fi: 'Overall recommendation is to schedule an idea clinic appointment with HIS.',
          sv: 'Overall recommendation is to schedule an idea clinic appointment with HIS.',
          en: 'Overall recommendation is to schedule an idea clinic appointment with HIS.',
        },
      },
    },
  },
]

export default getAssessmentResults
