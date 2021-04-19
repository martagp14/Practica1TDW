
function DeleteLocalStorage() {
    window.localStorage.clear();
    window.sessionStorage.clear();
}

function InilizateData() {
    createUsers();
    createInventory();
}

function InicializatePage0() {
    if (window.localStorage.getItem("products") == null) {
        InilizateData();
    }
    showInventory();
    PreparePresentation();
}

function InicializateDetailsPage() {
    PreparePresentation();
    ShowDetailsPage();
}

function PreparePresentation() {
    if (!JSON.parse(window.sessionStorage.getItem("logged"))) {
        for (let i = 0; i < document.getElementsByClassName("logged").length; i++) {
            document.getElementsByClassName("logged")[i].style.display = "none";
        }
        for (let i = 0; i < document.getElementsByClassName("loggedOut").length; i++) {
            document.getElementsByClassName("loggedOut")[i].style.display = "inline";
        }
    }
    else {
        for (let i = 0; i < document.getElementsByClassName("loggedOut").length; i++) {
            document.getElementsByClassName("loggedOut")[i].style.display = "none";
        }
        for (let i = 0; i < document.getElementsByClassName("logged").length; i++) {
            document.getElementsByClassName("logged")[i].style.display = "inline";
        }
    }
}

function createUsers() {
    var x = new Object();
    x.name = "x";
    x.password = "x";

    var y = new Object();
    y.name = "y";
    y.password = "y";

    var z = new Object();
    z.name = "z";
    z.password = "z";

    var users = new Object();
    users.x = x;
    users.y = y;
    users.z = z;

    window.localStorage.setItem("users", JSON.stringify(users));
    if (window.localStorage.getItem("logged")==undefined)
        window.localStorage.setItem("logged", false);

    console.log("Usuarios creados");
}

function createInventory() {
    CreateProducts();
    CreatePeople();
    CreateEntities();
}

function CreateProducts() {

    let product1 = {
        "name": "HTML",
        "dateBeginning": "23-11-20",
        "dateEnd": "12-11-21",
        "urlImage": "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photo/9512126/image/97aa4811d22871bc1af321f001601022",
        "urlWiki": "https://es.wikipedia.org/wiki/HTML",
        "people": ["Tim Berners-Lee", "Hakom Wien Lie"],
        "entities": ["CERN",]
    }
    let product2 = {
        "name": "CSS",
        "dateBeginning": "17-12-1996",
        "dateEnd": "",
        "urlImage": "https://lenguajecss.com/assets/logo.svg",
        "urlWiki": "https://es.wikipedia.org/wiki/Hoja_de_estilos_en_cascada",
        "people": ["Hakom Wien Lie",],
        "entities": ["CERN",]
    }
    let products = new Object();
    products[product1.name] = product1;
    products[product2.name] = product2;

    window.localStorage.setItem("products", JSON.stringify(products));
}
function CreatePeople() {

    let person1 = {
        "name": "Tim Berners-Lee",
        "dateBeginning": "08-6-1955",
        "dateEnd": "",
        "urlImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sir_Tim_Berners-Lee_%28cropped%29.jpg/330px-Sir_Tim_Berners-Lee_%28cropped%29.jpg",
        "urlWiki": "https://es.wikipedia.org/wiki/Tim_Berners-Lee"
    }
    let person2 = {
        "name": "Hakom Wien Lie",
        "dateBeginning": "16-07-1965",
        "dateEnd": "",
        "urlImage": "https://pbs.twimg.com/profile_images/681825796802113536/nzEoQF1Y.jpg",
        "urlWiki": "https://en.wikipedia.org/wiki/H%C3%A5kon_Wium_Lie"
    }
    let people = new Object();
    people[person1.name] = person1;
    people[person2.name] = person2;

    window.localStorage.setItem("people", JSON.stringify(people));
}
function CreateEntities() {

    let entity1 = {
        "name": "CERN",
        "dateBeginning": "29-09-1954",
        "dateEnd": "",
        "urlImage": "https://rinconeducativo.org/sites/default/files/cern_logo.jpg",
        "urlWiki": "https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Europea_para_la_Investigaci%C3%B3n_Nuclear",
        "people": ["Tim Berners-Lee", "Hakom Wien Lie"],
    }
    let entities = new Object();
    entities[entity1.name] = entity1;

    window.localStorage.setItem("entities", JSON.stringify(entities));
}

