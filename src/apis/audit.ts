import { post } from "../server";

export default function audit() {
  return {
    list(data: { begiontime: string; endtime: string }) {
      return post("/api/AuditData/GetAuditSurvey", data);
    },
    detail() {
      return post(
        "/api/AuditData/GetAuditDataDay?begiontime=2024-09-07&endtime=2024-09-09&areapath=000000_970000_97120000_97122400&key=&state=0&statetype=audit"
      );
    },
  };
}
