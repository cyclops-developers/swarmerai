import system from 'system-components'
import { Box } from './Box'

const Grid = system(
  {
    is: Box,
    display: 'grid',
  },
  // Use these instead
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridColumnGap',
  'gridRowGap',
  'gridGap',
  //
  'space',
  'position',
  'alignItems',
  'justifyItems',
  'width',
)

export { Grid }
