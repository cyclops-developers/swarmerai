import { prisma } from '../generated/prisma-client'
import { getQueue } from '../queue'

const removeTaskFromQueue = async (queue, taskId) => {
  const task = await queue.getJob(taskId)

  if (!task) {
    return
  }
  // TODO handle error
  return task.remove()
}

export const getTaskId = (jobId, fileId) => `${jobId}.${fileId}`

export const getNextTask = async jobId => {
  const queue = getQueue(jobId)

  const job = await queue.getNextJob()
  if (!job) {
    return null
  }

  const { data, id } = job

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
    removeTaskFromQueue(queue, getTaskId(jobId, fileId))
  }

  return taskAnswer
}
