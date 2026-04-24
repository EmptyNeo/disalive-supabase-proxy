module.exports = async function (server, options, done) {
  server.post("/signup", options, async function (req, res) {
    const { email, password } = req.body;
    const { error, data } = await server.supabaseAuth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw server.httpErrors.createError(400, error);
    }

    return { uid: data.user.id };
  });

  server.post("/signin", options, async function (req, res) {
    const { error, data } = await server.supabaseAuth.signIn({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      throw server.httpErrors.createError(400, error);
    }

    const { id, aud, email, app_metadata, role, user_metadata } = data.user;

    const payloadData = {
      sub: id,
      aud,
      email,
      app_metadata,
      role,
      user_metadata,
    };

    const payload = await server.jwt.sign(payloadData, {
      expiresIn: options.config.maxAge,
    });

    return res.setCookie("__auth", payload, options.config).send({ uid: id });
  });

  done();
};
