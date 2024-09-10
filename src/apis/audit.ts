import { post } from "../server";

export default function auditApi() {
  return {
    list(data: { begiontime: string; endtime: string }): Promise<{
      data: AduitResult[]
    }> {
      return post("/api/AuditData/GetAuditSurvey", data);
    },
    detail(data: {
      begiontime: string;
      endtime: string;
      areapath: string;
      statetype: "audit";
      state: number;
    }) {
      return post("/api/AuditData/GetAuditDataDay", data);
    },
  };
}
