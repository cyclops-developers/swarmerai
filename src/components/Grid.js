import system from 'system-components'
import { Box } from './Box'

const Grid = system(
  {
    is: Box,
    display: 'grid',
  },
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridColumnGap',
  'gridRowGap',
  'gridGap',
  'space',
  'position',
  'alignItems',
  'justifyItems',
  'width',
)

const GridItem = system('gridColumn', 'gridRow')
Grid.Item = GridItem

export { Grid }
