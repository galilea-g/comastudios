
import { Category, Theme, Contenido } from '../models/contenido.models.js'

// **********************CONTENIDO*******************
/**
 * Returns a list of contenidos associated with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a JSON array of contenidos associated with the authenticated user.
 */
export const getContenidos =  async (req,res) => {
    try {
        const contenidos = await Contenido.find({
            user: req.user.id
        }).populate('user')
        res.json(contenidos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Creates a new contenido document with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The data for the new contenido document.
 * @param {string} req.body.nombre - The name of the new contenido document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the new contenido document.
 */
export const crateContenido =  async (req,res) => {
    try {
        const {title,category,theme} = req.body
    
        const newContenido = new Contenido({
            title, 
            category, 
            theme,
            user: req.user.id
        })
    
        const saveContenido = await newContenido.save()
    
        res.json(saveContenido)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Returns a single contenido document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the contenido document to retrieve.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the contenido document.
 */
export const getContenido =  async (req,res) => {
    try{
        const contenido = await Contenido.findById(req.params.id).populate('user')

        if(!contenido){
            return res.status(404).json({message: 'Contenido not found'})
        }

        res.json(contenido)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Updates a contenido document by ID with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the contenido document to update.
 * @param {Object} req.body - The data to update the contenido document with.
 * @param {string} req.body.nombre - The new name of the contenido document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the updated contenido document.
 */
export const updateContenido =  async (req,res) => {
    try{
        const { title, category, theme } = req.body;
        const contenido = await Contenido.findByIdAndUpdate(
            { _id: req.params.id },
            { title, category, theme },
            { new: true }
        );

        if(!contenido){
            return res.status(400).json({message: 'Contenido deleted'})
        }

        res.json(contenido)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Deletes a contenido document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the contenido document to delete.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a 204 status code.
 */
export const deleteContenido =  async (req,res) => {
    try{
        const contenido = await Contenido.findByIdAndDelete(req.params.id)

        if(!contenido){
            return res.status(400).json({message: 'Contenido deleted'})
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// **********************CATEGORIES*******************

/**
 * Returns a list of categories associated with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a JSON array of contenidos associated with the authenticated user.
 */export const getCategories =  async (req,res) => {
    try {
        const categories = await Category.find({
            user: req.user.id
        }).populate('user')
        res.json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Returns a single category document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the category document to retrieve.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the category document.
 */
export const getCategory =  async (req,res) => {
    try{
        const category = await Category.findById(req.params.id).populate('user')

        if(!category){
            return res.status(404).json({message: 'Category not found'})
        }

        res.json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


/**
 * Creates a new category document with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The data for the new category document.
 * @param {string} req.body.nombre - The name of the new category document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the new category document.
 */export const createCategory =  async (req,res) => {
    try {
        const {title,code} = req.body
    
        const newCategory = new Category({
            title, 
            code, 
            user: req.user.id
        })
    
        const saveContegory = await newCategory.save()
    
        res.json(saveContegory)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


/**
 * Updates a category document by ID with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the category document to update.
 * @param {Object} req.body - The data to update the category document with.
 * @param {string} req.body.nombre - The new name of the category document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the updated category document.
 */
export const updateCategory =  async (req,res) => {
    try{
        const { title, code } = req.body;
        const contegory = await Category.findByIdAndUpdate(
            { _id: req.params.id },
            { title, code },
            { new: true }
        );

        if(!contegory){
            return res.status(400).json({message: 'Contenido deleted'})
        }

        res.json(contegory)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Deletes a category document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the category document to delete.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a 204 status code.
 */
export const deleteCategory =  async (req,res) => {
    try{
        const contegory = await Category.findByIdAndDelete(req.params.id)

        if(!contegory){
            return res.status(400).json({message: 'Category deleted'})
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// **********************THEME*******************

/**
 * Returns a list of themes associated with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a JSON array of categorys associated with the authenticated user.
 */export const getThemes =  async (req,res) => {
    try {
        const themes = await Theme.find({
            user: req.user.id
        }).populate('user')
        res.json(themes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Returns a single theme document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the theme document to retrieve.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the theme document.
 */
export const getTheme =  async (req,res) => {
    try{
        const theme = await Theme.findById(req.params.id).populate('user')

        if(!theme){
            return res.status(404).json({message: 'Theme not found'})
        }

        res.json(theme)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/**
 * Creates a new theme document with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The data for the new theme document.
 * @param {string} req.body.nombre - The name of the new theme document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the new theme document.
 */
export const createTheme =  async (req,res) => {
    try {
        const {title,code, permissions} = req.body

        //Search exist user before save new
        const themeFound = await Theme.findOne({title})
        if(themeFound){
            return res.status(400).json(["Theme already exists"])
        }
    
        const newTheme = new Theme({
            title, 
            code,
            permissions,
            user: req.user.id
        })
    
        const saveTheme = await newTheme.save()
    
        res.json(saveTheme)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


/**
 * Updates a theme document by ID with the specified data and associates it with the authenticated user.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the theme document to update.
 * @param {Object} req.body - The data to update the theme document with.
 * @param {string} req.body.nombre - The new name of the theme document.
 * @param {ObjectId} req.user.id - The ID of the authenticated user.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with the updated theme document.
 */
export const updateTheme =  async (req,res) => {
    try{
        const { title, code, permissions } = req.body;
        const theme = await Theme.findByIdAndUpdate(
            { _id: req.params.id },
            { title, code, permissions },
            { new: true }
        );

        if(!theme){
            return res.status(400).json({message: 'Theme deleted'})
        }

        res.json(theme)

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


/**
 * Deletes a theme document by ID.
 *
 * @param {Object} req - The HTTP request object.
 * @param {string} req.params.id - The ID of the theme document to delete.
 *
 * @param {Object} res - The HTTP response object.
 *
 * @returns {void} - The HTTP response is sent with a 204 status code.
 */export const deleteTheme =  async (req,res) => {
    try{
        const theme = await Theme.findByIdAndDelete(req.params.id)

        if(!theme){
            return res.status(400).json({message: 'Theme deleted'})
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
