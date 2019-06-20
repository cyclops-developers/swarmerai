import styled from 'styled-components'
import { Box } from './Box'

const ContainerPaddingInPixels = 25

const Container = styled(Box)`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`

Container.defaultProps = {
  pl: `${ContainerPaddingInPixels}px`,
  pr: `${ContainerPaddingInPixels}px`,
}

export { Container }
