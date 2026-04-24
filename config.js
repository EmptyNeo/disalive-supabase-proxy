module.exports = {
  supabaseUrl: "https://cwdrpuojiwsjxgdpdxqo.supabase.co",
  cookieConfig: {
    secret: "some_cookie_secret",  // можно оставить любое значение
    path: "/"
  },
  proxyConfig: {
    anonApiKey: "sb_publishable_HZb6vCppc7zxYSZDaagv3w_hhsZg80Q",
  },
  gatewayConfig: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080
  },
  serverConfig: {
    logger: true
  }
};