import dayjs from "dayjs";

export const loopCol8 = (countDate: number, selectMonth: string) => {
  const arr: Array<any> = [];
  for (let index = 0; index < countDate; index++) {
    arr.push({
      title: `${index + 1} (${dayjs(`${selectMonth}-${index + 1}`)
        .locale("th")
        .format("dddd")})`,
      children: [
        {
          title: "เช้า",
          children: [
            {
              title: "เข้างาน",
              dataIndex: `mIn${index + 1}`,
              key: `mIn${index + 1}`,
              width: 100,
            },
            {
              title: "ออกงาน",
              dataIndex: `mOut${index + 1}`,
              key: `mOut${index + 1}`,
              width: 100,
            },
          ],
        },
        {
          title: "บ่าย",
          children: [
            {
              title: "เข้างาน",
              dataIndex: `aIn${index + 1}`,
              key: `aIn${index + 1}`,
              width: 100,
            },
            {
              title: "ออกงาน",
              dataIndex: `aOut${index + 1}`,
              key: `aOut${index + 1}`,
              width: 100,
            },
          ],
        },
        {
          title: "ดึก",
          children: [
            {
              title: "เข้างาน",
              dataIndex: `nIn${index + 1}`,
              key: `nIn${index + 1}`,
              width: 100,
            },
            {
              title: "ออกงาน",
              dataIndex: `nOut${index + 1}`,
              key: `nOut${index + 1}`,
              width: 100,
            },
          ],
        },
      ],
    });
  }
  return arr;
};
