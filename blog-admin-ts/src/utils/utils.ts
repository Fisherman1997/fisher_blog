/**
 * 复制属性并排除指定属性及类型不一致的属性
 * @param element 目标对象（需要被赋值的对象）
 * @param param 被复制对象，可能不包含 element 中的所有属性
 * @param excludes 需要排除的属性名集合
 */
export const assignProps = <
    TElement extends Record<string, unknown>,
    TParam extends Partial<TElement> | Record<string, unknown>,
>(
    element: TElement,
    param: TParam,
    excludes?: (keyof TElement)[],
): void => {
    for (const key in element) {
        if (excludes?.includes(key)) continue
        if (!(key in param)) continue
        if (typeof element[key] !== typeof param[key]) continue
        element[key] = param[key] as unknown as TElement[typeof key]
    }
}
