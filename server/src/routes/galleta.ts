import express from 'express'
import { createProduct, deleteProduct, editProduct, getCategories, getProducts } from '../controllers/galletas'
import { create } from 'domain'


const router = express.Router()

const baseUrl = '/cookies'
router.get(`${baseUrl}/categories`, getCategories )
router.get(`${baseUrl}`, getProducts )
router.post(`${baseUrl}/create`, createProduct )
router.put(`${baseUrl}/edit/:id`, editProduct )
router.delete(`${baseUrl}/delete/:id`, deleteProduct )


const cookies = router
export default cookies