function showInventory() {

    let products = JSON.parse(window.localStorage.getItem("products"));
    //console.log(products["producto 1"]);
    let productList = document.getElementById("list_products");
    for (p in products) {
        productList.innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + products[p].name + "', 'product', false);\">" + products[p].name + "</a>" +
            "<button class=\"logged modify\" onclick=\"SetFocusOnProduct('" + products[p].name + "', 'product', true);GoToDetailsPage();\"/>" +
            "<button class=\"logged trash\" onclick=\"SetFocusOnProduct('" + products[p].name + "', 'product', false);DeleteObject();\"/></li>";
    }

    let people = JSON.parse(window.localStorage.getItem("people"));
    let peopleList = document.getElementById("list_people");
    for (p in people) {
        peopleList.innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + people[p].name + "', 'person', false);\">" + people[p].name + "</a>" +
            "<button class=\"logged modify\" onclick=\"SetFocusOnProduct('" + people[p].name + "', 'person', true);GoToDetailsPage();\"/>" +
            "<button class=\"logged trash\" onclick=\"SetFocusOnProduct('" + people[p].name + "', 'person', false);DeleteObject();\"/></li>";
    }

    let entities = JSON.parse(window.localStorage.getItem("entities"));
    let entitiesList = document.getElementById("list_entities");
    for (p in entities) {
        entitiesList.innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + entities[p].name + "', 'entity', false);\">" + entities[p].name + "</a>" +
            "<button class=\"logged modify\" onclick=\"SetFocusOnProduct('" + entities[p].name + "', 'entity', true);GoToDetailsPage();\"/>" +
            "<button class=\"logged trash\" onclick=\"SetFocusOnProduct('" + entities[p].name + "', 'entity', false);DeleteObject();\"/></li>";
    }
}

function UserLogin(event) {

    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let logoutSection = document.getElementById("LogOut");
    let loginSection = document.getElementById("LogIn");
    let users = JSON.parse(window.localStorage.getItem("users"));
    let logged = JSON.parse(window.sessionStorage.getItem("logged"));

    if (logged == true) {
        logged = false;
    } else {
        if (users[user] != undefined && users[user].password == password) {
            logged = true;
            document.getElementById("user").value = "";
            document.getElementById("password").value = "";
        }
        else {
            alert("Usuario y / o contraseña incorrectos");
        }
    }
    window.sessionStorage.setItem("logged", logged);
    window.location.href = "./pag0.html";
    PreparePresentation();
}

function SetFocusOnProduct(object, type, edit) {
    window.sessionStorage.setItem("productId", object);
    window.sessionStorage.setItem("objectType", type);
    window.sessionStorage.setItem("editProduct", edit);
}

function GoToDetailsPage() {
    window.location.href = "./DetailsPage.html";
}

function GoToIndexPage() {
    window.location.href = "./pag0.html";
}

function ShowDetailsPage() {
    let type = window.sessionStorage.getItem("objectType");
    if (!JSON.parse(window.sessionStorage.getItem("editProduct"))) {
        document.getElementById("DetailsForm").style.display = "none";
        if (type == "product")
            ShowDetailsProduct();
        else if (type == "person")
            ShowDetailsPerson();
        else if (type == "entity")
            ShowDetailsEntity();
    } else {
        document.getElementById("Details").style.display = "none";
        if (type == "product")
            ShowDetailsFormProduct();
        else if (type == "person")
            ShowDetailsFormPerson();
        else if (type == "entity")
            ShowDetailsFormEntity();
    }
}

