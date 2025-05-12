import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog API",
            version: "1.0.0",
            description: "API para un Blog de aprendizaje",
            contact:{
                name: "Crhistopher Gomez",
                email: "cgomez-2023302@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3003/opinionSystem/v1"
            }
        ]
    },
    apis:[
        "./src/publication/.js",
        "./src/comment/.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}