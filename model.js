const Sequelize = require('sequelize');

const db = new Sequelize({
  database: 'ruksak_db',
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

class Gear extends Sequelize.Model {}
Gear.init({
  gear: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'gear'
});

Gear.belongsToMany(Type, { through: 'trip_gear' });
Trip.belongsToOne(Gear, { through: 'trip_gear' });

class Location extends Sequelize.Model {}
Location.init({
  location: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'location'
});

class Trip extends Sequelize.Model {}
Trip.init({
  trip: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'trip'
});

Trip.belongsToMany(User, { through: 'user_trips' });
User.belongsToOne(Trip, { through: 'user_tips' });

class User extends Sequelize.Model {}
User.init({
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING
}, {
  sequelize: db,
  modelName: 'user'
});

module.exports = {
  db,
  Gear,
  Location,
  User
};
