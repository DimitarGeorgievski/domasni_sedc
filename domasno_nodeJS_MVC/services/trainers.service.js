import TrainerModel from "../model/trainers.model.js";
import { v4 as uuidv4 } from "uuid";

export default class TrainerService {
    static async getAllTrainers(currentlyActive,sortBy) {
    const trainers = await TrainerModel.getAllTrainers();
    let filteredTrainers = trainers;
    if(typeof currentlyActive === "boolean" && currentlyActive === true) {
        filteredTrainers = filteredTrainers.filter(trainers => trainers.isCurrentlyTeaching === currentlyActive);
    }
    if(sortBy === "coursesAsc"){
        filteredTrainers.sort((a,b) => a.coursesFinished - b.coursesFinished);
    }
    else if(sortBy === "coursesDesc"){
        filteredTrainers.sort((a,b) => b.coursesFinished - a.coursesFinished);
    }
    return filteredTrainers
}
    static async getTrainerById(id) {
        const trainer = await TrainerModel.getTrainerById(id);
        if(!trainer){
            throw new Error("Trainer not found");
        }
        return trainer;
    }
    static async createTrainer(body){
        const newTrainer = {
            id: uuidv4(),
            ...body,
            createdAt: new Date().toISOString()
        }
        return await TrainerModel.addTrainer(newTrainer);
    }
    static async updateTrainer(id,body){
        const trainer = await this.getTrainerById(id);
        if(!trainer){
            throw new Error("Trainer not found");
        }
        const updateTrainer = {
            ...body,
            updatedAt: new Date().toISOString()
        }
        return await TrainerModel.updateTrainer(id, updateTrainer);
    }
    static async deleteTrainer(id){
        return await TrainerModel.deleteTrainer(id);
    }
    static async deleteAllTrainers(){
        return await TrainerModel.deleteAllTrainers();
    }
}

// console.log(await TrainerService.getTrainerById("827abd98-3e3f-4b48-9c92-d47b4d6825d1"));
// console.log(await TrainerService.updateTrainer("59ce592b-bf2d-4502-8862-351c20b0771e", {
//     "id": uuidv4(),
//     "firstName": "Petre",
//     "lastName": "Silegov",
//     "email": "Petre.Silegov1@example.com",
//     "isCurrentlyTeaching": true,
//     "timeEmployed": "7 months",
//     "coursesFinished": 2
// }));
// console.log(await TrainerService.createTrainer({
//     "id": uuidv4(),
//     "firstName": "Trajko",
//     "lastName": "Petkovski",
//     "email": "Trajki.Petkovski@example.com",
//     "isCurrentlyTeaching": true,
//     "timeEmployed": "1 month",
//     "coursesFinished": 10
// }));
// console.log(await TrainerService.deleteTrainer("c549f9de-69bf-4548-9850-92dc18fd6f9f"));
// console.log(await TrainerService.deleteAllTrainers());