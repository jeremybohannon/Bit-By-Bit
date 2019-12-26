class User {
  constructor(authId, userDetails = {}, id = null) {
    this.authId = authId
    this.userDetails = userDetails
    this.userData = {}
    this.id = id
  }

  getAuthId() {
    return this.authId
  }

  getUserDetails() {
    return this.userDetails
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