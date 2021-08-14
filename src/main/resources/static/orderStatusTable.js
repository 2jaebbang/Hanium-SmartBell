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


                // //beverage 사이즈
                // let tdBevSize = document.createElement("td");
                //
                // let divS = document.createElement("div");
                //
                // divS.classList.add("btn-group");
                // divS.classList.add("btn-group-toggle");
                // divS.id=`divS${i}`;
                // divS.setAttribute("data-toggle","buttons");
                // tdBevSize.appendChild(divS);
                //
                // let labelS1 = document.createElement("label");
                // labelS1.classList.add("btn");
                // labelS1.classList.add("btn-secondary");
                // labelS1.classList.add("active");
                // labelS1.innerText="Tall";
                // divS.appendChild(labelS1);
                //
                // let inputS1 = document.createElement("input");
                // inputS1.type="radio";
                // inputS1.name=`btnradioS${i}`;
                // inputS1.id="btnradioS1";
                // inputS1.value="tall";
                // inputS1.autocomplete="off";
                // inputS1.checked="checked";
                //
                // labelS1.appendChild(inputS1);
                //
                // let labelS2 = document.createElement("label");
                // labelS2.classList.add("btn");
                // labelS2.classList.add("btn-secondary");
                // labelS2.innerText="Grande";
                // divS.appendChild(labelS2);
                //
                // let inputS2 = document.createElement("input");
                // inputS2.type="radio";
                // inputS2.name=`btnradioS${i}`;
                // inputS2.id="btnradioS2";
                // inputS2.value="grande";
                // inputS2.autocomplete="off";
                //
                // labelS2.appendChild(inputS2);
                //
                // let labelS3 = document.createElement("label");
                // labelS3.classList.add("btn");
                // labelS3.classList.add("btn-secondary");
                // labelS3.innerText="Venti";
                // divS.appendChild(labelS3);
                //
                // let inputS3 = document.createElement("input");
                // inputS3.type="radio";
                // inputS3.name=`btnradioS${i}`;
                // inputS3.id="btnradioS3";
                // inputS3.value="venti";
                // inputS3.autocomplete="off";
                //
                // labelS3.appendChild(inputS3);

                trOrderStatus.appendChild(tdOrderId);
                trOrderStatus.appendChild(tdOrderDate);
                trOrderStatus.appendChild(tdTotalPrice);
                trOrderStatus.appendChild(tdStatus);
                //trOrderStatus.appendChild(tdSizeUp)


                document.getElementById("orderStatusTable").appendChild(trOrderStatus);
            }
        })
}

function orderItem(event) {

    alert("추가되었습니다.");
    //아이템아이디
    let itemId = event.target.id;

    //이름
    let name = document.getElementById(`name${itemId}`).innerText;

    let tempArr = document.getElementsByName(`btnradioT${itemId}`).length;
    let temp = "";
    for(let i=0; i<tempArr; i++) {
        if (document.getElementsByName(`btnradioT${itemId}`)[i].checked == true) {
            //온도
            temp = document.getElementsByName(`btnradioT${itemId}`)[i].value;
        }
    }

    let sizeArr = document.getElementsByName(`btnradioS${itemId}`).length;
    let size = "";
    for(let i=0; i<sizeArr; i++){
        if(document.getElementsByName(`btnradioS${itemId}`)[i].checked==true){
            //사이즈
            size = document.getElementsByName(`btnradioS${itemId}`)[i].value;
        }
    }

    let amountTarget = document.getElementById(`select${itemId}`);
    //개수
    let amount = amountTarget.options[amountTarget.selectedIndex].value;

    let sizeUp = document.getElementById(`sizeUp${itemId}`).innerText;
    fetch("/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId: orderId,
            itemId: itemId,
            name: name,
            size: size,
            temperature: temp,
            amount: amount,
            sizeUp: sizeUp
        }),
    })
        .then((response) => response.json())
}