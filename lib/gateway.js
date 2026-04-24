const fp = require("fastify-plugin");

async function plugin(server, config) {
  // 1. Сначала регистрируем проверку здоровья. 
  // Она должна быть первой, чтобы прокси не перехватил этот путь.
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  server
    .register(require("@fastify/sensible"))
    .register(require("@fastify/cookie"))

    // 2. Универсальный прокси для ВСЕХ путей.
    // Теперь любой запрос (будь то /auth/v1, /rest/v1 или /storage/v1)
    // будет просто перенаправлен на твой Supabase URL.
    .register(require("@fastify/http-proxy"), {
      upstream: config.supabaseUrl,
      prefix: "/", // Слушаем корень
      config: config.proxyConfig,
    });

  server.addHook("onRequest", async (req) => {
    req.log.info({ url: req.url }, "Proxying request");
  });
}

module.exports = fp(plugin);