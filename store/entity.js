import { db, timestamp } from '~/plugins/firebase'
import { stripTags } from '~/plugins/typography'

export const scheme = {
  name:           null,
  aliases:        [],
  owner:          null,
  collaborators:  null,
  content:        null,
  status:         'published',
  parent:         null,
  relatedEntities: null,
  counts: {
    favorite: 0,
    bookmark: 0,
    pageview: 0,
  },
  isDeleted:      false,
  publishedAt:    timestamp.now(),
  createdAt:      timestamp.now(),
  updatedAt:      timestamp.now(),
}

export const actions = {
  async getEntitiesFromContent({ dispatch }, content) {

    const string = stripTags(content)
  
    const newEntities = []
    const entities = string.match(/[#][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-]+/gm)
  
    if( !entities ) return []
  
    await Promise.all(entities.map( async rawEntity => {
  
      const entity = rawEntity.replace('#', '')
  
      // TODO: 存在判定
  
      // TODO: 登録
      await dispatch('save', {
        id: entity,
        aliases: [entity],
        name: entity
      })
  
      newEntities.push(entity)
      
    } ))
  
    return newEntities
  
  },
  async save({ rootState }, entity) {

    // TODO: validation
    // TODO: auth処理
    if( !rootState.auth.me ) return false

    // TODO: slug

    entity.updatedAt = timestamp.now()

    entity.createdAt = entity.createdAt ? timestamp.fromDate(entity.createdAt) : timestamp.now()
    entity.publishedAt = entity.publishedAt ? timestamp.fromDate(entity.publishedAt) : timestamp.now()

    if( !entity.owner ) {
      entity.owner = await db.collection('users').doc(rootState.auth.me.uid)
    } else if( entity.owner.id ) {
      entity.owner = await db.collection('users').doc(entity.owner.id)
    }

    let dbHandler = db.collection('entities')

    dbHandler = entity.id ? dbHandler.doc(entity.id) : dbHandler.doc()

    // console.log('Here')

    dbHandler.set(Object.assign(scheme, entity)).then(() => {
      console.log('Success to save')
    }).catch(() => {
      console.log('Fail to save')
    })
  },
  // async delete({ rootState }, { id, notification }) {

  //   console.log('delete:', id)

  //   await db.collection('entitys').doc(id).set({
  //     isDeleted: true
  //   }, { merge: true }).then(() => {
  //     if( notification ) {
  //       notification.open({
  //         duration: 5000,
  //         message: '記事を削除しました',
  //         position: 'is-bottom-right',
  //         type: 'is-success',
  //         hasIcon: false
  //       })
  //     }
  //   }).catch(() => {
  //     if( notification ) {
  //       notification.open({
  //         duration: 5000,
  //         message: '記事の削除に失敗しました',
  //         position: 'is-bottom-right',
  //         type: 'is-danger',
  //         hasIcon: false
  //       })
  //     }
  //   })

  // }
}

