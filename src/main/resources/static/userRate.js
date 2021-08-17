function userRate(orderId) {
    fetch(`/users/${orderId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let orderNumber = data['orderId'];

            //주문상품 목록 출력
            fetch("/orders/orderItemListJson", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((orderItemData) => {
                    console.log(orderItemData);

                    let name;
                    let temp;
                    for (let i = 1; i <= orderItemData.length; i++) {
                        let orderData = orderItemData[i - 1]['order'];

                        //orderItemId
                        let orderItemId = orderItemData[i-1]['orderItemId'];
                        if (orderData['orderId'] == orderNumber) {

                            //상품명 데이터
                            name = orderItemData[i - 1]['name'];

                            //온도 데이터
                            temp = orderItemData[i - 1]['temperature'];

                            //주문목록 테이블
                            let trOrderList = document.createElement("tr");

                            //상품명
                            let tdName = document.createElement("td");
                            tdName.innerText = `${name}`;
                            trOrderList.appendChild(tdName);

                            //온도
                            let tdTemperature = document.createElement("td");
                            tdTemperature.innerText = `${temp}`;
                            trOrderList.appendChild(tdTemperature);

                            let rateRadioButton = document.createElement("td");
                            trOrderList.appendChild(rateRadioButton);

                            let divRadioButton = document.createElement("div");
                            divRadioButton.classList.add("btn-group");
                            divRadioButton.classList.add("btn-group-toggle");
                            divRadioButton.setAttribute("data-toggle","buttons");
                            rateRadioButton.appendChild(divRadioButton);

                            //radio button 추가
                            for(let j=1; j<=5; j++){
                                let inputRate = document.createElement("input");
                                inputRate.type="radio";
                                inputRate.name = `option${orderItemId}`;
                                inputRate.autocomplete = "off";
                                inputRate.innerText = `${j}`;
                                divRadioButton.appendChild(inputRate);
                            }
                            document.getElementById("orderListTable").appendChild(trOrderList);
                        }
                    }
                })
        })
}



function submitRate() {
    let url = window.location.pathname;       //현재 url주소
    let itemId = url.split('/');

    console.log(itemId[2]);          //itemId[2] <- 주소에서 itemId 값

    let rate

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

    alert("수정되었습니다.")
}