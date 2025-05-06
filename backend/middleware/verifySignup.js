const models = require("../models");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const usernameExists = await models.User.findOne({
      where: { username: req.body.username }
    });
    if (usernameExists) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    const emailExists = await models.User.findOne({
      where: { email: req.body.email }
    });
    if (emailExists) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const checkRoleExisted = async (req, res, next) => {
  if (req.body.role) {
    try {
      const role = await models.Role.findOne({ where: { name: req.body.role } });
      if (!role) {
        return res.status(400).send({
          message: `Failed! Role does not exist = ${req.body.role}`
        });
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted
};
