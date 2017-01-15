# lilojs
Auto testing for computer programs

# Requirements
### NodeJS
Install NodeJS as you wish. I'm using ubuntu 16.04, so:
> sudo apt install nodejs

### NPM
Same as NodeJS. In my case:
> sudo apt install npm

### MongoDB
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

Long story short:
> sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

> echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

> sudo apt-get update

> sudo apt-get install -y mongodb-org

Pretty much that's it. Don't forget to run the service:
> sudo service mongod start

# Installation
1. Download this repo
2. `git checkout development/version1`
3. Navigate to `src` directory and run `npm install`
4. Wait for a while (:
5. `nodejs server`
6. Depending on the input language of the code (C, C++, Java, C#, JS, etc...), you will need to install the required compiler.

For example, C programs, are compiled by `gcc` compiler. It is build in Ubuntu 16.04, but if you need it:
> sudo apt install gcc

8. Open browser and locate to `http://localhost:3000`

9. Administrator credentials are hand made with `robomongo`. Select the user, and change:
`accessLevel: 'administrator'`
