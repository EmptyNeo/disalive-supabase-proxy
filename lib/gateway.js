const fp = require("fastify-plugin");

async function plugin(server, config) {
  // Маршрут для проверки, что прокси вообще жив
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  server
    .register(require("@fastify/sensible"))
    .register(require("@fastify/cookie"))

    // API (REST)
    // Когда Flutter шлет /rest/v1/..., прокси отправит это на supabase.co/rest/v1/...
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/rest`,
      prefix: "/rest",
      config: config.proxyConfig,
    })

    // Storage
    // Когда Flutter шлет /storage/v1/..., прокси отправит это на supabase.co/storage/v1/...
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/storage`,
      prefix: "/storage",
      config: config.proxyConfig,
    })

    // Auth
    // Когда Flutter шлет /auth/v1/..., прокси отправит это на supabase.co/auth/v1/...
    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/auth`,
      prefix: "/auth",
      config: config.proxyConfig,
    });

  server.addHook("onRequest", async (req) => {
    // Это оставим для отладки в логах Render
    req.log.info({ url: req.url }, "Incoming request to proxy");
  });
}

module.exports = fp(plugin);