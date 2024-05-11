import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nguyenkirito12:09052004@cluster0.g9a5uy2.mongodb.net/food-del').then(() => console.log("DB connected"));
}
