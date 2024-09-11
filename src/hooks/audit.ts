import { useState } from "react";
import auditApi from "../apis/audit";

export const useAudit = () => {
  const [audits, setAudits] = useState<AduitResult[]>([]);

  async function getAuditList(params: AuditParams) {
    const { data } = await auditApi().list(params);
    setAudits(data);
  }

  return { getAuditList, audits };
};

export const useAuditDetail = () => {
  const [auditDetails, setAuditDetail] = useState<AduitResult[]>([]);

  async function getAuditDetail(params?: AduitDetailParams) {
    const { data } = await auditApi().detail(params);
    setAuditDetail(data);
  }

  return { getAuditDetail, auditDetails };
};
