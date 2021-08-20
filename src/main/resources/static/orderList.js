//주문목록 불러옴
function orderList(orderId) {
    fetch("/orders/orderItemListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((data) => {

            for(let i=1; i<=data.length; i++){
                let orderData = data[i-1]['order'];
                console.log(orderData);
                if(orderData['orderId'] == orderId){
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
            }
        })
}



//order에 데이터 저장하기 위함
function enrollOrder(){
    fetch(`/orders/orderItemListJson`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            console.log(data);
            let url = window.location.pathname;       //현재 url주소
            let orderId = url.split('/');

            for(let i=1; i<=data.length; i++){
                let order = data[i-1]['order'];
                console.log(order);
                fetch(`http://localhost:8080/orders/${orderId[2]}/orderList`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId: order['orderId']
                    }),
                })
                    .then((response) => response.json())
            }
        })
    alert("주문이 완료되었습니다.")
}

function cancelOrder() {
    let url = window.location.pathname;       //현재 url주소
    let orderId = url.split('/');

    fetch(`http://localhost:8080/orders/${orderId[2]}/orderList`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())

     location.href = "/order";
    alert("주문이 취소되었습니다.");
}
