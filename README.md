# What is Coursify
This project is a simple CRUD application developed using Next.js, PostgreSQL, Docker, and Prisma. It allows users to perform various CRUD operations on courses, including creation, modification, and deletion, following user registration. While the application is still a work in progress, the core functionalities have been successfully implemented.

# Configuration

crate '.env' file in the app folder, after that, add those variables to the environment file:

```

# JWT
JWT_SECRET = "something"

# PostgreSQL
POSTGRES_PASSWORD="something"
POSTGRES_USER="something"
POSTGRES_DB="something"

#replace the variables here with their values:
DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@postgres:5432/POSTGRES_DB"

```

## Run the app
The easy part is to run this command:
```

docker-compose up

```
And go to this link: [localhost:3000](http://localhost:3000)  
