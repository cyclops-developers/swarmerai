import system from 'system-components'

const Flex = system(
  {
    display: 'flex',
  },
  // core
  'space',
  'width',
  'color',
  // typography
  'fontFamily',
  'fontSize',
  'textAlign',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
  // borders
  'borders',
  'borderColor',
  'borderRadius',
  // layout
  'display',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
  // flexText
  'alignItems',
  'alignContent',
  'justifyContent',
  'flexWrap',
  'flexDirection',
  'flex',
  'flexBasis',
  'justifySelf',
  'alignSelf',
  'order',
  // position
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  // misc
  'opacity',
  'boxShadow',
  'bg',
)

Flex.displayName = 'Flex'

export { Flex }
