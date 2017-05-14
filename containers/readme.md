# Docker

##### Problem

The problem I'm trying to solve is forbit user iteraction with host server. Some users wants to abuse the system, so they will try hacks (programs which are not expected to be run - something to iterract with filesystem, etc...) and they need to be somehow forbidden. To detach server system from current application context.

##### Here comes the "Docker"

Well I've discused this problem with another programmer and he gave me idea to use docker. So I did.

[Here is Docker web site](https://www.docker.com/) where you can find details about installation as well as lots of material to read - what is this, how it works, how to use it.

To save your time, my solution came after this [article](https://docs.docker.com/engine/getstarted/step_four/). I've found a image for `gcc`. [Here it is](https://hub.docker.com/_/gcc/).

1. The `Dockerfile`

>FROM gcc:4.9

>ADD ./app /usr/src/myapp

>WORKDIR /usr/src/myapp

>RUN gcc -o myapp main.c

>CMD ["./myapp"]

"Add" line copies local folder "./app" to the container folder "/usr/src/myapp". And thats it.

TODO: check if app source folder can be passed as parameter (good for performance).
TODO: check how result of building will be registered by nodejs (to get build errors, etc...)

# Installation

Install Docker

https://docs.docker.com/installation/ubuntulinux/#for-trusty-14-04

sudo apt- get update

sudo apt- get install linux- image -generic-lts-trusty

sudo reboot

curl -sSL http s: // get .docker. com / | sh


# Running it
So, I've played with docker and this is my solution in this case. Before explaining it, I've played with different strategies - run program in different container, run in common one, build and run, etc... Docker containers starts in no time (depends on the image - in my case 1-2 seconds), but yet 1-2 seconds for heavy load is too much, so why not run container as deamons and just provide data to them? Well thats how I'm gonna do it:

0. Create the compiler
with Dockerfile:

```
FROM ubuntu
# ...
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*
```

1. Run the compiler container
`docker run --name compiler --rm -i -t b19a82b2c563 bash` - here these can be improved, because currently the name is not the right one and process should be living

2. If everything is ok, the program should be compiled - so lets copy it to the runner
`docker cp [compiler]:/compiled/[program] [runner]:/programs/[program]`

3. Lets run the program
```
docker exec [container id] mkdir programs
docker cp [program name] [dontainer id]:/programs/[executable name]
docker exec [dontainer id] ./programs/[executable name] [parameters]
```

and example:
```
docker exec 828f0104707a mkdir programs
docker cp program2 828f0104707a:/programs/program2
docker exec 828f0104707a ./programs/program2 1 2 3
```