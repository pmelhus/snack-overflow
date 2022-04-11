create user snack_overflow_app with password <<astrongpassword>> createdb;

npx dotenv sequelize init

npx dotenv sequelize db:create



npx sequelize model:generate --name Question --attributes id:integer,userId:integer,title:text,body:text,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name User --attributes id:integer,firstName:string,lastName:string,userName:string,userScore:integer,email:string,password:string,profilePicture:text

npx sequelize model:generate --name Answer --attributes id:integer,questionId:integer,body:text,answerScore:integer,userId:integer,imageOptional1:text,imageOptional2:text,imageOptional3:text

npx sequelize model:generate --name AnswerVote --attributes id:integer,vote:boolean,userId:integer,answerId:integer

{firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, {firstName: “Dummy1, lastName: “Surname1”, userName: “seededUser1”, userScore:0,email:”dummy1@test.com”,password:”dummyPassword”, createdAt: '2019-04-12', updatedAt: '2019-04-12'}, { firstName: “Dummy3, lastName: “Surname3”, userName: “seededUser3”, userScore:5,email:”dummy3@test.com”,password:”dummyPassword”, createdAt: '2019-02-02’, updatedAt: '2021-01-10’},

