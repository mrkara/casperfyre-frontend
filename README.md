<p>
	<img src="https://api.casperfyre.com/logo.png" width="300">
</p>

# CasperFYRE Frontend

Dispensory API interface for Casper mainnet. This is the frontend repo for this project. To see the backend API repo, visit https://github.com/ledgerleapllc/casperfyre-backend

## Dependencies

The system requires the following softwares run a this frontend on top of the API server.

```
 1. Ubuntu 18+
 2. Apache2
 3. NodeJS version 16+
 4. NPM version 8+
 5. Yarn version 1+
```

Ubuntu 18+ and Apache2 are optional and can be switched out for other common platforms, but the backend interactive setup script will not work in that case. The setup of the operating system and HTTP server software should be handled by the dev. Note, the http document root is **casperfyre-frontend/build**

## Setup

We generally would use the latest version of Ubuntu for testing installs. Example hosting server: AWS ec2 t2 medium with at least 10Gb SSD. Before doing anything else, make sure you're up to date.

```bash
sudo apt-get update
```

### Software

Setup the repo according to our VHOST path using the instruction below. Note, the actual VHOST path in this case would be set to **/var/www/casperfyre-frontend/build**

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
sudo apt install nodejs -y
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc
cd /var/www/
git clone https://github.com/ledgerleapllc/casperfyre-frontend.git
cd  casperfyre-frontend/
```

Install packages and setup environment. You will need to modify **.env.production** variables to fit the server on which you're deploying. **REACT_APP_BASE_URL** should specify the URL of your backend API.

```bash
yarn install
yarn build
```

The above commands will build **build/** on site using the variables from your .env.production file.

### VHOST

For this example, using an Ubuntu 20 Ec2 instance, our http vhost would look something like this

```
<VirtualHost *:80>
  ServerName casperfyre.com
  DocumentRoot /var/www/casperfyre-frontend/build
  Directory /var/www/casperfyre-frontend/build>
    Options -MultiViews
    AllowOverride All
    Require all granted

    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
    RewriteRule . /index.html [L]

    Header set Access-Control-Allow-Origin "*"
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Usage Guide

### Start here

aaaaa

### Other notes

These features were scoped and determined to be the essential features needed for CasperFYRE. Email any questions to team@ledgerleap.com.

### Testing

Testing done through yarn -> npm -> react-scripts

```bash
yarn test
```

