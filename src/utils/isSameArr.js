export default function isSameArr(oldArr, newArr) {
  let flag = true;
  if (oldArr.length !== newArr.length) {
    flag = false;
  } else {
    for (let i = 0; i < oldArr.length; i++) {
      if (oldArr[i] !== newArr[i]) {
        flag = false;
      }
    }
  }
  return flag
}
