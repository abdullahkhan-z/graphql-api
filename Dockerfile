From node
RUN mkdir app/
COPY . app/
WORKDIR app/
Run npm install
CMD ["npm", "start"]

