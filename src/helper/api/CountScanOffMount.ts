export const CountScanOffMount = (row: []) => {
    const count:any = [];
    const countMap:any = {};
    
    row.forEach((entry:any) => {
      const employeeID = entry.EmployeeID;
      if (!countMap[employeeID]) {
        countMap[employeeID] = 1;
      } else {
        countMap[employeeID]++;
      }
    });
    
    for (const employeeID in countMap) {
      count.push({
        "EmployeeID": employeeID,
        "count": countMap[employeeID]
      });
    }
    
    return count
};
