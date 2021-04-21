import * as joi from 'joi'

export const schemaPost = joi.object({
  id: joi.any(),
  content: joi.string().required(),
  type: joi.string().required(),
  entities: joi.array(),
  owner: joi.any(),
  status: joi.string(),
  isPublic: joi.boolean(),
})
