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
import { getQueue } from '../queue';
import { getTaskId } from '../task';
import { prisma } from '../generated/prisma-client';
import { listBucket } from '../utils/bucketUtils';

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
  });

  const queue = getQueue(job.id);

  // TODO load imageurl from bucket name
  const fileUrls = await listBucket(project.bucketName);

  for (let i = 0; i < fileUrls.length; i += 1) {
    const imageUrl = fileUrls[i];
    const name = getTaskId(job.id, imageUrl);
    const data = {
      jobId: job.id,
      fileId: imageUrl,
      type: project.type,
      validation: project.validation,
      question: project.question,
      classes: project.classes,
      width: project.width,
      height: project.height,
    };

    queue.add(name, data, {
      // this jobId references a queue job id and not the project job
      jobId: name,
      removeOnComplete: true,
    });
  }

  const expectedSubmissions = fileUrls.length * project.validation;

  await prisma.updateJob({
    data: { status: 'ACTIVE', expectedSubmissions },
    where: { id: job.id },
  });

  return job;
};

export const endJob = async jobId => {
  let job = await prisma.job({ id: jobId });
  if (!job) {
    throw new Error(`Job ${jobId} not found`);
  }

  // TODO use enums instead of hard coded strings
  if (job.status === 'COMPLETED' || job.status === 'DELETED') {
    throw new Error('Cannot end completed/deleted job');
  }

  job = await prisma.updateJob({
    data: { status: 'COMPLETED', endDateTime: new Date().toISOString() },
    where: { id: jobId },
  });

  const queue = getQueue(jobId);
  queue.empty();

  return job;
};
