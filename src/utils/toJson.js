import * as XLSX from 'xlsx'

export default function toJson(data) {
  //读取FILE中的数据（变为JSON格式）
  const workbook = XLSX.read(data, { type: "binary" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(worksheet);
  return json;
}