function ShowDetailsProduct() {
    let productId = window.sessionStorage.getItem("productId");
    let products = JSON.parse(window.localStorage.getItem("products"));

    document.getElementById("Name").innerHTML = products[productId].name;
    document.getElementById("FechaIni").innerHTML = "Fecha de creación: " + products[productId].dateBeginning;
    if (products[productId].dateEnd != undefined)
        document.getElementById("FechaFin").innerHTML = "Fecha de descatalogación: " + products[productId].dateEnd;
    if (products[productId].urlImage != "")
        document.getElementById("Image").src = products[productId].urlImage;
    else
        document.getElementById("Image").style.display = "none";
    if (products[productId].urlWiki != "")
        document.getElementById("Wiki").href = products[productId].urlWiki;
    else
        document.getElementById("Wiki").style.display = "none";
    for (p in products[productId].people) {
        document.getElementById("list_people").innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + products[productId].people[p] + "', 'person', false);\">" + products[productId].people[p] + "</a></li>"
    }
    for (e in products[productId].entities) {
        document.getElementById("list_entities").innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + products[productId].entities[e] + "', 'entity', false);\">" + products[productId].entities[e] + "</a></li>"
    }
}

function ShowDetailsPerson() {
    let productId = window.sessionStorage.getItem("productId");
    let people = JSON.parse(window.localStorage.getItem("people"));

    document.getElementById("Name").innerHTML = people[productId].name;
    document.getElementById("FechaIni").innerHTML = "Fecha de nacimiento: " + people[productId].dateBeginning;
    if (people[productId].dateEnd != undefined)
        document.getElementById("FechaFin").innerHTML = "Fecha de defunción: " + people[productId].dateEnd;
    if (people[productId].urlImage != "")
        document.getElementById("Image").src = people[productId].urlImage;
    else
        document.getElementById("Image").style.display = "none";
    if (people[productId].urlWiki != "") 
        document.getElementById("Wiki").href = people[productId].urlWiki;
    else
        document.getElementById("Wiki").style.display = "none";
    document.getElementById("Participantes").style.display = "none";
}

function ShowDetailsEntity() {
    let productId = window.sessionStorage.getItem("productId");
    let entities = JSON.parse(window.localStorage.getItem("entities"));

    document.getElementById("Name").innerHTML = entities[productId].name;
    document.getElementById("FechaIni").innerHTML = "Fecha de creación: " + entities[productId].dateBeginning;
    document.getElementById("FechaFin").innerHTML = "Fecha de disolución: " + entities[productId].dateEnd;
    if (entities[productId].urlImage != "")
        document.getElementById("Image").src = entities[productId].urlImage;
    else
        document.getElementById("Image").style.display = "none";
    if (entities[productId].urlWiki != "")
        document.getElementById("Wiki").href = entities[productId].urlWiki;
    else
        document.getElementById("Wiki").style.display = "none";
    for (p in entities[productId].people) {
        document.getElementById("list_people").innerHTML += "<li><a href=\"./DetailsPage.html\" onclick=\"SetFocusOnProduct('" + entities[productId].people[p] + "', 'person', false);\">" + entities[productId].people[p] + "</a></li>"
    }
    for (let i = 0; i < document.getElementsByClassName("ParticipanEntidades").length ; i++)
        document.getElementsByClassName("ParticipanEntidades")[i].style.display = "none";
}

function ShowDetailsFormProduct() {
    let productId = window.sessionStorage.getItem("productId");
    let product = JSON.parse(window.localStorage.getItem("products"))[productId];
    let people = JSON.parse(window.localStorage.getItem("people"));
    let entities = JSON.parse(window.localStorage.getItem("entities"));

    SetFormLabels();

    if (product != undefined) {
        if (product.name != undefined) {
            document.getElementById("NameForm").value = product.name;
            document.getElementById("NameForm").readOnly = true;
        }
        if (product.dateBeginning != undefined)
            document.getElementById("FechaIniForm").value = product.dateBeginning;
        if (product.dateEnd != undefined)
            document.getElementById("FechaFinForm").value = product.dateEnd;
        if (product.urlImage != undefined)
            document.getElementById("ImageForm").value = product.urlImage;
        if (product.urlWiki != undefined)
            document.getElementById("WikiForm").value = product.urlWiki;
    } else
        document.getElementById("NameForm").required = true;
    for (p in people) {
        if (product != undefined && product.people.includes(people[p].name)) {
            document.getElementById("ParticipanPersonas").innerHTML += "<option selected value=\"" + people[p].name + "\">" + people[p].name + "</option>";
        }
        else
            document.getElementById("ParticipanPersonas").innerHTML += "<option value=\"" + people[p].name + "\">" + people[p].name + "</option>";
    }
    for (e in entities) {
        if (product != undefined && product.entities.includes(entities[e].name)) {
            document.getElementById("ParticipanEntidades").innerHTML += "<option selected value=\"" + entities[e].name + "\">" + entities[e].name + "</option>";
        }
        else
            document.getElementById("ParticipanEntidades").innerHTML += "<option value=\"" + entities[e].name + "\">" + entities[e].name + "</option>";
    }
}

