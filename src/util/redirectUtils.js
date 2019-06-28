import queryString from 'query-string'
import history from '../history'

export const redirect = ({
  url = '/',
  includeNewRedirectTo = false,
  includeOldSearchParams = true,
  newSearchParams = {},
}) => {
  let urlParams = {}
  if (includeOldSearchParams) {
    urlParams = queryString.parse(history.location.search)
  }
  if (includeNewRedirectTo) {
    urlParams.redirectTo = history.location.pathname
  }
  urlParams = { ...urlParams, ...newSearchParams }
  if (history.location.pathname !== url) {
    history.push(`${url}?${queryString.stringify(urlParams)}`)
  }
  window.scrollTo(0, 0)
}
