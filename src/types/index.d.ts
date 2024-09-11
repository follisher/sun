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
};

type AuditSouceParams = {
  begiontime: string;
  stationid: number;
  stationname: string;
  state: "audit";
  smallstate: number;
};

type CitiesResult = {
  name: string;
  nodecode: string;
};
