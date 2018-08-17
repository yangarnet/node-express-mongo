# this is the starting point
FROM node:8.9-alpine

# by default set the env to production
#ENV NODE_ENV production

# make a dir of the /usr/src/app that will hold application file in the docker image
RUN mkdir -p /usr/src/app

# set the created directory /usr/src/app as working DIR for any instruction that follows this cmd
# in the docker file 
WORKDIR /usr/src/app

# two forms of copy in docker file
# COPY  <src>... <dest>
# COPY ["<src>",... "<dest>"]
# The <src> path must be inside the context of the build; you cannot COPY ../something /something
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "."]
# the . here means the current dir where the dockerfile sits
COPY package.json . 


# run npm to install dependencies
#RUN npm install --production --silent && mv node_modules ../
RUN npm install

# bundle app resouces, to the docker image location
COPY . /usr/src/app

RUN npm run build


# remove development dependencies.
RUN npm prune --production

# set the port, the container will listen to 3000 at runtime
EXPOSE 3000

# tells docker how to run your application after the image is built. finally run the app
CMD npm start

# build you docker image with tag name :
# docker build -t tag-name:tag-version(like 1.0, etc) . 

# run your image
# docker run -p 80:3000 {image-id}   # this cmd is bind container port 3000 to localhoust port 80

# stop a docker contaimer: $ docker kill <image id>
# with docker compose, you don't have to run docker build -t image:version .  to run docker container