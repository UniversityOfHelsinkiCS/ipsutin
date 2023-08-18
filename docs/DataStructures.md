# Survey

The `Survey` model represents a high level abstraction of a single survey withing the application. This allows the application to have multiple different surveys that each contains different set of `questions`, `recommendations` and `results`.

## Properties

- `id` (number): The unique identifier for the survey.
- `name` (number): The name used to identify the survey and fetch it's data from the backend services. Use &#128042;&#128188; (camelCase) as you probably should anyways.

# Question

The `Question` model represents a question within a survey. It stores various attributes related to the question, including its content, options, and visibility settings.

## Properties

- `id` (number): The unique identifier for the question.
- `surveyId` (number): The ID of the survey to which this question belongs.
- `parentId` (number): The ID of the parent question, if applicable. This is used for hierarchical questions. NOTE: parentId must be 'null' if you want the question to locate on the root, else provide the question.id of the parent.
- `priority` (number): The priority or order of the question within the survey 0 being the most prioritized question and then the priority number should just increase by 1 when going down the hierarchy. NOTE: IF a question IS a child question then the priority numbers start from 0 again inside the parents child hierarchy.
- `title` (Locales): The localized titles of the question in different languages.
- `text` (Locales): The localized text content of the question in different languages.
- `optionData` (OptionData): The data structure that holds information about the question's options type and the option data related.
- `visibility` (Visibility | undefined): Optional visibility settings for the question. Visibility options are only able to refer to a different questions option id. It is not to be used to refer the questions own option id's.

## Usage

### Defining single choice question

```json
{
  "surveyId": 1,
  "parentId": null,
  "priority": 0,
  "title": {
    "fi": "Kysymys",
    "sv": "Fråga",
    "en": "Question"
  },
  "text": {
    "fi": "Miten voitte tänään?",
    "sv": "Hur mår du idag?",
    "en": "How are you today?"
  },
  "optionData": {
    "type": "singleChoice",
    "options": [
      {
        "id": "option1",
        "label": {
          "fi": "Hyvin",
          "sv": "Bra",
          "en": "Good"
        }
      },
      {
        "id": "option2",
        "label": {
          "fi": "Huonosti",
          "sv": "Dåligt",
          "en": "Bad"
        }
      }
    ]
  },
  "visibility": {
    "options": []
  }
}
```

### Defining multiple choice question

```json
{
  "surveyId": 1,
  "parentId": null,
  "priority": 0,
  "title": {
    "fi": "Valitse suosikit",
    "sv": "Välj favoriter",
    "en": "Select Favorites"
  },
  "text": {
    "fi": "Mitkä ovat suosikkisi?",
    "sv": "Vilka är dina favoriter?",
    "en": "What are your favorites?"
  },
  "optionData": {
    "type": "multipleChoice",
    "options": [
      {
        "id": "option1",
        "label": { "fi": "Elokuvat", "sv": "Filmer", "en": "Movies" }
      },
      {
        "id": "option2",
        "label": { "fi": "Kirjat", "sv": "Böcker", "en": "Books" }
      },
      { "id": "option3", "label": { "fi": "Ruoka", "sv": "Mat", "en": "Food" } }
    ]
  },
  "visibility": {
    "options": []
  }
}
```

### Defining child questions

```json
[
  {
    "id": 1,
    "surveyId": 1,
    "parentId": null,
    "priority": 1,
    "title": {
      "fi": "Kysymys vanhempi",
      "sv": "Fråga förälder",
      "en": "Parent Question"
    },
    "text": {
      "fi": "Tämä on vanhempi kysymys.",
      "sv": "Det här är en fråga för förälder.",
      "en": "This is a parent question."
    },
    "optionData": { "type": "info", "options": [] },
    "visibility": {
      "options": []
    }
  },
  {
    "id": 2,
    "surveyId": 1,
    "parentId": 1, // define the parent question's id number here
    "priority": 0, // NOTE that the priority should start from 0 inside the child tree
    "title": {
      "fi": "Lapsi kysymys",
      "sv": "Fråga barn",
      "en": "Child Question"
    },
    "text": {
      "fi": "Tämä on lapsi kysymys.",
      "sv": "Det här är en fråga för barn.",
      "en": "This is a child question."
    },
    "optionData": {
      "type": "singleChoice",
      "options": [
        {
          "id": "option1",
          "label": { "fi": "Vastaus", "sv": "Svar", "en": "Answer" }
        }
      ]
    },
    "visibility": {
      "options": []
    }
  }
]
```

