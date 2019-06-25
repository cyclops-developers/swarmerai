import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'

import { Button } from 'antd'

import get from 'lodash/get'
import truncate from 'lodash/truncate'

import { Flex } from '../../components/Flex'
import { Box } from '../../components/Box'
import { Text } from '../../components/Text'

import AnnotationCanvas from './AnnotationCanvas'
import { UndoRedo } from './AnnotationCanvas/UndoRedo'

const ButtonGroup = Button.Group

const UndoRedoState = new UndoRedo()
const canvasContainer = React.createRef()

// -10 for inter-button margin
const StyledClassButton = styled(Button)`
  && {
    min-width: 90px;
    height: 40px;
    margin-right: 5px;
    margin-bottom: 5px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: initial;
    font-size: 12px;
    text-align: center;
  }

  @media (max-width: 1270px) {
    width: calc((100% - 10px) / 3);

    :nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1270px) {
    width: calc((100% - 15px) / 4);

    :nth-child(4n) {
      margin-right: 0;
    }
  }
`

const mockClassTask = {
  data: {
    getTask: {
      id: 'task1234',
      fileUrl:
        'https://buyxraysonline.com/wp-content/uploads/2017/12/BITEWING-XRAYS-7.jpg',
      job: {
        id: 'job1234',
        project: {
          projectId: 'project1234',
          category: 'Tooth classification',
          description: 'Find and label each tooth within the xray',
          name: 'Tooth number labeling',
          type: 'MULTI_CLASS',
          question: null,
          repeatable: true,
          classes: [
            'Green Part',
            'Red Part',
            'Seed',
            'Purple Part',
            'Brown Part',
            'Shadow',
            'Background',
            'Overlapping Seed',
            'Light reflection',
            'Table',
            'Green Part',
            'Red Part',
            'Seed',
            'Purple Part',
            'Brown Part',
            'Shadow',
            'Background',
            'Overlapping Seed',
            'Light reflection',
            'Table',
          ],
          width: 800,
          height: 625,
        },
      },
    },
  },
}

const mockBinaryTask = {
  data: {
    getTask: {
      id: 'task1234',
      fileUrl:
        'https://buyxraysonline.com/wp-content/uploads/2017/12/BITEWING-XRAYS-7.jpg',
      job: {
        id: 'job1234',
        project: {
          projectId: 'project1234',
          category: 'Tooth identification',
          description: 'Find xrays with the given tooth',
          name: 'Molar bitewing identification',
          type: 'BINARY',
          question: 'Does the image contain tooth #1?',
          repeatable: null,
          classes: null,
          width: 800,
          height: 625,
        },
      },
    },
  },
}

