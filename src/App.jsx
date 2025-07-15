
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShoppingCart } from "lucide-react";

const mercados = [
  { nome: "Bahamas Centro", lat: -21.7595, lng: -43.3438 },
  { nome: "Colina Gourmet", lat: -21.7471, lng: -43.3515 },
  { nome: "Supermais São Pedro", lat: -21.7801, lng: -43.3682 },
];

export default function App() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRYEXEMPLOREAL_PUBLIC_URL/pub?output=csv")
      .then((res) => res.text())
      .then((text) => {
        const linhas = text.split("\n").slice(1);
        const dados = linhas.map((linha) => {
          const [nome, mercado, preco] = linha.split(",");
          return { nome, mercado, preco: parseFloat(preco) };
        });
        const agrupados = {};
        dados.forEach(({ nome, mercado, preco }) => {
          if (!agrupados[nome]) agrupados[nome] = [];
          agrupados[nome].push({ mercado, preco });
        });
        const estruturado = Object.keys(agrupados).map((nome) => ({
          nome,
          precos: agrupados[nome],
        }));
        setProdutos(estruturado);
      });
  }, []);

  const buscarProduto = (texto) => {
    setBusca(texto);
    if (texto.length >= 2) {
      const encontrados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(texto.toLowerCase())
      );
      setResultado(encontrados);
    } else {
      setResultado([]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="p-4 shadow-md flex items-center justify-between bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tight">CompraBoa JF</h1>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Compare preços nos mercados de Juiz de Fora</h2>
        <input
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => buscarProduto(e.target.value)}
          className="w-full p-3 rounded border shadow"
        />

        {resultado.length > 0 && (
          <div className="mt-4 space-y-4">
            {resultado.map((produto, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">{produto.nome}</h3>
                <ul>
                  {produto.precos.map((preco, j) => (
                    <li key={j} className="text-sm flex justify-between">
                      <span>{preco.mercado}</span>
                      <span className="text-blue-600 font-medium">R$ {preco.preco.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold mt-10 mb-2">Mercados em destaque</h2>
        <div className="h-[400px] rounded overflow-hidden">
          <MapContainer center={[-21.75, -43.35]} zoom={13} style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mercados.map((mercado, i) => (
              <Marker key={i} position={[mercado.lat, mercado.lng]}>
                <Popup>
                  <strong>{mercado.nome}</strong>
                  <br />
                  <button className="text-blue-500 text-xs mt-1 underline">Favoritar</button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>

      <footer className="text-xs text-gray-500 mt-10 border-t pt-4 text-center">
        <p>&copy; 2025 CompraBoa JF • Juiz de Fora</p>
        <div className="flex gap-4 justify-center mt-2">
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
