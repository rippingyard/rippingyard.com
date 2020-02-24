import Model from '~/plugins/model'

export default class Post extends Model {

  constructor() {
    super()
    this.scheme({
      owner:      null,
      collaborators: null,
      content:      null,
      status:       'published',
      isDeleted:    false,
    })
  }

}
