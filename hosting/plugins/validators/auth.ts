import Joi from 'joi'

export const schemaLogin = Joi.object({
  email: Joi.string().email({ tlds: {allow: false} }).required().label('E-Mail'),
  password: Joi.string().required().label('パスワード'),
})