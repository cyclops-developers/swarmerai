import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import { Flex } from '../Flex'

import AnnotationCanvas from '../../util/AnnotationCanvas'
import { UndoRedo } from '../../util/AnnotationCanvas/UndoRedo'

const ButtonGroup = Button.Group

const UndoRedoState = new UndoRedo()
const canvasContainer = React.createRef()

const JobPage = () => {
  const [showLabels, setShowLabels] = useState(false)
  const [addingPoints, setAddingPoints] = useState(true)
  const [magnifyingPower, setMagnifyingPower] = useState(1)
  const [focusedAnnotation, setFocusedAnnotation] = useState('')
  const [annotations, setAnnotations] = useState({})

  // if (props.annotations && props.annotations.length !== 0) {
  //     const annotation = new schema.Entity('annotations')
  //     const normalizedAnn = normalize(props.annotations, [annotation])
  //     entities.annotations = normalizedAnn.entities.annotations
  //     annotations = normalizedAnn.result
  //   }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false)
    return () => {
      document.removeEventListener('keydown', handleKeydown, false)
    }
  })

  const handleKeydown = e => {
    switch (e.keyCode) {
      case 90:
        // 'z'
        handleUndo()
        break
      case 88:
        // 'x'
        handleRedo()
        break
      case 16:
        // shift
        setShowLabels(!showLabels)
        break
      case 67:
        // 'c'
        handleToggleAdding()
        break
      case 49:
        // '1'
        setMagnifyingPower(1)
        break
      case 50:
        // '2'
        setMagnifyingPower(2)
        break
      case 51:
        // '3'
        setMagnifyingPower(3)
        break
      case 52:
        // '4'
        setMagnifyingPower(4)
        break
      default:
    }
  }

  /* ==================== undo/redo ==================== */
  const handleUndo = () => {
    if (UndoRedoState.previous.length === 0) return

    const newAnnotations = UndoRedoState.undo(annotations)
    setAnnotations(newAnnotations)
  }

  const handleRedo = () => {
    if (UndoRedoState.next.length === 0) return

    const newAnnotations = UndoRedoState.redo(annotations)
    setAnnotations(newAnnotations)
  }

  const handleToggleAdding = () => {
    setAddingPoints(!addingPoints)
    setFocusedAnnotation('')
  }

  const handleSetAnnotation = newAnnotations => {
    UndoRedoState.save(annotations)
    setAnnotations(newAnnotations)
  }

  return (
    <div style={{ background: 'rgb(246, 246, 246)' }} ref={canvasContainer}>
      <Flex width="100%" justifyContent="space-between" py="15px" px="100px">
        <Button color="link" onClick={() => setShowLabels(!showLabels)}>
          {showLabels ? 'Show labels - On' : 'Show labels - Off'}
          <small>&nbsp;(shift)</small>
        </Button>

        <ButtonGroup>
          <Button
            disabled={UndoRedoState.previous.length === 0}
            outline
            onClick={handleUndo}
          >
            <small>Undo (z)</small>
          </Button>
          <Button
            disabled={UndoRedoState.next.length === 0}
            outline
            onClick={handleRedo}
          >
            <small>Redo (x)</small>
          </Button>
        </ButtonGroup>
        <Button outline color="primary" onClick={() => handleToggleAdding()}>
          {addingPoints ? 'Adding Annotation' : 'Add Annotation'}
          <small style={{ paddingLeft: 5 }}>(c)</small>
        </Button>
      </Flex>
      <AnnotationCanvas
        url={
          'https://cdn.shopify.com/s/files/1/1266/9241/articles/10_health_and_wellness_benefits_of_strawberries_Story_Page.jpeg?v=1523561527'
        }
        showLabels={showLabels}
        magnifyingPower={magnifyingPower}
        focusedAnnotation={focusedAnnotation}
        annotations={annotations}
        addingPoints={addingPoints}
        setFocusedAnnotation={setFocusedAnnotation}
        setAnnotations={handleSetAnnotation}
        setAddingPoints={setAddingPoints}
        canvasWidth={
          canvasContainer.current ? canvasContainer.current.clientWidth : null
        }
      />
    </div>
  )
}

export default JobPage
