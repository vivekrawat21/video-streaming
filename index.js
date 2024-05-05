import express from "express";
import cors from "cors";
import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";

//revised java script
const app = express();
//multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
        }

    });
  


app.use(cors(
    {
        origin: ["http://localhost:3000","http://localhost:5173"],
        credentials: true
    }
));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();

})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads",express.static("uploads"));
app.use(multer().single("file"));

app.get('/', (req, res) => {
    res.json({message: "Hello brother"});
})

app.listen(8000, () => {
    console.log("App is listening at port 3000");
})