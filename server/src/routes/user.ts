import express from 'express'
import { createUser } from '../controllers/user'


const router = express.Router()

const baseUrl = '/users'
router.post(`${baseUrl}/create`, createUser )

const users = router
export default users