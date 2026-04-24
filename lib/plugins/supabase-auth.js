const fp = require("fastify-plugin");
const { GoTrueClient } = require("@supabase/gotrue-js");

async function supabaseAuth(server, options) {
  const auth = new GoTrueClient({
    url: `${options.supabaseUrl}/auth/v1`,
    headers: {
      apikey: options.anonApiKey,
      Authorization: `Bearer ${options.anonApiKey}`,
    },
  });

  server.decorate("supabaseAuth", auth);
}

module.exports = fp(supabaseAuth, { name: "supabase-auth" });
