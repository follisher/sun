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

type CitiesResult = {
  name: string;
  nodecode: string;
};
