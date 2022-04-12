create user snack_overflow_app with password <<astrongpassword>> createdb;

npx dotenv sequelize init

npx dotenv sequelize db:create



npx sequelize model:generate --name Question --attributes userId:integer,title:text,body:text,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name User --attributes firstName:string,lastName:string,userName:string,userScore:integer,email:string,password:string,profilePicture:text

npx sequelize model:generate --name Answer --attributes questionId:integer,body:text,answerScore:integer,userId:integer,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name AnswerVote --attributes vote:boolean,userId:integer,answerId:integer

{firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, {firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, { firstName: “Dummy3, lastName: “Surname3”, userName: “seededUser3”, userScore:5,email:”dummy3@test.com”,password:”dummyPassword”, createdAt: '2019-02-02’, updatedAt: '2021-01-10’},


npx sequelize seed:generate --name Questions

{userId:1, title: "HOW DO I MAKE A PEANUT BUTTER AND JELLY SANDWICH?", body: "I am trying to make a peanut butter and jelly sandwich like my mom used to make, however, I don't see any instructions on either jar or the bread?!", createdAt: '2021-03-01', updatedAt: '2021-03-01'},
{userId:1, title: "My Girlfriend wants me to 'Dethaw chicken'?", body: "my girlfriend called me just now. She told me to de-thaw the chicken but I don't know how I do that? Other posts told me to throw it off the balcony but that doesn't seem correct. Any insight?", createdAt: '2021-03-06', updatedAt: '2021-03-06'}


npx sequelize seed:generate --name Answers

{questionId: 2, body: "To make a pb, you need to get two slices of bread. You can toast them up or have then plain. Apply PB to one slice and Jelly/Jam to the other slice. Make sure to spread evenely. Combine the two slices by pressing them together to make one sandwich. Make sure the pb and jelly are touching. You may cut it into halves or eat it as a whole. Enjoy!",
    userId:2, createdAt: "2021-03-05", updatedAt: "2021-03-05"
  }
