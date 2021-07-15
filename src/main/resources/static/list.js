function list() {
    fetch("/items/itemList", {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then( ( response) => response.json())
        .then(text => console.log(text))
        .then((data) => {
            console.log(data.length);
            for(let i=0; i<data.length; i++){
                let name = data[i]['name'];
                let price = data[i]['price'];
                let size = data[i]['size'];

                let temp_html = `<tr>
                                    <td>${name}</td>
                                    <td>${price}</td>
                                    <td>${size}</td>
                                    <td>
          <a href="/items/${data[i]['id']}/edit"
             class="btn btn-primary" role="button">수정</a>
        </td>
             </tr>`;
                document.getElementById("itemTable").append(temp_html);
            }
        })
}

list();