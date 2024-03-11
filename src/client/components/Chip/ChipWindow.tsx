// eslint-disable-next-line import/no-extraneous-dependencies
import { Popover } from '@mui/material'

const ChipWindow = () => (
  <Popover
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open
  >
    The content of the Popover.
  </Popover>
)

export default ChipWindow
