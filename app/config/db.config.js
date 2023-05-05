module.exports = {
  HOST: "bd_backend",

  USER: "postgres",

  PASSWORD: "123456",

  DB: "bdpwb",

  dialect: "postgres",

  pool: {
    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
};
