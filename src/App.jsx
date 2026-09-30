import { useState, useEffect } from 'react'
import PWABadge from './PWABadge.jsx'
import './App.css'


// Arreglo con las plantas de la galeria.
const plantas = [
    ["Suculenta", "Poca agua y mucho sol.", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3CFqtabnhbrtjiPrQ-grc12tIwGXfyowqYVt4twCgA885VcuX33PMI1A&s=10"],
    ["Monstera", "Luz indirecta y hojas limpias.", "https://therealgreen.com.mx/cdn/shop/articles/en_donde_poner_una_monstera.png?v=1737586201"],
    ["Lavanda", "Sol, aroma y tranquilidad.", "https://ucarecdn.com/00a17c6e-e229-43f1-b9db-abc93f024b3e/-/format/auto/-/preview/3000x3000/-/quality/lighter/LAVANDA.jpg"]
];

// Funcion con argumento: espera los milisegundos indicados.
function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Funcion asincrona: entrega las plantas despues de 3 segundos.
async function obtenerPlantas() {
    await esperar(3000);
    return plantas;
}

// Funcion con argumento: recibe un nombre y lo muestra.
function Saludo(nombre) {
    return <p className="lead">Hola, {nombre}. Este es tu pequeño jardin.</p>;
}

// Funcion con argumentos: reutiliza cualquier imagen.
function Imagen(src, alt, clase) {
    return <img className={clase} src={src} alt={alt} />;
}

// Componente que recibe datos para crear una tarjeta.
function TarjetaPlanta(nombre, cuidado, imagen) {
    return (
        <article className="product-card">
            {Imagen(imagen, nombre, "card-img-top")}
            <div className="p-4">
                <h3 className="h4">{nombre}</h3>
                <p>{cuidado}</p>
            </div>
        </article>
    );
}

// Componente que se muestra mientras carga la galeria.
function Cargando() {
    return (
        <div className="text-center py-5">
            <div className="spinner-border" role="status"></div>
            <p className="mt-3">Cargando plantas...</p>
        </div>
    );
}

// Componente con un evento click.
function BotonMensaje() {
    return (
        <button className="btn btn-cafe px-4" onClick={() => alert("Tu planta te lo agradece")}>
            Regar una planta
        </button>
    );
}

function App() {
    const [lista, setLista] = useState([]);

    // Al entrar a la pagina carga la galeria de forma asincrona.
    useEffect(() => {
        async function cargarGaleria() {
            const datos = await obtenerPlantas();
            setLista(datos);
        }
        cargarGaleria();
    }, []);

    return (
      <>
        <header className="hero">
            <nav className="container py-4 d-flex justify-content-between">
                <span className="marca">Mi Jardin</span>
                <span className="badge badge-cafe">Crecemos juntos</span>
            </nav>
            <div className="container pb-5">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <p className="text-uppercase fw-bold small">Cuidado sencillo</p>
                        <h1>Un poco de verde cambia el dia.</h1>
                        {Saludo("Mariana")}
                        <BotonMensaje />
                    </div>
                    <div className="col-lg-6">
                        {Imagen("https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=80", "Plantas verdes", "hero-image")}
                    </div>
                </div>
            </div>
        </header>

        <main className="container py-5">
            <h2 className="mb-4">Mis plantas</h2>
            {lista.length === 0 ? <Cargando /> : (
                <div className="row g-4">
                    {lista.map((planta) => (
                        <div className="col-md-4" key={planta[0]}>
                            {TarjetaPlanta(planta[0], planta[1], planta[2])}
                        </div>
                    ))}
                </div>
            )}
        </main>

        <footer className="text-center py-4">
            <p className="mb-0">Mi Jardin | Pequeños cuidados, grandes cambios.</p>
        </footer>
        <PWABadge />
      </>
    );
}

export default App;
