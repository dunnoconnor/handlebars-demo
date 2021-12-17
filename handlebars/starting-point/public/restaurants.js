//onclick function to delete a restaurant by id
async function deleteRestaurants(restaurantId){
    //delete a restaurant matching parameter id
    let res = await fetch(`/restaurants/${restaurantId}` ,{
        method: 'DELETE'
    })
    //send user back to the restaurants path
    window.location.assign('/restaurants')
}




