# Snack-Overfleaux

Snack-overfleaux demo: https://snack-overfleaux.herokuapp.com/

Git wiki : https://github.com/pmelhus/snack-overflow/wiki

## Authors:

### Anthony Bronca
https://github.com/AnthonyBronca
### Dominic Clust
https://github.com/dominicclust
### Krishna Mulloth
https://github.com/kmulloth
### Paul Melhus
https://github.com/pmelhus

** Special Thank you to App Academy Teaching Staff:  Alec Keeler, Daniel Chin, Rawaha Memon, Raymond Nehring.

They have helped us learn and grow as we continue our journey to become better full-stack engineers. We appreciate them for taking the time to be patient, understanding, and helpful with their teaching. We will miss them! <3

## Snack-Overfleaux
------
Snack-Overfleaux is supposed to mimic the functionality of Stack-Overflow. It is a full stack application that allows users to browse questions, check answers on a question, ask a question, answer a question, and make edits/deletes to items they created on their account. Snack-Overfleaux has a base of 5 users, 2 questions, and 2 answers pre-seeded. Users testing are free to leave their own tests as long they remain approprite to the theme and is not-offensive.

## How to Run
------
1. You will need to download the repo and open it in VScode
2. Install node_modules using 'npm install'
3. In the root folder, create a '.env' file and use the '.env.example' file as a reference (you may copy and paste and use your own data)
4. In your terminal use the following commands in this order:
    - psql-create user snack_overflow_app with password 'password' createdb
    - npx dotenv sequelize init
    ** data models,seed data, and associations have been completed for you **
    - npx dotenv sequelize db:create
    - npx dotenv sequelize db:migrate
    - npx dotenv sequelize db:seed:all
5. In your terminal, type "npm start" to begin the server
6. In your browser navigate to "http://localhost:8080/"

## Languages and FrameWorks
-------
We used PUG, a front-end framework along with an Express.JS back-end. PostgresSQL was utilized for our database.

## Back-End
--------
Our back-end uses API routes, DOM-manipulation to routes, and queries.

     - Express.JS
     - Javascript
     - Express Session
     - Express Validator
     - Express Cookie-Parser
     - PostgreSQL
     - Sequelize
     - Bcrypt.js
     - CSRF Token

## Front-End
--------
With the help of PUG we were able to mimic HTML styles with less code. We used DOM-manipulation in order to help render HTML elements seamlessly on screen without having to reload.

    - PUG
    - CSS
    - JAVASCRIPT


### Where we plan to go from here

This project was made in collaboration by students at App Academy for a class project. Students were given a week to work on the projects for 8 hours+ a day. This was our first full-stack project, and also our first time working as groups.

Some of the challenges we faced, and used as learning experience for future projects are:

- Trouble implementing User Authentication. The first few weeks of the project we had troubles with setting cookies on the users' browser and being able to validate them with users in the database and being able to use that data to make sure they are not accessing data they do not have access to.

- DOM-manipulation + API routing: We spent a decent amount of time on DOM as we practiced utilizing event listeners in order to send API requests to our routes and use returning response data to either manipulate elements on the front-end, change elements in the server, or re-direct users accordingly.

- Heroku and GitHub hiccups: As a team, this was all of our first times using Heroku to host a site. Although we all had previous experience with Github, we were unfamiliar with implementing branches/merging in a group setting. After this project, we have all learned to better implement branches, maintain stronger communication amongst our peers/SR.Dev, use professional and detailed comments (both in code and in Git pull requests), and how to review/change pull requests in order to limit crashes due to merge conflcits.

We plan on implementing the following features within the next few weeks:

- Continue working on CSS styling
- add the ability for users to post profile pictures and code snippet images
- Refactor DOM manipulation code in order to be more DRY
- Add more error handling for questions, answers, and usernames allowed (users should not be able to post vulgar content)
- Review feature. Users should be able to upvote and downvote on answers. Although we built this in to our database in anticipation for launching this feature, we were not able to get around to it due to the previously mentioned hiccups experienced.
- Better User Profile prefences
- Better theme implementations along with more UI friendly styling
- Better Media Queries for different mobile devices/screen sizes.
- Bug Fixes
    - Logo can sometimes disappear
    - Search bar isn't as dynamic as we would like it to be
    - User Profile is lacking in content
    - Users do not yet have access to the account information (they can not be deleted or edited once created)
