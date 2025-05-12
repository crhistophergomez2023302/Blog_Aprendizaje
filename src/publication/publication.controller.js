import Publication from "../publication/publication.model.js";
import Category from "../category/category.model.js";

export const createDefaultPublications = async () => {
    const defaultCategories = ["Taller", "Tecnologia", "Practica Supervisada"];
    const defaultPublications = {
        "Taller": [
            {
                title: "Laboratorio # 1 - Página Web",
                text: "Fue la primera pagina web que hice y esto bastante complicado pero me gusto el resultado",
            },
            {   title: "Laboratorio # 2 - Adición de funcionalidades",
                text: "Para este proyecto si fue un verdadero reto, ya que no comprendia mucho node.js y no estaba familiarizado", 
            },
            {   title: "Laboratorio # 3 - análisis de caso COPEREX", 
                text: "Me complico demasiado la implementacion del swagger y la documentacion pero pude aprender de ello despue ",
            },
            {   title: "Evaluación Técnica Bimestral", 
                text: "El trabajo si me llevo bastante tiempo pero pude terminarlo de una buena manera y saque una nota decente",
            },
            {   title: "Proyecto Bimestral II (35%)", 
                text: "Al ser en la metodologia SCRUM se me hizo algo complicado la organizacon",
            },
        ],
        "Tecnologia": [
            {   title: "Actividad # 1 - Infografía HTML, CSS, PreProcesadores", 
                text: "Fue una presentacion para dejar claro los conceptos de HTML y CSS",
            },
            {   title: "Actividad # 2 - Mapa conceptual", 
                text: "Fue un investigacion sobre las tecnologias que ibamos a utilizar ese bimestre",
            },
            {   title: "Actividad # 3 - Mapa mental", 
                text: "Fue un mapa mental que me llevo a entender más sobre la web",
            },
            {   title: "Actividad # 4 - Infografía beneficios React", 
                text: "Conoci mucho mas de REACT y sus beneficios",
            },
        ],
        "Practica Supervisada": [
            {   title: "Laboratorio # 1 - Agenda Web", 
                text: "Empezamos a realizar trabajos en javascript el cual me gusto el resultado que obtuve",
            },
            {   title: "Laboratorio # 2 - Administración de alumnos", 
                text: "Se me complico bastante el poder realizar este proyecto",
            },
            {   title: "Laboratorio # 3 - Gestor de opiniones", 
                text: "Fue un proyecto que por complicaciones me fue bastante mal",
            },
            {   title: "Laboratorio # 4 - Almacenadora", 
                text: "Me di cuenta que es basntante complicado ser SCRUM Master pero termino siendo un trabajo aceptable",
            },
        ],
    };

    try {
        for (const categoryName of defaultCategories) {
            const category = await Category.findOne({ name: categoryName });
            if (category) {
                for (const publicationData of defaultPublications[categoryName]) {
                    const publicationExists = await Publication.findOne({
                        title: publicationData.title,
                        category: category._id,
                    });

                    if (!publicationExists) {
                        const publication = new Publication({
                            title: publicationData.title,
                            text: publicationData.text,
                            category: category._id,
                        });
                        await publication.save();
                        console.log(`Publicación "${publication.title}" creada en la categoría "${categoryName}"`);
                    } else {
                        console.log(`La publicación "${publicationData.title}" ya existe en la categoría "${categoryName}"`);
                    }
                }
            } else {
                console.log(`La categoría "${categoryName}" no existe`);
            }
        }
    } catch (error) {
        console.error("Error al crear las publicaciones por defecto:", error);
    }
};

export const getPublicationsByCategoryName = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const publications = await Publication.find()
            .populate({
                path: "category",
                match: { name: categoryName },
                select: "name",
            });

        const filteredPublications = publications.filter((pub) => pub.category);

        if (filteredPublications.length === 0) {
            return res.status(404).json({ message: `No se encontraron publicaciones para la categoría "${categoryName}"` });
        }

        res.status(200).json(
            filteredPublications.map((pub) => ({
                _id: pub._id,
                title: pub.title,
                text: pub.text,
                category: pub.category,
                comments: pub.comments,
                date: pub.date,
            }))
        );
    } catch (error) {
        console.error("Error al obtener las publicaciones por nombre de categoría:", error);
        res.status(500).json({ error: "Error al obtener las publicaciones por nombre de categoría" });
    }
};

export const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id)
            .populate("category", "name")
            .populate("comments", "user text date");

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la publicación con el ID "${id}"`,
            });
        }

        res.status(200).json({
            success: true,
            publication: {
                _id: publication._id,
                title: publication.title,
                text: publication.text,
                category: publication.category,
                comments: publication.comments,
                date: publication.date,
            },
        });
    } catch (error) {
        console.error("Error al obtener la publicación por ID:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la publicación por ID",
            error: error.message,
        });
    }
};