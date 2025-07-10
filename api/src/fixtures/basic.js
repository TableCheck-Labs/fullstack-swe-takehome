export default [
  {
    id: "basic",
    match: {
      method: "GET",
      route: "/booking/shop/:shop",
      params: {
        shop: "test",
      },
    },
    produce: (draft) => {
      draft.data = "Hello, world!";
    },
  },
];
