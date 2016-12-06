# Docker

##### Problem

The problem I'm trying to solve is forbit user iteraction with host server. Some users wants to abuse the system, so they will try hacks (programs which are not expected to be run - something to iterract with filesystem, etc...) and they need to be somehow forbidden. To detach server system from current application context.

##### Here comes the "Docker"

Well I've discused this problem with another programmer and he gave me idea to use docker. So I did.

[Here is Docker web site](https://www.docker.com/) where you can find details about installation as well as lots of material to read - what is this, how it works, how to use it.

To save your time, my solution came after this [article](https://docs.docker.com/engine/getstarted/step_four/). I've found a image for `gcc`. [Here it is](https://hub.docker.com/_/gcc/).

1. The `Dockerfile`
>FROM gcc:4.9
ADD ./app /usr/src/myapp
WORKDIR /usr/src/myapp
RUN gcc -o myapp main.c
CMD ["./myapp"]

"Add" line copies local folder "./app" to the container folder "/usr/src/myapp". And thats it.

TODO: check if app source folder can be passed as parameter (good for performance).
TODO: check how result of building will be registered by nodejs (to get build errors, etc...)
