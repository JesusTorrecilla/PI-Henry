const { Router } = require("express");
const axios = require("axios");
const { Tipo, Pokemon } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async function (req, res) {
  const { name } = req.query;

  if (!name) {
    let arrayPokes = [];
    let url = "https://pokeapi.co/api/v2/pokemon";
    try {
      for (let j = 0; j < 2; j++) {
        const a = await axios.get(url);
        const pokemons = a.data.results;
        for (let index = 0; index < pokemons.length; index++) {
          const pokemon = await axios.get(pokemons[index].url);
          arrayPokes.push({
            id: pokemon.data.id,
            name: pokemons[index].name,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
          });
        }
        url = a.data.next;
      }
    } catch (error) {
      res.status(404).send("No se encontraron Pokemon.");
    }

    res.status(200).json(arrayPokes);
  } else {
    try {
      const pokemito2 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      res.status(200).json({
        id: pokemito2.data.id,
        name: pokemito2.data.forms[0].name,
        hp: pokemito2.data.stats[0].base_stat,
        attack: pokemito2.data.stats[1].base_stat,
        defense: pokemito2.data.stats[2].base_stat,
        speed: pokemito2.data.stats[5].base_stat,
        height: pokemito2.data.height,
        weight: pokemito2.data.weight,
      });
    } catch (error) {
      try {
        const pokemito3 = await Pokemon.findAll({ where: { name: name } });
        res.status(200).json({
          name: pokemito3[0].name,
          id: pokemito3[0].id,
          hp: pokemito3[0].hp || "Not specified",
          attack: pokemito3[0].attack || "Not specified",
          defense: pokemito3[0].defense || "Not specified",
          speed: pokemito3[0].speed || "Not specified",
          height: pokemito3[0].height || "Not specified",
          weight: pokemito3[0].weight || "Not specified",
        });
      } catch (error) {
        res.status(404).send("Pokemon not found.");
      }
    }
  }
});

router.get("/pokemons/:id", async function (req, res) {
  const { id } = req.params;

  if (id.length > 4) {
    const pokemito3 = await Pokemon.findAll({ where: { id: id } });
    res.status(200).json({
      name: pokemito3[0].name,
      id: pokemito3[0].id,
      hp: pokemito3[0].hp || "Not specified",
      attack: pokemito3[0].attack || "Not specified",
      defense: pokemito3[0].defense || "Not specified",
      speed: pokemito3[0].speed || "Not specified",
      height: pokemito3[0].height || "Not specified",
      weight: pokemito3[0].weight || "Not specified",
    });
  } else {
    try {
      const pokemito = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const poke = {
        id: pokemito.data.id,
        name: pokemito.data.forms[0].name,
        hp: pokemito.data.stats[0].base_stat,
        attack: pokemito.data.stats[1].base_stat,
        defense: pokemito.data.stats[2].base_stat,
        speed: pokemito.data.stats[5].base_stat,
        height: pokemito.data.height,
        weight: pokemito.data.weight,
      };
      res.status(200).json(poke);
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/types", async function (req, res) {
  const type = await axios.get("https://pokeapi.co/api/v2/type");
  const types = type.data.results;

  for (let i = 0; i < types.length; i++) {
    await Tipo.create({ name: types[i].name });
  }

  const types2 = await Tipo.findAll();
  res.status(200).json(types2);
});

router.post("/pokemons", async function (req, res) {
  const {
    id,
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    typesId1,
    typesId2,
  } = req.body;

  try {
    const newPoke = await Pokemon.create({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    await newPoke.addTipos([typesId1, typesId2]);
    const finalPoke = await Pokemon.findOne({
      where: { id: id },
      include: Tipo,
    });
    res.status(200).json(finalPoke);
  } catch (error) {
    res.status(400).send("Couldn't create the Pokemon.");
  }
});

module.exports = router;
