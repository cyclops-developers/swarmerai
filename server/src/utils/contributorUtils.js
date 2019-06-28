import { asyncForEach } from './arrayUtils';

export async function getContributors(context, jobs) {
  // contributor object
  const structureContributors = [];
  let contributors = {};

  // Get the task based in the jobs
  await asyncForEach(jobs, async currentJob => {
    const tasks = await context.prisma.tasks({ where: { jobId: currentJob.id } });
    await asyncForEach(tasks, currentTask => {
      if (contributors[currentTask.userId]) {
        contributors[currentTask.userId] += 1;
      }
      else {
        contributors[currentTask.userId] = 1;
      }
    });

  });

  // Generate the object
  Object.keys(contributors).forEach(userId => {
    structureContributors.push({ userId, total: contributors[userId] });
  });

  // re-order by total desc
  structureContributors.sort((a, b) => {
    return b.total - a.total;
  });

  return structureContributors;
}
