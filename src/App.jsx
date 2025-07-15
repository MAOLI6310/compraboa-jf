
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ShoppingCart } from "lucide-react";
import "leaflet/dist/leaflet.css";

const mercados = [
  { nome: "Bahamas Centro", lat: -21.7595, lng: -43.3438 },
  { nome: "Colina Gourmet", lat: -21.7471, lng: -43.3515 },
  { nome: "Supermais São Pedro", lat: -21.7801, lng: -43.3682 },
];

const Input = (props) => (
  <input
    {...props}
    className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
  />
);

export default function CompraBoaJF() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYEXEMPLOREAL_PUBLIC_URL/pub?output=csv"
    )
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
      <header className="p-4 shadow-md flex items-center justify-between bg-blue-600 text-white">
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
        <h2 className="text-xl font-semibold mb-4">
          Compare preços nos mercados de Juiz de Fora
        </h2>
        <Input
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => buscarProduto(e.target.value)}
        />

        {resultado.length > 0 && (
          <div className="mt-4 space-y-4">
            {resultado.map((produto, i) => (
              <div key={i} className="shadow border rounded p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">{produto.nome}</h3>
                <ul>
                  {produto.precos.map((preco, j) => (
                    <li key={j} className="text-sm">
                      <strong>{preco.mercado}:</strong> R${" "}
                      {preco.preco.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-xl font-semibold mt-10 mb-2">
          Mercados em destaque
        </h2>
        <div className="h-[400px] rounded overflow-hidden">
          <MapContainer
            center={[-21.75, -43.35]}
            zoom={13}
            style={{ height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mercados.map((mercado, i) => (
              <Marker key={i} position={[mercado.lat, mercado.lng]}>
                <Popup>
                  <strong>{mercado.nome}</strong>
                  <br />
                  <button className="text-blue-500 text-xs mt-1 underline">
                    Favoritar
                  </button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <section className="mt-10">
          <h3 className="font-bold text-lg mb-2">Sobre o CompraBoa JF</h3>
          <p className="text-sm text-gray-700">
            CompraBoa JF é uma plataforma criada para ajudar moradores de Juiz
            de Fora a economizarem de verdade no supermercado. Nossa missão é
            oferecer informações claras e atualizadas sobre os melhores preços
            de produtos do dia a dia nos principais mercados da cidade.
          </p>
        </section>

        <section className="mt-6">
          <h3 className="font-bold text-lg mb-2">
            Política de Privacidade & Termos
          </h3>
          <p className="text-sm text-gray-700">
            Não armazenamos informações pessoais. As buscas e interações são
            anônimas. Ao continuar utilizando o site, você concorda com os
            nossos Termos de Uso.
          </p>
        </section>

        <footer className="text-xs text-gray-500 mt-10 border-t pt-4">
          <p>&copy; 2025 CompraBoa JF • Juiz de Fora</p>
          <div className="flex gap-4 mt-2">
            <a href="#">Termos de Uso</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Sobre</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
