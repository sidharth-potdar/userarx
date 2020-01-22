const initialData = {
  snips: {
    "snip-1": {
      id: "snip-1",
      text: "being able to complete bookings online would save him and his wife a lot of time.",
      tag: "valuable",
      color: "#9de1e2",
      backgroundColor: "#d8f3f3",
    },
    "snip-2": {
      id: "snip-2",
      text: "When asked to navigate to the online bookings portal, Ben has trouble locating the page. He looks in the top navbar, but does not find it immediately.",
      tag: "navigation",
      color: "#eecfb2",
      backgroundColor: "#f8ece0",
    },
    "snip-3": {
      id: "snip-3",
      text: "Ben comments on how well organized the portal is and likes that the booking process is broken up into multiple steps.",
      tag: "positive",
      color: "#eecaf0",
      backgroundColor: "#f8eaf9",
    },
    "snip-4": {
      id: "snip-4",
      text: "he wonders aloud how many more pages to the form there are.",
      tag: "confusing",
      color: "#b3dbf5",
      backgroundColor: "#e1f1fb",
    },
    "snip-5": {
      id: "snip-5",
      text: "He finds the explanatory text below sections hard to read.",
      tag: "pain-point",
      color: "#fdc7c8",
      backgroundColor: "#fee9e9",
    },
    "snip-6": {
      id: "snip-6",
      text: "Ben is looking forward to this feature rolling out.",
      tag: "compliment",
      color: "#b9deb3",
      backgroundColor: "#e3f2e1",
    },
  },
  categories: {
    "category-1": {
      id: "category-1",
      title: "Unsorted",
      snipIds: [ "snip-3",  ],
    },
    "category-2": {
      id: "category-2",
      title: "Pain points",
      snipIds: ["snip-2", "snip-4", "snip-5",],
    },
    "category-3": {
      id: "category-3",
      title: "Opportunities",
      snipIds: ["snip-6", "snip-1",],
    },
  },
  categoryOrder: ["category-1", "category-2", "category-3"],
  newCategoryName: "",
};

export default initialData;
