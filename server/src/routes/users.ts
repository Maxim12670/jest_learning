import { Router } from "express";
import {
  getAllUsersController,
  createUserController,
  deleteUserController,
  getUserByIdController,
} from "../controller/users";

const router = Router();

router.post("/create", createUserController);
router.get("/all", getAllUsersController);
router.get("/get/:id", getUserByIdController);
router.delete("/delete/:id", deleteUserController);

export default router;
