// --- 1. CONFIGURACIÓN ---
const API_URL = 'http://localhost:8080/api';

// --- 2. ESTADO GLOBAL ---
let productos = [];

// --- 3. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    actualizarMenuActivo();
    cargarProductos(); // Carga real desde BD
    
    if (document.getElementById('cart-items')) renderizarCarrito();
});

// --- 4. COMUNICACIÓN CON EL BACKEND ---

// Cargar productos desde Java
async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        productos = await response.json();
        
        // Si estamos en catálogo, renderizamos
        if (document.getElementById('contenedor-productos')) filtrarCatalogo();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Registro de usuario (desde el Modal)
document.getElementById('registroForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        rol: 'CLIENTE'
    };

    try {
        const response = await fetch(`${API_URL}/usuarios/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            alert('¡Registro exitoso!');
            document.getElementById('modalRegistro').classList.add('hidden');
        }
    } catch (error) {
        alert('Error al registrarse');
    }
});

// --- 5. LÓGICA DE CATÁLOGO ---
function filtrarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    const params = new URLSearchParams(window.location.search);
    const categoriaFiltro = params.get('categoria');

    const productosMostrar = categoriaFiltro 
        ? productos.filter(p => p.categoria === categoriaFiltro)
        : productos;

    contenedor.innerHTML = productosMostrar.map(p => `
        <div class="product-card group bg-white border border-outline-variant cursor-pointer p-4 hover:shadow-lg transition-shadow" onclick="window.location.href='producto.html?id=${p.id}'">
            <div class="aspect-[4/3] overflow-hidden relative mb-4">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${p.imagen}" alt="${p.nombre}"/>
            </div>
            <p class="font-label-md text-label-md text-secondary mb-1">${p.categoria}</p>
            <h3 class="font-headline-sm text-headline-sm mb-3">${p.nombre}</h3>
            <span class="font-bold text-primary">S/ ${p.precio.toFixed(2)}</span>
        </div>
    `).join('') || `<p class="p-4 text-secondary">No se encontraron productos.</p>`;
}

// --- 6. CARRITO DE COMPRAS ---
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('utp_cart')) || [];
    let item = carrito.find(i => i.id === producto.id);
    
    item ? item.cantidad += 1 : carrito.push({ ...producto, cantidad: 1 });
    
    localStorage.setItem('utp_cart', JSON.stringify(carrito));
    actualizarContador();
    alert('Añadido al carrito');
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('utp_cart')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.cart-counter').forEach(el => el.innerText = total);
}

// --- 7. UTILIDADES ---
function actualizarMenuActivo() {
    const cat = new URLSearchParams(window.location.search).get('categoria');
    document.querySelectorAll('nav a').forEach(enlace => {
        const esActivo = (cat && enlace.textContent.trim() === cat) || (!cat && enlace.textContent.trim() === 'Catálogo');
        enlace.classList.toggle('text-primary', esActivo);
        enlace.classList.toggle('border-b-2', esActivo);
        enlace.classList.toggle('border-primary', esActivo);
        enlace.classList.toggle('text-secondary', !esActivo);
    });
}