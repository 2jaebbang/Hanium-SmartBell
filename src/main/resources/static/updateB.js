

// function BForm() {
//     fetch("/items/UpdateBB",  {
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//         .then( ( response) => response.text())
//         .then((data) => {
//             console.log(data);
//
//             let name = data[id]['name'];
//             let price = data[id]['price'];
//             let size = data[id]['size'];
//             let gram = data[id]['gram'];
//
//
//             document.getElementById("updateBName").value = name;
//             document.getElementById("updateBPrice").value = price;
//             document.getElementById("updateBSize").value = size;
//         })
// }

function updateB() {
     let beverageName = document.getElementById("beverageName").value;
     let beveragePrice = document.getElementById("beveragePrice").value;
     let beverageSize = document.getElementById("beverageSize").value;

     let test = this.pro

    fetch(`/items/${id}/edit`, {
        method: "PUT",
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

//BForm();
