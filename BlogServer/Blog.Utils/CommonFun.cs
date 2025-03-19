
namespace Blog.Utils
{
    public class CommonFun
    {
        /**
         * <summary>复制属性并排除指定属性及类型不一致的属性</summary>
         * <param name="element">目标对象（需要被赋值的对象）</param>
         * <param name="param">原对象（被复制的数据源）</param>
         * <param name="excludes">需要排除的属性名集合</param>
         * <remarks>
         *   1. 仅复制 element 中存在的属性 <br/>
         *   2. 自动忽略 excludes 中指定的属性 <br/>
         *   3. 若同名属性类型不一致则自动跳过
         * </remarks>
         * **/
        public static void AssignProps<TElement, TParam>(
                TElement element,
                TParam param,
                params string[] excludes)
        {
            var excludeSet = excludes != null ? new HashSet<string>(excludes) : new HashSet<string>();
            var elementType = typeof(TElement);
            var paramType = typeof(TParam);

            foreach (var prop in elementType.GetProperties())
            {
                // 跳过排除属性
                if (excludeSet.Contains(prop.Name)) continue;

                // 查找参数对象中的对应属性
                var paramProp = paramType.GetProperty(prop.Name);
                if (paramProp == null) continue;

                // 验证可读写性
                if (!prop.CanWrite || !paramProp.CanRead) continue;

                try
                {
                    // 获取参数值并赋值
                    var value = paramProp.GetValue(param);
                    if (prop.PropertyType.IsAssignableFrom(paramProp.PropertyType))
                    {
                        prop.SetValue(element, value);
                    }
                    else
                    {
                        // 尝试类型转换
                        var convertedValue = Convert.ChangeType(value, prop.PropertyType);
                        prop.SetValue(element, convertedValue);
                    }
                }
                catch
                {
                    // 忽略转换失败（保持与原TypeScript实现相似的静默失败行为）
                }
            }
        }
    }
}
