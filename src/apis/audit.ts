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
    cityTree(): Promise<{
      data: cityTreeResult[];
    }> {
      return post("/api/AuditData/GetAuditLeftTree", { rnd: Math.random() });
    },
    source(data?: AuditSouceParams) {
      return post("/api/AuditData/GetAuditSource", data || {});
    },
  };
}
