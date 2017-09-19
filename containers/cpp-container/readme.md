# Build
First build the images as follow:

    docker build -t cpp-builder ./builder
    docker build -t cpp-runner ./runner

Note: Runner is just ubuntu, so it can be used for other executable files.

# Run

    docker run -v /some/place/:/usr/src/app -it cpp-builder gcc example.c
    docker run -v /some/place/:/usr/src/app -it cpp-runner ./a.out

Note: `/usr/src/app` check the dockerfile.

Note: Parameters can be passed to the gcc.
