using Blog.Utils.config;

namespace Blog.Utils
{
    public class GlobalContext
    {
        public static SystemConfig? systmConfig;

        public static EmailConfig? emailConfig;

        public static JwtConfig? jwtConfig;

        public static string? wwwrooturl;
    }
}
