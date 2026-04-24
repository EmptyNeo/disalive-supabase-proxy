const fp = require("fastify-plugin");

async function plugin(server, config) {
  server
    .register(require("fastify-sensible"))
    .register(require("fastify-jwt"), {
      secret: config.supabaseJwtSecret,
    })
    .register(require("fastify-cookie"))
    .register(require("./plugins/supabase-auth"), {
      supabaseUrl: config.supabaseUrl,
      anonApiKey: config.proxyConfig.anonApiKey,
    })
    .register(require("fastify-http-proxy"), {
      upstream: config.supabaseUrl,
      prefix: "/proxy",
      config: config.proxyConfig,
      preHandler: require("./handlers/proxy"),
    })
    .register(require("./routes/auth"), {
      prefix: "/auth",
      config: config.cookieConfig,
    });

  server.addHook("onRequest", async (req) => {
    req.log.info({ req }, "incoming request");
  });
}

module.exports = fp(plugin);
