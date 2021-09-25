


function list() {
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
                let price = data[i]['price'];
                let size = data[i]['sizeUp'];
                let gram = data[i]['gram'];


                //beverage 테이블
                let tr1 =  document.createElement("tr");
                //tr1.classList.add("table-success");
                document.getElementById("beverageTable").appendChild(tr1);

                //food 테이블
                let tr2 =  document.createElement("tr");
                //tr2.classList.add("table-success");
                document.getElementById("foodTable").appendChild(tr2);

                let td0 = document.createElement("td");
                td0.innerText = `${i+1}`;
                td0.style.verticalAlign = "middle";
                let td1 = document.createElement("td");
                td1.innerText = `${name}`;
                td1.style.verticalAlign = "middle";
                let td2 = document.createElement("td");
                td2.innerText = `${price}원`;
                td2.style.verticalAlign = "middle";
                let td3 = document.createElement("td");
                td3.innerText = `${size}원`;
                td3.style.verticalAlign = "middle";
                let td4 = document.createElement("td");
                td4.innerText = `${gram}g`;
                td4.style.verticalAlign = "middle";
                let td5 = document.createElement("td");
                let a = document.createElement("a");
                a.href=`/items/${data[i]['id']}/edit`;
                a.classList.add("btn");
                a.classList.add("btn-outline-dark");
                a.setAttribute("role","button");
                a.innerText = "수정";

                td5.appendChild(a);


                if(data[i]['category']==="beverage"){
                    tr1.appendChild(td0);
                    tr1.appendChild(td1);
                    tr1.appendChild(td2);
                    tr1.appendChild(td3);
                    tr1.appendChild(td5);
                } else {
                    tr2.appendChild(td0);
                    tr2.appendChild(td1);
                    tr2.appendChild(td2);
                    tr2.appendChild(td4);
                    tr2.appendChild(td5);
                }

                document.getElementById("beverageTable").appendChild(tr1);
                document.getElementById("foodTable").appendChild(tr2);

            }
        })
}
