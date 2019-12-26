import config from '../../config'

class BackendService {
  constructor() {
    this.path = `${config.backendPath.url}:${config.backendPath.port}`
  }

  async getUserData(userID) {
    const resp = await fetch(`${this.path}/user/${userID}`)
    const json = await resp.json()
    return json
  }

  async updateUserData(userId, data) {
    // console.log(`updating with: ${data}`)
    const resp = await fetch(`${this.path}/user/update`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({userId, data})
    })
    return resp
  }
}

export default BackendService