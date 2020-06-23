const chatroomList = [
  {
    name: "Global",
    description: "Welcome to the World Wide Music Chat!",
  },
  {
    name: "Playlists",
    description: "A place to discuss your favorite playlists.",
  },
  {
    name: "Mood",
    description: "How do you feel today?",
  },
  {
    name: "Artists",
    description: "Keep up to date on your favorite artists.",
  },
  {
    name: "Songs",
    description: "All the single songs",
  },
  {
    name: "Doin' Time",
    description: "Chat about Doin' Time by Sublime (and now Lana)",
  },
];

const messages = {
  Global: [
    {
      username: "Alicia",
      contentType: "text",
      message: "Music Chat, Baby.",
      contentId: null,
    },
    {
      username: "Jack",
      contentType: "text",
      message: "You Don't Know My Name.",
      contentId: null,
    },
    {
      username: "Alicia",
      contentType: "text",
      message: "But you're Unbreakable.",
      contentId: null,
    },
    {
      username: "Jack",
      contentType: "text",
      message: "If I Ain't Got You, who would I be?",
      contentId: null,
    },
    {
      username: "Alicia",
      contentType: "youtube video",
      message: null,
      contentId: "rywUS-ohqeE",
    },
  ],
  Playlists: [
    {
      username: "Dalbert",
      contentType: "text",
      message: "Let's share playlists",
      contentId: null,
    },
    {
      username: "Jack",
      contentType: "text",
      message: "Ok",
      contentId: null,
    },
    {
      username: "Dalbert",
      contentType: "text",
      message: "Please send Lorde to my estate",
      contentId: null,
    },
    {
      username: "Jack",
      contentType: "text",
      message: "She'll be escorted by 20 Golden Kiwis",
      contentId: null,
    },
  ],
  Mood: [
    {
      username: "Brownie",
      contentType: "text",
      message: "My mood is sassy cuz it's hot and I'm listening to Milkshake",
      contentId: null,
    },
    {
      username: "Basil",
      contentType: "text",
      message: "I'm so chilled out listening to Baby Take Off Your Cool",
      contentId: null,
    },
    {
      username: "Brownie",
      contentType: "text",
      message: "Damn, that's fresh Basil",
      contentId: null,
    },
  ],
  Artists: [
    {
      username: "Jerry",
      contentType: "text",
      message: "Have you heard of Timbo?",
      contentId: null,
    },
    {
      username: "Timbo",
      contentType: "text",
      message: "Yes",
      contentId: null,
    },
    {
      username: "Jerry",
      contentType: "text",
      message: "He's really good",
      contentId: null,
    },
    {
      username: "Timbo",
      contentType: "text",
      message: "No",
      contentId: null,
    },
  ],
  Songs: [
    {
      username: "Chester",
      contentType: "text",
      message: "I wrote a song",
      contentId: null,
    },
    {
      username: "Hubert",
      contentType: "text",
      message: "About what?",
      contentId: null,
    },
    {
      username: "Chester",
      contentType: "text",
      message: "It's about you Hubert",
      contentId: null,
    },
  ],
  "Doin' Time": [
    {
      username: "Nick",
      contentType: "text",
      message: "Alright we got songs.",
      contentId: null,
    },
    {
      username: "Jack",
      contentType: "text",
      message: "Summertime and the coding is not easy",
      contentId: null,
    },
    {
      username: "Nick",
      contentType: "text",
      message: "Ain't no thang...",
      contentId: null,
    },
  ],
};

export { chatroomList, messages };
