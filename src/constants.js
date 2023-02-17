export const keyTypes = {
  br: "Integer",
  bl: "Integer",
  bs: "Boolean",
  cid: "String",
  d: "Integer",
  dl: "Integer",
  mtp: "Integer",
  nor: "String",
  nrr: "String",
  ot: "Token",
  pr: "Integer",
  rtp: "Integer",
  sf: "Token",
  sid: "String",
  st: "Token",
  su: "Boolean",
  tb: "Integer",
  v: "Integer",
};

export const errorTypes = {
  "unknown-key": "Key is not part of reserved keys",
  "invalid-value": "Value does not meet requirements",
  "wrong-type-value": "Value type is incorrect",
  "incorrect-format": "Format is incorrect",
  "parameter-encoding": "Parameter is not encoded",
  "missing-key": "Key is missing",
  "invalid-header": "Header is not valid",
  "invalid-json": "Json format is not valid",
  "dupliated-key": "Key/Keys are not unique"
};
