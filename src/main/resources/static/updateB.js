function BForm(itemId) {
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
            let size = data['size'];

            document.getElementById("updateBName").value = name;
            document.getElementById("updateBPrice").value = price;
            document.getElementById("updateBSize").value = size;
        })
}


function updateB() {
    let url = window.location.pathname;       //현재 url주소
    let itemId = url.split('/');
    console.log("updateB");
    console.log(itemId[2]);          //itemId[2] <- 주소에서 itemId 값
    let beverageName = document.getElementById("updateBName").value;
    let beveragePrice = document.getElementById("updateBPrice").value;
    let beverageSize = document.getElementById("updateBSize").value;

    fetch(`http://localhost:8080/items/${itemId[2]}/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: beverageName,
            price: beveragePrice,
            size: beverageSize,
        }),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));
}
