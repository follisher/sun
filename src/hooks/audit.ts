import { useState } from "react";
import auditApi from "../apis/audit";
import { FetchState } from "../main";

export const useAudit = () => {
  const [audits, setAudits] = useState<AduitResult[]>([]);
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function getAuditList(params: AuditParams) {
    setFetchState(FetchState.Processing);
    auditApi()
      .list(params)
      .then(({ data }) => {
        setAudits(data);
        setFetchState(FetchState.Success);
      })
      .catch(() => {
        setFetchState(FetchState.Fail);
      });
  }

  return { getAuditList, audits, fetchState };
};

export const useAuditDetail = () => {
  const [auditDetails, setAuditDetail] = useState<AduitDetailResults[]>([]);
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function getAuditDetail(params?: AduitDetailParams) {
    setFetchState(FetchState.Processing);
    auditApi()
      .detail(params)
      .then(({ data }) => {
        setAuditDetail(data);
        setFetchState(FetchState.Success);
      })
      .catch(() => {
        setFetchState(FetchState.Fail);
      });
  }

  return { getAuditDetail, auditDetails, fetchState };
};

export const useAuditSave = () => {
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function saveAudit(data: AuditDataType) {
    setFetchState(FetchState.Processing);
    auditApi()
      .save(data)
      .then(() => {
        setFetchState(FetchState.Success);
      })
      .catch(() => {
        setFetchState(FetchState.Fail);
      });
  }

  return { saveAudit, fetchState };
};

export const useCityTree = () => {
  const [citieTree, setCitieTree] = useState<CityTreeResult[]>([]);
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function getCitieTree(params: { collectTime: string; type: string }) {
    setFetchState(FetchState.Processing);
    auditApi()
      .cityTree(params)
      .then(({ data }) => {
        setCitieTree(data);
        setFetchState(FetchState.Success);
      })
      .catch(() => setFetchState(FetchState.Fail));
  }

  return { getCitieTree, citieTree, fetchState };
};

export const useAuditSource = () => {
  const [auditSources, setAuditSources] = useState<AuditSourceResults[]>([]);
  const [fetchState, setFetchState] = useState(FetchState.Pending);
  async function getAuditSource(params: AuditSouceParams) {
    setFetchState(FetchState.Processing);
    auditApi()
      .source(params)
      .then(({ data }) => {
        setAuditSources(data);
        setFetchState(FetchState.Success);
      })
      .catch(() => setFetchState(FetchState.Fail));
  }

  return { getAuditSource, auditSources, fetchState };
};
