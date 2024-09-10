import { post } from "../server"

export const publicApi = () => {
  return {
    getCities() {
      return post('/api/AuditData/GetCityTreeJsonData', {rnd: Math.random()})
    }
  }
}