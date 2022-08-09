import "jest";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../../src/app";

const testUsername = "abc";
const testPassword = "abc";
const cityID = 1907009;
const indexID = 1908009;
let token = "";

beforeAll(async () => {
  const graphqlQuery = `mutation {
        deleteCity(index: ${cityID}) {
            index,
            City,
            Country
        }
    }`;
  const graphqlDeleteDIndex = `mutation {
        deleteDevelopmentIndex(index: ${indexID}) {
            index,
            HDI_Rank,
            Country,
        }
    }`;
  const signInQuery = `
    query{
        signIn(username: "${testUsername}", password: "${testPassword}"){
            token
        }
    }`;
  const signInResponse = await request(app).post("/graphql").send({
    query: signInQuery,
  });
  const userData = signInResponse.body.data;
  token = userData.signIn.token;
  //formulate graphql query
  await request(app)
    .post("/graphql")
    .set("Authorization", `Bearer ${token}`)
    .send({
      query: graphqlQuery,
    });
  await request(app)
    .post("/graphql")
    .set("Authorization", `Bearer ${token}`)
    .send({
      query: graphqlDeleteDIndex,
    });
});

describe("Get City by Id", () => {
  it("should return a city", async () => {
    const graphqlQuery = `
            query {
                citySearch(index: 1) {
                    index,
                    City,
                    Country
                }
            }`;
    //formulate graphql query
    const response = await request(app).post("/graphql").send({
      query: graphqlQuery,
    });
    const { data } = response.body;
    expect(data.citySearch[0].index).toBe("1");
    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe("Try to create city without auth", () => {
  it("should return an error", async () => {
    const graphqlQuery = `
            mutation {
                createCity(
                    index: ${cityID},
                    Country: "USA",
                    City: "New York",
                    Population: 1000000,
                    Latitude: 40.7128,
                    Longitude: 74.0060
                ) {
                    index,
                    City,
                    Country,
                    Population,
                    Latitude,
                    Longitude
                }
            }`;
    //formulate graphql query
    const response = await request(app).post("/graphql").send({
      query: graphqlQuery,
    });
    expect(response.body.errors[0].message).toBe("Not authorized");
  });
});
describe("Create City", () => {
  it("should create a city", async () => {
    const graphqlQuery = `
            mutation {
                createCity(
                    index: ${cityID},
                    Country: "USA",
                    City: "New York",
                    Population: 1000000,
                    Latitude: 40.730610,
                    Longitude: -73.935242
                ) {
                    index,
                    City,
                    Country,
                    Population,
                    Latitude,
                    Longitude
                }
            }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(response.status).toBe(StatusCodes.OK);
    expect(data.createCity.index).toBe("1907009");
    expect(data.createCity.Country).toBe("USA");
    expect(data.createCity.City).toBe("New York");
    expect(data.createCity.Population).toBe("1000000");
  });
});

describe("Update City", () => {
  it("should update a city", async () => {
    const graphqlQuery = `
            mutation {
                updateCity(
                    index: ${cityID},
                    Country: "USA",
                    City: "New York",
                    Population: 600000,
                    Latitude: 40.730610,
                    Longitude: -73.935242
                ) {
                    index,
                    City,
                    Country
                }
            }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(data.updateCity.index).toBe("1907009");
    expect(data.updateCity.Country).toBe("USA");
    expect(data.updateCity.City).toBe("New York");
    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe("Delete City", () => {
  it("should delete a city", async () => {
    const graphqlQuery = `
            mutation {
                deleteCity(index: ${cityID}) {
                    index,
                    City,
                    Country
                }
            }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(data.deleteCity.index).toBe("1907009");
    expect(data.deleteCity.Country).toBe("USA");
    expect(data.deleteCity.City).toBe("New York");
    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe("Get development index", () => {
  it("should return a development index", async () => {
    const graphqlQuery = `
        query {
            development_indexSearch(index: 1) {
            index
            }
        }`;
    //formulate graphql query
    const response = await request(app).post("/graphql").send({
      query: graphqlQuery,
    });
    const { data } = response.body;
    expect(data.development_indexSearch[0].index).toBe("1");
    expect(response.status).toBe(StatusCodes.OK);
  });
});

describe("Create development index", () => {
  it("should create a development index", async () => {
    const graphqlQuery = `
                mutation {
                    addDevelopmentIndex(
                        index: ${indexID},
                        HDI_Rank: 1,
                        Country: "USA",
                        GDI_Value: 1,
                        HDI_Female: 1,
                        HDI_Male:1,
                    ) {
                        index,
                        HDI_Rank,
                        Country,
                        GDI_Value,
                        HDI_Female,
                        HDI_Male
                    }
                }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(data.addDevelopmentIndex.index).toBe(`${indexID}`);
    expect(data.addDevelopmentIndex.HDI_Rank).toBe("1");
    expect(data.addDevelopmentIndex.Country).toBe("USA");
    expect(data.addDevelopmentIndex.GDI_Value).toBe(1);
    expect(data.addDevelopmentIndex.HDI_Female).toBe(1);
    expect(data.addDevelopmentIndex.HDI_Male).toBe(1);
    expect(response.status).toBe(StatusCodes.OK);
  });
});

//update development index
describe("Update development index", () => {
  it("should update a development index", async () => {
    const graphqlQuery = `
            mutation {
                updateDevelopmentIndex(
                    index: ${indexID},
                    HDI_Rank: 2,
                    ){
                    index,
                    HDI_Rank
                    }
                }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(data.updateDevelopmentIndex.index).toBe(`${indexID}`);
    expect(data.updateDevelopmentIndex.HDI_Rank).toBe("2");
    expect(response.status).toBe(StatusCodes.OK);
  });
});

//detele development index
describe("Delete development index", () => {
  it("should delete a development index", async () => {
    const graphqlQuery = `
            mutation {
                deleteDevelopmentIndex(index: ${indexID}) {
                    index,
                    HDI_Rank
                }
            }`;
    //formulate graphql query
    const response = await request(app)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query: graphqlQuery,
      });
    const { data } = response.body;
    expect(data.deleteDevelopmentIndex.index).toBe(`${indexID}`);
    expect(data.deleteDevelopmentIndex.HDI_Rank).toBe("2");
    expect(response.status).toBe(StatusCodes.OK);
  });
});
