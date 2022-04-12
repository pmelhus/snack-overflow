create user snack_overflow_app with password <<astrongpassword>> createdb;

npx dotenv sequelize init

npx dotenv sequelize db:create



npx sequelize model:generate --name Question --attributes userId:integer,title:text,body:text,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name User --attributes firstName:string,lastName:string,userName:string,userScore:integer,email:string,password:string,profilePicture:text

npx sequelize model:generate --name Answer --attributes questionId:integer,body:text,answerScore:integer,userId:integer,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name AnswerVote --attributes vote:boolean,userId:integer,answerId:integer

{firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, {firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, { firstName: “Dummy3, lastName: “Surname3”, userName: “seededUser3”, userScore:5,email:”dummy3@test.com”,password:”dummyPassword”, createdAt: '2019-02-02’, updatedAt: '2021-01-10’},


npx dotenv sequelize seed:generate --name Questions

{title: "HOW DO I MAKE A PEANUT BUTTER AND JELLY SANDWICH?", body: "I am trying to make a peanut butter and jelly sandwich like my mom used to make, however, I don't see any instructions on either jar or the bread?!", createdAt: '2021-03-01 },
{title: "My Girlfriend wants me to 'Dethaw chicken'?", body: "my girlfriend called me just now. She told me to de-thaw the chicken but I don't know how I do that? Other posts told me to throw it off the balcony but that doesn't seem correct. Any insight?", createdAt: '2021-03-06},
