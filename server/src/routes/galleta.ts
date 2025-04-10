import express from 'express'
import { getProducts } from '../controllers/galletas'


const router = express.Router()

const baseUrl = '/cookies'
router.get(`${baseUrl}`, getProducts )

const cookies = router
export default cookies