// MAIN TABLE


function updateTable() {
    fetch(`data/users/`)
        .then(x=>x.json()
            .then((array)=> buildTable(array)));
    document.getElementById('newButton').addEventListener("click", event => {
        event.preventDefault();
    })
}

function buildTable(data) {
    let table = document.getElementById('mainTable');
    let rows = '';
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
        rows += row;
    });
    table.innerHTML = rows;
}


// NEW USER


async function submitNew() {
    let user = await getUserFromModal("new");
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    let response = await fetch(`/data/new`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        alert("User successfully added");
        document.getElementById("newUserForm").reset();
    }
    else
    {
        alert("Http error:" + response.status);
    }
    await updateTable();
}


// EDIT USER


function showEditModal(id) {
    fetch(`data/users/${id}`)
        .then(response => response.json()
            .then((user) => buildEditModal(user)));
    $("#editUser").modal("show");
}

async function buildEditModal(user) {
    let modalPlace = document.getElementById('editModal');

    modalPlace.innerHTML = ` <form>
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
                            <button class="btn btn-danger btn-success" id="editButton" onclick="submitEdit(${user.id})">Edit</button>
                        </div>
                    </form>`
    await selectRoles("edit", user);
    document.getElementById('editButton').addEventListener("click", event => {
        event.preventDefault();
    })
}

async function submitEdit(id) {
    $('#editUser').modal('hide');
    let user = await getUserFromModal('edit');
    user.id = id;
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    let response = await fetch(`/data/update/${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        alert("User successfully edited");
    }
    else
    {
        alert("Http error:" + response.status);
    }
    updateTable();
}


//DELETE USER


function showDeleteModal(id) {
    fetch(`data/users/${id}`)
        .then(response => response.json()
            .then((user) => buildDeleteModal(user)));
    $(`#deleteUser`).modal("show");
}

async function buildDeleteModal(user) {
    let modalPlace = document.getElementById("deleteModal");

    modalPlace.innerHTML = `<form>
                        <div class="row justify-content-center">
                            <div class="col-6">
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="editId">ID</label>
                                    <input class="form-control" readonly="readonly" type="text"
                                           value="${user.id}" id="editId">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="deleteUsername">Username</label>
                                    <input class="form-control" readonly="readonly" name="username" type="text"
                                           value="${user.username}" id="deleteUsername">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100"  for="deleteName">First name</label>
                                    <input class="form-control" readonly="readonly" name="name" type="text"
                                           value="${user.name}" id="deleteName">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="deleteLastName">Last name</label>
                                    <input class="form-control" readonly="readonly" name="lastName" type="text"
                                           value="${user.lastName}" id="deleteLastName">
                                </div>
                                <div class="form-group">
                                    <label class="h6 text-center w-100" for="deleteRole">Roles</label>
                                    <select id="deleteRole" class="form-control" disabled="disabled" size="2"
                                            multiple="multiple" name="roles">

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-danger btn-success" id="deleteButton" onclick="submitDelete(${user.id})">Delete</button>
                        </div>
                    </form>`
    await selectRoles("delete", user);
    document.getElementById('deleteButton').addEventListener("click", event => {
        event.preventDefault();
    })
}

async function submitDelete(id) {
    $('#deleteUser').modal('hide');
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    let response = await fetch(`/data/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(id)
    });
    if (response.ok) {
        alert("User successfully deleted");
    }
    else
    {
        alert("Http error:" + response.status);
    }
    updateTable();
}

// UTILITY

async function getUserFromModal(tableName) {
    let userUsername = document.querySelector(`#${tableName}Username`);
    let userPassword = document.querySelector(`#${tableName}Password`);
    let userFirstname = document.querySelector(`#${tableName}Name`);
    let userLastName = document.querySelector(`#${tableName}LastName`);

    let allRoles = await getAllRoles();
    let userRoles = [];
    let select = document.querySelector(`#${tableName}Role`);
    let options = select && select.options;
    let opt;
    for (let i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];
        if (opt.selected) {
            userRoles.push(allRoles[i]);
        }
    }

    return {
        id: null,
        name: userFirstname.value,
        lastName: userLastName.value,
        username: userUsername.value,
        password: userPassword.value,
        roles: userRoles
    };
}

async function selectRoles(tableName, user) {
    let allRoles = await getAllRoles();
    let rolePlace = document.getElementById(`${tableName}Role`);
    allRoles.forEach(role => {
        let roleName = role.authority;
        let resultName = roleName.replace("ROLE_", "")
        let option;
        if (user.roles.find(e => e.authority === role.authority)) {
            option = `<option selected="selected" value="${role.id}"
                              >${resultName}</option>`
        } else {
            option = `<option  value="${role.id}"
                              >${resultName}</option>`
        }
        rolePlace.innerHTML += option;
    })
}

function getAllRoles() {
    return fetch("/data/roles")
        .then(response => response.json()
            .then((allRoles) => {
                return allRoles;
            }));
}
