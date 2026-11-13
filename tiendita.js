const modal = document.getElementById("addProducto");
const modalEdit = document.getElementById("editProducto");
let productos = JSON.parse(localStorage.getItem("productos")) || [];


const btnSave = document.getElementById("btnSave");
btnSave.onclick = () => {
    const txtNombre = document.getElementById("nombre");
    const txtPrecio = document.getElementById("precio");
    const txtStock = document.getElementById("stock");

    if (txtNombre.value.trim() === "" || txtPrecio.value === "" || txtStock.value === "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    productos.push({
        nombre: txtNombre.value.trim(),
        precio: parseFloat(txtPrecio.value),
        stock: parseInt(txtStock.value)
    });
    localStorage.setItem("productos", JSON.stringify(productos));

    txtNombre.value = "";
    txtPrecio.value = "";
    txtStock.value = "";
    modal.close();
    cargarProductos();
};

const cargarProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    const tbody = document.getElementById("productos");
    let tabla = "";

    productos.forEach((producto, posicion) => {
        tabla += `<tr class="text-center">
            <td><b>${producto.nombre.toUpperCase()}</b></td>
            <td><b>$ ${parseFloat(producto.precio).toFixed(2)}</b></td>
            <td><b>${producto.stock}</b></td>
            <td>
                <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash3"></i></button>
                <button class="btn-solid theme-warning" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
            </td>
        </tr>`;
    });

    tbody.innerHTML = tabla;
};
cargarProductos();


const eliminarProducto = (posicion) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn-solid theme-success mx-5",
            cancelButton: "btn-solid theme-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "Estas seguro de eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarProductos();
            Swal.fire({
                title: "EXITO!!",
                text: "Se elimino correctamente",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "coral"
            });
        }
    });
};


const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("precioe").value = producto.precio;
    document.getElementById("stocke").value = producto.stock;
    document.getElementById("posicion").value = posicion;
    
    modalEdit.showModal();
};

const btnUpdate = document.getElementById("btnUpdate");
btnUpdate.onclick = () => {
    const txtNombre = document.getElementById("nombree");
    const txtPrecio = document.getElementById("precioe");
    const txtStock = document.getElementById("stocke");
    const posicion = document.getElementById("posicion");

    if (txtNombre.value.trim() === "" || txtPrecio.value === "" || txtStock.value === "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    productos[posicion.value].nombre = txtNombre.value.trim();
    productos[posicion.value].precio = parseFloat(txtPrecio.value);
    productos[posicion.value].stock = parseInt(txtStock.value);
    localStorage.setItem("productos", JSON.stringify(productos));

    txtNombre.value = "";
    txtPrecio.value = "";
    txtStock.value = "";
    modalEdit.close();

    cargarProductos();
};