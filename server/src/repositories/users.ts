import { IUser } from "../models/user";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(__dirname, "../../src/database/usersDB.json");

// Проверяем и создаем файл, если его нет
const ensureFileExists = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf-8");
  }
};

const readUsers = async () => {
  try {
    ensureFileExists();
    const data = await fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const writeUsers = async (users: IUser[]) => {
  try {
    await fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing users file:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await readUsers();
  return users;
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  const users: IUser[] = await readUsers();
  return users.find((user: IUser) => user.id === id);
};

export const createUser = async (userData: Omit<IUser, "id">): Promise<IUser> => {
  const users: IUser[] = await readUsers();
  const newUser: IUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    ...userData,
  };
  users.push(newUser);
  await writeUsers(users);
  return newUser;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const users: IUser[] = await readUsers();
  const filteredUsers = users.filter((user) => user.id !== id);
  if (users.length === filteredUsers.length) return false;
  await writeUsers(filteredUsers);
  return true;
};
