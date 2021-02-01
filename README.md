# Project database app

This is a frontend to expose data from a [project database](https://github.com/aakb/project-database).

It includes
* a frontpage to describe the database
* a list of projects, and project details.
* a chart of the organizational structure.

## Deployment

Build for production:

```sh
REACT_APP_API_ENDPOINT=https://project-database.example.com/ yarn build
```

If the project will not run at the root of a domain, set `PUBLIC_URL` to the
project path, e.g.

```sh
REACT_APP_API_ENDPOINT=https://project-database.example.com/ PUBLIC_URL=/app yarn build
```

if running on `https://project-database-app.example.com/app`.

Deploy the built files to the server:

```sh
rsync -az build project-database-app.example.com:/data/www/project-database-app/htdocs
```

### `nginx` configuration

```nginx
# /etc/nginx/sites-available/project-database-app
server {
  listen 80;
  listen [::]:80;

  server_name project-database-app.example.com;

  location /.well-known/acme-challenge {
    alias /etc/letsencrypt/webrootauth/.well-known/acme-challenge;
  }

  location / {
    return 301 https://$host$request_uri;
  }

  access_log /data/www/project-database-app/logs/backend_access.log;
  error_log /data/www/project-database-app/logs/backend_error.log;
}

# HTTPS server
#
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  server_name project-database-app.example.com;
  root /data/www/project-database-app/htdocs;

  include /etc/nginx/snippets/ssl.conf;
  ssl_certificate /etc/letsencrypt/live/project-database-app.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/project-database-app.example.com/privkey.pem;

  access_log /data/www/project-database-app/logs/backend_access.log;
  error_log /data/www/project-database-app/logs/backend_error.log;

  location = /favicon.ico {
    log_not_found off;
    access_log off;
  }

  location = /robots.txt {
    allow all;
    log_not_found off;
    access_log off;
  }

  location / {
    try_files $uri /index.html?$query_string;
  }

  # Enable max cache time for static ressources (images)
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    try_files $uri @rewrite;
    expires max;
    log_not_found off;
  }
}
```

--------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Code linting

TODO - the following: When PRs are created towards the develop branch all coding styles are checked by Github Actions.

To check for coding standards, run the following:

```sh
yarn coding-standards-check
```

To automatically apply coding standards, run:

```sh
yarn coding-standards-apply`
```

## Tailwind css

This project uses tailwind css as base for styling: https://tailwindcss.com/docs
