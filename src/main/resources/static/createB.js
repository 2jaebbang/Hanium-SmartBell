function createB() {
    let beverageName = document.getElementById("beverageName").value;
    let beveragePrice = document.getElementById("beveragePrice").value;
    let beverageSize = document.getElementById("beverageSize").value;

    //alert(beverageSize);

    fetch("/items/newBeverage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: beverageName,
            price: beveragePrice,
            sizeUp: beverageSize,
        }),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));

    alert("상품이 등록되었습니다.")
}