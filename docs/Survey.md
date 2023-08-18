# Survey documentation

The application consists of three different surveys that are rendered individually.
Each survey is rendered using the RenderSurvey component that then proceeds to call other components vital to the rendering of the survey.

## `RenderSurvey` Component

The `RenderSurvey` component is a React component designed to render a survey form with a set of questions.

### Props

The `RenderSurvey` component accepts the following props:

- `questions` (array of objects): An array of question objects that make up the survey.

- `control` (object): The `control` object provided by the `react-hook-form` library. This object is used for form control and validation.

- `watch` (function): A function provided by the `react-hook-form` library to watch the values of form inputs.

- `surveyName` (string): The name or title of the survey that is displayed on the top of the survey page.

- `surveyInfo` optional (string): Additional information or the welcome message. This is usually information about the survey etc.

### Component Structure

The `RenderSurvey` customizes the survey's appearance and behavior.
Within the component function:

- Renders the surveys Title and optional Info texts
- Maps through the surveys questions and calls RenderQuestions component to handle rendering behaviour
- Buttons for submitting the form and resetting it are rendered at the end of the survey.

### Related Components

- `RenderQuestions`: This component is used to render individual survey questions based on the provided props.

### Example Usage

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import RenderSurvey from './RenderSurvey';

const App = () => {
  const { survey, isLoading } = useSurvey(wanted_survey_name)

  // Here you could add things like fetching the formValues from context or what ever

  const { handleSubmit, control, watch } = useForm({
    mode: 'onBlur',
    shouldUnregister: true,
  })

  const onSubmit = (data: FormValues) => {
    // what ever you want to do with the submitted data
    ...
  }

  if (!survey || isLoading || !faculty) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RenderSurvey
        control={control}
        watch={watch}
        questions={survey.Questions}
        surveyName={wanted_survey_name}
      />
    </form>
  )

export default App
```

## `RenderQuestions` Component

The `RenderQuestions` component is a React component responsible for rendering individual survey questions within the survey form. This component dynamically renders different types of question choices and handles the display of child questions based on the parent-child relationship between questions.

### Props

The `RenderQuestions` component accepts the following props:

- `control` (object): The `control` object provided by the `react-hook-form` library, used for managing form control and validation.

- `watch` (function): A function provided by the `react-hook-form` library to watch the values of form inputs.

- `question` (Question object): An individual question object to be rendered. It contains all relevant details about the question, including its title, text, options, and visibility.

- `questions` (array of Question objects): An array of all question objects within the survey. This is used to manage parent-child relationships and visibility conditions.

- `language` (string): The current language used for localization.

### Component Structure

The `RenderQuestions` component starts by checking the visibility conditions specified in the `question` object. If visibility conditions are met, it dynamically selects the appropriate component for rendering the question's choices (e.g., `SingleChoice`, `MultiChoice`, or `info`). It then renders the question text and the selected choice component.

If the current question has child questions, it recursively maps through these child questions and renders them using the same `RenderQuestions` component, effectively handling nested questions.

### Related Components

- `SingleChoice`, `MultiChoice`: Components responsible for rendering single-choice and multiple-choice question options.
- `ShowMore`: A component used to display collapsible additional text.

### Example Usage

```jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stack, Typography } from '@mui/material'

import { InputProps } from '../../types'
import ResetForm from '../Common/ResetForm'

import RenderQuestions from './RenderQuestions'

const RenderSurvey = ({
  questions,
  control,
  watch,
  surveyName,
  surveyInfo,
}: InputProps) => {
  const { i18n } = useTranslation()

  const { language } = i18n

  return (
    <Box>
      <Typography variant='h4' sx={{ m: 4 }}>
        {surveyName}
      </Typography>
      <Typography variant='h6' sx={{ m: 4 }}>
        {surveyInfo}
      </Typography>
      <Box>
        {questions.map((question) => (
          <div key={question.id}>
            {question.parentId === null && (
              <RenderQuestions
                control={control}
                watch={watch}
                question={question}
                questions={questions}
                language={language}
              />
            )}
          </div>
        ))}
    </Box>
  )
}

