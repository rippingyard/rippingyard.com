import * as joi from 'joi'

export const schemaUser = joi.object({
  uid: joi.string().required(),
  displayName: joi.string().required(),
  profile: joi.string().allow('').optional(),
  avator: joi.string().allow('').optional(),
})
