

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
            tempID = orderId;
            document.getElementById("test").innerText = orderId;
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

    //주문상품 목록 출력
    fetch("/orders/orderItemListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            for(let i=1; i<=data.length; i++){
                let itemData = data[i-1]['item'];
                let name = itemData['name'];
                let temperature = data[i-1]['temperature'];
                let size = data[i-1]['size'];
                let amount = data[i-1]['amount'];
                //beverage 테이블
                let trBev =  document.createElement("tr");
                document.getElementById("beverageOrderListTable").appendChild(trBev);

                //food 테이블
                let trFood =  document.createElement("tr");
                document.getElementById("foodOrderListTable").appendChild(trFood);


                //이름
                let tdName = document.createElement("td");
                tdName.innerText = `${name}`;
                tdName.id=`name${i}`;

                let tdTemp = document.createElement("td");
                tdTemp.innerText = `${temperature}`;
                tdTemp.id=`temp${i}`;

                let tdSize = document.createElement("td");
                tdSize.innerText = `${size}`;
                tdSize.id=`size${i}`;

                let tdAmount = document.createElement("td");
                tdAmount.innerText = `${amount}`;
                tdAmount.id=`amount${i}`;

                if(itemData['category']==="beverage"){
                    trBev.appendChild(tdName);
                    trBev.appendChild(tdTemp);
                    trBev.appendChild(tdSize);
                    trBev.appendChild(tdAmount);

                } else {
                    trFood.appendChild(tdName);
                    trFood.appendChild(tdAmount);
                }

                document.getElementById("beverageOrderListTable").appendChild(trBev);
                document.getElementById("foodOrderListTable").appendChild(trFood);

            }
        })

}


