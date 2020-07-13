# User Feedback

## Static Client Feedback

### Dalbert

- Phone looks good
- Sad chats don't save yet
- "It's for people to chat about music and stuff right?"
  - ON-KANBAN Clarify the use case for people
- Will people get usernames?
  - ON-KANBAN user accounts
- Ideally can search more platforms besides youtube
  - ON-KANBAN I should do this but it will take time for each API
  - ON-KANBAN Also how to make this user friendly and not a billion buttons/inputs
- It looks cool, the function is there
- I asked "what else would make you actually use it?"
  - Ability to share playlists
    - ON-KANBAN for now, add a playlist chatroom
    - ON-KANBAN later, sync with apis
  - Mood: today i'm feeling happy so I've been listening to xyz cuz of xyz
    - Need a way to get users to scroll aimlessly through
    - ON-KANBAN for now, add a mood room
- ON-KANBAN put a description of each chat at the top
- Likes the idea

### Henry

- Interesting
- Simple and intriguing
- Why would I use this instead of just searching on youtube?
- Basic functionality is working
- More introduction on the landing page
  - ON-KANBAN better landing instructions
- Would use for fun to talk to the boys if they were all on
  - ON-KANBAN show users in the current chatroom

### Dick

- Loves the deployment
- "Chat apps are a rite of passage"

- J: Do you think the app is interesting/valuable?
- D: Is the idea a shared playlist kind of thing? That people can then discuss? I wouldn't use it but I could see people that like music and talking about music using it.
  - ON-KANBAN Clarify use case
- J: Do you understand how to use the app?
- D: Yup
- J: Any bugs or broken features?
- D: Issue loading youtube videos. Some results stream, others don't.
  - ON-KANBAN: I noticed this and have a ticket open. I think youtube blocks some videos from embedding so I need to see if I can get this info from an endpoint.
- D: split the searchbox into two
  - ON-KANBAN I went back and forth on this. I think two is better.
- D: Bug w/ username going Jack -> Jac -> Ja -> J in global chat
  - Not a bug I just hardcoded this :p
- J: Is basic functionality working?
- D: Yes but fix bugs
  - D make dick happy
- J: What would make the app better?
- D: User Accounts and saved chat history
  - ON-KANBAN user accounts
  - ON-KANBAN saved chat (code api)
- D: How do you intend this to be different than just a group message? I could do the same thing on Slack.
  - ON-KANBAN differentiate music features
- J: Would you ever seriously use this app?
- D: I wouldn't but i'm not the target market
  - ON-KANBAN get dick hooked

### Ahmed

- "Emoji Emoji This is mindblowingly cool! Love the functionality"

### Nick

- Likes the styling; reminds of the 90s
- Hover over title is harsh
  - ON-KANBAN change hover color
- Create chatrooms for individual songs
  - ON-KANBAN individual song chatroom

## MVP Feedback

### Alex (Grader)

- All requirements met and a few bonuses as well, nice!
- Optional ideas
  - Live messaging with WebSockets or polling (setInterval, less elegant)
    - I am implementing this now, been saving it for last
  - Prevent Duplicates
    - Don't allow username or chatname reuse
    - I'll make an issue for this but probably won't implement it for now

### Bussy

- Looks nice. Grabs the name instead of the arrow to change chatrooms.
  - I think the arrow is just the default select display. Grabbing the name or arrow provide the same functionality so should be fine.

### Trevor

- Super cool. Curious about the intention of the project.
