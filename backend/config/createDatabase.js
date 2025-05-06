const sequelize = require("./database");
const models = require("../models");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ Database synced!");

    await models.Role.create({ name: "admin" });
    await models.Role.create({ name: "user" });

    await models.User.create({
      email: "admin@example.com",
      username: "admin",
      password: "admin123",
      role_id: 1,
    });

    console.log("✅ Initial roles and admin user created!");
  } catch (error) {
    console.error("❌ Error during DB sync:", error);
  }
})();
