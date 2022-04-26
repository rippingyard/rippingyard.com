import Joi from 'joi'

// const tokenPattern = /^[0-9a-zA-Z\\-\\_]+$/

export const schemaLogin = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('E-Mail'),
  password: Joi.string().min(6).required().label('パスワード'),
})

export const schemaRequireResetPassword = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
})

export const schemaResetPassword = Joi.object({
  password: Joi.string().min(6).required().label('パスワード'),
})