- `git clone https://github.com/abdullahkhan-z/test-s`
- `cd test-s`
- For local install `npm install`
- Duplicate `.env.local` and rename it to `.env`. Only Prisma depends on it
- In case one intends to use his/her database credentials then following steps are  necessary.
- If prisma cli is not already installed then install that globally, run `prisma db push`. This will push local schema to remote database.
- Use GraphQL to add a dummy User with username `abc` and password `abc` as integration tests assume the use is already registered
- To do that. Follow the following steps
- Run in dev mode `npm run start:dev`
- Open GraphQL playground at `localhost:3000`
- Run signup mutation
   `mutation{
    signUp(username:"abc", password:"abc"){
        response
    }
   }`
- Run tests `npm run test`
- Build for docker `sudo docker compose build`
- `sudo docker compose up` Note: By, default, this runs in production mode with redis enabled, configurations can be changed from environment variables in docker-compose.yaml file. Development mode does not have redis enabled.
- Run tests `sudo docker compose run api npm run test`.
- Implementation through graphql, all mutations are protected apart from signup.
- One may find details in about api in `src/graphql/`
- `Prisma` is being used as ORM, along with `apollo server` and `nexus`
- `jest` is used for testing. Integration tests are found in `test/integration-tests`.

# Kubernetes Deployment Rountine

- push built docker image to public repo
- in `kubernetes.yaml` change source image of `main-app-deployment` deployment scheme
- Configuration was tested on minikube
