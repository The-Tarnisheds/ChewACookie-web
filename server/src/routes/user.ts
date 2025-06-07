import express from "express";
import { createUser, getLocations, loginUser } from "../controllers/user";

const router = express.Router();

const baseUrl = "/users";
router.post(`${baseUrl}/create`, createUser);
router.get(`${baseUrl}/location`, getLocations);
router.post(`${baseUrl}/login`, loginUser);
const users = router;
export default users;
