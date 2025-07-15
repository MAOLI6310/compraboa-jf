
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ShoppingCart, Star } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8" />
          <h1 className="text-2xl font-bold">CompraBoa JF</h1>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <div className="text-center my-6">
          <h2 className="text-xl font-semibold mb-2">Compare preços nos mercados de Juiz de Fora</h2>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            className="w-full p-3 rounded border shadow"
            value={busca}
            onChange={(e) => buscarProduto(e.target.value)}
          />
        </div>

        {resultado.length > 0 && (
          <div className="space-y-4">
            {resultado.map((produto, i) => (
              <div key={i} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
                <ul className="text-sm">
                  {produto.precos.map((preco, j) => (
                    <li key={j} className="flex justify-between">
                      <span>{preco.mercado}</span>
                      <span className="font-semibold text-blue-600">R$ {preco.preco.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="my-10">
          <h2 className="text-xl font-semibold mb-3">Mercados no mapa</h2>
          <div className="h-[400px] rounded overflow-hidden">
            <MapContainer center={[-21.75, -43.35]} zoom={13} style={{ height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {mercados.map((m, i) => (
                <Marker key={i} position={[m.lat, m.lng]}>
                  <Popup>
                    <strong>{m.nome}</strong>
                    <br />
                    <button className="text-blue-500 text-xs mt-1 underline">Favoritar</button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6 border-t">
        &copy; 2025 CompraBoa JF • Juiz de Fora
      </footer>
    </div>
  );
}
