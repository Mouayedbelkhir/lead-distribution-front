export const dashboardKeys = {
  stats: ["dashboard", "stats"],
};

export const clientKeys = {
  all: ["clients"],
  detail: (id) => ["clients", "detail", id],
};

export const verticalKeys = {
  all: ["verticals"],
  lists: ["verticals", "list"],
  detail: (id) => ["verticals", "detail", id],
};
