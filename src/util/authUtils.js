export const getUser = () => {
  let user = localStorage.getItem('user')
  if (user) {
    user = JSON.parse(user)
    return user
  }

  return null
}
