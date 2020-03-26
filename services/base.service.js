/*****************************
 * Base service
 ******************************/
import { NetInfo } from 'react-native'

// import config from '../../config/index'

export default class BaseService {
 MAIN_API = `http://192.168.1.3:1337`
  getAuthorizationToken = async () => {
    try {
      const CognitoUserSession = await Auth.currentSession()
      return CognitoUserSession.getIdToken().getJwtToken()
    } catch (e) {
      return null
    }
  }

  requestWithToken = async () => {
    const token = await this.getAuthorizationToken()
    if (!!token) {
      return {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    } else {
      return { 'Content-Type': 'application/json' }
    }
  }

  getJSON = async (url) => {
    try {
      let res = await fetch(
          this.MAIN_API + url, {
          method: 'GET',
          headers: await this.requestWithToken(),
        },
      )
      return await res.json()
    } catch (e) {
      console.warn('Error while making getJSON in base.service.ts: ', e)
    }
  }

  postJSON = async (url, data,) => {
    try {
      const res = await fetch(this.MAIN_API + url, {
        method: 'POST',
        // headers: await this.requestWithToken(),
        body: JSON.stringify(data),
      })
      const response = await res.json()
      return response
    } catch (e) {
      console.log('Error while making postJSON in base.service.ts: ', e)
    }
  }

  putJSON = async (url, data, stringify) => {
    try {
      let res = await fetch(config.apiEndpoint + url, {
        method: 'PUT',
        // headers: await this.requestWithToken(),
        body: JSON.stringify(data),
      })
      return await res.json()

    } catch (e) {
      console.log('Error while making putJSON in base.service.ts: ', e)
    }
  }

  deleteJSON = async (url, params) => {
    try {
      let res = await fetch(
          this.MAIN_API + url + `${objectToUrlParams(params)}`,
        {
          method: 'DELETE',
          // headers: await this.requestWithToken(),
        },
      )
      return await res.json()
    } catch (e) {
      console.log('Error while making deleteJSON in base.service.ts: ', e)
    }
  }

  checkConnection = async () => {
    return await NetInfo.isConnected.fetch()
  }
}
