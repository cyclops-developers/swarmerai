import { GQL_OBJECT_ID_FIELD_NAME } from './gqlObjectUtils'
import { _isNull } from './lodashUtils'

export const JOB_NAME_FIELD_NAME = 'name'
export const JOB_CREATOR_FIELD_NAME = 'creator'
export const JOB_CATEGORY_FIELD_NAME = 'category'
export const JOB_CURRENT_JOB_FIELD_NAME = 'currentJob'
export const BACKEND_JOB_VALIDATION_FIELD_NAME = 'validation'
export const BACKEND_JOB_BUCKET_URL_FIELD_NAME = 'bucketName'
export const BACKEND_JOB_TYPE_FIELD_NAME = 'type'
export const BACKEND_JOB_REPEATABLE_FIELD_NAME = 'repeatable'

export const BACKEND_JOB_STATUS_FIELD_NAME = 'status'
export const BACKEND_JOB_START_DATE_TIME_FIELD_NAME = 'startDateTime'

// receives JOB object from backend
export class Job {
  constructor(job) {
    this.content = job
  }

  getId = () => this.content[GQL_OBJECT_ID_FIELD_NAME]
  getStatus = () => this.content[BACKEND_JOB_STATUS_FIELD_NAME]
  hasBeenStarted = () =>
    !_isNull(this.content[BACKEND_JOB_START_DATE_TIME_FIELD_NAME])
  isActive = () => this.getStatus() === 'ACTIVE'
  getProgress = () => 0.2
}
