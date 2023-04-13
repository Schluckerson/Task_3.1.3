$.getJSON("http://localhost:8080/data/users", function (response) {
    buildTable(response);
});

function buildTable(data) {
    let table = document.getElementById('mainTable');
    data.forEach(value => {
        let row = `<tr>
                       <td>${value.id}</td>
                       <td>${value.username}</td>
                       <td>${value.name}</td>
                       <td>${value.lastName}</td>
                       <td>
                           <button class="btn btn-info" type="button"
                                   onclick="showEditModal(${value.id})">Edit User</button>
                       </td>
                       <td>
                           <button class="btn btn-danger" type="button"
                                   onclick="showDeleteModal(${value.id})">Delete</button>
                       </td>
                     </tr>`
        table.innerHTML += row;
    });
}

async function buildEditModal(user) {
    let modalPlace = document.getElementById('editModal');

    modalPlace.innerHTML = ` <form th:method="PATCH" action="/admin/${user.id}">
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editId">ID</label>
                                    <input class="form-control" readonly="readonly" type="text"
                                           value="${user.id}" id="editId">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editUsername">Username</label>
                                    <input class="form-control" name="username" type="text"
                                           value="${user.username}" id="editUsername">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editPassword">Password</label>
                                    <input class="form-control" name="password" type="password"
                                           id="editPassword">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100"  for="editName">First name</label>
                                    <input class="form-control" name="name" type="text"
                                           value="${user.name}" id="editName">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editLastName">Last name</label>
                                    <input class="form-control" name="lastName" type="text"
                                           value="${user.lastName}" id="editLastName">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editRole">Roles</label>
                                    <select id="editRole" class="form-control" size="2"
                                            multiple="multiple" name="roles">

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-danger btn-success" id="editButton" onclick="submitEdit()">Edit</button>
                        </div>
                    </form>`
    document.getElementById('editButton').addEventListener("click", event=> {
        event.preventDefault();
    })
    let response = await fetch("http://localhost:8080/data/roles");
    let allRoles = await response.json();
    let rolePlace = document.getElementById("editRole");
    allRoles.forEach(role=> {
        let roleName = role.authority;
        let resultName = roleName.replace("ROLE_", "")
        let option;
        if (user.roles.find(e => e.authority === role.authority)) {
            option = `<option selected="selected" value="${role.id}"
                              >${resultName}</option>`
        }
        else {
            option = `<option  value="${role.id}"
                              >${resultName}</option>`
        }
        rolePlace.innerHTML += option;
    })
}

function submitEdit() {
    $('#editUser').modal('hide');
    let userId = document.querySelector("#editId");
    let userUsername = document.querySelector("#editUsername");
    let userPassword = document.querySelector("#editPassword");
    let userFirstname = document.querySelector("#editName");
    let userLastName = document.querySelector("#editLastName");
    let userRoles = [];
    let select = document.querySelector("#editRole");
    let options = select && select.options;
    let opt;
    for (let i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            userRoles.push(opt.value || opt.text);
        }
    }
    let user = {
        id : userId.value,
        name : userFirstname.value,
        lastName : userLastName.value,
        username : userUsername.value,
        password : userPassword.value,
        roles : userRoles
    }
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    let sendUser = fetch(`http://localhost:8080/data/update/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(user)
    });
}

function buildDeleteModal(id) {

}

function showEditModal(id) {
    $.getJSON(`http://localhost:8080/data/users/${id}`, function (response) {
        buildEditModal(response);
    });

    $("#editUser").modal("show");
}

function showDeleteModal(id) {
    buildDeleteModal(id);
    $(`#deleteUser${id}`).modal("show");
}
