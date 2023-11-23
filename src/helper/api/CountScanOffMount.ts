export const CountScanOffMount = (row: []) => {
  const resultData: any = [];

  const countMap: any = {};

  row.forEach((item: any) => {
    const { EmployeeID, AccessDate } = item;
    const existingEntry = resultData.find(
      (entry: any) => entry.EmployeeID === EmployeeID
    );

    if (existingEntry) {
      existingEntry.count++;
    } else {
      resultData.push({ EmployeeID, count: 1 });
    }
  });
  
  return resultData;
};