### Example of a larger set of questions

```json
[
  {
    "id": 1,
    "surveyId": 1,
    "parentId": null,
    "priority": 0,
    "title": {
      "fi": "Yleinen kysymys",
      "sv": "Generell fråga",
      "en": "General Question"
    },
    "text": {
      "fi": "Tämä on yleinen kysymys.",
      "sv": "Det här är en generell fråga.",
      "en": "This is a general question."
    },
    "optionData": { "type": "info", "options": [] },
    "visibility": {
      "options": []
    }
  },
  {
    "id": 2,
    "surveyId": 1,
    "parentId": null,
    "priority": 1,
    "title": {
      "fi": "Kysymys valinnasta",
      "sv": "Fråga om val",
      "en": "Choice Question"
    },
    "text": {
      "fi": "Valitse suosikkisi.",
      "sv": "Välj din favorit.",
      "en": "Choose your favorite."
    },
    "optionData": {
      "type": "singleChoice",
      "options": [
        {
          "id": "option1",
          "label": {
            "fi": "Vaihtoehto 1",
            "sv": "Alternativ 1",
            "en": "Option 1"
          }
        },
        {
          "id": "option2",
          "label": {
            "fi": "Vaihtoehto 2",
            "sv": "Alternativ 2",
            "en": "Option 2"
          }
        }
      ]
    },
    "visibility": {
      "options": []
    }
  },
  {
    "id": 3,
    "surveyId": 1,
    "parentId": null,
    "priority": 2,
    "title": {
      "fi": "Monivalintakysymys",
      "sv": "Fråga med flera val",
      "en": "Multiple Choice Question"
    },
    "text": {
      "fi": "Valitse useita vaihtoehtoja.",
      "sv": "Välj flera alternativ.",
      "en": "Choose multiple options."
    },
    "optionData": {
      "type": "multipleChoice",
      "options": [
        {
          "id": "option3",
          "label": {
            "fi": "Vaihtoehto 3",
            "sv": "Alternativ 3",
            "en": "Option 3"
          }
        },
        {
          "id": "option4",
          "label": {
            "fi": "Vaihtoehto 4",
            "sv": "Alternativ 4",
            "en": "Option 4"
          }
        }
      ]
    },
    "visibility": {
      "options": []
    }
  },
  {
    "id": 4,
    "surveyId": 1,
    "parentId": 3,
    "priority": 0,
    "title": {
      "fi": "Lapsi kysymys",
      "sv": "Barnfråga",
      "en": "Child Question"
    },
    "text": {
      "fi": "Tämä on lapsi kysymys.",
      "sv": "Det här är en barnfråga.",
      "en": "This is a child question."
    },
    "optionData": {
      "type": "singleChoice",
      "options": [
        {
          "id": "childOption1",
          "label": {
            "fi": "Vaihtoehto A",
            "sv": "Alternativ A",
            "en": "Option A"
          }
        },
        {
          "id": "childOption2",
          "label": {
            "fi": "Vaihtoehto B",
            "sv": "Alternativ B",
            "en": "Option B"
          }
        }
      ]
    },
    "visibility": { "options": ["option3"] } // NOTE that the question is now only visible if the option where `id` is 'option3' is selected. This option is located inside the question where the `question.id` is '3'.
  }
]
```

# Result

