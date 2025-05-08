import express from 'express'
import { createUser, getLocations } from '../controllers/user'


const router = express.Router()

const baseUrl = '/users'
router.post(`${baseUrl}/create`, createUser )
router.get(`${baseUrl}/location`, getLocations )

const users = router
export default users