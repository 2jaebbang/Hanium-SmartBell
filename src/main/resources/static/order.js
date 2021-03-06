
function order() {
    fetch("/orders/orderStatusListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            if(data.length == 0){
                document.getElementById("orderNumber").innerText = '1';
            } else {
                document.getElementById("orderNumber").innerText = data[data.length-1]['orderId'];
            }
            console.log(data[data.length-1]['orderId']);

        })



    //아이템리스트 불러옴
    fetch("/items/itemListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            let cntT = 1;
            let cntS = 1;
            for(let i=1; i<=data.length; i++){
                let name = data[i-1]['name'];
                let sizeUp = data[i-1]['sizeUp'];
                //beverage 테이블
                let trBev =  document.createElement("tr");
                document.getElementById("beverageTable").appendChild(trBev);

                //food 테이블
                let trFood =  document.createElement("tr");
                document.getElementById("foodTable").appendChild(trFood);


                //이름
                let tdName = document.createElement("td");
                tdName.style.verticalAlign = "middle";
                tdName.innerText = `${name}`;
                tdName.id=`name${i}`;

                //사이즈업
                let tdSizeUp = document.createElement("td");
                tdSizeUp.innerText = `${sizeUp}`;
                tdSizeUp.id=`sizeUp${i}`;
                tdSizeUp.style.display = "none";

                //beverage 온도
                  let tdBevTemp = document.createElement("td");

                  let divT = document.createElement("div");

                 divT.classList.add("btn-group");
                divT.id=`divT${i}`;
                tdBevTemp.appendChild(divT);


                let inputT1 = document.createElement("input");
                inputT1.type="radio";
                inputT1.classList.add("btn-check");
                inputT1.name=`btnradioT${i}`;
                inputT1.id=`btnradioT${cntT}`;
                inputT1.value="hot";
                inputT1.autocomplete="off";
                inputT1.checked="checked";

                divT.appendChild(inputT1);

                 let labelT1 = document.createElement("label");
                 labelT1.classList.add("btn");
                 labelT1.classList.add("btn-outline-danger");
                 labelT1.htmlFor = `btnradioT${cntT++}`;
                labelT1.innerText="HOT";
                 divT.appendChild(labelT1);


                let inputT2 = document.createElement("input");
                inputT2.type="radio";
                inputT2.classList.add("btn-check");
                inputT2.name=`btnradioT${i}`;
                inputT2.id=`btnradioT${cntT}`;
                inputT2.value="cold";
                inputT2.autocomplete="off";

                divT.appendChild(inputT2);

                let labelT2 = document.createElement("label");
                labelT2.classList.add("btn");
                labelT2.classList.add("btn-outline-info");
                labelT2.htmlFor = `btnradioT${cntT++}`;
                labelT2.innerText="COLD";
                divT.appendChild(labelT2);




                // //beverage 사이즈
                let tdBevSize = document.createElement("td");

                let divS = document.createElement("div");

                divS.classList.add("btn-group");
                divS.id=`divS${i}`;
                tdBevSize.appendChild(divS);

                let inputS1 = document.createElement("input");
                inputS1.type="radio";
                inputS1.classList.add("btn-check");
                inputS1.name=`btnradioS${i}`;
                inputS1.id=`btnradioS${cntS}`;
                inputS1.value="tall";
                inputS1.autocomplete="off";
                inputS1.checked="checked";

                divS.appendChild(inputS1);

                let labelS1 = document.createElement("label");
                labelS1.classList.add("btn");
                labelS1.classList.add("btn-outline-secondary");
                labelS1.htmlFor = `btnradioS${cntS++}`;
                labelS1.innerText="Tall";
                divS.appendChild(labelS1);


                let inputS2 = document.createElement("input");
                inputS2.type="radio";
                inputS2.classList.add("btn-check");
                inputS2.name=`btnradioS${i}`;
                inputS2.id=`btnradioS${cntS}`;
                inputS2.value="grande";
                inputS2.autocomplete="off";

                divS.appendChild(inputS2);

                let labelS2 = document.createElement("label");
                labelS2.classList.add("btn");
                labelS2.classList.add("btn-outline-secondary");
                labelS2.htmlFor = `btnradioS${cntS++}`;
                labelS2.innerText="Grande";
                divS.appendChild(labelS2);


                let inputS3 = document.createElement("input");
                inputS3.type="radio";
                inputS3.classList.add("btn-check");
                inputS3.name=`btnradioS${i}`;
                inputS3.id=`btnradioS${cntS}`;
                inputS3.value="venti";
                inputS3.autocomplete="off";

                divS.appendChild(inputS3);


                let labelS3 = document.createElement("label");
                labelS3.classList.add("btn");
                labelS3.classList.add("btn-outline-secondary");
                labelS3.htmlFor = `btnradioS${cntS++}`;
                labelS3.innerText="Venti";
                divS.appendChild(labelS3);



                 //수량선택
                 let tdAmount = document.createElement("td");
                tdAmount.style.verticalAlign = "middle";
                tdAmount.style.margin = "auto"
                 let select = document.createElement("select");
                 select.classList="form-select";
                 select.id=`select${i}`;
                 let amount = [];
                 amount.push("수량선택");

                for (let i = 1; i <= 10; i++) {
                    let option = document.createElement("option");
                    option.value= `${i}`;
                    amount.push(i);
                    select.appendChild(option);
                    option.innerText=amount[i];
                }

                 tdAmount.appendChild(select);


                //ok버튼
                let tdOk = document.createElement("td");
                let btn = document.createElement("button");
                btn.classList.add("btn");
                btn.classList.add("btn-success");
                btn.id=`${i}`;
                btn.innerText="주문";
                btn.addEventListener('click',orderItem);
                tdOk.appendChild(btn);


                if(data[i-1]['category']==="beverage"){
                    trBev.appendChild(tdName);
                    trBev.appendChild(tdBevTemp);
                    trBev.appendChild(tdBevSize);
                    trBev.appendChild(tdAmount);
                    trBev.appendChild(tdOk);

                    trBev.appendChild(tdSizeUp);
                } else {
                    tdName.style.width = "43%";
                    tdAmount.style.width = "14%";
                    tdOk.style.width = "43%";
                    trFood.appendChild(tdName);
                    trFood.appendChild(tdAmount);
                    trFood.appendChild(tdOk);
                    tdSizeUp.innerText = "0";
                    trFood.appendChild(tdSizeUp);
                }

                document.getElementById("beverageTable").appendChild(trBev);
                document.getElementById("foodTable").appendChild(trFood);

            }
        })
}

//아이템 주문
function orderItem(event) {

    alert("주문목록에 추가되었습니다.");
    //아이템아이디
    let itemId = event.target.id;

    //orderId
    let orderId = document.getElementById("orderNumber").innerText;

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

//주문생성(주문아이디만)
function createOrderId(){
    fetch("/orderFirst", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
    })
        .then((response) => response.json())
}

//주문확인버튼 (orderId orderList로 넘김)
function orderCheckButton(){
    let orderId = document.getElementById("orderNumber").innerText;
    window.location.href = `/orders/${orderId}/orderList`;
}