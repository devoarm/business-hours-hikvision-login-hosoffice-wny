export const loopDateAuth = (
  type: "morning" | "afternoon" | "late",
  ym: string
) => {
  var sql = ``;
  for (let index = 1; index < 32; index++) {
    let stringIndex = ``;
    index < 10 ? (stringIndex = `0${index}`) : (stringIndex = `${index}`);

    if (type == "morning") {
      sql += `MIN(CASE WHEN hik.authDate = '${ym}-${stringIndex}'THEN hik.authTime END) as ds${index} ,`;
    } else if (type == "afternoon") {
      sql += `MAX(CASE WHEN hik.authDate = '${ym}-${stringIndex}'THEN hik.authTime END) as de${index} ,`;
    }
  }
  return sql;
};
