# Web application deployment automation

This is an Ansible role for automating the deployment of a web application to a CentOS / RHEL / Fedora server

## Features

- Web server (Nginx)
- PHP FastCGI Process Manager (PHP-FPM)
- Webhook server (Node.js)
- Node.js
- MySQL Community database

In addition to setting up those servers, this script also manages the deployment of your web application present in GitHub

### Specificities

This script is specific to applications having a front end developed using React, and backend developed using PHP

## Setup

Edit the following variables in `roles/web/defaults/main.yml`:

- **github_front_url**: Repository containing the frontend of your web application
- **github_back_url**: Repository containing the backend of your web application
- **mysql_user**: MySQL username
- **mysql_db**: MySQL database name. Must be the same as the one in the SQL script

Create an inventory file containing the list of hosts you'd like to setup called `inventory`. The format is as follows, each host in a line:
`host [ansible_user=<username>]`

Copy your MySQL's script under `roles/web/files/MySQL.sql`

Execute the `run.sh` script

`./run.sh`

Enter your MySQL user's password

Once the script's execution is complete, it will print three keys you need to add to GitHub:

- Public SSH key for the host to pull from your GitHub repositories, add this to `Settings > Deploy Keys` in your GitHub repositories, for both front and backend
- Two webhook secrets, one for the frontend and one for the backend. Setup webhooks in your repositories through the following instructions:
  - Under settings > Webhooks, for each repository, click `Add webhook`
  - Enter your GitHub account's password and click `Confirm password`
  - Under Payload URL, enter: `<ip>:3000/<stack>` where `<ip>` is your webserver's IP address and `<stack>` is `front` for the frontend and `server` for the backend
  - Change `Content type` to `application/json`
  - Copy and paste the `secret` corresponding to the stack you're working on. **Reminder**: Secret is printed upon the script's execution completion
