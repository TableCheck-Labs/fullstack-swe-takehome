function produceMenu(draft) {
  draft.menu = [
    {
      id: "ae2c3f44-9e9e-4a7f-a1cb-f45b701b8c01",
      name: "Cheeseburger",
      image:
        "https://i.imgur.com/g9OEGcx_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "A juicy grilled beef patty topped with cheese, lettuce, tomato, and our house sauce.",
      minQty: 1,
      maxQty: 5,
      price: "9.99",
      currency: "USD",
    },
    {
      id: "c51fa2d7-44d4-4b6e-8eb3-0d36e5e4d307",
      name: "Vegan Burger",
      image:
        "https://i.imgur.com/SDEfwEJ_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Plant-based patty with avocado, arugula, and vegan mayo on a toasted bun.",
      minQty: 1,
      maxQty: 5,
      price: "10.49",
      currency: "USD",
    },
    {
      id: "eb15a43d-f3f1-4f89-891a-1b7b27132fc4",
      name: "2x Burger",
      image:
        "https://i.imgur.com/kEPkV8M_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Crispy chicken thigh, pickles, spicy aioli, and slaw on a brioche bun.",
      minQty: 1,
      maxQty: 3,
      price: "8.75",
      currency: "USD",
    },
    {
      id: "fb274edf-5de2-4f12-b1a4-0a6d7d5cb7d9",
      name: "Weird Burger (why would you eat this?",
      image:
        "https://i.imgur.com/qX9o258_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
      minQty: 1,
      maxQty: 10,
      price: "7.50",
      currency: "USD",
    },
    {
      id: "52aa69ea-6a35-49dc-8997-9a8bb83b0ec0",
      name: "Classic Burger",
      image:
        "https://i.imgur.com/ZmAFNFD_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Classic pizza with tomato sauce, fresh mozzarella, and basil.",
      minQty: 1,
      maxQty: 4,
      price: "11.00",
      currency: "USD",
    },
    {
      id: "83cf9f6b-e2a5-41e5-bd26-5b032b13d0ea",
      image:
        "https://i.imgur.com/99LclBL_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      name: "Pepperoni Pizza",
      description:
        "Spicy pepperoni, mozzarella, and tomato sauce on a crispy crust.",
      minQty: 1,
      maxQty: 4,
      price: "12.00",
      currency: "USD",
    },
    {
      id: "1e4a99e7-9c2e-44c0-b56e-148bfb790257",
      name: "Veggie Pizza",
      image:
        "https://i.imgur.com/Zfaz11I_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description: "Golden, crispy French fries served with ketchup.",
      minQty: 1,
      maxQty: 10,
      price: "3.50",
      currency: "USD",
    },
    {
      id: "a8c6dd08-8a58-48e0-88fc-9bb4e22f7c5c",
      name: "Mix Veggie Pizza",
      image:
        "https://i.imgur.com/XOS5fs5_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description: "Oven-roasted sweet potato fries with garlic aioli.",
      minQty: 1,
      maxQty: 10,
      price: "4.25",
      currency: "USD",
    },
    {
      id: "12a57839-d03c-409f-b54e-bcfe26367862",
      name: "Chicken Pizza",
      image:
        "https://i.imgur.com/AQp17qz_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Grilled chicken breast, lettuce, tomato, cheese, and ranch dressing wrapped in a tortilla.",
      minQty: 1,
      maxQty: 3,
      price: "8.99",
      currency: "USD",
    },
    {
      id: "6a0b7bd3-1b91-4f13-ae08-00e55b158276",
      name: "Detroit Pizza",
      image:
        "https://i.imgur.com/zxl9fQv_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description:
        "Creamy macaroni and cheese baked with a crispy breadcrumb topping.",
      minQty: 1,
      maxQty: 6,
      price: "6.75",
      currency: "USD",
    },
    {
      id: "2db0d353-43c0-405f-b4e8-22e9f5a05487",
      name: "Extra Cheese",
      image:
        "https://i.imgur.com/OPUgBEA_d.webp?maxwidth=520&shape=thumb&fidelity=high",
      description: "Extra cheese on top of the pizza.",
      minQty: 1,
      maxQty: 10,
      price: "2.25",
      currency: "USD",
    },
  ];
}

export default [
  {
    id: "basic:test",
    match: {
      method: "GET",
      route: "/booking/shop/:shop",
      params: {
        shop: "test",
      },
    },
    produce: (draft) => {
      produceMenu(draft);
      draft.id = "test";
    },
  },
  {
    id: "reservation",
    match: {
      method: "GET",
      route: "/booking/reservation/:code",
    },
    produce: (draft) => {
      // draft.reservation.id = 999999;
    },
  },
];
