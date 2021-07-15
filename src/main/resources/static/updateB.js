// function updateB() {
//     let beverageName = document.getElementById("beverageName").value;
//     let beveragePrice = document.getElementById("beveragePrice").value;
//     let beverageSize = document.getElementById("beverageSize").value;
//
//
//
//     fetch("/items/{itemId}/edit", {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: beverageName,
//             price: beveragePrice,
//             size: beverageSize,
//         }),
//     })
//         .then((response) => response.json())
//         .then((form) => console.log(form));
//
// }