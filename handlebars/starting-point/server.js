const express = require("express");
const { check, validationResult } = require("express-validator");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const Restaurant = require("./models/restaurant");
const Menu = require("./models/menu");
const MenuItem = require("./models/menuItem");

const initialiseDb = require("./initialiseDb");
initialiseDb();

const app = express();
const port = 3000;

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.use(express.static("public"));

//allow express to read json request bodies
app.use(express.json())
//body parser so req.body is not undefined
app.use(express.urlencoded({extended:false}))

app.get("/web/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.render("restaurants", { restaurants });
});

app.get("/web/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.render("restaurant", { restaurant });
});

const restaurantChecks = [
    check("name").not().isEmpty().trim().escape(),
    check("image").isURL(),
    check("name").isLength({ max: 200 }),
];

app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.render('restaurants', {restaurants});
});

app.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {
        include: {
            model: Menu,
            include: MenuItem,
        },
    });
    res.render('restaurant', {restaurant});
});

//New Routes go here: 
app.get('/add-restaurant', (req, res) => {
    const alertMessage = ""
    res.render('addRestaurant', {alertMessage})
})

//POST Route triggered by form submit action
app.post('/add-restaurant', async(req, res) => {
    
    const newRestaurant = await Restaurant.create(req.body)

    res.render('addRestaurant')
})

app.delete("/restaurants/:id", async (req, res) => {
    await Restaurant.destroy({
        where: {
            id: req.params.id,
        },
    });
    
    let alertMessage = `${Restaurant.name} is deleted.`
    res.render('restaurants', {alertMessage})
});

app.get('/update-restaurants/:id', (req, res) => {
    let id = req.params.id
    res.render('updateRestaurant',{id})
})

app.put('/update-restaurants/:id', async(req, res) => {
    let updateRestaurant = await Restaurant.update(req.body, {
        where: {id: req.params.id}
    })
    let id = req.params.id
    res.render('updateRestaurant', {id})
});

app.patch("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.sendStatus(200);
});

app.get('/menu-items/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {include: {
            model: Menu,
            include: MenuItem
        }
    });
    res.json(restaurant)
});

app.delete("/items/:id", async (req, res) => {
    // should really be RESTful
    await MenuItem.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});