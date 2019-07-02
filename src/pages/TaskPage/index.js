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
import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Button, Spin } from 'antd';
import get from 'lodash/get';
import truncate from 'lodash/truncate';
import isEmpty from 'lodash/isEmpty';
import { NEXT_TASK, SUBMIT_TASK } from './queries';
import { Flex } from '../../components/Flex';
import { Box } from '../../components/Box';
import { Text } from '../../components/Text';
import AnnotationCanvas from './AnnotationCanvas';
import { UndoRedo } from './AnnotationCanvas/UndoRedo';
import { Details } from '../../modules/Details';
import { H3 } from '../../helperModules/Texts';
import { Link } from '../../components/Link';
import { ALL_JOBS_PAGE_URL } from '../../strings/urlStrings';

const ButtonGroup = Button.Group;

const UndoRedoState = new UndoRedo();
const canvasContainer = React.createRef();

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
`;
const TaskPage = ({ ...props }) => {
  const [showLabels, setShowLabels] = useState(true);
  const [addingPoints, setAddingPoints] = useState(true);
  const [magnifyingPower, setMagnifyingPower] = useState(1);
  const [focusedAnnotation, setFocusedAnnotation] = useState('');
  const [annotations, setAnnotations] = useState({});
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});
  const [jobFinished, setJobFinished] = useState(false);

  const jobId = get(props, 'match.params.jobId');

  const { data: taskData, error: taskError, refetch: nextTask } = useQuery(
    NEXT_TASK,
    {
      variables: { jobId },
    },
  );

  const submitTask = useMutation(SUBMIT_TASK);

  if (taskError) console.log('error loading task', taskError);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);
    return () => {
      document.removeEventListener('keydown', handleKeydown, false);
    };
  });

  useEffect(() => {
    if (!isEmpty(taskData)) {
      const newTask = get(taskData, 'nextTask');
      if (newTask === null) setJobFinished(true);
      setTask(newTask);
      setProject(get(newTask, 'job.project', {}));
    }
  }, [taskData]);

  const handleGetNextTask = () => {
    // reset all state to default
    setShowLabels(true);
    setAddingPoints(true);
    setMagnifyingPower(1);
    setFocusedAnnotation('');
    setAnnotations({});

    nextTask();
  };

  const handleKeydown = e => {
    if (project.type !== 'MULTI_CLASS') return;
    switch (e.keyCode) {
    case 90:
      // 'z'
      handleUndo();
      break;
    case 88:
      // 'x'
      handleRedo();
      break;
    case 16:
      // shift
      setShowLabels(!showLabels);
      break;
    case 67:
      // 'c'
      handleToggleAdding();
      break;
    case 73:
      // 'i'
      if (magnifyingPower <= 3) {
        setMagnifyingPower(magnifyingPower + 1);
      }
      break;
    case 79:
      // 'o'
      if (magnifyingPower >= 2) {
        setMagnifyingPower(magnifyingPower - 1);
      }
      break;

    default:
    }
  };

  const handleUndo = () => {
    if (UndoRedoState.previous.length === 0) return;

    const newAnnotations = UndoRedoState.undo(annotations);
    setAnnotations(newAnnotations);
  };

  const handleRedo = () => {
    if (UndoRedoState.next.length === 0) return;

    const newAnnotations = UndoRedoState.redo(annotations);
    setAnnotations(newAnnotations);
  };

  const handleToggleAdding = () => {
    setAddingPoints(!addingPoints);
    setFocusedAnnotation('');
  };

  const handleSetAnnotation = newAnnotations => {
    UndoRedoState.save(annotations);
    setAnnotations(newAnnotations);
  };

  const handleChangeClass = className => {
    if (!focusedAnnotation) return;
    const annotationsCopy = { ...annotations };
    annotationsCopy[focusedAnnotation].className = className;

    setAnnotations(annotationsCopy);
  };

  const maxWidth = get(canvasContainer, 'current.clientWidth', 800);
  const maxHeight = window.innerHeight - 350;

  const projectWidth = get(project, 'width') || 800;
  const projectHeight = get(project, 'height') || 800;

  const scaleByWidth = maxWidth / projectWidth;
  const scaleByHeight = maxHeight / projectHeight;

  const maxScale = Math.min(scaleByHeight, scaleByWidth);

  const canvasWidth = projectWidth * maxScale;
  const canvasScaling = maxScale;

  const handleClassSubmit = async () => {
    const adjustedAnnotations = Object.keys(annotations).map(anno => ({
      id: annotations[anno].id,
      class: annotations[anno].className,
      vertices: annotations[anno].vertices.map(vertex => ({
        x: Math.round(vertex.x * (1 / canvasScaling)),
        y: Math.round(vertex.y * (1 / canvasScaling)),
      })),
    }));

    const filteredAnnotations = adjustedAnnotations.filter(
      anno => !isEmpty(anno.class),
    );

    try {
      await submitTask({
        variables: { labels: filteredAnnotations, jobId, fileId: task.fileId },
      });
      handleGetNextTask();
    } catch (e) {
      console.log('Error submitting class answer', e);
    }
  };

  const handleBooleanSubmit = async answer => {
    try {
      await submitTask({
        variables: {
          labels: [{ id: task.fileId, class: answer }],
          jobId,
          fileId: task.fileId,
        },
      });
      handleGetNextTask();
    } catch (e) {
      console.log('Error submitting boolean answer', e);
    }
  };

  if (!jobFinished && (isEmpty(task) || isEmpty(project))) return <Spin />;

  return (
    <Fragment>
      {jobFinished ? (
        <Flex width="100%" flexDirection="column" alignItems="center">
          <H3>Hooray!</H3>
          <Text>This job has been finished, thank you.</Text>
          <Link to={ALL_JOBS_PAGE_URL}>
            <Text
              p={10}
              style={{ textDecoration: 'underline', color: '#3181F8' }}
            >
              Click here to go back to job list
            </Text>
          </Link>
        </Flex>
      ) : (
        <Flex
          bg="rgb(246, 246, 246)"
          flexDirection="column"
          alignItems="center"
          p={20}
        >
          <Flex width="100%" pb="15px">
            <Flex
              flex={3}
              justifyContent="space-between"
              flexDirection="column"
            >
              <Details
                data={[
                  {
                    text: 'Project',
                    data: project.name,
                  },
                  { text: 'Description', data: project.description },

                  { text: 'Question', data: project.question },
                ]}
              />
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
                  onClick={() => handleClassSubmit()}
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
                    onClick={() => handleBooleanSubmit('Yes')}
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
                    onClick={() => handleBooleanSubmit('No')}
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
                url={task.fileId}
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
                maxHeight={canvasScaling * projectHeight}
                style={{ overflow: 'scroll' }}
              >
                {get(project, 'classes').map((className, index) => (
                  <StyledClassButton
                    key={index}
                    onClick={() => handleChangeClass(className)}
                  >
                    {truncate(className, { length: 16 })}
                  </StyledClassButton>
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
};

export default TaskPage;
