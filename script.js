let listEm = JSON.parse(localStorage.getItem("ems")) || [];
render();
function add(){
    let code = document.getElementById("employee_code").value;
    let name = document.getElementById("employee_name").value;
    let email = document.getElementById("email").value;
    if(code.length===0){
        alert("code không được để trống");
        return;
    }else if(name.length === 0){
        alert("tên nhân viên không được để trống");
        return;
    }else if(email.length === 0){
        alert("email không được để trống");
        return;
    }else if (code === email){
        alert("mã nhân viên và email không được phép trùng")
        return;
    }
    let employee = {
        code: code,
        name: name,
        email: email
    }
    for (let index = 0; index < listEm.length; index++) {
        if(code === listEm[index].code){
            alert("Mã nhân viên đã tồn tại");
            return;
        }                
    }
    listEm.push(employee);
    localStorage.setItem("ems", JSON.stringify(listEm));
    document.getElementById("employee_code").value = "";
    document.getElementById("employee_name").value = "";
    document.getElementById("email").value =  "";
    render();
}

function render(){
    let text = "";
    let i = 1;
    for (let index = 0; index < listEm.length; index++) {
        text+=`<tr>
                <td id="stt">${i++}</td>
                <td>${listEm[index].code}</td>
                <td>${listEm[index].name}</td>
                <td>${listEm[index].email}</td>
                <td>
                    <button style="cursor:pointer; color:white;border-radius: 3px;border:none; background-color:#D2691E; padding: 10px; width: 50px" onclick=update("${listEm[index].code}")>Sửa</button>    
                    <button style="cursor:pointer; color:white;border-radius: 3px;border:none; background-color:#DC143C; padding: 10px; width: 50px" onclick=remove("${listEm[index].code}")>Xóa</button>    
                </td>
            </tr>`;
    }
    document.getElementById("data_render").innerHTML = text;
}

function remove(code){
    for (let index = 0; index < listEm.length; index++) {
        if(listEm[index].code === code){
            let xacNhan = confirm("bạn có muốn xóa không ?");
            if(xacNhan){
                listEm.splice(index,1);
            }
            break;
        }
    }
    localStorage.setItem("ems", JSON.stringify(listEm));
    render();
}

function update(code){
    for (let index = 0; index < listEm.length; index++) {
        if(listEm[index].code === code){
            document.getElementById("employee_code").value = listEm[index].code;
            document.getElementById("employee_code").setAttribute("readonly", "readonly");
            document.getElementById("employee_name").value = listEm[index].name;
            document.getElementById("email").value =  listEm[index].email;
            document.getElementById("btn").setAttribute("onclick", `doUpdate("${listEm[index].code}")`);
            document.getElementById("btn").textContent = "Update Employee";
            document.getElementById("title").textContent ="Update Employee";
            break;
        }  
    }
}

function doUpdate(code){
    let codeToUpdate = document.getElementById("employee_code").value;
    let nameToUpdate = document.getElementById("employee_name").value;
    let emailToUpdate = document.getElementById("email").value;
    if(codeToUpdate.length===0){
        alert("code không được để trống");
        return;
    }else if(nameToUpdate.length === 0){
        alert("tên nhân viên không được để trống");
        return;
    }else if(emailToUpdate.length === 0){
        alert("email không được để trống");
        return;
    }else if (codeToUpdate === emailToUpdate){
        alert("mã nhân viên và email không được phép trùng")
        return;
    }
    for (let index = 0; index < listEm.length; index++) {
        if(listEm[index].code === code){
            listEm[index].name = nameToUpdate;
            listEm[index].email = emailToUpdate;    
            alert("Cập nhật thành công");
            localStorage.setItem("ems", JSON.stringify(listEm));
            document.getElementById("employee_code").value = "";
            document.getElementById("employee_name").value = "";
            document.getElementById("email").value =  "";
            document.getElementById("btn").textContent = "Add Employee";
            document.getElementById("btn").setAttribute("onclick", `add()`);
            document.getElementById("title").textContent ="Add Employee";
            break;
        }
    }
    render();
}