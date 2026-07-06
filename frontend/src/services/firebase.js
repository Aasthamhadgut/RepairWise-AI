const USERS_KEY = "repairwiseLocalUsers";

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function buildUser(email, profile = {}) {
  return {
    uid: `local-${email}`,
    email,
    displayName: profile.name || email,
    profile
  };
}

export const loginWithEmail = async (email, password) => {
  const users = readUsers();
  const existing = users[email];
  if (existing && existing.password !== password) {
    throw new Error("Invalid email or password.");
  }
  return { user: buildUser(email, existing?.profile || { email }) };
};

export const registerWithEmail = async (email, password, profile = {}) => {
  const users = readUsers();
  users[email] = { password, profile };
  writeUsers(users);
  localStorage.setItem("repairwiseProfile", JSON.stringify(profile));
  return { user: buildUser(email, profile) };
};

export const logout = () => Promise.resolve();
