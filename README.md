# Spotfinder
I always save all my discover weekly, and after a lot of weeks, it became difficult to search an specific music, and where I have it saved.
Since Spotify sadly doesn't show wich playlist have a song, I made this simple solution to my problem.

It is a fully client-side app, developed using React and acessing spotify's API.

For being it is a solution made only to help solve my problem, it is not optmized to go to production and I didn't care about code quality for this first MVP.

## Required
```
Node v8 +
A Spotify API Client ID
A Spotify account
```

## Setup
### Clone the project
```
git clone git@github.com:JoaoBGusmao/spotfinder.git
```
### Install dependencies
```
yarn
```
or
```
npm install
```

### Setup envs
Make a copy of env.example.js and rename it to env.js. Replace all variables with your data, such as URL (important for login callback) and client id (doesn't work without it).

### Run
```
yarn start
```
This project by default use port 8080, this way, you can open it using:
```
http://localhost:8080
```

## Contribute
Suggestions and PRs are welcome