function ShowDetailsFormPerson() {
    let productId = window.sessionStorage.getItem("productId");
    let person = JSON.parse(window.localStorage.getItem("people"))[productId];

    SetFormLabels();

    if (person != undefined) {
        if (person.name != undefined) {
            document.getElementById("NameForm").value = person.name
            document.getElementById("NameForm").readOnly = true;
        }
        if (person.dateBeginning != undefined)
            document.getElementById("FechaIniForm").value = person.dateBeginning;
        if (person.dateEnd != undefined)
            document.getElementById("FechaFinForm").value = person.dateEnd;
        if (person.urlImage != undefined)
            document.getElementById("ImageForm").value = person.urlImage;
        if (person.urlWiki != undefined)
            document.getElementById("WikiForm").value = person.urlWiki;
    } else
        document.getElementById("NameForm").required = true;
    document.getElementById("ParticipantesPersonasForm").style.display = "none";
    document.getElementById("ParticipantesEntidadesForm").style.display = "none";
}

function ShowDetailsFormEntity() {
    let productId = window.sessionStorage.getItem("productId");
    let entity = JSON.parse(window.localStorage.getItem("entities"))[productId];
    let people = JSON.parse(window.localStorage.getItem("people"));

    SetFormLabels();

    if (entity != undefined) {
        if (entity.name != undefined) {
            document.getElementById("NameForm").value = entity.name;
            document.getElementById("NameForm").readOnly = true;
        }
        if (entity.dateBeginning != undefined)
            document.getElementById("FechaIniForm").value = entity.dateBeginning;
        if (entity.dateEnd != undefined)
            document.getElementById("FechaFinForm").value = entity.dateEnd;
        if (entity.urlImage != undefined)
            document.getElementById("ImageForm").value = entity.urlImage;
        if (entity.urlWiki != undefined)
            document.getElementById("WikiForm").value = entity.urlWiki;
    } else
        document.getElementById("NameForm").required = true;
    for (p in people) {
        if (entity!= undefined && entity.people.includes(people[p].name)) {
            document.getElementById("ParticipanPersonas").innerHTML += "<option selected value=\"" + people[p].name + "\">" + people[p].name + "</option>";
        }
        else
            document.getElementById("ParticipanPersonas").innerHTML += "<option value=\"" + people[p].name + "\">" + people[p].name + "</option>";
    }
    document.getElementById("ParticipantesEntidadesForm").style.display = "none";  
}

function SetFormLabels() {
    let type = window.sessionStorage.getItem("objectType");

    switch (type) {
        case "product":
            document.getElementById("LabelName").textContent = "Nombre del producto: ";
            document.getElementById("LabelFechaIni").textContent = "Fecha de creación: ";
            document.getElementById("LabelFechaFin").textContent = "Fecha de descatalogación: ";
            break;
        case "entity":
            document.getElementById("LabelName").textContent = "Nombre de la entidad: ";
            document.getElementById("LabelFechaIni").textContent = "Fecha de creación: ";
            document.getElementById("LabelFechaFin").textContent = "Fecha de disolución: ";
            break;
        case "person":
            document.getElementById("LabelName").textContent = "Nombre completo: ";
            document.getElementById("LabelFechaIni").textContent = "Fecha de nacimiento: ";
            document.getElementById("LabelFechaFin").textContent = "Fecha de defunción: ";
            break;
        default:
            console.log("tipo de objeto no definido " + type);
            break;
    }

}

function CreateNewObject(type) {
    SetFocusOnProduct("new", type, true);
    GoToDetailsPage();
}

