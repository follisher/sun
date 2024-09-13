type AuditParams = {
  begiontime: string;
  endtime: string;
};

type AduitResult = {
  wsh: number;
  sh: number;
  sb: number;
  fhth: number;
};

type AduitDetailParams = {
  begiontime: string;
  endtime: string;
  areapath: string;
  statetype: "audit";
  state: 0 | "shenhe" | "shangbao" | "tuihui";
};

type AduitDetailResults = {
  stationname: string;
  stationid: number;
  collecttime: string;
  open: boolean;
};

type AuditSouceParams = {
  begiontime: string;
  stationid: number | string;
  stationname: string;
  state: "audit";
  smallstate: number;
};

type AuditSourceResults = {
  stationname: string;
  stationid: number;
  collecttime: string;
  NOX_V: number;
  NO_V: number;
  areaid: number;
  areapath: string;
  auditstate: string;
  auditstate1: string;
  co_audit_val: number;
  co_auditstate: string;
  co_state: string;
  co_val: number;
  co_valstate: string;
  fhzt: number;
  fuhestate: string;
  no2_audit_val: number;
  no2_auditstate: string;
  no2_state: string;
  no2_val: number;
  no2_valstate: string;
  o3_audit_val: number;
  o3_auditstate: string;
  o3_state: string;
  o3_val: number;
  o3_valstate: string;
  pm10_audit_val: number;
  pm10_auditstate: string;
  pm10_state: string;
  pm10_val: number;
  pm10_valstate: string;
  pm25_audit_val: number;
  pm25_auditstate: string;
  pm25_state: string;
  pm25_val: number;
  pm25_valstate: string;
  shendingstate: string;
  shzt: number;
  smallstate: string;
  so2_audit_val: number;
  so2_auditstate: string;
  so2_state: string;
  so2_val: number;
  so2_valstate: string;
  statename: string;
};

type CitiesResult = {
  name: string;
  nodecode: string;
};

type cityTreeResult = {
  key: string;
  title: string;
  id: string;
  pId: string;
  name: string;
  open: boolean;
  children?: cityTreeResult[];
};
