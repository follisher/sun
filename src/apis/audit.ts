import { post } from "../server";

export default function auditApi() {
  return {
    list(data?: AuditParams): Promise<{
      data: AduitResult[];
    }> {
      return post("/api/AuditData/GetAuditSurvey", data || {});
    },
    detail(data?: AduitDetailParams) {
      return post("/api/AuditData/GetAuditDataDay", data || {});
    },
  };
}
