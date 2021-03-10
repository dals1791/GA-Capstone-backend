const { ApolloServer, AuthenticationError } =require('apollo-server-express')
const express = require('express');
const typeDefs =require( "./typeDefs")
const resolvers =require("./resolvers") 
const authJWT = require('./configs/auth')
// Call express
const app = express()
// CORS
const cors = require("cors");
const corsOptions = require("./configs/cors");
// define PORT
const PORT = process.env.PORT || 4000
//====================== MiddleWare====================
app.use(cors());
// ====================================================
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
// Create apollo server with typeDefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context:  async ({req})=>{
       let authenticatedToken = null
     try{
        const authHeader = req.headers.authorization || "";
        if (authHeader){
         authenticatedToken = await authJWT(authHeader)
        }
        
        

     }catch{throw AuthenticationError}
     return authenticatedToken
    },
    playground: true
    
})


// apply middleware for apolloserver
server.applyMiddleware({ 
    app,
    path: '/' });

app.listen(PORT, () =>
    console.log(`🚀 Server ready at ${PORT}${server.graphqlPath}`)
)