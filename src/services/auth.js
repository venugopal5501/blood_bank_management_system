import api from "./api";

export async function login(username, password) {
  const response = await api.get(
    `/users?username=${username}&password=${password}`,
  );
  const user = response.data[0];
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const token = btoa(
    JSON.stringify({ id: user.id, username: user.username, role: user.role }),
  );
  localStorage.setItem("token", token);
  return JSON.parse(atob(token));
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return JSON.parse(atob(token));
}

export function isAdmin() {
  var currentUser = getUser();
  return currentUser && currentUser.role.toLowerCase() == "admin";
}

export async function register(username, password) {
  const exists = await api.get(`users?username=${username}`);
  if (exists.data.length > 0) {
    throw new Error("User already exists");
  }

  const response = await api.post(`users`, {
    username,
    password,
    role: "user",
  });

  return response.data;
}

export async function registerDonar(formData) {
  const response = await api.post(`registeredDonars`, {
    ...formData,
  });
  return response.data;
}

export async function fetchAllDonarDetails() {
  const response = await api.get(`registeredDonars`);
  return response.data;
}

export async function createStockInventory(formData) {
  const response = await api.post(`stockInventory`, {
    ...formData,
  });
  return response.data;
}

export async function fetchAllStockInventory() {
  const response = await api.get(`stockInventory`);
  return response.data;
}

export async function updateStockInventory(formData) {
  if (formData.id) {
    await api.put(`/stockInventory/${formData.id}`, { ...formData });
  }
}
