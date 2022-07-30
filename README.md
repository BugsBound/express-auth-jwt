# Node.js express.js Sequelize JWT - Basic Project Skeleton

## Getting started

This is a simple Express Server with JWT Auth.

## Requirements

*   Node.js
*   Postgres

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.


```bash
HTTPS:
git clone https://github.com/BugsBound/express-auth-jwt.git

SSH:
git clone git@github.com:BugsBound/express-auth-jwt.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
npm update
```

### Setting up environments (development or production)

1.  In the root this repository you will find a file named `.env.TEMPLATE`
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment (development or production)
5.  Upload the `.env` to your environment server(development or production)

## How to run

### Running in development mode (lifting API server)

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

## Usage

Once everything is set up to test API routes either use Postman or any other api testing application.

## Examples

### For register
Use POST to `http://localhost:PORT/api/register`

```bash
POST http://localhost:3000/api/register
Content-Type: application/json

  {
    login:"username",
    password: "password"
  }
```

### For login
Use POST to `http://localhost:PORT/api/login`

```bash
POST http://localhost:3000/api/login
Content-Type: application/json

  {
    login:"username",
    password: "password"
  }
```

### For logout
Use GET to `http://localhost:PORT/api/logout`


```bash
GET http://localhost:3000/api/logout
Accept: application/json
```

## DB Model

![](https://github.com/BugsBound/express-auth-jwt/blob/master/db/Model.png)
