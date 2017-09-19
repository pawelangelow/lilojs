The idea:

First build imaga from the docker file:

    docker build -t nodejs-runner .

Then create instance and mount the current dir as volume:

    docker run -v /somewhere/here/:/usr/src/app -it nodejs-runner node index.js

`/usr/src/app` - check the dockerfile