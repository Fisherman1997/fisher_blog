export const GetChinese = (strValue) => {
    if (strValue !== null && strValue !== '') {
      const reg = /[\u4e00-\u9fa5]/g;
      return strValue.match(reg).join('');
    }
    return '';
}
