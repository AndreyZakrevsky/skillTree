let axios = require('axios')
let baseURL = 'http://sandbox.skilltree.at/api'

axios.defaults.baseURL = baseURL
axios.interceptors.request.use(config => {
  if (['post', 'put'].includes(config.method)) {
    config.method = 'get'
    config.baseURL = ''
    config.url = ''
  }
  return config
}, error => Promise.reject(error))

import Helpers from '~/assets/js/helpers'

let headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

let mapFields = {
  descr: 'description',
  invisible: 'isInvisible',
  level: 'starCount',
}

export default {
  async getBadgesTree() {
    let {data} = await axios.get('badges/tree')
    let data2 = (data[0])
    return data2
  },
}
