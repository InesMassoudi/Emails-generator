const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const email= require('./email');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express emails generator API",
      },
  
      servers: [
        {
          url: "http://localhost:3000",
          description: "email API",
        },
      ],
    },
    apis: ["./app.js"],
  };


/**
 * @swagger
 * components:
 *   schemas:
 *     email:
 *       type: object
 *       properties:
 *         data: 
 *           type: array
 *           items:
 *              type: object
 *              properties: 
 *                  id:
 *                    type: string
 *                    default: JL.JCMCharlesMignard@subdomain.domain.tld
 *                  value: 
 *                    type: string                   
 *                    default: JL.JCMCharlesMignard@subdomain.domain.tld 
 */

  
/**
 * @swagger
 *  tags:
 *    name: Emails
 *    description: generate an email
 */

/**
 * @swagger
 * /emails-generator:
 *   get:
 *     summary: generate a new email
 *     parameters:
 *        - in : query
 *          name : input1
 *          required : false
 *          description: input1
 *          schema:
 *              type: string
 *              format: string
 *        - in : query
 *          name : input2
 *          required : false
 *          description: input2
 *          schema:
 *              type: string
 *              format: string
 *        - in : query
 *          name : input3
 *          required : false
 *          description : input3
 *          schema:
 *             type: string
 *             format : string
 *        - in : query
 *          name: input4
 *          required : false
 *          description : input4
 *          schema :
 *             type: string
 *             format : string
 *        - in : query
 *          name: input5
 *          description : input5
 *          required : false
 *          schema:
 *              type: string
 *              format : string
 *        - in : query
 *          name : input6
 *          required : false
 *          description: input6
 *          schema :
 *              type: string
 *              format : string
 *        - in : query
 *          name: expression
 *          description: expression
 *          default : "input1.eachWordFirstChars(1) ~ '.' ~(input2.wordsCount() > 1 ? input2.lastWords(-1).eachWordFirstChars(1) ~ input2.lastWords(1) : input2 ) ~ '@' ~ input3 ~ '.' ~ input4 ~ '.' ~ input5"
 *          schema:
 *              type: string
 *              format: string        
 * 
 *     tags: [Emails]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/vnd.api+json:
 *             schema:
 *                 $ref: '#/components/schemas/email'
 */

app.use('/', email );

const specs = swaggerJsDoc(options);
app.use('/', swaggerUI.serve, swaggerUI.setup(specs));
app.listen(3000, () => console.log("server is running on port 3000"));