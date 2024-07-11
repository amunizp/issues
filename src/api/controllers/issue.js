//! CRUD -> Dreate Read Update Delete
const getMovies = async (req, res, next)=> {
    try {
        const movies = await Movie.find();
        return res.status(200).movies(); 
    } catch (error) {
        return res.status(400).json("error no muy completo")
    }
}

const postMovie = async (req, res, next)=> {
    try {
        const newMovie = new Movie(req.body); 
        const movieSaved = await newMovie.save(); 
        return res.status(201).json(movieSaved);
    } catch (error) {
        return res.status(400).json("error no muy completo")
    }
}
const updateMovie = async (req, res, next)=> {
    try {
        const { id } = req.params; 
        const newMovie = new Movie(req.body); 
        newMovie._id = id; 
        const movieUpdated = await Movie.findByIdAndUpdate(id, newMovie, {new:true}); 
        return res.status(200).json(movieUpdated);

       
    } catch (error) {
        return res.status(400).json("error no muy completo")
    }
}
const deleteMovie = async (req, res, next)=> {
    try {
        const { id } = req.params
        const movieDeleted = await  Movie.findByIdAndDelete(id);
        return res.status(200).status(200).json({
            mensaje: "Elemento elimindado",
            elemento: movieDeleted
        })
    } catch (error) {
        return res.status(400).json("error no muy completo")
    }
}

module.exports = {
    getMovies,
    postMovie,
    updateMovie,
    deleteMovie
}

//get, post, put, delete