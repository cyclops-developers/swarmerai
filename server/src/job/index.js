import { getQueue } from '../queue'
import { getTaskId } from '../task'
import { prisma } from '../generated/prisma-client'
import { listBucket } from '../utils/bucketUtils'

export const initializeJob = async project => {
  const job = await prisma.createJob({
    projectId: project.id,
    description: project.description,
    validation: project.validation,
    bucketName: project.bucketName,
    category: project.category,
    type: project.type,
    repeatable: project.repeatable,
    question: project.question,
    classes: { set: project.classes },
    width: project.width,
    height: project.height,
  })

  const queue = getQueue(job.id)
  // TODO load imageurl from bucket name
  const imageUrls = await listBucket('swarmerai-test')

  for (let i = 0; i < imageUrls.length; i += 1) {
    const imageUrl = imageUrls[i]
    const name = getTaskId(job.id, imageUrl)
    const data = {
      jobId: job.id,
      fileId: imageUrl,
      type: project.type,
      validation: project.validation,
      question: project.question,
      classes: project.classes,
      width: project.width,
      height: project.height,
    }

    queue.add(name, data, {
      // this jobId references a queue job id and not the project job
      jobId: name,
      removeOnComplete: true,
    })
  }

  return job
}

export const endJob = async jobId => {
  let job = await prisma.job({ id: jobId })
  if (!job) {
    throw new Error(`Job ${jobId} not found`)
  }

  // TODO use enums instead of hardcoded strings
  if (job.status === 'COMPLETED' || job.status === 'DELETED') {
    throw new Error('Cannot end completed/deleted job')
  }

  job = await prisma.updateJob({
    data: { status: 'COMPLETED', endDateTime: new Date().toISOString() },
    where: { id: jobId },
  })

  const queue = getQueue(jobId)
  queue.empty()

  return job
}
