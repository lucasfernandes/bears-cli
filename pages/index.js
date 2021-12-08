import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Home() {
  const [bearsList, setBearsList] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(async () => {
    const url = `http://127.0.0.1:8000/api/v1/pages`;

    axios
      .get(url)
      .then((res) => setNumberOfPages(res.data))
      .catch((error) => console.log(error));
  }, [setNumberOfPages]);

  const fetchData = useCallback(
    async (page) => {
      console.log("ENTROU");
      console.log(page);
      const url = `http://127.0.0.1:8000/api/v1/bears?page=${page}`;

      axios
        .get(url)
        .then((res) => setBearsList(res.data))
        .catch((error) => console.log(error));
    },
    [setBearsList]
  );

  const clicked = (page) => {
    setCurrentPage(page);
    fetchData(page);

    console.log(currentPage);
  };

  useEffect(async () => {
    fetchData(currentPage);
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Head>
        <title>Bears App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex flex-wrap items-left justify-center w-full flex-1 px-20 text-center">
        {bearsList.map((item, i) => (
          <div class="card shadow-2xl w-80 m-4" key={i}>
            <figure>
              <img src="./bear-sample.jpeg" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{item.name.toUpperCase()}</h2>
              <div class="p-2 my-4 mx-20 justify-center bg-purple-400 rounded-full">
                {item.size.toUpperCase()}
              </div>
              <p class="my-4">
                Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
                Sit sit necessitatibus.
              </p>
              <div class="card-actions justify-center mt-20">
                <button class="btn btn-primary">More info</button>
              </div>
            </div>
          </div>
        ))}
      </main>
      <div class="btn-group flex justify-end mr-10">
        <button
          class="btn"
          onClick={() => {
            if (numberOfPages <= currentPage) {
              clicked(currentPage - 1);
            }
          }}
        >
          Previous
        </button>

        {[...Array(numberOfPages)].map((item, i) => (
          <button
            class={`btn ${currentPage == i + 1 && "btn-active"}`}
            onClick={() => {
              clicked(i + 1);
            }}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        <button
          class="btn"
          onClick={() => {
            if (numberOfPages > currentPage) {
              clicked(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}
