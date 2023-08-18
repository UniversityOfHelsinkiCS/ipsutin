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
