import express from "express";
import {
  createUser,
  getLocations,
  loginUser,
  editUserPersonalData,
  enviarRecuperacion,
  reestablecerContrasena,
} from "../controllers/user";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

const baseUrl = "/users";
router.post(`${baseUrl}/create`, createUser);
router.get(`${baseUrl}/location`, getLocations);
router.post(`${baseUrl}/login`, loginUser);
router.put(`${baseUrl}/edit-user`, verifyToken, editUserPersonalData);

router.post(`${baseUrl}/recuperar`, enviarRecuperacion);
router.post(`${baseUrl}/restablecer`, reestablecerContrasena);

const users = router;
export default users;
