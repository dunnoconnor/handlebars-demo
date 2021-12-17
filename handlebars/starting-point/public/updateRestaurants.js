async function updateRestaurants(restaurantId){
    alert(restaurantId)
    let name = document.querySelector("#name").value
    let image = document.querySelector("#image").value

    alert(name)
    alert(image)

    let res = await fetch(`/update-restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            image: image
        })
    })
    window.location.assign('/restaurants')
}