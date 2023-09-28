import { Recommendation } from '@backend/types'
import { Box } from '@mui/material'

import RecommendationChip from './RecommendationChip'

const RenderRecommendationChips = ({
  recommendations,
}: {
  recommendations: Recommendation[]
}) => (
  <Box sx={{ mt: 2 }}>
    {recommendations.map((recommendation) => (
      <RecommendationChip
        key={recommendation.id}
        recommendation={recommendation}
        compact={false}
      />
    ))}
  </Box>
)

export default RenderRecommendationChips
