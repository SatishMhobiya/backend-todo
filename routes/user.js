import { Router } from "express";
import { deleteUser, getAllUsers, getUser, registerUser } from "../controllers/user.js";

const router = Router();

router.get("/all", getAllUsers)
router.post("/new", registerUser)
router.delete("/delete", deleteUser)
router.get("/user", getUser)

export default router;