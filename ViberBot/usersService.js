const fs = require("fs");

let users = [];

if (fs.existsSync("users.json")) {
  users = JSON.parse(fs.readFileSync("users.json"));
}

function onSaveUser(response) {
  if (!users.find((user) => user.id === response.userProfile.id)) {
    users.push({ ...response.userProfile, subscribed: true, isActive: true });
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  }
}

function onDeleteUser(userId) {
  const user = users.find((user) => user.id === userId);
  console.log(user);

  if (user) {
    user.isActive = false;
  }

  // Save the updated users array to the JSON file
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

module.exports = {
  onSaveUser,
  onDeleteUser,
};
1;
