import system from 'system-components'

const Box = system(
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
  'opacity',
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
  // background
  'background',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
  // misc
  'boxShadow',
  'overflow',
)

Box.displayName = 'Box'

export { Box }
