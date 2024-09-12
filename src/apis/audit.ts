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
    cityTree(data: {collectTime: string; type: string}): Promise<{
      data: cityTreeResult[];
    }> {
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
      return post(`/api/AuditData/GetAuditLeftTree?rnd=${Math.random()}`, formData);
    },
    source(data?: AuditSouceParams) {
      return post("/api/AuditData/GetAuditSource", data || {});
    },
  };
}
