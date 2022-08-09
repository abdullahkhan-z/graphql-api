import app from "./src/app";
import {Response} from "express";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.get("/",(_,res:Response)=>{
    //sent status 200
    res.status(200).send("");
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;
