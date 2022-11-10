import bcrypt from "bcrypt";

const hash = bcrypt.hashSync("password", 10);

const User = [
  {
    _id: "626a92e463c8523170450614",
    firstName: "Promise",
    lastName: "Anjola",
    email: "promise@gmail.com",
    password: hash
  },
  {
    _id: "62706201efde3fe73df81519",
    firstName: "Dayo",
    lastName: "Emma",
    email: "dayo@gmail.com",
    password: hash
  }, {
    _id: "624eb07a3c2dafd2b3cf43ea",
    firstName: "Peter",
    lastName: "Buhari",
    email: "peter@gmail.com",
    password: hash
  }, {
    _id: "62706201efde3fe73df81520",
    firstName: "Paul",
    lastName: "James",
    email: "paul@gmail.com",
    password: hash
  }, {
    _id: "62706201efde3fe73df81521",
    firstName: "James",
    lastName: "Ibori",
    email: "james@gmail.com",
    password: hash
  }
];

export default User;
