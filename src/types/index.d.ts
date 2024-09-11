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
