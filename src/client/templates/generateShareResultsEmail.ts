import { User } from '@backend/types'

const generateShareResultsEmail = (
  surveyName: string,
  user: User | undefined
) => {
  const name = {
    ipassessment: 'IP Assessment',
    licences: 'Licences',
    ideaevaluation: 'Idea Evaluation',
  }
  return ` \
<div> \
  <h3> \
    <strong> \
        ${name[surveyName as keyof typeof name]}
    </strong> \
  </h3> \
  <p>
    Hey
  </p> \
  <p>
    ${user?.firstName} ${user?.lastName} Would like to share their results with you.
  </p> \
  <p>
    ********** 
    Summary of user's ${user?.firstName} ${user?.lastName} ${
      name[surveyName as keyof typeof name]
    } survey selections below
  </p> \
</div> \
`
}

export default generateShareResultsEmail
