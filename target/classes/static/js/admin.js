document.getElementById('formProducto').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        imagen: document.getElementById('imagen').value,
        descripcion: document.getElementById('descripcion').value,
        estado: 'NUEVO'
    };

    const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
    });

    if (response.ok) {
        alert('¡Producto publicado con éxito!');
        window.location.href = 'index.html'; // Volver al catálogo
    }
});