## mongoDB setup in mac as the following: 

## to install mongoDB on mac, just : 
            ## $brew update
            ## $brew install mongodb 
## change db data dir read and write: sudo chmod 0755 /data/db/
## change db data dir owner : sudo chown $USER /data/db/
## run the mongodb:  terminal$ mongod
## install studio 3T,  to go robomongo 
##  then you can browse mongoDB like MySQL

### setup ES6 code debug in VS
#### see this page https://medium.com/@drcallaway/debugging-es6-in-visual-studio-code-4444db797954

## deploy app on heroku
### on your terminal:  $heroku create ;  $heroku addons:create mongolab:sandbox , after this command, you will see the mongodb connection string.  (you can also add mongodb addons from your heroku dashboard), you can run $heroku config to get the mongodb connection string for prod.
#### set your heroku env variables:   eg:  $heroku config:set JWT_SECRET=ASDFAsdfsd3567xfSDFSDFG
##how to check logs on prod
### do the following on terminal: $heroku logs -t --app you-app-name, i.e.: $ heroku logs -t --app test-my-to-do