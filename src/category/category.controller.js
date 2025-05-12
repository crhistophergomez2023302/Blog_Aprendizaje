import Category from './category.model.js';

export const defaultCategories = async () => {
    const defaultCategories = ["Taller", "Tecnologia", "Practica Supervisada"];

    try {
        for (const name of defaultCategories) {
            const categoryExists = await Category.findOne({ name });
            if (!categoryExists) {
                const category = new Category({ name });
                await category.save();
                console.log(`Las categorias ${name} han sido creadas`);
            } else {
                console.log(`La categoría ${name} ya existen`);
            }
        }
    } catch (error) {
        console.error('Error al crear las categorías:', error);
    }
};

export default defaultCategories;