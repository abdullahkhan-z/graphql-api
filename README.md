- `git clone https://github.com/abdullahkhan-z/test-s`
- `cd test-s`
- For local install `npm install`
- Run in dev mode `npm run start:dev`
- Run tests `npm run test`
- Build for docker `sudo docker compose buold`
- `sudo docker compose up` Note: By, default, this runs in production mode with redis enabled, configurations can be changed from environment variables in docker-compose.yaml file. Development mode does not have redis enabled.
- Run tests `sudo docker compose run api npm run test`.
- Implementation through graphql, all mutations are protected apart from signup.
- One may find details in about api in `src/graphql/`
- `Prisma` is being used as ORM, alone with `apollo server` and `nexus`
- `jest` is used for testing. Integration tests are found in `test/integration-tests`.

# Kubernetes Deployment Rountine

- push built docker image to public repo
- in `kubernetes.yaml` change source image of `main-app-deployment` deployment scheme
- Configuration was tested on minikube
