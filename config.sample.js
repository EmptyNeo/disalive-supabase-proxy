module.exports = {
  // Can be obtained from Supabase > Settings > API
  supabaseUrl: "",
  supabaseJwtSecret: "",
  // The cookie name is always "__auth"
  cookieConfig: {
    // Modify cookie config below to suite your client-side app, using strong defaults
    domain: process.env.NODE_ENV === "production" ? "" : "localhost",
    path: "/",
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
    sameSite: true,
    // Defaults to 7 days
    maxAge: 7 * 86400,
  },
  proxyConfig: {
    // Enable if using the official supabase-js client
    officialClient: false,
    // Enable cookie parsing if you want to proxy with cookies
    cookieParsing: true,
    // Can be obtained from Supabase > Settings > API
    anonApiKey: "",
  },
  serverConfig: {
    // Accepts Pino.js options for additional logger transports
    logger: true,
  },
  gatewayConfig: {
    port: 3000,
  },
};
