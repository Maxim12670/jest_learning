import { Request, Response } from "express";
import { getAllUsers, getUserById, createUser, deleteUser } from "../repositories/users";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user!" });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all users!" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await getUserById(parseInt(id));
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user by id!" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      const isDeleted = await deleteUser(parseInt(id));
      if (!isDeleted) {
        res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
