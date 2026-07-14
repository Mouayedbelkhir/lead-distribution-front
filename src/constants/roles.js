export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  USER: "USER",
};

export const isAdmin = (role) => role === ROLES.ADMIN;
