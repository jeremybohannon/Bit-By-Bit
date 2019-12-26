class User {
  constructor(userID) {
    this.userID = userID
    this.userData = {}
    this.id = null
  }

  getUserID() {
    return this.userID
  }

  getUserData() {
    return this.userData
  }

  getId() {
    return this.id
  }

  setUserData(userData) {
    this.userData = userData
  }

  setId(id) {
    this.id = id
  }
}

export default User