The `Result` model is used to map FormValues (the selections of a given survey) into a data structure of corresponding results.

## Properties

- `id` (number): The unique identifier for the result.
- `surveyId` (number): The ID of the survey associated with this result.
- `optionLabel` (string): The label representing the selected option.
- `isSelected` (Locales): The localized label indicating whether the option is selected. This will always be rendered if question.option.id is optionLabel. This is pretty much a Title for the results usually indicating or reminder that the option was selected.
- `data` (object): The data structure containing result information. data.resultData contains all the more niche results for linked to a certain recommendation label. For full reference of the possible recommendationLabels check project specification, recommendationLabel type from the types.ts file or discuss with the client. You may also provide other data fields such as type or other survey specific stuff without the need for model migrations.

## Usage

### Defining result data

```json
{
  "id": 1,
  "surveyId": 1,
  "optionLabel": "option1", // This is supposed to link the result to a questions option.id that the result should be linked to check reference option1 from the Question examples.
  "isSelected": {
    // This is supposed to indicate the 'Title' or the 'main' text of the result in the result page, this is visible on all times if the option was selected.
    "fi": "Olet valinnut Lapsi kysymykseen vastaukseksi: 'Valittu'.",
    "sv": "Du har valt 'Vald' som svaret för Barnfrågan.",
    "en": "You have selected 'Selected' as the answer for the Child Question."
  },
  "data": {
    "resultData": {
      "allDimensions": {
        // This will render a sub result below the isSelected with a black left border.
        "fi": "Tähän kohtaan voidaan kirjoittaa aina näkyvää tekstiä.",
        "sv": "I detta avsnitt kan du skriva text som alltid är synlig.",
        "en": "At this point, you can write text that is always visible."
      },
      "disclosure": {
        // These are only rendered if the corresponding 'recommendation' is active. For full reference of the possible values check the projects recommendationLabel type.
        "fi": "Tämä tulisi näkyviin, vain jos suosituksissa olisi mukana 'disclosure', muuten tätä ei näytetä.",
        "sv": "Detta kommer att visas endast om 'disclosure' ingår i rekommendationerna; annars kommer detta inte att visas.",
        "en": "This will be displayed only if 'disclosure' is included in the recommendations; otherwise, this will not be shown."
      },
      "clinic": {
        "fi": "Tämä tulisi näkyviin, vain jos suosituksissa olisi mukana 'clinic', muuten tätä ei näytetä myöskään.",
        "sv": "etta kommer att visas endast om 'clinic' ingår i rekommendationerna; annars kommer detta inte att visas.",
        "en": "This will be displayed only if 'clinic' is included in the recommendations; otherwise, this will not be shown."
      },
      "relations": {
        "fi": "Sama idea jatkuu myös lopuissa suosituksissa.",
        "sv": "Samma koncept gäller även för de återstående rekommendationerna.",
        "en": "The same concept applies to the remaining recommendations as well."
      }
      // ... Other recommendation labels available to this survey.
    }
  }
}
```

### Example of additional result data fields

```json
  [
    {
      "id": 34,
      "surveyId": 1,
      "optionLabel": "someOptionInAQuestion",
      "isSelected": {
        "fi": "Does the software provide a solution to a problem? ***Maybe***",
        "sv": "Does the software provide a solution to a problem? ***Maybe***",
        "en": "Does the software provide a solution to a problem? ***Maybe***",
      },
      "data": {
        "type": "software", // Here we have provided a type field for determining a survey specific result type
        "someOtherFieldRelated": true, // Here we could also add some other fields we see fit to provide the best results to the end user.
        "resultData": {
          "allDimensions": {
            "fi": "",
            "sv": "",
            "en": "",
          },
          {
            /* see the projects recommendationLabels type or project specification for recommendationLabels} */
          }
        },
      }
    },
    {
      "id": 35,
      "surveyId": 1,
      "optionLabel": "anotherOptionInAQuestion",
      "isSelected": {
        "fi": "Does the hardware update reduce the risk of a failure? ***Yes***",
        "sv": "Does the hardware update reduce the risk of a failure? ***Yes***",
        "en": "Does the hardware update reduce the risk of a failure? ***Yes***",
      },
      "data": {
        "type": "hardware", // remember to type these new fields!
        "someOtherFieldRelated": false,
        "resultData": {
          "allDimensions": {
            "fi": "",
            "sv": "",
            "en": "",
          },
          {
            /* see the projects recommendationLabels type or project specification for recommendationLabels} */
          }
        },
      }
    },
  ]
```

