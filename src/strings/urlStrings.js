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
export const PROJECT_DASHBOARD_PAGE_URL_PREFIX = '/project';
export const JOB_DETAILS_PAGE_URL_PREFIX = '/job';
export const ALL_PROJECTS_DASHBOARD_PAGE_URL = '/all-projects';
export const ALL_JOBS_PAGE_URL = '/all-jobs';
export const SIGN_UP_PAGE_URL = '/sign-up';
export const LOG_IN_PAGE_URL = '/login';
export const TASK_PAGE_URL_PREFIX = '/task';

export const getUrlWithId = ({ prefix, id }) => `${prefix}/${id}`;
