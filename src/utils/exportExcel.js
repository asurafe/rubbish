import * as XLSX from "xlsx";
import moment from "moment";

export default function teaModel() {
  let array = [["组织ID", "智慧云空间", "智慧云人数"]];
  let sheet = XLSX.utils.aoa_to_sheet(array);
  let blob = sheet2blob(sheet, "sheet1");
  openDownloadXLSXDialog(
    blob,
    `批量创建合同模板${moment(Date.now()).format("YYYYMMDD")}.xlsx`
  );
}

//导出excel相关函数
function sheet2blob(sheet, sheetName) {
  //将文件转换为二进制文件
  sheetName = sheetName || "sheet1";
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  let wopts = {
    bookType: "xlsx", // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  let wbout = XLSX.write(workbook, wopts);
  let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  return blob;
}

// 字符串转ArrayBuffer
function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

//下载模板文件
function openDownloadXLSXDialog(url, saveName) {
  if (typeof url == "object" && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }

  let aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || "";
  let event;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}



