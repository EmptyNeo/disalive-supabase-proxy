module.exports = {
  supabaseUrl: "https://cwdrpuojiwsjxgdpdxqo.supabase.co",
  proxyEndpoint: "/proxy",
  gatewayConfig: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080
  }
};