export default RenderSurvey
```

## `SingleChoice` Component

The `SingleChoice` component is a React component used to render a single-choice question with radio button options. This component is designed to be integrated into a larger form to provide users with the ability to select one option from the available choices.

### Props

The `SingleChoice` component accepts the following props:

- `control` (object): The `control` object provided by the `react-hook-form` library, which is used to manage form control and validation.

- `question` (Question object): The question object containing information about the question, including its options.

- `children` (ReactNode): Optional child elements that can be included within the `SingleChoice` component.

- `language` (string): The current language used for localization.

### Component Structure

The `SingleChoice` component utilizes the `Controller` component from `react-hook-form` to manage the state of the radio button options. It maps over the options provided in the `question` object and renders radio button choices using Material-UI's `Radio` and `FormControlLabel` components. The `RadioGroup` component is used to group the radio buttons together.

### Example Usage

```tsx
import React from 'react'

import { InputProps } from '../../types'
import SingleChoice from '../Choices/SingleChoice'

const RenderQuestions = ({
  control,
  watch,
  question,
  questions,
  language,
}: InputProps) => {
  if (question.visibility?.options) {
    const [...options] = question.visibility.options

    if (question.parentId !== null) {
      const parent = watch(question.parentId.toString())

      if (!options.includes(parent)) return null
    }
  }

  const childQuestions = questions.filter(
    (childQuestion) => question.id === childQuestion.parentId
  )

  return (
    <SingleChoice
      key={question.id}
      control={control}
      watch={watch}
      question={question}
      language={language}
    >
      {childQuestions &&
        childQuestions.map((children) => (
          <RenderQuestions
            key={children.id}
            control={control}
            watch={watch}
            question={children}
            questions={questions}
            language={language}
          />
        ))}
    </SingleChoice>
  )
}

export default RenderQuestions
```

## `MultiChoice` Component

The `MultiChoice` component is a React component used to render a multiple-choice question with checkbox options. This component is intended to be integrated into a larger form to allow users to select multiple options from the available choices.

### Props

The `MultiChoice` component accepts the following props:

- `control` (object): The `control` object provided by the `react-hook-form` library, which is used to manage form control and validation.

- `question` (Question object): The question object containing information about the question, including its options.

- `children` (ReactNode): Optional child elements that can be included within the `MultiChoice` component.

- `language` (string): The current language used for localization.

### Component Structure

The `MultiChoice` component maps over the options provided in the `question` object and renders checkbox choices using Material-UI's `Checkbox` and `FormControlLabel` components. It utilizes the `Controller` component from `react-hook-form` to manage the state of the checkbox options within the form.

Additionally, the component supports rendering additional data using the `ShowMore` component, providing users with extra information about each choice when available.

### Example Usage

```tsx
import React from 'react'

import { InputProps } from '../../types'
import MultiChoice from '../Choices/MultiChoice'

const RenderQuestions = ({
  control,
  watch,
  question,
  questions,
  language,
}: InputProps) => {
  if (question.visibility?.options) {
    const [...options] = question.visibility.options

    if (question.parentId !== null) {
      const parent = watch(question.parentId.toString())

      if (!options.includes(parent)) return null
    }
  }

  const childQuestions = questions.filter(
    (childQuestion) => question.id === childQuestion.parentId
  )

  return (
    <MultiChoice
      key={question.id}
      control={control}
      watch={watch}
      question={question}
      language={language}
    >
      {childQuestions &&
        childQuestions.map((children) => (
          <RenderQuestions
            key={children.id}
            control={control}
            watch={watch}
            question={children}
            questions={questions}
            language={language}
          />
        ))}
    </MultiChoice>
  )
}

export default RenderQuestions
```
