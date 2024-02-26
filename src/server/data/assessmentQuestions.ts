import { Question } from '../types'

const getAssessmentQuestions = (): Question[] => [
  {
    id: 101,
    surveyId: 1,
    parentId: null,
    priority: 0,
    title: {
      fi: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena?',
      sv: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena?',
      en: 'Have you developed a technical device / method / composition, which is more than a discovery natural phenomena?',
    },
    text: {
      fi: 'Not all inventions or creations are eligible for patent protection. Common exclusions from patentability include abstract ideas, laws of nature, naturally occurring substances, mathematical formulas (as such), and purely mental processes. Art 52',
      sv: 'Not all inventions or creations are eligible for patent protection. Common exclusions from patentability include abstract ideas, laws of nature, naturally occurring substances, mathematical formulas (as such), and purely mental processes. Art 52',
      en: 'Not all inventions or creations are eligible for patent protection. Common exclusions from patentability include abstract ideas, laws of nature, naturally occurring substances, mathematical formulas (as such), and purely mental processes. Art 52',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isTechnicalSolution',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeTechnicalSolution',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notTechnicalSolution',
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
    id: 102,
    surveyId: 1,
    parentId: null,
    priority: 2,
    title: {
      fi: 'Is the invention novel?',
      sv: 'Is the invention novel?',
      en: 'Is the invention novel?',
    },
    text: {
      fi: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable. Art 54 EPC',
      sv: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable. Art 54 EPC',
      en: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable. Art 54 EPC',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isNovel',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeNovel',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notNovel',
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
    id: 103,
    surveyId: 1,
    parentId: null,
    priority: 3,
    title: {
      fi: 'Does the invention involve an inventive step?',
      sv: 'Does the invention involve an inventive step?',
      en: 'Does the invention involve an inventive step?',
    },
    text: {
      fi: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable. Art 56 EPC',
      sv: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable. Art 56 EPC',
      en: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable. Art 56 EPC',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'isInventive',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeInventive',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notInventive',
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
    id: 104,
    surveyId: 1,
    parentId: null,
    priority: 4,
    title: {
      fi: 'Is the invention industrially applicable?',
      sv: 'Is the invention industrially applicable?',
      en: 'Is the invention industrially applicable?',
    },
    text: {
      fi: 'Industrial applicability refers to the requirement that the invention must have a practical use or be capable of being made or used in any kind of industry. In other words, the invention should be more than just a theoretical concept or idea and should have some practical utility. Art 57 EPC',
      sv: 'Industrial applicability refers to the requirement that the invention must have a practical use or be capable of being made or used in any kind of industry. In other words, the invention should be more than just a theoretical concept or idea and should have some practical utility. Art 57 EPC',
      en: 'Industrial applicability refers to the requirement that the invention must have a practical use or be capable of being made or used in any kind of industry. In other words, the invention should be more than just a theoretical concept or idea and should have some practical utility. Art 57 EPC',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'industriallyApplicable',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeIndustriallyApplicable',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notIndustriallyApplicable',
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
    id: 105,
    surveyId: 1,
    parentId: null,
    priority: 5,
    title: {
      fi: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling?',
      sv: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling?',
      en: 'Does your invention include elements of artificial intelligence / machine learning / numerical simulation /design processes / modelling?',
    },
    text: {
      fi: 'AI/ML inventions such as computational models and algorithms for classification, clustering, regression and dimensionality reduction, such as neural networks, genetic algorithms, support vector machines, k-means, kernel regression and discriminant analysis.\n\n[https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html)',
      sv: 'AI/ML inventions such as computational models and algorithms for classification, clustering, regression and dimensionality reduction, such as neural networks, genetic algorithms, support vector machines, k-means, kernel regression and discriminant analysis.\n\n[https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html)',
      en: 'AI/ML inventions such as computational models and algorithms for classification, clustering, regression and dimensionality reduction, such as neural networks, genetic algorithms, support vector machines, k-means, kernel regression and discriminant analysis.\n\n[https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_3_1.html)',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'machineLearningIncluded',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeMachineLearning',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'noMachineLearningIncluded',
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
    id: 106,
    surveyId: 1,
    parentId: null,
    priority: 6,
    title: {
      fi: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept?',
      sv: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept?',
      en: 'Does the mathemathical method have technical character i.e is it more than abstract object / concept?',
    },
    text: {
      fi: 'The mathematical method should have a technical character, meaning it should be capable of being implemented or applied in a technical system. The method should not be purely abstract or mathematical in nature.\n\n If a claim related to mathematical method is directed either to a method involving the use of technical means (e.g. a computer) or to a device, its subject-matter has a technical character as a whole and is thus not excluded from patentability under [Art. 52(2)](https://new.epo.org/en/legal/epc/2020/a52.html) and [(3)](https://new.epo.org/en/legal/epc/2020/a52.html).',
      sv: 'The mathematical method should have a technical character, meaning it should be capable of being implemented or applied in a technical system. The method should not be purely abstract or mathematical in nature.\n\n If a claim related to mathematical method is directed either to a method involving the use of technical means (e.g. a computer) or to a device, its subject-matter has a technical character as a whole and is thus not excluded from patentability under [Art. 52(2)](https://new.epo.org/en/legal/epc/2020/a52.html) and [(3)](https://new.epo.org/en/legal/epc/2020/a52.html).',
      en: 'The mathematical method should have a technical character, meaning it should be capable of being implemented or applied in a technical system. The method should not be purely abstract or mathematical in nature.\n\n If a claim related to mathematical method is directed either to a method involving the use of technical means (e.g. a computer) or to a device, its subject-matter has a technical character as a whole and is thus not excluded from patentability under [Art. 52(2)](https://new.epo.org/en/legal/epc/2020/a52.html) and [(3)](https://new.epo.org/en/legal/epc/2020/a52.html).',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'hasTechnicalCharacter',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeTechnicalCharacter',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'noTechnicalCharacter',
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
    id: 107,
    surveyId: 1,
    parentId: null,
    priority: 7,
    title: {
      fi: 'Does the mathemathical method produce a technical effect?',
      sv: 'Does the mathemathical method produce a technical effect?',
      en: 'Does the mathemathical method produce a technical effect?',
    },
    text: {
      fi: '**Examples of technical effect/contributions of a mathematical method are:**\n\n - Controlling a specific technical system or process, e.g. an X-ray apparatus or a steel cooling process; \n\n - Determining from measurements a required number of passes of a compaction machine to achieve a desired material density; \n\n - Digital audio, image or video enhancement or analysis, e.g. de-noising, detecting persons in a digital image, estimating the quality of a transmitted digital audio signal; \n\n - Separation of sources in speech signals; speech recognition, e.g. mapping a speech input to a text output;\n\n - Encoding data for reliable and/or efficient transmission or storage (and corresponding decoding), e.g. error-correction coding of data for transmission over a noisy channel, compression of audio, image, video or sensor data; \n\n - Encrypting/decrypting or signing electronic communications; generating keys in an RSA cryptographic system; \n\n - Optimising load distribution in a computer network; \n\n - Determining the energy expenditure of a subject by processing data obtained from physiological sensors; deriving the body temperature of a subject from data obtained from an ear temperature detector; \n\n - Providing a genotype estimate based on an analysis of DNA samples, as well as providing a confidence interval for this estimate so as to quantify its reliability;\n\n - Providing a medical diagnosis by an automated system processing physiological',
      sv: '**Examples of technical effect/contributions of a mathematical method are:**\n\n - Controlling a specific technical system or process, e.g. an X-ray apparatus or a steel cooling process; \n\n - Determining from measurements a required number of passes of a compaction machine to achieve a desired material density; \n\n - Digital audio, image or video enhancement or analysis, e.g. de-noising, detecting persons in a digital image, estimating the quality of a transmitted digital audio signal; \n\n - Separation of sources in speech signals; speech recognition, e.g. mapping a speech input to a text output;\n\n - Encoding data for reliable and/or efficient transmission or storage (and corresponding decoding), e.g. error-correction coding of data for transmission over a noisy channel, compression of audio, image, video or sensor data; \n\n - Encrypting/decrypting or signing electronic communications; generating keys in an RSA cryptographic system; \n\n - Optimising load distribution in a computer network; \n\n - Determining the energy expenditure of a subject by processing data obtained from physiological sensors; deriving the body temperature of a subject from data obtained from an ear temperature detector; \n\n - Providing a genotype estimate based on an analysis of DNA samples, as well as providing a confidence interval for this estimate so as to quantify its reliability;\n\n - Providing a medical diagnosis by an automated system processing physiological',
      en: '**Examples of technical effect/contributions of a mathematical method are:**\n\n - Controlling a specific technical system or process, e.g. an X-ray apparatus or a steel cooling process; \n\n - Determining from measurements a required number of passes of a compaction machine to achieve a desired material density; \n\n - Digital audio, image or video enhancement or analysis, e.g. de-noising, detecting persons in a digital image, estimating the quality of a transmitted digital audio signal; \n\n - Separation of sources in speech signals; speech recognition, e.g. mapping a speech input to a text output;\n\n - Encoding data for reliable and/or efficient transmission or storage (and corresponding decoding), e.g. error-correction coding of data for transmission over a noisy channel, compression of audio, image, video or sensor data; \n\n - Encrypting/decrypting or signing electronic communications; generating keys in an RSA cryptographic system; \n\n - Optimising load distribution in a computer network; \n\n - Determining the energy expenditure of a subject by processing data obtained from physiological sensors; deriving the body temperature of a subject from data obtained from an ear temperature detector; \n\n - Providing a genotype estimate based on an analysis of DNA samples, as well as providing a confidence interval for this estimate so as to quantify its reliability;\n\n - Providing a medical diagnosis by an automated system processing physiological',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'technicalEffect',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeTechnicalEffect',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'noTechnicalEffect',
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
    id: 108,
    surveyId: 1,
    parentId: null,
    priority: 8,
    title: {
      fi: 'Is the mathemathical method novel?',
      sv: 'Is the mathemathical method novel?',
      en: 'Is the mathemathical method novel?',
    },
    text: {
      fi: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable.',
      sv: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable.',
      en: 'Novelty refers to the requirement that an invention must be new and not disclosed or made available to the public before the filing date of the patent application. If the invention is already known or publicly accessible, it lacks novelty and may not be patentable.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'mathematicalMethodNovel',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'mathematicalMethodMaybeNovel',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'mathematicalMethodNotNovel',
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
    id: 109,
    surveyId: 1,
    parentId: null,
    priority: 9,
    title: {
      fi: 'Does it provide a solution to a technical problem in a non-obvious / inventive way?',
      sv: 'Does it provide a solution to a technical problem in a non-obvious / inventive way?',
      en: 'Does it provide a solution to a technical problem in a non-obvious / inventive way?',
    },
    text: {
      fi: 'The mathematical method should involve a non-obvious / **inventive** technical solution to a technical problem. It should go beyond what would be considered obvious to a person skilled in the field at the time of filing the patent application.\n\n For the assessment of inventive step, all features which contribute to the technical character of the invention must be taken into account ([G-VII, 5.4](https://new.epo.org/en/legal/guidelines-epc/2023/g_vii_5_4.html)). Art 56 EPC',
      sv: 'The mathematical method should involve a non-obvious / **inventive** technical solution to a technical problem. It should go beyond what would be considered obvious to a person skilled in the field at the time of filing the patent application.\n\n For the assessment of inventive step, all features which contribute to the technical character of the invention must be taken into account ([G-VII, 5.4](https://new.epo.org/en/legal/guidelines-epc/2023/g_vii_5_4.html)). Art 56 EPC',
      en: 'The mathematical method should involve a non-obvious / **inventive** technical solution to a technical problem. It should go beyond what would be considered obvious to a person skilled in the field at the time of filing the patent application.\n\n For the assessment of inventive step, all features which contribute to the technical character of the invention must be taken into account ([G-VII, 5.4](https://new.epo.org/en/legal/guidelines-epc/2023/g_vii_5_4.html)). Art 56 EPC',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'provideSolution',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeProvideSolution',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notProvideSolution',
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
    id: 110,
    surveyId: 1,
    parentId: null,
    priority: 10,
    title: {
      fi: 'Have developed a computer program?',
      sv: 'Have developed a computer program?',
      en: 'Have developed a computer program?',
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
          id: 'isComputerProgram',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'notComputerProgram',
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
    id: 111,
    surveyId: 1,
    parentId: null,
    priority: 11,
    title: {
      fi: 'Does the computer program have a technical character by producing a ”further technical effect”?',
      sv: 'Does the computer program have a technical character by producing a ”further technical effect”?',
      en: 'Does the computer program have a technical character by producing a ”further technical effect”?',
    },
    text: {
      fi: 'In order to have a technical character, and thus not be excluded from patentability, a computer program must produce a "further technical effect" when run on a computer. A "further technical effect" is a technical effect going beyond the "normal" physical interactions between the program (software) and the computer (hardware) on which it is run. The normal physical effects of the execution of a program, e.g. the circulation of electrical currents in the computer, are not in themselves sufficient to confer technical character to a computer program ([T 1173/97](https://www.epo.org/law-practice/case-law-appeals/recent/t971173ex1.html) and [G 3/08](https://www.epo.org/law-practice/case-law-appeals/advanced-search.html?rf_dg3CSNCase=G%200003%2F08&dateRangeSelect=%20&dg3MetaData=on&resultsPerPage=100)).\n\n See more information and examples:\n\n [https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html)',
      sv: 'In order to have a technical character, and thus not be excluded from patentability, a computer program must produce a "further technical effect" when run on a computer. A "further technical effect" is a technical effect going beyond the "normal" physical interactions between the program (software) and the computer (hardware) on which it is run. The normal physical effects of the execution of a program, e.g. the circulation of electrical currents in the computer, are not in themselves sufficient to confer technical character to a computer program ([T 1173/97](https://www.epo.org/law-practice/case-law-appeals/recent/t971173ex1.html) and [G 3/08](https://www.epo.org/law-practice/case-law-appeals/advanced-search.html?rf_dg3CSNCase=G%200003%2F08&dateRangeSelect=%20&dg3MetaData=on&resultsPerPage=100)).\n\n See more information and examples:\n\n [https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html)',
      en: 'In order to have a technical character, and thus not be excluded from patentability, a computer program must produce a "further technical effect" when run on a computer. A "further technical effect" is a technical effect going beyond the "normal" physical interactions between the program (software) and the computer (hardware) on which it is run. The normal physical effects of the execution of a program, e.g. the circulation of electrical currents in the computer, are not in themselves sufficient to confer technical character to a computer program ([T 1173/97](https://www.epo.org/law-practice/case-law-appeals/recent/t971173ex1.html) and [G 3/08](https://www.epo.org/law-practice/case-law-appeals/advanced-search.html?rf_dg3CSNCase=G%200003%2F08&dateRangeSelect=%20&dg3MetaData=on&resultsPerPage=100)).\n\n See more information and examples:\n\n [https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html](https://new.epo.org/en/legal/guidelines-epc/2023/g_ii_3_6.html)',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'furtherTechnicalEffect',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeFurtherTechnicalEffect',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'noFurtherTechnicalEffect',
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
    id: 112,
    surveyId: 1,
    parentId: null,
    priority: 12,
    title: {
      fi: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way?',
      sv: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way?',
      en: 'Does the computer program provide a solution to a problem in a non-obvious / inventive way?',
    },
    text: {
      fi: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable.',
      sv: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable.',
      en: 'Inventive step, also known as non-obviousness, refers to the requirement that the invention must not be obvious to a person skilled in the relevant field. It should involve an inventive or creative leap beyond what is already known. If the invention would be considered obvious to someone with ordinary skill in the field, it may not be patentable.',
    },
    optionData: {
      type: 'singleChoice',
      options: [
        {
          id: 'inventiveWay',
          label: {
            fi: 'Yes',
            sv: 'Yes',
            en: 'Yes',
          },
        },
        {
          id: 'maybeInventiveWay',
          label: {
            fi: 'Maybe',
            sv: 'Maybe',
            en: 'Maybe',
          },
        },
        {
          id: 'notInventiveWay',
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

export default getAssessmentQuestions
