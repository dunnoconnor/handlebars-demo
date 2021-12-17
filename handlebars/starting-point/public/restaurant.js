//get the restaurant id from h3 id
const restaurantId = document.querySelector("h3").id;

//find element with the id menus
let menuList = document.getElementById('menus')

async function MenuItems(){
    //fetch the menu route from express
    let data = await fetch('/menu-items/' + restaurantId)
    //parse as json
    let restaurant = await data.json()
    //access Menus in respone
    let menus = restaurant.Menus
    //for each menu in the list, create a sublist
    menuList.innerText = ""
    for(m of menus){
        //add a size 3 header for each menu
        let menuLabel = document.createElement('h3')
        menuLabel.innerText = m.title
        menuList.append(menuLabel)
        let menu = document.createElement('ul')
        //for each menu item in that menu, create a list item
        for(i of m.MenuItems){
            let item = document.createElement('li')
            item.innerText = `${i.name}: ${i.price}`
            menu.append(item)
        }
        menuList.append(menu)
    }
}
 
MenuItems()