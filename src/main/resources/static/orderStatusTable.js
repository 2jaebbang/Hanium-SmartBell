function orderStatus() {
    fetch("/orders/orderStatusListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            for(let i=1; i<=data.length; i++){
                let orderId = data[i-1]['orderId'];
                let orderDate = data[i-1]['orderDate'];
                let totalPrcie = data[i-1]['totalPrice'];

                let orderStatus = data[i-1]['status'];

                //order 현황 테이블
                let trOrderStatus =  document.createElement("tr");
                document.getElementById("orderStatusTable").appendChild(trOrderStatus);


                //주문번호
                let tdOrderId = document.createElement("td");
                tdOrderId.innerText = `${orderId}`;
                tdOrderId.id=`orderId${i}`;

                //주문일자
                let tdOrderDate = document.createElement("td");
                tdOrderDate.innerText = `${orderDate}`;
                tdOrderDate.id=`orderDate${i}`;

                //주문금액
                let tdTotalPrice = document.createElement("td");
                tdTotalPrice.innerText = `${totalPrcie}`;
                tdTotalPrice.id=`totalPrice${i}`;

                //주문상태
                let tdStatus = document.createElement("td");
                tdStatus.innerText = `${orderStatus}`;
                tdStatus.id=`status${i}`;


                 //주문상태 변경 버튼
                 let tdStatusButton = document.createElement("td");
                 //let divButton = document.createElement("div");

                // divButton.classList.add("btn-group");
                // divButton.classList.add("btn-group-toggle");
                // divButton.id=`divButton${i}`;
                // divButton.setAttribute("data-toggle","buttons");
                //tdStatusButton.appendChild(divButton);

                // let labelC = document.createElement("label");
                // labelC.classList.add("btn");
                // labelC.classList.add("btn-warning");
                // labelC.classList.add("active");
                // labelC.innerText="제조완료";
                // divButton.appendChild(labelC);

                let inputC = document.createElement("input");
                inputC.classList.add("btn");
                inputC.classList.add("btn-outline-warning");
                inputC.type="button";
                inputC.name=`btn${i}`;
                inputC.id="btnC";
                inputC.value="제조완료";
                inputC.addEventListener("click", function (){
                    statusCompleted(orderId);
                    link();
                });
                tdStatusButton.appendChild(inputC);


                // let labelR = document.createElement("label");
                // labelR.classList.add("btn");
                // labelR.classList.add("btn-success");
                // labelR.innerText="수령완료";
                // divButton.appendChild(labelR);

                let inputR = document.createElement("input");
                inputR.classList.add("btn");
                inputR.classList.add("btn-outline-success");
                inputR.type="button";
                inputR.name=`btn${i}`;
                inputR.id="btnR";
                inputR.value="수령완료";
                inputR.addEventListener("click", function (){
                    statusReceived(orderId);
                    link();
                });

                tdStatusButton.appendChild(inputR);


                trOrderStatus.appendChild(tdOrderId);
                trOrderStatus.appendChild(tdOrderDate);
                trOrderStatus.appendChild(tdTotalPrice);
                trOrderStatus.appendChild(tdStatus);
                trOrderStatus.appendChild(tdStatusButton)


                document.getElementById("orderStatusTable").appendChild(trOrderStatus);
            }
        })
}


function statusCompleted(orderId) {

    fetch("/orderStatusCompleted", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId: orderId
        }),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));
}

function statusReceived(orderId) {

    fetch("/orderStatusReceived", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId: orderId
        }),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));
}

function link() {
    location.href = "/orderStatusTable";
}