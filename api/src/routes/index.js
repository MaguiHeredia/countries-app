const { Router } = require('express')
const axios = require('axios')
const { Country, Activity } = require('../db');

let num = 1;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// router.get('/countries', async (req, res) => {
//    const api = await axios.get('https://restcountries.com/v3/all')
//    const mapeo = await api.data.map((elem) => {
//                 const nombre = elem.name.official;
//                 const bandera = elem.flag;
//                 const continente = elem.continents[0];
//                 const subregion = elem.subregion;
//                 const area = elem.area;
//                 const poblacion = elem.population;
//                 const id = elem.cca3;
//                 if(!elem.capital){
//                     // console.log(nombre)
//                     // console.log(continente)
//                     // console.log(subregion)
//                     // console.log(area)
//                     // console.log(poblacion)
//                     // console.log(id)
//                     Country.create({ 
//                         name: nombre, 
//                         ID: id, 
//                         //Bandera: e.flag, 
//                         Continente: continente, 
//                         Subregion: subregion, 
//                         Area: area, 
//                         Poblacion: poblacion});
//                 } else {
//                 const cap = elem.capital.toString()
//                 Country.create({ 
//                     name: nombre, 
//                     ID: id, 
//                     //Bandera: e.flag, 
//                     Continente: continente, 
//                     Capital: cap, 
//                     Subregion: subregion, 
//                     Area: area, 
//                     Poblacion: poblacion});
//                 }
//             })
//             const resp = await Country.findAll()
//             console.log(resp[0])
//             res.json(resp)
  
//           })

router.get('/countries', async (req, res) => {
    const {name}= req.query;
    if(name){
        try {
            // const find = await Country.findAll({where: {name: name}})
            // return res.json(find)
            //https://restcountries.com/v3/name/{name}
            const pedido = await axios.get(`https://restcountries.com/v3/name/${name}`)
            console.log(pedido.data)
            return res.json(pedido.data)
        } catch (error) {
            console.log(error)
            return res.json({err: error})
        }
    
    }
    const resp = await Country.findAll()
    if(resp.length === 0){
    const api = await axios.get('https://restcountries.com/v3/all')
    for(let i = 0; i < api.data.length; i++){
        if(!api.data[i].capital){
            // console.log(nombre)
            // console.log(continente)
            // console.log(subregion)
            // console.log(area)
            // console.log(poblacion)
            // console.log(id)
            await Country.create({ 
                    name: api.data[i].name.common, 
                    ID: api.data[i].cca3, 
                    Bandera: api.data[i].flags[1],
                    Continente: api.data[i].continents[0], 
                    Subregion: api.data[i].subregion, 
                    Area: api.data[i].area, 
                    Poblacion: api.data[i].population
                })
                num++
                console.log(num)
        } else {
            const cap = api.data[i].capital.toString()
            await Country.create({ 
                    name: api.data[i].name.official, 
                    ID: api.data[i].cca3, 
                    Bandera: api.data[i].flags[1], 
                    Continente: api.data[i].continents[0], 
                    Subregion: api.data[i].subregion, 
                    Area: api.data[i].area, 
                    Poblacion: api.data[i].population ,
                    Capital: cap, 
            })
            num++
            console.log(num)
        }
    }
    const resp = await Country.findAll()
    console.log(resp[0])
    res.json(resp)
} else {
    const resp = await Country.findAll()
    res.json(resp)
}
   
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/countries', (req, res) => {
//     // Country.create({
//     //     name: 'martina', 
//     //     ID: 111, 
//     //     Bandera: 'bandera', 
//     //     Continente: 'america', 
//     //     Subregion: 'sur', 
//     //     Area: 34562.72, 
//     //     Poblacion: 153143
//     // }).then(respuesta => console.log(respuesta.Continente))
//     // const pais = await Country.findAll()
//     // console.log(pais)
//     // res.json(pais)
//     axios.get('https://restcountries.com/v3/all')
//     .then((respuesta) => {
//         //console.log(respuesta.data[0].capital[0])
//         respuesta.data.map(elem => {
//             const nombre = elem.name.official;
//             const bandera = elem.flag;
//             const continente = elem.continents[0];
//             const subregion = elem.subregion;
//             const area = elem.area;
//             const poblacion = elem.population;
//             const id = elem.cca3;
//             if(!elem.capital){
//                 // console.log(nombre)
//                 // console.log(continente)
//                 // console.log(subregion)
//                 // console.log(area)
//                 // console.log(poblacion)
//                 // console.log(id)
//                 Country.create({ 
//                     name: nombre, 
//                     ID: id, 
//                     //Bandera: e.flag, 
//                     Continente: continente, 
//                     Subregion: subregion, 
//                     Area: area, 
//                     Poblacion: poblacion})
//             } else {
//             const cap = elem.capital.toString()
//             Country.create({ 
//                 name: nombre, 
//                 ID: id, 
//                 //Bandera: e.flag, 
//                 Continente: continente, 
//                 Capital: cap, 
//                 Subregion: subregion, 
//                 Area: area, 
//                 Poblacion: poblacion})
//             }
//         })
//       })
//      .then(Country.findAll())
//       .then(respuesta => console.log(respuesta))
//      //.then(Country.findAll().then(respuesta => console.log(respuesta)))
// })

router.get('/activities', async (req, res) => {
    const find= await Country.findAll({attributes: ['name', 'ID']})
    console.log(find)
    res.json(find)
})


router.get('/countries/:id', async (req, res) => {
    const {id} = req.params;
    const encontrar = await Country.findByPk(id, {
        include: Activity
    })
    if(encontrar) res.json(encontrar)
    else res.status(404).send('No country with that id was found')
})

// router.post('/activities', async (req, res) => {
//     console.log(req.body)
//     const {paises, name, Dificultad, Duracion, Temporada, ID} = req.body
//     const pais = paises;
//     try {
//         const crear = await Activity.create({ID, name, Dificultad, Duracion, Temporada})
//         await crear.addCountry(pais)
//          return res.json(crear)
//     } catch (error) {
//         console.log(error)
//         return res.status(404).send('Error in creating the Activity')
//     }
// })
router.get('/activitiesTotal', async function (req, res){
    try {
        let find = await Activity.findAll()
        res.json(find)
    } catch (error) {
        res.json({err: error})
    }
})
router.post("/activities", async function (req, res) {
    //recibir datos por body
    // crear vidoejuego
    // encontrar generos relacionados
    // vincular con genre (con add)
    try {
  
      let {name, Dificultad, Duracion, Temporada, paises} = req.body;
  
      let activityCreated = await Activity.create({
          name, Dificultad, 
          Duracion, Temporada
      });
  
      let find = await Country.findAll({
          where: {name: paises}
      });
  
      activityCreated.addCountry(find);
  
      res.status(200).json(activityCreated)
  
  } catch (error) {
      console.log(error);
  }
  });





module.exports = router;
