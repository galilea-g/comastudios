/**
 * This file defines routes for the API related to CONTENID.
 * It includes routes for managing content, categories, and themes.
 * All routes are protected and require authentication using a valid token.
 */
import {Router} from 'express';
import {authRequired} from '../middlewares/validateToken.js';
import {
    getContenidos,
    getContenido,
    crateContenido,
    updateContenido,
    deleteContenido,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getThemes,
    getTheme,
    createTheme,
    updateTheme,
    deleteTheme
} from '../controllers/contenido.controllers.js'
import {validateSchema} from '../middlewares/validatorMiddleware.js'
import {createContenidoValidate} from '../validators/contenido.validator.js'

const router = Router()

router.get('/contenidos',authRequired,getContenidos)
router.post('/contenido', authRequired, validateSchema(createContenidoValidate),crateContenido)
router.get('/contenido/:id',authRequired,getContenido)
router.delete('/contenido/:id',authRequired,deleteContenido)
router.put('/contenido/:id',authRequired,updateContenido)


router.get('/categories',authRequired,getCategories)
router.post('/category', authRequired, createCategory)
router.get('/category/:id',authRequired,getCategory)
router.put('/category/:id',authRequired,updateCategory)
router.delete('/category/:id',authRequired,deleteCategory)


router.get('/themes',authRequired,getThemes)
router.post('/theme', authRequired, createTheme)
router.get('/theme/:id',authRequired,getTheme)
router.put('/theme/:id',authRequired,updateTheme)
router.delete('/theme/:id',authRequired,deleteTheme)

export default router;