import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexUsers = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/users-list/',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showUser = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/users-list/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
