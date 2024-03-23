import moongoose from 'mongoose';

const categoriesSchema =  new moongoose.Schema({
        title: String,
        code: String,
        user: {
            type: moongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const themesSchema =  new moongoose.Schema({
    title: String,
    code: String,
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    permissions:  [String], //access permissions
},{
    timestamps: true
})

/*const contenidoSchema = new moongoose.Schema(
    nombre: {
        type: String
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categoria: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    tematica: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Tematica'
    }
    
},{
    timestamps: true
});*/

const contenidoSchema = new moongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String
    },
    theme: {
        type: String
    }
    
},{
    timestamps: true
});


//export default moongoose.model("Contenido", contenidoSchema);
const Category = moongoose.model("Category", categoriesSchema);
const Theme = moongoose.model("Theme", themesSchema);
const Contenido = moongoose.model("Contenido", contenidoSchema);

export { Category, Theme, Contenido };

