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
const { Query } = require('./Query');
const { auth } = require('./Mutation/auth');
const { project } = require('./Mutation/project');
const { category } = require('./Mutation/category');
const { task } = require('./Mutation/task');
const { User } = require('./User');
const { Project } = require('./Project');
const { job } = require('./Mutation/job');
const { Job } = require('./Job');
const { Task } = require('./Task');
const { Contributor } = require('./Contributor');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...project,
    ...category,
    ...task,
    ...job,
  },
  User,
  Project,
  Job,
  Task,
  Contributor,
};
