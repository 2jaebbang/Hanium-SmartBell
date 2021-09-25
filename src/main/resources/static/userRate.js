function userRate(orderId) {
    let rateImo = ["🤮","😖","😐","😆","😍" ];
    let cnt = 0;
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
                    console.log(orderItemData[0]['order']);
                    for(let i=0; i<orderItemData.length; i++){
                        let t = orderItemData[i]['order'];
                        if(t['orderId']== orderId)
                            cnt++;
                    }
                    let orderItemLength = document.getElementById("orderItemLength");


                    orderItemLength.innerText = cnt.toString();
                    orderItemLength.id = "orderItemLength";
                    orderItemLength.style.display = "none";

                    let name;
                    let temp;
                    let orderItemCnt = 1;
                    let radioBtnCnt = 1;
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
                            trOrderList.id = "orderItemList";

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
                            divRadioButton.id = "divRadio";
                            divRadioButton.classList.add("btn-group");
                            divRadioButton.classList.add("btn-group-toggle");
                            divRadioButton.setAttribute("data-toggle","buttons");
                            rateRadioButton.appendChild(divRadioButton);

                            //radio button 추가
                            for(let j=1; j<=5; j++){
                                let inputRate = document.createElement("input");
                                inputRate.type="radio";
                                inputRate.name = `option${orderItemCnt}`;
                                inputRate.id = `radioBtn${radioBtnCnt}`;
                                inputRate.autocomplete = "off";
                                inputRate.value = `${j}`;
                                divRadioButton.appendChild(inputRate);

                                let labelRate = document.createElement("label");
                                labelRate.setAttribute("for", `radioBtn${radioBtnCnt++}`)
                                labelRate.innerText = rateImo[j-1];
                                divRadioButton.appendChild(labelRate);
                            }
                            //orderItemId 테이블
                            let tdOrderItemId = document.createElement("td");
                            tdOrderItemId.innerText = `${orderItemId}`;
                            tdOrderItemId.style.display = "none";
                            trOrderList.appendChild(tdOrderItemId);

                            orderItemCnt++;
                            document.getElementById("orderListTbody").appendChild(trOrderList);

                        }
                    }
                })
        })
}


//유저 별점페이지 (별점 저장)
function submitRate() {
    let url = window.location.pathname;       //현재 url주소
    let itemId = url.split('/');


    //orderItem의 개수
    let orderItemCnt = document.getElementById("orderItemLength").innerText;

    //각 input radiobtn의 개수 (5개)
    let inputLength = document.getElementsByName("option1").length;


    //각 orderItem별 rate를 저장하기 위한 map
    let map = new Map();

    //map에 선택된 radiobtn의 value를 넣는다.
    console.log(orderItemCnt);
for(let i=1; i<=orderItemCnt; i++) {
    for(let j=0; j<5; j++) {
         console.log(document.getElementsByName(`option${i}`)[j].checked);
        if(document.getElementsByName(`option${i}`)[j].checked) {
            console.log("Good");
            map.set(i,document.getElementsByName(`option${i}`)[j].value);
            break;
        }
    }
}

for(let [k,v] of map){
    console.log(k,v);
}


    fetch(`/users/${itemId[2]}/rate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(map)),
    })
        .then((response) => response.json())
        .then((form) => console.log(form));

    alert("별점이 추가되었습니다.");
}




