const fp = require("fastify-plugin");

async function plugin(server, config) {
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  server
    .register(require("@fastify/sensible"))
    .register(require("@fastify/cookie"))

    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/rest/v1`,
      prefix: "/proxy",
      rewritePrefix: "/rest/v1",
      config: config.proxyConfig,
    })

    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/storage/v1`,
      prefix: "/storage",
      rewritePrefix: "/storage/v1",
      config: config.proxyConfig,
    })

    .register(require("@fastify/http-proxy"), {
      upstream: `${config.supabaseUrl}/auth/v1`,
      prefix: "/auth",
      rewritePrefix: "/auth/v1",
      config: config.proxyConfig,
    });

  server.addHook("onRequest", async (req) => {
    req.log.info({ req }, "incoming request");
  });
}

module.exports = fp(plugin);