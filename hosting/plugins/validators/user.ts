import Joi from 'joi'

export const schemaUser = Joi.object({
  uid: Joi.string().required(),
  displayName: Joi.string().required(),
  profile: Joi.string().allow('').optional(),
  avatar: Joi.string().allow('').optional(),
})

export const schemaCreateUser = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().min(6).max(128).token().required(),
  userName: Joi.string().min(3).max(32).token().required(),
})
