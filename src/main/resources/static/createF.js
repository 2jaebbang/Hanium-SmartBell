function createF() {
    let foodName = document.getElementById("foodName").value;
    let foodPrice = document.getElementById("foodPrice").value;
    let foodGram = document.getElementById("foodGram").value;


    fetch("/items/newFood", {
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