const initialData = {
  snips: {
    "snip-1": { id: "snip-1", text: "Login sucks my dude. How do I get there from the landing page? Also, it doesn't accept Google auth." },
    "snip-2": { id: "snip-2", text: "Navigation is confusing. I don't know how to get to my notes from the main menu, and I get lost trying to change my account settings." },
    "snip-3": { id: "snip-3", text: "How do I search for tags? I can see them in the session docs but how can I find them as part of the whole project?" },
    "snip-4": { id: "snip-4", text: "Bust down thotiana. Blueface baby yeah aight. Bust down thotiana." },
    "snip-5": { id: "snip-5", text: "Gia seems pretty tech-savvy so it’s no surprise that onboarding was straightforward for her. She uses 1Password to manage her passwords, so she just generated a password during the sign up process" },
    "snip-6": { id: "snip-6", text: "Navigation is confusing. I don't know how to get to my notes from the main menu, and I get lost trying to change my account settings." },
    "snip-7": { id: "snip-7", text: "Navigation is confusing. I don't know how to get to my notes from the main menu, and I get lost trying to change my account settings." },
    "snip-8": { id: "snip-8", text: "Navigation is confusing. I don't know how to get to my notes from the main menu, and I get lost trying to change my account settings." },
    "snip-9": { id: "snip-9", text: "Navigation is confusing. I don't know how to get to my notes from the main menu, and I get lost trying to change my account settings." },
  },
  categories: {
    "category-1": {
      id: "category-1",
      title: "Unsorted",
      snipIds: ["snip-1", "snip-2", "snip-3", "snip-4", "snip-5", "snip-6", "snip-7", "snip-8", "snip-9"],
    },
    "category-2": {
      id: "category-2",
      title: "Pain points",
      snipIds: [],
    },
    "category-3": {
      id: "category-3",
      title: "Opportunities",
      snipIds: [],
    },
  },
  categoryOrder: ["category-1", "category-2", "category-3"],
  newCategoryName: "",
};

export default initialData;
