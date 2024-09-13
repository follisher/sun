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
  const [auditDetails, setAuditDetail] = useState<AduitDetailResults[]>([]);

  async function getAuditDetail(params?: AduitDetailParams) {
    const { data } = await auditApi().detail(params);
    setAuditDetail(data);
  }

  return { getAuditDetail, auditDetails };
};

export const useCityTree = () => {
  const [citieTree, setCitieTree] = useState<cityTreeResult[]>([]);

  async function getCitieTree(params: { collectTime: string; type: string }) {
    const { data } = await auditApi().cityTree(params);
    setCitieTree(data);
  }

  return { getCitieTree, citieTree };
};

export const useAuditSource = () => {
  const [auditSources, setAuditSources] = useState<AuditSourceResults[]>([]);

  async function getAuditSource(params: AuditSouceParams) {
    const { data } = await auditApi().source(params);
    setAuditSources(data);
  }

  return { getAuditSource, auditSources };
};
