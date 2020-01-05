const { OAuth2Client } = require('google-auth-library')
const config = require('../../config.json')


class Auth {
  constructor() {
    this.client = new OAuth2Client(config.google.client_id);
  }

  async verify (token) {
    try {
      const ticket = await this.client.verifyIdToken({
          idToken: token,
          audience: config.google.client_id,  
      });
      const payload = ticket.getPayload();payload['sub'];
  
      if(Object.keys(payload).length >= 1 ) {
        return payload
      } else {
        return {}
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Auth