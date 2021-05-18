import * as joi from 'joi'

export const schemaComment = joi.object({
  id: joi.any(),
  content: joi.string().required(),
  entities: joi.array(),
  owner: joi.any(),
  status: joi.string(),
  parentId: joi.any(),
  isPublic: joi.boolean(),
})
