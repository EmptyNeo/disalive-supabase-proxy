const fp = require("fastify-plugin");

async function plugin(server, config) {
  server
    .register(require("@fastify/sensible"))
    .register(require("@fastify/cookie"))

    // Прокси для API (REST)
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/rest/v1`,
      prefix: "/proxy",
      config: config.proxyConfig,
    })

    // Прокси для Storage (аватарки, файлы)
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/storage/v1`,
      prefix: "/storage",
      config: config.proxyConfig,
    })

    // Прокси для Auth (если понадобится)
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/auth/v1`,
      prefix: "/auth",
      config: config.proxyConfig,
    });

  // Health check endpoint для мониторинга Render
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  server.addHook("onRequest", async (req) => {
    req.log.info({ req }, "incoming request");
  });
}

module.exports = fp(plugin);