import React, { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [alert, setAlert] = useState("");

  const createRandom = useCallback(async () => {
    const url = "http://127.0.0.1:8000/api/v1/random";

    axios
      .get(url)
      .then((res) => setAlert(res.data.notice))
      .catch((error) => setAlert(error));
  }, [setAlert]);

  return (
    <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box p-4 m-4">
      <div class="flex-1 px-2 mx-2">
        <img src="./bear.gif" alt="" class="rounded-full w-16 h-16 mx-4" />
        <span class="text-lg font-bold">Bears</span>
      </div>

      {alert !== "" && (
        <div class="alert alert-success">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              ></path>
            </svg>
            <label>{alert}</label>
          </div>
        </div>
      )}

      <div class="flex-none hidden px-2 mx-2 lg:flex">
        <div class="flex items-stretch">
          <Link href="/">
            <a class="btn btn-ghost btn-sm rounded-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block w-5 mr-2 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </a>
          </Link>

          <button
            class="btn btn-ghost btn-sm rounded-btn"
            onClick={createRandom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline-block w-5 mr-2 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Bear
          </button>
        </div>
      </div>
      <div class="flex-none">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
