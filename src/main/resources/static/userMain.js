
function userMain(orderId) {
    fetch(`/users/${orderId}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            //주문번호
            let orderId = data['orderId'];

            document.getElementById("test").innerText = orderId;


            //orderItem의 orderId
            let orItemId = data['orItemId'];

            //주문상품 목록 출력
            fetch("/orders/orderItemListJson", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then( ( response) => response.json())
                .then((orderItemData) => {
                    let name;
                    let temp;
                    let amount;
                    for(let i=1; i<=orderItemData.length; i++) {
                        if(orderItemData[i-1]['orderId'] === orItemId){

                            //상품명 데이터
                            name = orderItemData[i-1]['name'];

                            //온도 데이터
                            temp = orderItemData[i-1]['temperature'];

                            //수량 데이터
                            amount = orderItemData[i-1]['amount'];

                            //주문목록 테이블
                            let trOrderList =  document.createElement("tr");



                            //상품명
                            let tdName = document.createElement("td");
                            tdName.innerText = `${name}`;
                            trOrderList.appendChild(tdName);

                            //온도
                            let tdTemperature = document.createElement("td");
                            tdTemperature.innerText = `${temp}`;

                            //수량
                            let tdAmount = document.createElement("td");
                            tdAmount.innerText = `${amount}`;

                            trOrderList.appendChild(tdTemperature);
                            trOrderList.appendChild(tdAmount);

                            document.getElementById("orderListTable").appendChild(trOrderList);
                        }
                    }
                })
        })

    //현재 주문상태가 ordered인 팀
        fetch("/orders/orderStatusListJson", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then( ( response) => response.json())
            .then((data) => {
                let countWaitTeam = 0;
                for(let i=1; i<=data.length; i++) {
                    let orderStatus = data[i - 1]['status'];

                    if(orderStatus === "ORDERED"){
                        if(data[i-1]['orderId'] >= orderId)
                            break;
                        countWaitTeam++;
                    }
                }
                document.getElementById("test2").innerText = countWaitTeam;
            })

}


