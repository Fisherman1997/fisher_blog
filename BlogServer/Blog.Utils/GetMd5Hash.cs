using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Utils
{
    public class GetMd5Hash
    {
        // 使用 MD5 加密密码
        public static string Md5HashPassword(string password)
        {
            using (var md5 = MD5.Create())
            {
                // 将密码转换为字节数组
                byte[] inputBytes = Encoding.UTF8.GetBytes(password);
                // 计算 MD5 哈希值
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // 将字节数组转换为十六进制字符串
                StringBuilder sb = new StringBuilder();
                foreach (byte b in hashBytes)
                {
                    sb.Append(b.ToString("x2"));  // "x2"表示以十六进制格式输出，且每个字节两位
                }
                return sb.ToString();
            }
        }
    }
}
