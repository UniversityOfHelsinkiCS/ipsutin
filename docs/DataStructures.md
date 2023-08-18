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

### Defining a single question

#### Single choice question

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

#### Multiple choice question

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

#### Defining child questions

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
      "fi": "Kysymys lapsi",
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

#### Example of a larger set of questions

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
