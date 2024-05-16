import express from "express";
import { addFood, listFood, removeFood, updateFood, searchFood } from "../controller/foodController.js"; // Thêm hàm tìm kiếm từ file controller
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", upload.single("image"), updateFood);
foodRouter.get("/search", searchFood);

export default foodRouter;
