import { prisma } from '../generated/prisma-client'
import { getQueue } from '../queue'

const removeTaskFromQueue = async (queue, taskId) => {
  const task = await queue.getJob(taskId)

  if (!task) {
    return
  }

  try {
    await task.remove()
  } catch (err) {
    await task.moveToCompleted('succeeded', true, true)
  }

  return null
}

export const getTaskId = (jobId, fileId) => `${jobId}.${fileId}`

export const getNextTask = async jobId => {
  const queue = getQueue(jobId)

  let count = await queue.getWaitingCount()

  if (count === 0) {
    return null
  }

  let job = await queue.getNextJob()

  // hacky implementation until I can get timeout or removal to work
  for (let i = 0; i < count; i += 1) {
    const { data } = job
    if (Object.keys(data).length !== 0) {
      break
    }
    job = await queue.getNextJob()
  }

  const { data, id } = job

  if (Object.keys(data).length === 0) {
    return null
  }

  // dequeue the job and then add it back to the queue at last position
  await job.moveToCompleted('succeeded', true, true)

  await queue.add(id, data, {
    jobId: id,
    removeOnComplete: true,
  })

  return data
}

export const submitTask = async ({ jobId, userId, fileId, type, labels }) => {
  // taskId refers to the queue tasks and not the completed task with labels
  const taskId = getTaskId(jobId, fileId)

  const taskAnswer = await prisma.createTask({
    jobId,
    userId,
    type,
    fileId,
    labels,
    jobIdAndFileId: taskId,
  })

  const queue = getQueue(jobId)

  const job = await prisma.job({ id: jobId })
  const { validation } = job

  const tasks = await prisma.tasks({ where: { jobIdAndFileId: taskId } })

  if (tasks.length >= validation) {
    await removeTaskFromQueue(queue, taskId)
  }

  return taskAnswer
}
