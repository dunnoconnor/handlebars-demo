async function addRestaurant(){
    //get the input name value
    let name = document.querySelector("#name").value
    //get the input image name value
    let image = document.querySelector("#image").value

    let res = await fetch(`/add-restaurant`, {
        method: 'POST',
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