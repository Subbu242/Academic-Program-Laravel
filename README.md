# Getting Started with Create React App

# Available Scripts
First navigate to the project directory "academic-networking-site" by using the following command:
### `cd Frontend`

#If the 'node_modules' folder is not present after unzipping, then you have to install it using the following command:
### `npm install`

In the project directory, please run the following command to launch the website:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Now, open a new terminal and navigate to the 'Backend' folder.
### `cd backendLaravel`

Now, run and start the server by using the following command.
### `php artisan serve`

We have the database created in the 'Database' Folder.
Import the databse 'msc.mysql' in phpMyAdmin.

The page will reload when you make changes.\
You may also see any lint errors in the console by running the following command.
### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Now, the app is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### We have designed the website for 5 different roles, Admin, Student, Instructor, program Coordinator and Quality Assurance Officer. We have also added the chat functionality between Student and Instructor & Student and Coordinator. We have created and tested too many APIs for different individual functionalities that perform all the CRUD operations.