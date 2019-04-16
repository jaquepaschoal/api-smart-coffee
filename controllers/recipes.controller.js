const { Recipes } = require("../models");
const authService = require("../services/auth.service");
const { to, ReE, ReS } = require("../services/util.service");

const create = async function(req, res) {
  const body = req.body;

  if (!body.unique_key && !body.name && !body.email) {
    return ReE(res, "Please enter an name or email to register.");
  } else {
    let err, client;

    [err, client] = await to(authService.createClient(body));

    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully created new user.",
        client: client.toWeb(),
        token: client.getJWT()
      },
      201
    );
  }
};
module.exports.create = create;

const get = async function(req, res) {
  Recipes.findAll().then(recipes => {
    return ReS(res, { recipes: recipes });
  });
};
module.exports.get = get;

const login = async function(req, res) {
  const body = req.body;
  let err, client;

  [err, client] = await to(authService.authClient(body));
  if (err) return ReE(res, err, 422);

  return ReS(res, { token: Client.getJWT(), client: Client.toWeb() });
};
module.exports.login = login;
