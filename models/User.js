import Model from '~/plugins/model'

export default class User extends Model {

  constructor() {
    super()
    this.scheme({
      uid:          null,
      userName:     null,
      displayName:  null,
      role:         'stranger',
      isBanned:     false,
      isDeleted:    false,
    })
  }

  // create(params) {
  //   super.create(params)
  // }
}
