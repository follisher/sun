import { post } from '../index'
export default function audit() {
  return {
    list() {
      const data = {
        begiontime: '2024-09-02',
        endtime: '2024-09-09'
      }
      return post('/api/AuditData/GetAuditSurvey', data)
    }
  }
}