const { Client } = require("../models");
const validator = require("validator");
const { to, TE } = require("../services/util.service");

const getUniqueKeyFromBody = function(body) {
  let unique_key = body.unique_key;
  if (typeof unique_key === "undefined") {
    if (typeof body.email != "undefined") {
      unique_key = body.email;
    } else if (typeof body.name != "undefined") {
      unique_key = body.name;
    } else {
      unique_key = null;
    }
  }

  return unique_key;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createClient = async clientInfo => {
  let unique_key, auth_info, err;

  auth_info = {};
  auth_info.status = "create";

  unique_key = getUniqueKeyFromBody(clientInfo);
  if (!unique_key) TE("An email or name was not entered.");

  if (validator.isEmail(unique_key)) {
    auth_info.method = "email";
    clientInfo.email = unique_key;

    [err, client] = await to(Client.create(clientInfo));
    console.log(err);
    if (err) TE("Client already exists with that email.");

    return client;
  } else {
    TE("A valid email was not entered.");
  }
};
module.exports.createClient = createClient;

const authClient = async function(clientInfo) {
  //returns token
  let unique_key;
  let auth_info = {};
  auth_info.status = "login";
  unique_key = getUniqueKeyFromBody(clientInfo);

  if (!unique_key) TE("Please enter an email to login");

  let client;
  if (validator.isEmail(unique_key)) {
    auth_info.method = "email";

    [err, client] = await to(Client.findOne({ where: { email: unique_key } }));
    if (err) TE(err.message);
  } else {
    TE("A valid email was not entered.");
  }

  if (!client) TE("Not registered");

  return client;
};
module.exports.authClient = authClient;
