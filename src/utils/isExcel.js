export default function isExcel(file) {
    const fileNameArr = file.name.split('.');
    const fileName = fileNameArr[fileNameArr.length-1];
    const type = ["xlsx","xls"]
    if(type.includes(fileName)) return true;
    return false;
}