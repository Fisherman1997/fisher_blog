﻿namespace Blog.Utils.config
{
    public class JwtConfig
    {
        public required string Key { get; set; }
        public required string Issuer { get; set; }
        public required string Audience { get; set; }
    }
}
