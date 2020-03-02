/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const { sequelize, User } = require('./models/');

(async function() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await User.create({ login: 'Yevhen', password: 'fgfgfgf', token: 'dfdf' });
  await User.create({ login: 'Oleh', password: 'fgfg', token: 'dfd' });
  await User.create({ login: 'Vitalii', password: 'fff', token: 'df' });

  const findUser = await User.findOne({ where: { login: 'Yevhen' } });

  const destroyUser = await User.destroy({ where: { login: 'Vitalii' } });

  const updateUser = await User.update({ password: 'fg' }, { where: { login: 'Oleh' } });

  try {
    await sequelize.close();
    console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
})();
