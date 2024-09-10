import { post } from "../index";
export default function audit() {
  return {
    list(data: { begiontime: string; endtime: string }) {
      return post("/api/AuditData/GetAuditSurvey", data);
    },
  };
}
