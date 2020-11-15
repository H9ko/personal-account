module.exports = () => {
  const faker = require('faker');
  faker.locale = "ru";
  const data = { users: [] };
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.users.push({
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      phone: faker.phone.phoneNumberFormat(),
    });
  }
  return data;
};
