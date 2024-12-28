
namespace Blog.Utils
{
    public enum ResultCodeEnum
    {
        Success = 200,
        error = 500
    }

    public struct ResultStruct
    {
        public ResultCodeEnum StatusCode { get; set; }
        public string Remarks { get; set; }
        public string? Error { get; set; }
    }
    public struct ResultStruct<T>
    {
        public ResultCodeEnum StatusCode {  get; set; }
        public string Remarks { get; set; }
        public T? Result { get; set; }
        public string? Error { get; set; }
    }
    public class ResultFun
    {
        public static ResultStruct success() 
        {
            return new ResultStruct
            {
                StatusCode = ResultCodeEnum.Success,
                Remarks = "成功"
            };
        }
        public static ResultStruct<T> success<T>(T result)
        {
            return new ResultStruct<T>
            {
                StatusCode = ResultCodeEnum.Success,
                Remarks = "成功",
                Result = result
            };
        }
        public static ResultStruct error(string? Remarks = "失败", string? ex = null)
        {
            return new ResultStruct
            {
                StatusCode = ResultCodeEnum.error,
                Remarks = Remarks!,
                Error = ex
            };
        }

        public static ResultStruct<T> error<T>(string? Remarks = "失败", string? ex = null)
        {
            return new ResultStruct<T>
            {
                StatusCode = ResultCodeEnum.error,
                Remarks = Remarks!,
                Error = ex
            };
        }

        public static ResultStruct<TRsult> Return<TParam, TRsult>(TParam param, Func<TParam, TRsult> fun)
        {
            try
            {
                var result = fun(param);
                return success(result);
            }
            catch (Exception ex) {
                return error<TRsult>(ex.Message,ex.ToString());
            }
        }
        public static ResultStruct Return<TParam>(TParam param, Action<TParam> fun)
        {
            try
            {
                fun(param);
                return success();
            }
            catch (Exception ex)
            {
                return error(ex.Message,ex.ToString());
            }
        }
        public static ResultStruct<TRsult> Return<TRsult>(Func<TRsult> fun)
        {
            try
            {
                var result = fun();
                return success(result);
            }
            catch (Exception ex)
            {
                return error<TRsult>(ex.Message, ex.ToString());
            }
        }
        public static ResultStruct Return(Action fun)
        {
            try
            {
                fun();
                return success();
            }
            catch (Exception ex)
            {
                return error(ex.Message, ex.ToString());
            }
        }

        public static async Task<ResultStruct<TRsult>> AsyncReturn<TParam, TRsult>(TParam param, Func<TParam, Task<TRsult>> fun)
        {
            try
            {
                var result = await fun(param);
                return success(result);
            }
            catch (Exception ex)
            {
                return error<TRsult>(ex.Message,ex.ToString());
            }
        }
        public static async Task<ResultStruct> AsyncReturn<TParam>(TParam param, Func<TParam, Task> fun)
        {
            try
            {
                await fun(param);
                return success();
            }
            catch (Exception ex)
            {
                return error(ex.Message,ex.ToString());
            }
        }

        public static async Task<ResultStruct<TRsult>> AsyncReturn<TRsult>(Func<Task<TRsult>> fun)
        {
            try
            {
                var result = await fun();
                return success(result);
            }
            catch (Exception ex)
            {
                return error<TRsult>(ex.Message, ex.ToString());
            }
        }
        public static async Task<ResultStruct> AsyncReturn(Func<Task> fun)
        {
            try
            {
                await fun();
                return success();
            }
            catch (Exception ex)
            {
                return error(ex.Message, ex.ToString());
            }
        }
    }
}
