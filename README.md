### To run the project
Clone the repository
### Install node packages
install node packaged

create .env file 

NODE_ENV = development
PORT = 5000
MONGO_URI = *******
JWT_SECRET = abc123


To run the project: npm run dev

### API Routes:

Tasks

   POST ('/api/tasks/') Create Task
   
   GET ('/api/tasks/') Get all the tasks
   
   GET ('/api/tasks/:id') Get a particular task
   
   PUT ('/api/tasks/:id') Update a task
   
   Delete ('/api/tasks/:id') Delete the task

User   

 POST ('/api/users/') Register new User

 POST ('/api/users/login') login new user

 GET ('/api/users/me') Get's the logged in user's details

 GET ('/api/users/allUsers') gets all the users

 PUT ('/api/users/allUsers/:id') Update user details

 GET ('/api/users/allUsers/:id') Get user by Id

 DELETE ('/api/users/allUsers/:id') Deletes a particular user

 ### Frontend 
 I've used react redux to mange the states globally, and have made auth reducer and task reducer which handels the create, login, and all the functionality 



