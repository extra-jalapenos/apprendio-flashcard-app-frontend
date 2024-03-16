# Apprendio – A flashcard app

## How do I use this?
- git clone this repo to your machine with "git clone …@github.com:apprendio-flashcard-app.git"
- cd in the directory
- run "npm ci"
- run "npm run dev"
- go to http://localhost:5173

# Feature overview
## General Config
- [x] User can create a new category (language / topical)
### Extended
- [ ] User can decide how many times he has to get a word right until it's marked as learnt
- [x] Light / dark theme support

## USAGE
- [x] User can enter new words / translations
- [x] User can decide to start a practice session
- [x] User can enter the translation, click on a check button & if it's a match it'll automatically mark it as correct, if it's not the user can still say it is (in case it's used to practice e.g. definitions for school)
- [x] time between practice instances grows longer (as in, the more times you successfully answered a flashcard, the longer it'll take for it to re-appear again)
### Extended
- [x] User can choose a file to import multiple flashcards
- [ ] review data before import
- [x] User can see all entries and their translations

## ANALYTICS
- [x] User can see how entries are distributed over the different levels of learning
### Extended
- [x] User sees daily stats
- [x] The user sees total practice stats

# Questions
- what is the proper way of handing over the userID info after checking the validity of the token? Appending to params?
- How do I deploy the backend?
- Getting the api route fixed up in Netlify so it goes to the live backend -> ENV import
- Netlify insists on entering the site on the homepage, and does not work when enterpoint is a subpage (404). Googling brings up using HashRouter instead of BrowserRouter but documentation recommends against this.
- Docker-Postgres???
- Protected Routes?
