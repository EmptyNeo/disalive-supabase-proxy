const fp = require("fastify-plugin");

async function plugin(server, config) {
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  server
    .register(require("@fastify/sensible"))
    .register(require("@fastify/cookie"))
    .register(require("@fastify/http-proxy"), {
      upstream: config.supabaseUrl,
      prefix: "/",
      websocket: true,  // ← меняем на true
      config: config.proxyConfig,
    });

  server.addHook("onRequest", async (req) => {
    req.log.info({ url: req.url }, "Proxying request");
  });
}

module.exports = fp(plugin);