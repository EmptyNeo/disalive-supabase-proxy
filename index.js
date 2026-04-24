const gateway = require("./lib/gateway");
const config = require("./config");

const main = async () => {
  process.on("uncaughtExceptionMonitor", (error) => {
    console.error(error);
    process.exit(1);
  });

  const server = require("fastify")(config.serverConfig);
  server.register(gateway, config);

  const address = await server.listen(config.gatewayConfig);
  server.log.info(`Server running at: ${address}`);

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.once(signal, () => {
      server.log.info({ signal }, "gracefully shutting down gateway");
      server
        .close()
        .then(() => {
          server.log.info({ signal }, "gateway shutdown");
          process.exit(0);
        })
        .catch((err) => {
          server.log.error({ err }, "error shutting down gateway");
          process.exit(1);
        });
    });
  }
};

main();