function SaveNewObject() {
    let people = GetPeopleSelectedInForm();
    let entities = GetEntitiesSelectedInForm();

    let object = {
        "name": SetValidName(),
        "dateBeginning": document.getElementById("FechaIniForm").value,
        "dateEnd": document.getElementById("FechaFinForm").value,
        "urlImage": document.getElementById("ImageForm").value,
        "urlWiki": document.getElementById("WikiForm").value,
        "people": people,
        "entities": entities
    }

    switch (window.sessionStorage.getItem("objectType")) {
        case "product":
            let products = JSON.parse(window.localStorage.getItem("products"));
            products[object.name] = object;
            window.localStorage.setItem("products", JSON.stringify(products));
            break;
        case "entity":
            let entities = JSON.parse(window.localStorage.getItem("entities"));
            entities[object.name] = object;
            window.localStorage.setItem("entities", JSON.stringify(entities));
            break;
        case "person":
            let people = JSON.parse(window.localStorage.getItem("people"));
            people[object.name] = object;
            window.localStorage.setItem("people", JSON.stringify(people));
            break;
        default:
            console.log("Error al guardar el objecto");
    }

    //window.open('./pag0.html', '_blank');
}

function SetValidName() {
    let name = document.getElementById("NameForm").value;
    if (name == "new" || name == " ")
        name = "new1";
    return name;
}

function GetPeopleSelectedInForm(){
    let people = [];
    for (let i = 0; i < document.getElementById("ParticipanPersonas").options.length; i++) {
        if (document.getElementById("ParticipanPersonas").options[i].selected)
            people.push(document.getElementById("ParticipanPersonas").options[i].value);
    }
    return people;
}

function GetEntitiesSelectedInForm() {
    let entities = [];
    for (let i = 0; i < document.getElementById("ParticipanEntidades").options.length; i++) {
        if (document.getElementById("ParticipanEntidades").options[i].selected)
            entities.push(document.getElementById("ParticipanEntidades").options[i].value);
    }
    return entities;
}

function DeleteObject() {
    let type = window.sessionStorage.getItem("objectType");

    switch (window.sessionStorage.getItem("objectType")) {
        case "product":
            DeleteProduct();
            break;
        case "entity":
            DeleteEntity();
            break;
        case "person":
            DeletePerson();
            break;
        default:
            console.error("Error al borrar el objecto");
    }
}

function DeleteProduct() {
    let products = JSON.parse(window.localStorage.getItem("products"));
    let product = products[window.sessionStorage.getItem("productId")];
    delete products[product.name];
    window.localStorage.setItem("products", JSON.stringify(products));
    window.location.href = "./pag0.html";
}

function DeletePerson() {
    let people = JSON.parse(window.localStorage.getItem("people"));
    let person = people[window.sessionStorage.getItem("productId")];
    DeleteReferenceInEntitiesOfPerson(person.name);
    DeleteReferenceInProductsOfPerson(person.name);
    delete people[person.name];
    window.localStorage.setItem("people", JSON.stringify(people));
    window.location.href = "./pag0.html";
}

function DeleteEntity() {
    let entities = JSON.parse(window.localStorage.getItem("entities"));
    let entity = entities[window.sessionStorage.getItem("productId")];
    DeleteReferenceInProductsOfEntity(entity.name);
    delete entities[entity.name];
    window.localStorage.setItem("entities", JSON.stringify(entities));
    window.location.href = "./pag0.html";
}

function DeleteReferenceInProductsOfPerson(name) {
    let products = JSON.parse(window.localStorage.getItem("products"));
    for (p in products) {
        for (let person = 0; person < products[p].people.length; person++) {
            if (products[p].people[person] == name)
                products[p].people.splice(person, 1);
        }
    }
    window.localStorage.setItem("products", JSON.stringify(products));
}

function DeleteReferenceInEntitiesOfPerson(name) {
    let entities = JSON.parse(window.localStorage.getItem("entities"));
    for (e in entities) {
        for (person in entities[p].people) {
            if (entities[p].people[person] == name)
                entities[p].people.splice(person, 1);
        }
    }
    window.localStorage.setItem("entities", JSON.stringify(entities));
}

function DeleteReferenceInProductsOfEntity(name) {
    let products = JSON.parse(window.localStorage.getItem("products"));
    for (p in products) {
        for (let entity = 0; entity < products[p].entities.length; entity++) {
            if (products[p].entities[entity] == name)
                products[p].entities.splice(entity, 1);
        }
    }
    window.localStorage.setItem("products", JSON.stringify(products));
}