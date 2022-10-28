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
            ////SI ALGO NO FUNCIONA SACAR
            sprite:
              pokemon.data.sprites.other["official-artwork"]["front_default"],
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
    const pokemitosBase = await Pokemon.findAll();
    arrayPokes = arrayPokes.concat(pokemitosBase);

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

  if (id.length > 3) {
    try {
      const pokemito3 = await Pokemon.findOne({
        where: { id: id },
        include: Tipo,
      });
      console.log(pokemito3);
      res.status(200).json({
        name: pokemito3.dataValues.name,
        id: pokemito3.dataValues.id,
        sprite: pokemito3.dataValues.sprite,
        hp: pokemito3.dataValues.hp || "Not specified",
        attack: pokemito3.dataValues.attack || "Not specified",
        defense: pokemito3.dataValues.defense || "Not specified",
        speed: pokemito3.dataValues.speed || "Not specified",
        height: pokemito3.dataValues.height || "Not specified",
        weight: pokemito3.dataValues.weight || "Not specified",
        type1: pokemito3.dataValues.tipos[0].name,
        type2: pokemito3.dataValues.tipos[1].name,
      });
    } catch (error) {
      res.status(400).send("No existe el Pokemon" + error);
    }
  } else {
    try {
      const pokemito = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      console.log(pokemito.data);
      const poke = {
        id: pokemito.data.id,
        name: pokemito.data.forms[0].name,
        sprite:
          pokemito.data.sprites.other["official-artwork"]["front_default"],
        hp: pokemito.data.stats[0].base_stat,
        attack: pokemito.data.stats[1].base_stat,
        defense: pokemito.data.stats[2].base_stat,
        speed: pokemito.data.stats[5].base_stat,
        height: pokemito.data.height,
        weight: pokemito.data.weight,
        type1: pokemito.data.types[0].type.name,
        type2: pokemito.data.types[1]
          ? pokemito.data.types[1].type.name
          : "It has no second type",
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
  /////TRAER LOS TIPOS ANTES O NO FUNCIONA
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

  if (typesId1 === typesId2) {
    return res.status(404).send("The types must be different");
  }

  try {
    const newPoke = await Pokemon.create({
      name,
      hp: hp || 500,
      attack: attack || 25,
      defense: defense || 25,
      speed: speed || 50,
      height: height || 5,
      weight: weight || 500,
    });

    await newPoke.addTipos([Number(typesId1), Number(typesId2)]);
    const finalPoke = await Pokemon.findOne({
      where: { name: name },
      include: Tipo,
    });
    res.status(201).json("Pokemon creado");
  } catch (error) {
    console.log(error);
    res.status(402).send("Couldn't create the Pokemon.");
  }
});

module.exports = router;
