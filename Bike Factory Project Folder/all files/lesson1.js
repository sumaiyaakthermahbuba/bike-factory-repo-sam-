const routs= require("./router");
const port=3001;

routs.listen(port,()=>{
    console.log(`your server is running at http://localhost:${port}`);
})

