module.exports = async function (req, _) {
  const config = req.context.config;

  if (!config.officialClient) req.headers.apikey = config.anonApiKey;
  if (config.cookieParsing) {
    req.headers.authorization = `Bearer ${req.cookies["__auth"]}`;
  }
};
