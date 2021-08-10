const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const getNameMonth = (date) => {
  return `${months[date.getMonth()]} - ${date.getFullYear()}`;
};

export const schemaToHeader = (schema) => {
  let result = [];
  for (let key in schema) {
    result.push({
      title: key,
      dataIndex: schema[key].prop,
      key: schema[key].prop,
      render: schema[key].render || null,
    });
  }
  return result;
};

export const isSameMonth = (firstDate, secondDate) => {
  if (!firstDate || !secondDate) {
    return false;
  }
  return (
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getYear() === secondDate.getYear()
  );
};

export const getChildrens = (currentItem, data) => {
  return data.filter((item) => item.leader_id === currentItem.id);
};

export const isLeader = (leader_id, data) => {
  console.log(data.find((item) => item.id === leader_id));
  return !data.find((item) => item.id === leader_id);
};

export const getLeadersFromExcel = (data) => {
  return data.filter((item) => isLeader(item.leader_id, data));
};

/* Funtions for Resume */

export const getNominalTotal = (data) => {
  return data.reduce((total, item) => total + Number(item.salary), 0);
};

export const isHiredThisMonth = (item) => {
  return isSameMonth(item.start_date, item.month);
};

export const getPeopleHired = (data) => {
  return data.filter((item) => isHiredThisMonth(item));
};

export const getLastSalary = (data, currentItem) => {
  let thisMonth = currentItem.month;
  let salaries = data
    .filter(
      (item) =>
        currentItem.id === item.id &&
        thisMonth.getMonth() > item.month.getMonth() &&
        thisMonth.getYear() >= item.month.getYear()
    )
    .sort((a, b) => b.month - a.month);

  return salaries ? salaries.shift() : -1;
};

export const isSalaryIncrease = (data, currentItem) => {
  const lastSalary = getLastSalary(data, currentItem);
  return lastSalary && Number(lastSalary.salary) < Number(currentItem.salary)
    ? lastSalary.salary
    : "";
};
