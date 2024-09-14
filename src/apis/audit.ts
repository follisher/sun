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
    cityTree(data: CityTreeParams): Promise<{
      data: CityTreeResult[];
    }> {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key as keyof CityTreeParams]);
      });
      return post(
        `/api/AuditData/GetAuditLeftTree?rnd=${Math.random()}`,
        formData
      );
    },
    source(data?: AuditSouceParams) {
      return post("/api/AuditData/GetAuditSource", data || {});
    },
    save(data: AuditDataType) {
      return post(`/api/AuditData/SaveAuditData?rnd=${Math.random()}`, data);
    },
  };
}
