import { sampleSize } from 'lodash'

export default function validate(schema: any, params: any) {
  const { value, error } = schema.validate(params, {
    abortEarly: false
  })
  console.log('Errors', error)
  console.log('Value', value)
  const errors = parseErrors(error)
  return { value, error, errors }
}

function parseErrors(error: any) {
  if (!error?.details) return {}
  const errors: any = {}
  error.details.map((e: any) => {
    errors[e.context.key] = errorMessage(e)
  })
  return errors
}

function errorMessage(e: any) {
  console.log('e', e)
  let messages = []
  switch(e.type) {
    case 'string.empty':
      messages = [
        `${e.context.label}は必須項目です`,
        `面倒かもしれません。それでも、${e.context.label}は必ず入力してください`,
        `${e.context.label}を入力するの、忘れてませんか？`,
        `${e.context.label}を入力するの、どうしてもいやですか？`,
      ]
      break
    case 'string.min':
      messages = [
        `${e.context.label}は、最低でも${e.context.limit}文字必要です`,
        `${e.context.label}は、最低でも${e.context.limit}文字欲しいところです`,
        `少なすぎます。${e.context.limit}文字はなんとか`,
        `${e.context.limit}文字が最低ライン。もう一声！`,
      ]
      break
    case 'string.max':
      messages = [
        `いくらなんでも多すぎるので、${e.context.label}は${e.context.limit}文字以内に収めてください`,
        `さすがに多すぎるので、${e.context.label}は${e.context.limit}文字以内に収めてください`,
      ]
      break
    case 'string.token':
      messages = [
        `${e.context.label}は半角英数で入力してください`,
        `${e.context.label}は半角英数で入力してください`,
      ]
      break
    case 'string.email':
      messages = [
        `${e.context.label}は正しいE-Mailを入力してください`,
        `${e.context.label}は正しいメールアドレスを入力してください`,
      ]
      break
    default:
      messages = [ e.message ]
      break
  }
  return sampleSize(messages, 1)[0]
}