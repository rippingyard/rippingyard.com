import * as joi from 'joi'

export const schemaPost = joi.object({
  id: joi.any(),
  content: joi.string().required(),
  type: joi.string().required(),
  owner: joi.any(),
  isPublic: joi.boolean(),
})
