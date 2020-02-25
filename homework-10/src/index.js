const pg = require('./pgClient');

async function newUser(client, login, password, token) {
  const query = await client.query(
    `insert into users(
    login,
    password,
    token
    ) values ($1, $2, $3)`,
    [login, password, token],
  );

  console.log(query);
}

async function deleteUser(client, login) {
  const query = await client.query(
    `delete from users
    where "login" = $1`,
    [login],
  );

  console.log('deleted user:', query);
}

async function updateUser(client, login, password) {
  const query = await client.query(
    `update users set "login" = $1
    where "password" = $2`,
    [login, password],
  );

  console.log(query);
}

async function selectUser(client, token) {
  const { rows } = await client.query(
    `select * from users
    where "token" = $1`,
    [token],
  );

  console.log('Select:', rows);
}

async function start() {
  try {
    await pg.connect();

    await Promise.all([
      newUser(pg, 'Andriy', 'fdfd', '54545n'),
      newUser(pg, 'Yevhen', 'fdfvcfd', '54c545n'),
      newUser(pg, 'Oleh', 'fd', '54545ncvcvc'),
      newUser(pg, 'Vitalii', 'fdd', '5454'),
    ]);

    await deleteUser(pg, 'Oleh');

    await updateUser(pg, 'Orest', 'fdd');

    await selectUser(pg, '54545n');

    pg.end();
  } catch (error) {
    console.error('DB is broken');
  }
}

start();
