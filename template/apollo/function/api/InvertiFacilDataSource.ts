import {RESTDataSource} from 'apollo-datasource-rest'
import {toPairs} from 'lodash'

export default class InvertiFacilDataSource extends RESTDataSource {
  baseURL = 'https://frossi85.invertifacil.com.ar'

  willSendRequest(request) {
    console.log('@@@@@@ willSendRequest', this.context)
    toPairs(this.context.req.headers)
      .map(([key, value]) => request.headers.set(key, value))
  }
}
