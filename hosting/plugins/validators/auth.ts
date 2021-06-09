import Joi from 'joi'

export const schemaLogin = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().token().required(),
})

export const schemaResetPassword = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required(),
})
