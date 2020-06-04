
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

export const getSummary = (str, length = 140) => {
  str = removeTitle(str)
  str = removeHtmlTag(str)
  const tail = str.length > length ? '...' : ''
  return str.substr(0, length) + tail
}

export const getLength = str => {
  return !str ? 0 : removeHtmlTag(str).length
}

