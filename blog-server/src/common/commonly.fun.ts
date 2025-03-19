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

/**
 * 复制属性并排除指定属性及类型不一致的属性
 * @param element 目标对象（需要被赋值的对象）
 * @param param 被复制对象，可能不包含 element 中的所有属性
 * @param excludes 需要排除的属性名集合
 */
export const assignProps = <
    TElement extends Record<string, any>,
    TParam extends (Partial<TElement> | Record<string, any>)
>(
    element: TElement,
    param: TParam,
    excludes?: (keyof TElement)[]
): void => {
    for (const key in element) {
        if (excludes?.includes(key)) continue;
        if (!(key in param)) continue;
        if (typeof element[key] !== typeof param[key]) continue;
        element[key] = param[key] as unknown as TElement[typeof key];
    }
};









