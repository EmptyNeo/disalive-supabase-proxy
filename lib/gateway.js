const fp = require("fastify-plugin");
const httpProxy = require("@fastify/http-proxy");
const WebSocket = require("ws");

async function plugin(server, config) {
  server.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // HTTP прокси для всех запросов
  server.register(httpProxy, {
    upstream: config.supabaseUrl,
    prefix: "/",
    websocket: false,
    config: config.proxyConfig,
  });

  // WebSocket прокси для Realtime
  server.server.on("upgrade", (req, socket, head) => {
    if (req.url.startsWith("/realtime")) {
      const targetUrl = `${config.supabaseUrl}${req.url}`;
      const ws = new WebSocket(targetUrl, {
        headers: req.headers,
      });

      ws.on("open", () => {
        ws.send(head);
        socket.write("HTTP/1.1 101 Switching Protocols\r\n");
        socket.write("Upgrade: websocket\r\n");
        socket.write("Connection: Upgrade\r\n");
        socket.write("\r\n");
      });

      ws.on("message", (data) => {
        socket.write(data);
      });

      socket.on("data", (data) => {
        ws.send(data);
      });

      socket.on("close", () => ws.close());
      ws.on("close", () => socket.end());
    }
  });

  server.addHook("onRequest", async (req) => {
    req.log.info({ url: req.url }, "Proxying request");
  });
}

module.exports = fp(plugin);