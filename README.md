<!--
 *  Copyright 2019 Laguro, Inc. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-->

# SWARMER-AI

## Laguro Medical Images Labeler

**Swarmer-Ai** is an open source project focused on Labeling. Its goal is to manage the entire flow of creation, maintenance and automation of labeling jobs for all the contributors involved. Its purpose is to simplify the process of creating workflows making the process simple for data collection and extraction.

## Environment

**Swarmer-Ai** is divided into two parts: Front-End and API.

With this it is possible to split and install the parts in different service providers. Flexibility here is the key word, giving freedom for every release process whether in a virtualized, containerized or cloud environment

## Scripts

### Prerequisites
- Docker : Install docker current version - https://www.docker.com/
- Yarn : Our package management of choice. - https://yarnpkg.com

### Start
To check all the current support commands just run: **make**
```
make
  __    _____ _____ _____ _____ _____ 
 |  |  |  _  |   __|  |  | __  |     |
 |  |__|     |  |  |  |  |    -|  |  |
 |_____|__|__|_____|_____|__|__|_____|
 Swamerai commands to make your life 'really easy peasy!'
   
 start, stop, build and clean
```

Starting build the base images
```
make build
```

To easily start the project run
```
make start
```
This will start the project dependencies in a Docker with : 
- Redis - https://redis.io/
- AWS S3 (localstack) - https://github.com/localstack/localstack
- MongoDB - https://www.mongodb.com/




### Front-End
- **start**: Start the React App Server
- **build**: Build the React App for deploy

### API
- **start**: Start the Babek=l Node Graphql Server
- **debug**: Start in debug mode
- **deploy-prisma:local**: Deploy the changes in Prisma to mongo and Startup the Prisma Admin

### Tools
- Graphql Playgroung : http://localhost:4000/
- Prisma Admin: http://localhost:4466/_admin
