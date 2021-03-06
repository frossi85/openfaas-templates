import {RESTDataSource} from 'apollo-datasource-rest'
import {toPairs} from 'lodash'

export default class InvertiFacilDataSource extends RESTDataSource {
  baseURL = 'https://frossi85.invertifacil.com.ar'

  willSendRequest(request) {
    const headersToTransfer = [
      'Authorization', 'authorization', 'x-hasura-role', 'x-hasura-user-id', 'x-admin-api-key', 'x-with-user-id',
      'x-backend-api-key', 'x-request-id'
    ]

    request.headers.set('Content-Type', 'application/json')

    toPairs(this.context.headers)
      .filter(([key]) => headersToTransfer.includes(key))
      .map(([key, value]) => request.headers.set(key, value))
  }
}
