export const parseDateFromExcel = (value) => {
  return new Date(Date.UTC(0, 0, value, -19));
};

export const formatExcelSchema = () => ({
  Mes: {
    prop: "month",
    type: (value) => {
      try {
        return parseDateFromExcel(value);
      } catch (error) {
        throw new Error("invalid");
      }
    },
    render: (date) => `${date.getMonth() + 1}-${date.getFullYear()}`,
  },
  Nombre: {
    prop: "name",
    type: String,
  },
  ID: {
    prop: "id",
    type: String,
  },
  "Fecha de ingreso": {
    prop: "start_date",
    type: (value) => {
      try {
        return parseDateFromExcel(value);
      } catch (error) {
        throw new Error("invalid");
      }
    },
    render: (date) =>
      `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
  },
  "Sueldo  bruto": {
    prop: "salary",
    type: String,
  },
  División: {
    prop: "division",
    type: String,
  },
  Area: {
    prop: "area",
    type: String,
  },
  Subarea: {
    prop: "sub_area",
    type: String,
  },
  "ID Lider": {
    prop: "leader_id",
    type: String,
  },
  "Nivel Jerárquico": {
    prop: "hierarchical_level",
    type: String,
  },
});
