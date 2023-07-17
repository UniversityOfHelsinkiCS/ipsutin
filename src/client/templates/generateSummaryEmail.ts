const generateSummaryEmail = (surveyName: string) => {
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
    Thank you for using ${name[surveyName as keyof typeof name]} survey!
  </p> \
  <p>
    ********** 
    Summary of your ${
      name[surveyName as keyof typeof name]
    } survey selections below
  </p> \
</div> \
`
}

export default generateSummaryEmail
