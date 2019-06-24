import system from 'system-components'

const Text = system(
  {
    fontFamily: `Avenir-Book`,
    color: 'text.black',
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
  'opacity',
)

Text.displayName = 'Text'

export { Text }
