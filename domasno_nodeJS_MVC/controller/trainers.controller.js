import TrainerService from "../services/trainers.service.js";

export default class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const currentlyActiveQuery = req.query.currentlyActive?.toLowerCase() === "true";
      const sortByQuery = req.query.sortBy;
      const trainers = await TrainerService.getAllTrainers(
        currentlyActiveQuery,
        sortByQuery
      );
      res.send(trainers);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  static async getTrainerById(req, res) {
    try {
      const trainer = await TrainerService.getTrainerById(req.params.id);
      res.send(trainer);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  static async createTrainer(req, res) {
    try {
      const trainerBody = req.body;
      const trainer = await TrainerService.createTrainer(trainerBody);
      res.send(trainer);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async updateTrainer(req, res) {
    try {
      const trainerId = req.params.id;
      const trainerBody = req.body;
      const trainer = await TrainerService.updateTrainer(
        trainerId,
        trainerBody
      );
      res.send(trainer);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  static async deleteTrainer(req, res) {
    try {
      await TrainerService.deleteTrainer(req.params.id);
      res.status(200).send({ message: "Successfully deleted trainer" });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
  static async deleteAllTrainers(req, res) {
    try {
      await TrainerService.deleteAllTrainers();
      res.status(200).send({ message: "Successfully deleted all trainers" });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
}
