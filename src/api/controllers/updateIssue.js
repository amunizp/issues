const postCinema = async (req, res, next) => {
    try {
      const newCinema = new Cinema(req.body);
      const cinemaSaved = newCinema.save();
      return res.status(201).json(cinemaSaved);
    } catch (error) {
      return res.status(400).json("No se ha podido crear el ine");
    }
  };
  
  const getCinema = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cinema = await Cinema.findById(id).populate("movies");
      return res.status(200).json(cinema);
    } catch (error) {
      return res.status(400).json("No se han podido conseguir los cines");
    }
  };