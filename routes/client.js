const express = require("express");
const router = express.Router();
const model = require("../models/index");
const jwt = require("jsonwebtoken");

const ClientController = require("../controllers/client.controller");

//User signin route - create a token and return to user
router.post("/login", ClientController.login);
router.post("/", ClientController.create);

/* GET users listing. */
router.get("/", function(req, res, next) {
  model.Client.findAll({})
    .then(users =>
      res.json({
        error: false,
        data: users
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
});

// router.put("/:id", function(req, res, next) {
//   const userId = req.params.id;
//   const { name, cpf, date_of_birth } = req.body;
//   model.Client.update(
//     {
//       name: name,
//       cpf: cpf,
//       date_of_birth: date_of_birth
//     },
//     {
//       where: {
//         id: userId
//       }
//     }
//   )
//     .then(user =>
//       res.status(201).json({
//         error: false,
//         message: "user has been updated"
//       })
//     )
//     .catch(error =>
//       res.json({
//         error: true,
//         error: error
//       })
//     );
// });

// router.delete("/:id", function(req, res, next) {
//   const userId = req.params.id;
//   model.Client.destroy({
//     where: {
//       id: userId
//     }
//   })
//     .then(status =>
//       res.status(201).json({
//         error: false,
//         message: "user has been delete."
//       })
//     )
//     .catch(error =>
//       res.json({
//         error: true,
//         error: error
//       })
//     );
// });

module.exports = router;
