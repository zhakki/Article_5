const Role = require("./models/role"); // путь к модели роли
const sequelize = require("./config/database");

const seedRoles = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected for role seeding...");

    await Role.sync(); // Убедимся, что таблица существует

    const roles = ["admin", "user"];

    for (const name of roles) {
      const [role, created] = await Role.findOrCreate({ where: { name } });
      if (created) {
        console.log(`Role '${name}' created.`);
      } else {
        console.log(`Role '${name}' already exists.`);
      }
    }

    console.log("✅ Roles seeding done.");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    process.exit(1);
  }
};

seedRoles();
