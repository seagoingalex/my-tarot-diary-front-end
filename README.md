Arcadia Daily Tarot: A Tarot Card Library, Reader, and Diary Application
Alex Calvert

!! Instructions for starting app !!
1. In addition to running the front-end directly you are currently accessing, be sure to also access the application's Ruby on Rails files: https://github.com/seagoingalex/my-tarot-diary-back-end
2. In your terminal for the site backend, type 'rails s' into your terminal, followed by 'npm start' for this front end directory.
3. While running locally, this application leverages PostgreSQL as its DBM system, which will also need to be run in conjunction with the above. A deployed version of the application is in progress! Instructions to download PostgreSQL can be found here: https://www.postgresql.org/download/

Resources
- Entity Relationship Diagram (ERD): https://miro.com/app/board/o9J_l2gv54c=/
- Site Schematic: https://www.figma.com/file/3PmGrkFQMxElvPleNR6mI7/Project-5-Wireframes?node-id=2287%3A5610
- Project Plan: https://docs.google.com/document/d/13-mpM4ybFu8JN0C_xWklqb6Mi2_6BQzc2Ue2qkoHG8Y/edit?usp=sharing

About this app
The art of tarot reading is a centuries-old skill that can be rather difficult to approach, let alone practice. Just as software engineering requires repetition and consistency to mastery, so does the intuition-developing nature of divination. While iOS and Android apps such as Golden Thread exist, web-based applications are lacking, as are functionality in existing applications to take notes, customize, and read for others

This full stack web application is designed as a modern and personal space to make the fun and joyful skill of tarot reading as approachable as any other hobby. By creating a password-secured profile, users can access a tarot database encompassing all cards within the major and minor arcana, a beginner’s guide to reading tarot, and a virtual deck where you can perform daily readings,  record multiple-card readings as they practice, and even document the readings of friends.

Technical specs
- Front-end
    - React Router
    - React useHistory
    - Tarot card library...
        - Stored in backend database
    - User profiles, readings, and friends all stored within backend server, accessible from the front-end through various CRUD endpoints
    - Redux leveraged to manage global states of the logged in user and whether they are accessing their public or personal profile.
    - Custom CSS via
        - Styled-components
        - Material UI (UI framework )
- Backend
    - Session Handling
    - Serializers
    - Exception Handling
    - Validations: Controller & Model
    - CRUD and custom actions within backend table controllers in MVC structure
    - Auth via BCrypt
    - Model includes multiple has_many: through: relationships 
        - Dual polymorphic added to handle public/personal account switching
    - Seeds from a complex dataset

Feature Highlights
- As an anonymous app visitor, I can…
    - View the login page
    - Log into the site as an existing user
    - Sign up as a new user
- As a user who is logged in, I can…
    - Perform a daily tarot reading of a single card from the homepage
        - That reading with automatically be added to my chart
        - Click a card to learn more about that card specifically
        - Update the entry immediately after drawing from the homepage
    - Perform custom readings (beyond a daily reading) from the sidebar
        - Do a single card reading at any point, regardless of whether or not I have done my daily drawing
        - Do a a three-card draw as a custom reading
    - Select My Chart to see a list of all readings I have done for myself
        - Click on a reading instance to review the details of that reading
        - Click a card to learn more about that card specifically
        - Update my notes for that reading
        - Delete readings from my Chart
    - Access the tarot card library to learn about cards without doing a reading
        - See a list of all cards in the major and minor arcana
        - Click a card to learn more about that card specifically
        - Search the tarot library that filters results onChange
        - Search the tarot library by arcana / suit
    - Switch between a personal profile to do readings for myself and a public profile to do readings for friends
        - Update my profile information
        - View the about page to learn more about the app creator
    - Log out
- As a user who is logged in to their personal profile, I can…
    - Access all previous readings performed for myself from my Chart
    - Toggle between daily draws and custom readings
- As a user who is logged in to their public profile, I can…
    - NOT do a daily drawing; I must be signed into my personal profile to do a daily drawing
    - Perform readings for friends from the homepage
    - Select from a list of existing friends to do a reading for
    - Add a new friend requesting a reading prior
    - Access all previous readings performed for friends from my Chart


Future feature builds
- Change Password
- Change tarot deck visuals from the profile page, persists in Redux as the global state for the deck design.
- Only do a daily drawing once per day
- Biforcate three card draws into past/present/future and situation/action/outcome draws
- Do readings for other USERS instead of just the dummy data in the friends table.
- Make the Friends Chart view on the Public account view searchable/filterable

Functionality Breakdown
- Navigable tarot database
    - MVP: fully rendered on page
    - Stretch 1: Searchable on page
    - Stretch 2: Filterable by suit on page
- Daily reading
    - MVP: Can be done and saved to log at any time
    - Stretch 2: Can only be done and saved to log once a day (in tandem with custom reading enablement
- Accessible & Editable log of readings
    - MVP: Daily readings only
    - Stretch 1: All readings
    - Stretch 2: Separated chart section for public account vs personal account
- Stretch: Custom readings
    - MVP: Single card only
    - Stretch 1: Custom single card draw (independent and typified separate from daily draws)
    - Stretch 2: Three Card draw
- Stretch: PublicReading role allows a separate instance of the user to read and log on behalf of others, completely independent from their own chart and reading
- Stretch (WIP): Editable Profile Page
    - Password change
    - Stretch 1: Selectable deck options
    - Stretch: Stats
    - Number of readings
    - Most drawn card
    - Mood stat


