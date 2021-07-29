
RUNNING ANGULAR APP

Step 1 : clone the system into your local machine

Step 2 : if you're using CLI 

 navigate to ClientApp then right click on the folder then click on this option "copy full path"

   Step 3 : Open command prompt 

   run  command "cd then paste the path" press enter.

  Step 4 :run:  npm install 

  Spep 5 :run:  npm rebuild

  Step 6 :run:  ng serve --open
  
  Step 7 : Set API as startup project

SETTING DATABASE

Open LocalDb class in file explore 

Step 1 : go to readme file for instractions on how to setup the database.

CONNECTION STRING 

Under API navigate to
DbContext/DatabaseContext class

Step 1 : change this path : C:\Users\Savva\source\repos\  to the path where you cloned the application
Step 2 : User Angular project navigate to appsettings.json and change the path

EXTRA ( If required or not installed )

If Systems.Data.SqlServer is not installed , Right click API , manage NuGet Packages 
Search for System.Data.SqlServer 
Install and rebuild the solution
