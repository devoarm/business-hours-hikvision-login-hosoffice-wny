export const loopDateAuth8 = (
    type: "mIn" | "mOut" | "aIn" | "aOut" | "nIn" | "nOut",
    ym: string
  ) => {
    var sql = ``;
    for (let index = 1; index < 32; index++) {
      let stringIndex = ``;
      index < 10 ? (stringIndex = `0${index}`) : (stringIndex = `${index}`);
  
      if (type == "mIn") {
        sql += `MIN(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "IN" THEN hik.AccessTime END) as mIn${index} ,`;
      } else if (type == "mOut") {
        sql += `MAX(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "OUT" THEN hik.AccessTime END) as mOut${index} ,`;
      } else if (type == "aIn") {
        sql += `MIN(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "IN" THEN hik.AccessTime END) as aIn${index} ,`;
      } else if (type == "aOut") {
        sql += `MAX(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "OUT" THEN hik.AccessTime END) as aOut${index} ,`;
      } else if (type == "nIn") {
        sql += `MIN(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "IN" THEN hik.AccessTime END) as nIn${index} ,`;
      } else if (type == "nOut") {
        sql += `MAX(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}' AND hik.AuthenticationResult = "OUT" THEN hik.AccessTime END) as nOut${index} ,`;
      }
    }
    return sql;
  };
  