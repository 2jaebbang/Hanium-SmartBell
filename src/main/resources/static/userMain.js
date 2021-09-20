
function userMain(orderId) {
    fetch(`/users/${orderId}`,  {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            let orderNumber = data['orderId'];
            document.getElementById("orderNumber").innerText = orderNumber;

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
                        let orderData = orderItemData[i-1]['order'];
                        if(orderData['orderId'] == orderNumber){

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

                            // // "/" 테이블
                            // let tdSlash = document.createElement("td");
                            // tdSlash.innerText = " / ";


                            trOrderList.appendChild(tdTemperature);
                            trOrderList.appendChild(tdAmount);

                            document.getElementById("orderListTable").appendChild(trOrderList);

                        }
                    }
                })
        })
}


function userMainWait(orderId) {
//유저메인페이지 대기인원계산 (현재 주문상태가 ordered인 팀)
    fetch("/orders/orderStatusListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((orderedData) => {
            let countWaitTeam = 0;
            for(let i=1; i<=orderedData.length; i++) {
                let orderStatus = orderedData[i - 1]['status'];

                if(orderStatus === "ORDERED"){
                    if(orderedData[i-1]['orderId'] >= orderId)
                        break;
                    countWaitTeam++;
                }
            }
            document.getElementById("wait").innerText = countWaitTeam;


            //현재의 상품상태가 COMPLETE라면
            if(orderedData[orderId-1]['status'] ==="COMPLETED")
            {
                document.getElementById("player").muted = false;

                const modal_container = document.getElementById('modal_container');
                document.getElementById("Header").removeAttribute("style");


                document.getElementById("Content").removeAttribute("style");


                modal_container.classList.add("show");
                document.getElementById("modalContent1").innerText = "주문하신 상품이 나왔습니다";
                document.getElementById("modalContent2").innerText = "별점페이지로 넘어갑니다.";


                document.getElementById("close").innerText= "확인";
                document.getElementById("close").onclick= function (){
                    window.open(`https://httpstraffictest-1125509314.ap-northeast-2.elb.amazonaws.com/users/${orderId}/rate`,"_self");
                    //window.location.href = `https://httpstraffictest-1125509314.ap-northeast-2.elb.amazonaws.com/users/${orderId}/rate`;
                }
            }
        })
}



