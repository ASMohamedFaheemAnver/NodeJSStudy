const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Swagger API",
      description:
        "A Demo Swagger API For Understanding The Concept Of Documentation.",
    },
  },
  apis: ["*.js"],
};

const PORT = process.env.PORT || 3000;
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *    post:
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          $ref: "#definitions/User"
 *      responses:
 *        "200":
 *          description: Will return created user.
 * definitions:
 *  User:
 *   type: "object"
 *   required:
 *    - userName
 *   properties:
 *     id:
 *       type: "integer"
 *       format: "int64"
 *     userName:
 *       type: "string"
 *     password:
 *       type: "string"
 */
app.use("/users", (req, res) => {
  res.send({ user_name: "asmohamedfaheem", type: "developer" });
});

app.listen(PORT, () => {
  console.log(`Server is up and running`);
});

// https://swagger.io/docs/specification/2-0/describing-responses/
// https://swagger.io/docs/specification/2-0/describing-request-body/
// https://swagger.io/docs/specification/describing-parameters/
