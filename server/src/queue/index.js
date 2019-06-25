import Queue from 'bull'

export const getQueue = jobId => {
  const queue = new Queue(jobId, process.env.REDIS_URL)

  return queue
}
