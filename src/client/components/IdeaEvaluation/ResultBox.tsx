/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import { InputProps } from '../../types'
import styles from '../../styles'
import useSurvey from '../../hooks/useSurvey'
import useRecommendations from '../../hooks/useRecommendations'

const ResultBox = ({ watch }: InputProps) => {
  const [resultSequence, setResultSequence] = useState([])
  const { cardStyles, resultStyles } = styles
  const { survey } = useSurvey('ideaEvaluation')
  const { recommendations, isSuccess } = useRecommendations(survey?.id)

  const hisSeq = ['']
  const clinicSeq = ['']
  const corporateSeq = ['']
  const incubatorSeq = ['']
  const sequences = [hisSeq, clinicSeq, corporateSeq, incubatorSeq]

  const answers = watch()

  useEffect(() => {
    if (recommendations) {
      const names = recommendations.map(
        (recommendation) => recommendation.title.en
      )
      const resSeq = []
      for (const seq of sequences) {
        for (const a of Object.values(answers)) {
          if (a && a === seq[Object.values(answers).indexOf(a)]) {
            resSeq.push(names[sequences.indexOf(seq)])
          }
        }
      }
      const counts: { [key: string]: number } = {}
      for (const s of resSeq) {
        counts[s] = counts[s] ? counts[s] + 1 : 1
      }
      const results = names.reduce((o, key) => [...o, [key, counts[key]]], [])
      const sortedResults = results
        .filter((res: any[]) => res[1] !== undefined)
        .sort((a: number[], b: number[]) => b[1] - a[1])
      const sortedResSeq = []
      for (const res of sortedResults) {
        sortedResSeq.push(
          recommendations.find((rec) => rec.title.en === res[0])
        )
      }

      setResultSequence(sortedResSeq)
    }
  }, [JSON.stringify(answers)])

  if (!isSuccess) return null

  return (
    <Box sx={resultStyles.resultBox}>
      <Box sx={cardStyles.card}>
        <h2>Results</h2>
        <Box>
          {resultSequence.map((result) => (
            <p key={result.id}>{result.title.en}</p>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ResultBox
