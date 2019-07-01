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
