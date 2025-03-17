import DataHelper from "../services/data.service.js";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";


const currentFileUrl = import.meta.url;
// console.log(currentFileUrl);
const currentFilePath = fileURLToPath(currentFileUrl);
// console.log(currentFilePath); 
const filePathFolder = path.dirname(currentFilePath);
// console.log(filePathFolder);
const trainersPath = path.join(filePathFolder, "../data/trainers.json");
// console.log(trainersPath);

export default class TrainerModel {
    static async getAllTrainers(){
        return await DataHelper.readData(trainersPath);
    }
    static async getTrainerById(id) {
        const trainers = await this.getAllTrainers();
        const trainer = trainers.find(trainer => trainer.id === id);
        return trainer;
    }
    static async updateTrainer(id,body){
        const trainers = await this.getAllTrainers();
        // console.log(trainers);
        const trainerId = trainers.findIndex(trainer => trainer.id === id);
        // console.log(trainerId);
        if(trainerId === -1){
            throw new Error("User not Found, try another id");
        }
        trainers[trainerId] = body;
        await DataHelper.writeData(trainersPath,trainers);
        return trainers[trainerId];
    }
    static async addTrainer(body){
        const trainers = await this.getAllTrainers();
        trainers.push(body);
        await DataHelper.writeData(trainersPath,trainers);
        return body;
    }
    static async deleteTrainer(id){
        const trainers = await this.getAllTrainers();
        const filteredTrainers = trainers.filter(trainers => trainers.id !== id);
        await DataHelper.writeData(trainersPath,filteredTrainers);
    }
    static async deleteAllTrainers() {
        const trainers = await this.getAllTrainers();
        await DataHelper.writeData(trainersPath, []);
    }
}

// ovie tuka mi se staveni za da proveram dali mi rabotat funkciite
// console.log(await TrainerModel.getTrainerById("b85daa11-407f-4fa8-9e8f-0e5d9h1f2c1c"));
// console.log(await TrainerModel.updateTrainer("b85daa11-407f-4fa8-9e8f-0e5d9h1f2c1c", {
//     "id": uuidv4(),
//     "firstName": "Petre",
//     "lastName": "Silegov",
//     "email": "Petre.Silegov@example.com",
//     "isCurrentlyTeaching": true,
//     "timeEmployed": "7 months",
//     "coursesFinished": 2
// }));
// console.log(await TrainerModel.addTrainer({
//     "id": uuidv4(),
//     "firstName": "Kire",
//     "lastName": "Misirkovski",
//     "email": "Kire.Misirkovski1@example.com",
//     "isCurrentlyTeaching": true,
//     "timeEmployed": "1 month",
//     "coursesFinished": 10
// }));
// console.log(await TrainerModel.deleteTrainer("c96ebb22-518f-4gb8-9f9f-1e6d0i2f3d2d"));
// console.log(await TrainerModel.deleteAllTrainers());