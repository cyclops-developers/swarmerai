/*
 *  Copyright 2019 Laguro, Inc. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState } from 'react'

import { ImageAnnotation } from './2DImage.js'
import { colors, getRandomInt } from './helper.js'

import Canvas from './Canvas'

const AnnotationCanvas = ({
  focusedAnnotation,
  magnifyingPower,
  addingPoints,
  showLabels,
  annotations,
  url,
  canvasWidth,
  setFocusedAnnotation,
  setAnnotations,
  setAddingPoints,
  ...props
}) => {
  const [canvasHeight, setCanvasHeight] = useState(0)

  /* ==================== canvas ==================== */
  const handleCanvasImgLoad = e => {
    const { target } = e
    setCanvasHeight(target.height)
  }

  const handleCanvasStageMouseDown = e => {
    const stage = e.target.getStage()
    const timeNow = new Date().getTime().toString(36)
    const color = colors[getRandomInt(colors.length)]
    let { x, y } = stage.getPointerPosition()
    let vertices
    if (!addingPoints) return
    // prevent x, y exceeding boundary
    x = x < 0 ? 0 : x
    x = x > canvasWidth ? canvasWidth : x
    y = y < 0 ? 0 : y
    y = y > canvasHeight ? canvasHeight : y

    // first add
    const annotationsCopy = { ...annotations }
    if (!focusedAnnotation || !annotationsCopy[focusedAnnotation]) {
      vertices = []
      vertices.push({
        id: `${timeNow}`,
        name: `${timeNow}`,
        x,
        y,
      })
      annotationsCopy[`${timeNow}`] = new ImageAnnotation({
        id: `${timeNow}`,
        name: `${timeNow}`,
        color,
        vertices,
      })
      setFocusedAnnotation(`${timeNow}`)
      setAnnotations(annotationsCopy)
      return
    }

    // continue add vertex
    annotationsCopy[focusedAnnotation].vertices.push({
      id: `${timeNow}`,
      name: `${timeNow}`,
      x,
      y,
    })
    setAnnotations(annotationsCopy)
  }

  const handleCanvasVertexMouseDown = e => {
    const activeVertex = e.target
    const group = activeVertex.getParent()
    const annotationsCopy = { ...annotations }
    if (addingPoints) {
      if (
        group.name() === focusedAnnotation &&
        annotations[focusedAnnotation].vertices[0].name === activeVertex.name()
      ) {
        annotations[focusedAnnotation].closed = true
        setAddingPoints(false)
        setAnnotations(annotationsCopy)
      }
      return
    }
    setFocusedAnnotation(group.name())
  }

  const handleCanvasVertexDragEnd = e => {
    const activeVertex = e.target
    const group = activeVertex.getParent()
    if (addingPoints) return
    const annotationsCopy = { ...annotations }
    const vertices = annotationsCopy[group.name()].vertices.map(v => {
      if (v.name !== activeVertex.name()) return v
      // prevent x, y exceeding boundary
      let x = activeVertex.x()
      let y = activeVertex.y()
      x = x < 0 ? 0 : x
      x = x > canvasWidth ? canvasWidth : x
      y = y < 0 ? 0 : y
      y = y > canvasHeight ? canvasHeight : y
      return { ...v, x, y }
    })
    annotationsCopy[group.name()].vertices = vertices
    setAnnotations(annotationsCopy)
  }

  const handleCanvasFocusing = e => {
    const activeShape = e.target

    if (addingPoints) return
    setFocusedAnnotation(activeShape.name())
  }

  document.body.style.cursor = addingPoints ? 'crosshair' : 'default'

  return (
    <div style={{ position: 'relative' }}>
      <Canvas
        url={url}
        width={canvasWidth}
        height={canvasHeight}
        adding={addingPoints}
        annotationIds={Object.keys(annotations)}
        annotations={annotations}
        focusing={focusedAnnotation}
        power={magnifyingPower}
        labeled={showLabels}
        onImgLoad={handleCanvasImgLoad}
        onStageMouseDown={handleCanvasStageMouseDown}
        onVertexMouseDown={handleCanvasVertexMouseDown}
        onVertexDragEnd={handleCanvasVertexDragEnd}
        onLabelMouseDown={handleCanvasFocusing}
        onLineMouseDown={handleCanvasFocusing}
      />
    </div>
  )
}
export default AnnotationCanvas
