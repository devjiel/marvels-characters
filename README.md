# marvels-characters
Use Marvel API to build front app using React/Typescript

# Goal

Try to reproduce this design: https://dribbble.com/shots/2790114-Comics-library

# Usage

`cp .env.example .env`

Edit .env file with your Marvel API data (https://developer.marvel.com/)

`npm run dev`

# TODO

[ ] Prevent double request on comic list page at first loading or when scroll
[x] Keep a state of the comic list in app and the current comic to avoid request backend each time