import moment from 'moment'

import Model from '~/plugins/model'
import User from '~/models/User'

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

  data(doc) {
    const item = doc
    item.createdate = moment(item.createdAt.toDate())
    item.updatedate = moment(item.updatedAt.toDate())

    if (item.owner) {
      // console.log('TE', item.owner.get())
      // item.owner = item.owner
    }
    console.log('item', item);
    return item
  }

}
