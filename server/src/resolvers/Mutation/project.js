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
import _get from 'lodash/get';
import { initializeJob } from '../../job';
const { getUserId } = require('../../utils');

const project = {
  async createProject(parent, { input }, context) {
    let data = { ...input };

    // Add user
    const userId = getUserId(context);
    const creator = { connect: { id: userId } };
    data.creator = creator;

    if (data.classes) {
      data.classes = { set: data.classes };
    }

    return context.prisma.createProject(data);
  },

  async updateProject(parent, { input }, context) {
    const userId = getUserId(context);
    const projectId = _get(input, 'id');

    const projectExists = await context.prisma.$exists.project({
      id: projectId,
      creator: { id: userId },
    });

    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`);
    }

    let data = { ...input };
    delete data['id']; // remove id for the Prisma update schema

    // Adjust Array of Strings
    if (data.classes) {
      data.classes = { set: data.classes };
    }

    return context.prisma.updateProject({ data, where: { id: projectId } });
  },

  async duplicateProject(parent, { id }, context) {
    const userId = getUserId(context);
    const projectId = id;

    const projectExists = await context.prisma.$exists.project({
      id: projectId,
      creator: { id: userId },
    });

    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`);
    }

    let data = await context.prisma.project({ id });
    data.name = `Copy of ${data.name}`;
    data.creator = { connect: { id: userId } };

    // Adjust Array of Strings
    if (data.classes) {
      data.classes = { set: data.classes };
    }

    // Remove auto-generated fields
    delete data['id'];
    delete data['updatedAt'];
    delete data['createdAt'];

    return context.prisma.createProject(data);
  },

  async startProject(parent, { id }, context) {
    const userId = getUserId(context);

    const projectExists = await context.prisma.$exists.project({
      id,
      creator: { id: userId },
    });

    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`);
    }

    const project = await context.prisma.project({ id });

    const job = await initializeJob(project);
    return _get(job, 'id');
  },

  async deleteProject(parent, { id }, context) {
    const userId = getUserId(context);
    const projectExists = await context.prisma.$exists.project({
      id,
      creator: { id: userId },
    });
    if (!projectExists) {
      throw new Error(`Project not found or you're not the creator`);
    }

    // TODO: Check if the project has active Jobs
    // if not delete the project
    return context.prisma.deleteProject({ id });
  },
};

module.exports = { project };
