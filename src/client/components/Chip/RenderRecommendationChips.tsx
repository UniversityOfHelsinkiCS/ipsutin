import { Recommendation } from '@backend/types'
import { List, ListItem } from '@mui/material'

import RecommendationChip from './RecommendationChip'

const RenderRecommendationChips = ({
  recommendations,
}: {
  recommendations: Recommendation[]
}) => (
  <List
    aria-label='Recommended services'
    dense
    disablePadding
    sx={{ mt: 2, mx: 4, display: 'inline-flex', gap: 2 }}
  >
    {recommendations.map((recommendation) => (
      <ListItem key={recommendation.id} sx={{ m: 0, p: 0 }}>
        <RecommendationChip recommendation={recommendation} compact={false} />
      </ListItem>
    ))}
  </List>
)

export default RenderRecommendationChips
