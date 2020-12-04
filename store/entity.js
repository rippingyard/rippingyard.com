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

    const id = encodeURI(entity.id)

    // TODO: 存在判定

    // TODO: slug

    entity.updatedAt = timestamp.now()

    entity.createdAt = entity.createdAt ? timestamp.fromDate(entity.createdAt) : timestamp.now()
    entity.publishedAt = entity.publishedAt ? timestamp.fromDate(entity.publishedAt) : timestamp.now()

    if( !entity.owner ) {
      entity.owner = await db.collection('users').doc(rootState.auth.me.uid)
    } else if( entity.owner.id ) {
      entity.owner = await db.collection('users').doc(entity.owner.id)
    }

    let doc = db.collection('entities')

    doc = id ? doc.doc(id) : doc.doc()

    const data = {...scheme, ...entity}

    const res = {
      status: 'succeed',
      data: data
    }

    await doc.set(data).then(() => {
      console.log('Success to save')
      res.status = 'succeed'
    }).catch(error => {
      console.log('Fail to save', error)
      res.status = 'failed'
    })

    return res
  },
}

