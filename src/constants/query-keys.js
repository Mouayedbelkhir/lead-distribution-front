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

export const deliveryKeys = {
  all: ["deliveries"],
  lists: ["deliveries", "list"],
  detail: (id) => ["deliveries", "detail", id],
};

export const leadKeys = {
  all: ["leads"],
  lists: ["leads", "list"],
  list: (params) => ["leads", "list", params],
};
