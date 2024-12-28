// 常用的一些方法


   // 获取当前时间并格式化   YYYY-MM-DD HH:MM:SS
export const formatTime = <T>(): T => {
    let dateStr: string | string[] = new Date().toLocaleString().split('/').join('-')
    dateStr = dateStr.split(' ')
    dateStr[0] = dateStr[0].split('-').map(item => Number(item) < 10 ? 0 + item : item).join('-')
    dateStr = dateStr.join(' ')
    return dateStr as T
}

// 提前字符串当中的所以汉字
export const GetChinese = (strValue: string): string => {
    if (strValue !== null && strValue !== '') {
      const reg = /[\u4e00-\u9fa5]/g;
      return strValue.match(reg).join('');
    }
    return '';
}






















