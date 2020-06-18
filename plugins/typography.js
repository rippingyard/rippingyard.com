import sanitizeHtml from 'sanitize-html'

export const removeHtmlTag = str => {
  return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
}

export const removeTitle = str => {
  return str.replace(/<h.(?: .+?)?>.*?<\/h.>/, '')
}

export const getTitle = str => {
  if( !str ) return ''
  const htag = str.match(/<h.(?: .+?)?>.*?<\/h.>/)
  if( htag ) {
    return removeHtmlTag(htag[0])
  } 
  return getSummary(str)
}

export const getSocialTitle = str => {
  if( !str ) return str
  return decodeEntities( getTitle( str ) ).replace( new RegExp( '&', 'g' ), '%26')
}

export const getSummary = (str, length = 140) => {
  str = removeTitle(str)
  str = removeHtmlTag(str)
  const tail = str.length > length ? '...' : ''
  return str.substr(0, length) + tail
}

export const getLength = str => {
  return !str ? 0 : removeHtmlTag(str).length
}

export const stripTags = (content, linebreak = true) => {

  if( linebreak ) {
    content = content.replace( /<\/p>/g, "</p>\n\n" )
    content = content.replace( /<br \/>/g, "\n\n" )
    content = content.replace( /<br\/>/g, "\n\n" )
    content = content.replace( /<br>/g, "\n\n" )
  }

  return !content ? '' : sanitizeHtml(content, {
    allowedTags: []
  })

}

export function sanitize(content) {

  return !content ? '' : sanitizeHtml(content, {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'b', 'i', 'em', 'a', 'blockquote', 'hr', 'ul', 'ol', 'li', 'br'],
    allowedAttributes: {
      a: [ 'href', 'name', 'target' ],
    }
  })

}

export const decodeEntities = str => {

  if( !str ) return str

  console.log('Before:', str)

  const entities = [
    ['amp',  '&'],
    ['apos', '\''],
    ['lt',   '<'],
    ['gt',   '>'],
  ]

  entities.forEach(entity => {
    str = str.replace( '&quot;', '"' ).replace(new RegExp( '&' + entity[0] + ';', 'g' ), entity[1] )
  })

  console.log('After:', str)
  
  return str

}