# Recommendation

The `Recommendation` model represents recommendations associated with survey options. It includes information about the impact of various options on the recommendation. Recommendations are given points based on the question option selections and the most recommended recommendation usually leads to a certain action.

## Properties

- `id` (number): The unique identifier for the recommendation.
- `surveyId` (number): The ID of the survey to which this recommendation belongs.
- `label` (string): The label identifying the recommendation (e.g., 'disclosure', 'clinic').
- `title` (Locales): The localized title of the recommendation.
- `text` (Locales): The localized description or text of the recommendation.
- `data` (RecommendationData): A data object containing key-value pairs representing the impact of options on the recommendation. The data property within the Recommendation model contains key-value pairs that represent the impact of different options on the recommendation. The numerical values assigned to options indicate the level of impact on the recommendation.

### Data Property explanation

Give the following points for a certain option in the data field:

- 0: The option does not affect this recommendation at all.
- +3: The option has a significant positive impact on the recommendation.
- +1: The option has a moderate positive impact on the recommendation.
- -3: The option has a negative impact on the recommendation.
- -9: The option has a strong negative impact and excludes the recommendation completely.

## Usage

### Defining recommendations

```json
[
  {
    "id": 1,
    "surveyId": 1,
    "label": "disclosure", // this is the recommendation we want to score here. Check available recommendations from the types or specification
    "title": {
      "fi": "Keksintöilmoitus",
      "sv": "Uppfinningsanmälan",
      "en": "Invention Disclosure"
    },
    "text": {
      "fi": "Suositus tehdä keksintöilmoitus.",
      "sv": "Rekommendation att lämna in en uppfinningsanmälan.",
      "en": "Recommendation to file an Invention Disclosure."
    },
    "data": {
      "option1": 3,
      "option2": 0,
      "option3": -3,
      "option4": 0,
      "childOption1": 1,
      "childOption2": 0
    }
  },
  {
    "id": 2,
    "surveyId": 1,
    "label": "clinic",
    "title": {
      "fi": "Ideaklinikka",
      "sv": "Ideaklinik",
      "en": "Idea Clinic"
    },
    "text": {
      // No need to provide the text values, really depending of the application.
      "fi": "",
      "sv": "",
      "en": ""
    },
    "data": {
      "option1": 0,
      "option2": 1,
      "option3": 3,
      "option4": 0,
      "childOption1": 0,
      "childOption2": 0
    }
  },
  {
    "id": 3,
    "surveyId": 1,
    "label": "relations",
    "title": {
      "fi": "Yritysyhteistyö",
      "sv": "Uppfinningsanmälan",
      "en": "Business relations"
    },
    "text": {
      "fi": "",
      "sv": "",
      "en": ""
    },
    "data": {
      "option1": 0,
      "option2": -3,
      "option3": 0,
      "option4": 3,
      "childOption1": 0,
      "childOption2": 1
    }
  }
]
```

# Entry

The `Entry` model represents the data submitted for a survey. It captures the values provided by users in response to survey questions.

## Properties

- `id` (number): The unique identifier for the entry.
- `surveyId` (number): The ID of the survey to which this entry belongs.
- `userId` (string): The ID of the user who submitted the entry (optional).
- `data` (object): The data submitted for the survey. This is typically an object containing responses to various survey questions.
- `sessionToken` (string | null): A session token associated with the entry, if applicable.
