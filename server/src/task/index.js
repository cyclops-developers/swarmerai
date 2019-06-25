import { prisma } from '../generated/prisma-client'
import { getQueue } from '../queue'

const removeTaskFromQueue = async (queue, taskId) => {
  const task = await queue.getJob(taskId)
  if (!task) {
    return
  }

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

export const submitTask = async ({ jobId, userId, fileId, answers }) => {
  await prisma.createTask({ jobId, userId, fileId, answers })

  const queue = getQueue(jobId)
  // TODO implement method
  // const job = await prisma.job({ id: jobId })
  // const { validations } = job
  //
  // const tasks = await prisma.tasks({ where: { fileId } })
  // removeTaskFromQueue(queue, getTaskId(jobId, fileId))
  //
  // console.log(project)
  // console.log(tasks)
  // if (tasks.length > validations) {
  //   removeTaskFromQueue(queue, getTaskId(jobId, fileId))
  // }

  return null
}