const TaskPage = () => {
  const [showLabels, setShowLabels] = useState(false)
  const [addingPoints, setAddingPoints] = useState(true)
  const [magnifyingPower, setMagnifyingPower] = useState(1)
  const [focusedAnnotation, setFocusedAnnotation] = useState('')
  const [annotations, setAnnotations] = useState({})

  // class version
  const task = get(mockClassTask, 'data.getTask', null)
  // binary version
  // const task = get(mockBinaryTask, 'data.getTask', null)
  const project = get(task, 'job.project', null)

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false)
    return () => {
      document.removeEventListener('keydown', handleKeydown, false)
    }
  })

  const handleKeydown = e => {
    if (project.type !== 'MULTI_CLASS') return
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
      case 73:
        // 'i'
        if (magnifyingPower <= 3) {
          setMagnifyingPower(magnifyingPower + 1)
        }
        break
      case 79:
        // 'o'
        if (magnifyingPower >= 2) {
          setMagnifyingPower(magnifyingPower - 1)
        }
        break

      default:
    }
  }

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

  const handleChangeClass = className => {
    if (!focusedAnnotation) return
    const annotationsCopy = { ...annotations }
    annotationsCopy[focusedAnnotation].className = className

    setAnnotations(annotationsCopy)
  }

  const maxWidth = get(canvasContainer, 'current.clientWidth', 800)
  const maxHeight = window.innerHeight - 350

  const projectWidth = get(project, 'width', 800)
  const projectHeight = get(project, 'height', 800)

  const scaleByWidth = maxWidth / projectWidth
  const scaleByHeight = maxHeight / projectHeight

  const maxScale = Math.min(scaleByHeight, scaleByWidth)

  const canvasWidth = projectWidth * maxScale
  const canvasScaling = maxScale

  const handleSubmit = () => {
    const adjustedAnnotations = Object.keys(annotations).map(anno => ({
      id: annotations[anno].id,
      label: annotations[anno].className,
      vertices: annotations[anno].vertices.map(vertex => ({
        x: Math.round(vertex.x * (1 / canvasScaling)),
        y: Math.round(vertex.y * (1 / canvasScaling)),
      })),
    }))

    console.log('adjustedAnnotations', adjustedAnnotations)
  }

  return (
    <Flex
      bg="rgb(246, 246, 246)"
      flexDirection="column"
      alignItems="center"
      p={20}
    >
      <Flex width="100%" pt="15px" pb="35px">
        <Flex flex={3} justifyContent="space-between" flexDirection="column">
          {project.category && <Text fontSize={3}>{project.category}</Text>}
          {project.name && (
            <Text fontSize={2} mt={10}>
              {project.name}
            </Text>
          )}
          {project.description && (
            <Text fontSize={0} mb={10}>
              {project.description}
            </Text>
          )}
          {project.question && <Text fontSize={3}>{project.question}</Text>}
        </Flex>
        <Flex
          flex={1}
          alignItems="flex-end"
          justifyContent="space-around"
          flexDirection="column"
        >
          {project.type === 'MULTI_CLASS' ? (
            <Button
              color="link"
              onClick={() => handleSubmit()}
              style={{
                background: '#3181F8',
                color: '#FFF',
                width: '200px',
                height: '40px',
              }}
            >
              Finalize annotations
            </Button>
          ) : (
            <Fragment>
              <Button
                color="link"
                onClick={() => handleSubmit()}
                style={{
                  background: '#3181F8',
                  color: '#FFF',
                  width: '150px',
                  height: '40px',
                }}
              >
                Yes
              </Button>
              <Button
                color="link"
                onClick={() => handleSubmit()}
                style={{
                  background: '#3181F8',
                  color: '#FFF',
                  width: '150px',
                  height: '40px',
                }}
              >
                No
              </Button>
            </Fragment>
          )}
        </Flex>
      </Flex>
      {project.type === 'MULTI_CLASS' && (
        <Flex
          width={get(project, 'width') || '100%'}
          justifyContent="space-between"
          pb="35px"
          maxWidth="800px"
          minWidth="500px"
          margin="0 auto"
        >
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

          <ButtonGroup>
            <Button
              disabled={magnifyingPower >= 4}
              outline
              onClick={() => setMagnifyingPower(magnifyingPower + 1)}
            >
              <small>Zoom in (i)</small>
            </Button>
            <Button
              disabled={magnifyingPower <= 1}
              outline
              onClick={() => setMagnifyingPower(magnifyingPower - 1)}
            >
              <small>Zoom out (o)</small>
            </Button>
          </ButtonGroup>

          <Button
            outline
            color="primary"
            onClick={() => handleToggleAdding()}
            style={{ width: '165px' }}
          >
            {addingPoints ? 'Adding Annotation' : 'Add Annotation'}
            <small style={{ paddingLeft: 5 }}>(c)</small>
          </Button>
        </Flex>
      )}
      <Flex
        width="100%"
        border="1px solid #dbdbdb"
        borderRadius="4px"
        p="5px"
        alignItems="center"
      >
        <Box ref={canvasContainer} flex={2}>
          <AnnotationCanvas
            url={task.fileUrl}
            showLabels={showLabels}
            magnifyingPower={magnifyingPower}
            focusedAnnotation={focusedAnnotation}
            annotations={annotations}
            addingPoints={addingPoints}
            setFocusedAnnotation={setFocusedAnnotation}
            setAnnotations={handleSetAnnotation}
            setAddingPoints={setAddingPoints}
            canvasWidth={canvasWidth}
          />
        </Box>
        {project.type === 'MULTI_CLASS' && (
          <Flex
            flex={1}
            flexWrap="wrap"
            justifyContent="space-around"
            pl={20}
            maxHeight={canvasScaling * project.height}
            style={{ overflow: 'scroll' }}
          >
            {get(project, 'classes').map((className, index) => (
              <StyledClassButton
                key={index}
                color="link"
                onClick={() => handleChangeClass(className)}
              >
                {truncate(className, { length: 16 })}
              </StyledClassButton>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default TaskPage
