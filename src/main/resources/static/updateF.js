function FForm(itemId) {
    fetch(`/items/${itemId}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            console.log(data);

            let name = data['name'];
            let price = data['price'];
            let gram = data['gram'];

            document.getElementById("updateFName").value = name;
            document.getElementById("updateFPrice").value = price;
            document.getElementById("updateFGram").value = gram;
        })
}


function updateF() {
    let url = window.location.pathname;       //현재 url주소
    let itemId = url.split('/');
    console.log("updateF");
    console.log(itemId[2]);          //itemId[2] <- 주소에서 itemId 값
    let foodName = document.getElementById("updateFName").value;
    let foodPrice = document.getElementById("updateFPrice").value;
    let foodGram = document.getElementById("updateFGram").value;

    fetch(`http://localhost:8080/items/${itemId[2]}/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: foodName,
            price: foodPrice,
            gram: foodGram,
        }),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));
}