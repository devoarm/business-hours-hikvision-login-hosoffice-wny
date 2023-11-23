export const loopDateAuth = (
  type: "morning" | "afternoon" | "late",
  ym: string
) => {
  var sql = ``;
  for (let index = 1; index < 32; index++) {
    let stringIndex = ``;
    index < 10 ? (stringIndex = `0${index}`) : (stringIndex = `${index}`);

    if (type == "morning") {
<<<<<<< HEAD
      sql += `MIN(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}'THEN hik.AccessTime END) as ds${index} ,`;
    } else if (type == "afternoon") {
      sql += `MAX(CASE WHEN hik.AccessDate = '${ym}-${stringIndex}'THEN hik.AccessTime END) as de${index} ,`;
=======
      sql += `MIN(CASE WHEN hik.authDate = '${ym}-${stringIndex}'THEN hik.authTime END) as ds${index} ,`;
    } else if (type == "afternoon") {
      sql += `MAX(CASE WHEN hik.authDate = '${ym}-${stringIndex}'THEN hik.authTime END) as de${index} ,`;
>>>>>>> ff611081ad271244626ca81b2a2041d29ea7e8b0
    }
  }
  return sql;
};
