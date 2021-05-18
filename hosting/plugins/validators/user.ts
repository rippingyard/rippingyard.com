import Joi from 'joi'

export const schemaUser = Joi.object({
  uid: Joi.string().required(),
  displayName: Joi.string().required(),
  profile: Joi.string().allow('').optional(),
  avator: Joi.string().allow('').optional(),
})

export const schemaCreateUser = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().min(6).pattern(/^[a-zA-Z0-9_-]+$/).required(),
  userName: Joi.string().min(6).max(32).pattern(/^[a-zA-Z0-9_-]+$/).required(),
})
