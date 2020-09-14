const app = require("../app");
const request = require("supertest");
const isBase64 = require("is-base64");

const FileImageCat = "https://gblobscdn.gitbook.com/spaces%2F-MH8I_V6r3vrKRSRrAoX%2Favatar-1600034351122.png?alt=media";

describe("🎯 Testing (Change My  Mind) API endpoint", () =>
{
    it("GET - Should return a message and a status code of (404) for GET requests", (done) =>
    {
        request(app).get("/api/v1/changemymind")
        .expect("Content-Type", /json/)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(404);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Sorry, can't access the endpoint you are looking for 👀. Is it POST or GET 🤔 ?");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if there is no image URL provided", (done) =>
    {
        request(app).post("/api/v1/changemymind")
        .expect("Content-Type", /json/)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("You need to provide an actual image URL if you want your meme, duh... 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (415) if there is not a valid image URL provided", (done) =>
    {
        request(app).post("/api/v1/changemymind")
        .expect("Content-Type", /json/)
        .field("image", "dasdasdsa")
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(415);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(415);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("You need to provide a valid image URL 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if there is no query specified but a a valid image URL is attached", (done) =>
    {
        request(app).post("/api/v1/changemymind")
        .expect("Content-Type", /json/)
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Invalid opinion query specified! You need to specifiy a text in your query parameter. Correct usage is /changemymind?opinion='your opinion here' 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if the `opinion` is empty but a valid image URL is attached", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=")
        .expect("Content-Type", /json/)
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Invalid opinion query specified! You need to specifiy a text in your query parameter. Correct usage is /changemymind?opinion='your opinion here' 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if the `opinion` query length is higher than 27 characters but a a valid image URL is attached", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=LKdx1XY72yoFgTkXd1rXHUmnVgx3drIjwHjrQtJnpQ5pYhmKlKFl43AwxeYK8bbQCwQID6cysLxIgEnG6xaFBhz7yI33lFrFHYhu4kxSJDX5m89l1scTGykzgteYJv1i2")
        .expect("Content-Type", /json/)
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("Your opinion text is too long. Maximum 27 characters please... 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if a valid image URL is attached and all queries are specified but the query `format` is not present", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=githubhaha")
        .expect("Content-Type", /json/)
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("You either did not specify a return format query or the query value was wrong. Just add a query at the end named format='buffer or base64' ! 🙄");

            done();
        });
    });

    it("POST - Should return a message and a status code of (400) if a valid image URL is attached and all queries are specified but the `format` query contains an invalid format", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=ggithubhaha&format=nope")
        .expect("Content-Type", /json/)
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(400);
            expect(response.body).to.be.a("object");
            expect(Object.keys(response.body).length).to.be.equal(2);
            expect(response.body).to.have.a.property("status").and.to.be.a("number").and.to.be.equal(400);
            expect(response.body).to.have.a.property("message").and.to.be.a("string").and.to.be.equal("You either did not specify a return format query or the query value was wrong. Just add a query at the end named format='buffer or base64' ! 🙄");

            done();
        });
    });

    it("POST - Should return a buffer and a status code of (200) if a a valid image URL is attached, all queries are specified and the `format` query is set to `buffer`", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=githubhaha&format=buffer")
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(200);
            expect(Buffer.isBuffer(response.body)).to.be.true;

            done();
        });
    });

    it("POST - Should return a base64 string of the image and a status code of (200) if a valid image URL is attached, all queries are specified and the `format` query is set to `base64`", (done) =>
    {
        request(app).post("/api/v1/changemymind?opinion=github.com&format=base64")
        .field("image", FileImageCat)
        .end((err, response) =>
        {
            expect(response.status).to.be.equal(200);
            expect(response.text).to.be.a("string").and.to.not.be.empty;
            expect(isBase64(response.text)).to.be.true;

            done();
        });
    });
});