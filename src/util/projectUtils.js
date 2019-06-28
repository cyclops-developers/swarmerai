import { _mapKeys, _get, _isNull } from './lodashUtils'
import { GQL_OBJECT_ID_FIELD_NAME } from './gqlObjectUtils'

export const CATEGORY_FIELD_NAME = 'category'
export const NAME_FIELD_NAME = 'name'
export const DESCRIPTION_FIELD_NAME = 'description'
export const LABEL_FIELD_NAME = 'default configurations'
export const NUM_VALIDATION_FIELD_NAME = 'number-of-validations'
export const BUCKET_NAME_FIELD_NAME = 'image-bucket-url'
export const CLASSIFICATION_TYPE_FIELD_NAME = 'classification-type'
export const IS_CLASS_REPEATABLE_FIELD_NAME = 'is-class-repeatable?'
export const QUESTION_FIELD_NAME = 'question'
export const CLASSES_FIELD_NAME = 'classes'

export const PROJECT_NAME_FIELD_NAME = 'name'
export const PROJECT_CREATOR_FIELD_NAME = 'creator'
export const PROJECT_CATEGORY_FIELD_NAME = 'category'
export const PROJECT_CURRENT_JOB_FIELD_NAME = 'currentJob'

export const GQL_OBJECT_FIELD_NAME_TO_FORM_FIELD_NAME = {
  validation: NUM_VALIDATION_FIELD_NAME,
  bucketUrl: BUCKET_NAME_FIELD_NAME,
  type: CLASSIFICATION_TYPE_FIELD_NAME,
  repeatable: IS_CLASS_REPEATABLE_FIELD_NAME,
}

export const getProjectForForm = project =>
  _mapKeys(
    project,
    (_, key) => GQL_OBJECT_FIELD_NAME_TO_FORM_FIELD_NAME[key] || key,
  )

export const getProjectName = project => project[PROJECT_NAME_FIELD_NAME]

export class Project {
  constructor(project) {
    this.content = project
  }
  getId = () => this.content[GQL_OBJECT_ID_FIELD_NAME]
  getName = () => this.content[PROJECT_NAME_FIELD_NAME]
  getCurrentJobId = () =>
    _get(this.content, `${PROJECT_CURRENT_JOB_FIELD_NAME}.id`)
  getCurrentJob = () => _get(this.content, `${PROJECT_CURRENT_JOB_FIELD_NAME}`)
  hasCurrentJob = () => !_isNull(this.getCurrentJob())
}
