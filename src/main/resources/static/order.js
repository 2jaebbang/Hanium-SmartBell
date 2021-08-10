function order() {
    fetch("/items/itemListJson", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })
        .then( ( response) => response.json())
        .then((data) => {
            for(let i=0; i<data.length; i++){
                let name = data[i]['name'];

                //beverage 테이블
                let trBev =  document.createElement("tr");
                document.getElementById("beverageTable").appendChild(trBev);

                //food 테이블
                let trFood =  document.createElement("tr");
                document.getElementById("foodTable").appendChild(trFood);


                //이름
                let tdName = document.createElement("td");
                tdName.innerText = `${name}`;


                //beverage 온도
                  let tdBevTemp = document.createElement("td");

                  let divT = document.createElement("div");

                 divT.classList.add("btn-group");
                 divT.classList.add("btn-group-toggle");
                 divT.setAttribute("data-toggle","buttons");
                tdBevTemp.appendChild(divT);

                 let labelT1 = document.createElement("label");
                 labelT1.classList.add("btn");
                 labelT1.classList.add("btn-danger");
                 labelT1.classList.add("active");
                labelT1.innerText="HOT";
                 divT.appendChild(labelT1);

                 let inputT1 = document.createElement("input");
                  inputT1.type="radio";
                  inputT1.name="btnradioT";
                  inputT1.id="btnradioT1";
                  inputT1.autocomplete="off";

                  labelT1.appendChild(inputT1);

                let labelT2 = document.createElement("label");
                labelT2.classList.add("btn");
                labelT2.classList.add("btn-primary");
                labelT2.classList.add("active");
                labelT2.innerText="COLD";
                divT.appendChild(labelT2);

                let inputT2 = document.createElement("input");
                inputT2.type="radio";
                inputT2.name="btnradioT";
                inputT2.id="btnradioT2";
                inputT2.autocomplete="off";

                labelT2.appendChild(inputT2);


                // //beverage 사이즈
                // let tdBevSize = document.createElement("td");
                //
                // let divS = document.createElement("div");
                //
                // divS.classList.add("btn-check");
                // divS.setAttribute("role","group");
                // divS.ariaLabel = "Basic radio toggle button group";
                //
                // let inputS1 = document.createElement("input");
                // inputS1.type="radio";
                // inputS1.classList.add("btn-check");
                // inputS1.name="btnradioS";
                // inputS1.id="btnradioS1";
                // inputS1.autocomplete="off";
                // document.getElementById("btnradio3").checked = "true";
                //
                // let inputS2 = document.createElement("input");
                // inputS2.type="radio";
                // inputS2.classList.add("btn-check");
                // inputS2.name="btnradioS";
                // inputS2.id="btnradioS2";
                // inputS2.autocomplete="off";
                //
                // let inputS3 = document.createElement("input");
                // inputS3.type="radio";
                // inputS3.classList.add("btn-check");
                // inputS3.name="btnradioS";
                // inputS3.id="btnradioS3";
                // inputS3.autocomplete="off";
                //
                // let labelS1 = document.createElement("label");
                // labelS1.classList.add("btn");
                // labelS1.classList.add("btn-outline-primary");
                // labelS1.htmlFor = "btnradioS1";
                // labelS1.innerText = "Tall";
                //
                // let labelS2 = document.createElement("label");
                // labelS2.classList.add("btn");
                // labelS2.classList.add("btn-outline-primary");
                // labelS2.htmlFor = "btnradioS2";
                // labelS2.innerText = "Grande";
                //
                // let labelS3 = document.createElement("label");
                // labelS3.classList.add("btn");
                // labelS3.classList.add("btn-outline-primary");
                // labelS3.htmlFor = "btnradioS3";
                // labelS3.innerText = "Venti";
                //
                // divS.appendChild(inputS1);
                // divS.appendChild(labelS1);
                // divS.appendChild(inputS2);
                // divS.appendChild(labelS2);
                // divS.appendChild(inputS3);
                // divS.appendChild(labelS3);
                // tdBevSize.appendChild(divS);
                //
                //
                // //수량선택
                // let tdAmount = document.createElement("td");
                // let select = document.createElement("select");
                //
                // let amount = [];
                // amount.push("수량선택");
                //
                // for (let i = 1; i <= 10; i++) {
                //     let option = document.createElement("option");
                //     amount.push(i);
                //     select.appendChild(option);
                //     option.innerText=amount[i];
                // }

                // tdAmount.appendChild(select);


                //ok버튼
                // let tdOk = document.createElement("td");
                // let btn = document.createElement("button");
                // tdOk.classList.add("btn-group");
                // tdOk.appendChild(btn);



                if(data[i]['category']==="beverage"){
                    trBev.appendChild(tdName);
                    trBev.appendChild(tdBevTemp);
                    // trBev.appendChild(tdBevSize);
                    // trBev.appendChild(tdAmount);
                    // trBev.appendChild(tdOk);
                } else {
                    trFood.appendChild(tdName);
                    // trFood.appendChild(tdAmount);
                    // trFood.appendChild(tdOk);
                }

                document.getElementById("beverageTable").appendChild(trBev);
                document.getElementById("foodTable").appendChild(trFood);

            }
        })
}