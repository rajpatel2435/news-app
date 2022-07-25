import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";
import Head from "../node_modules/next/head";

function News(props: { pageSize: any }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("Tesla");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      //set the api key through sigining in open weather app
      //if u want to convert in celsius then &units=metric
      const url = `https://newsdata.io/api/1/news?apikey=pub_95720016c1cf1419d89fd712586ab4d5794f&q=${search}&page=${page}`;
      const response = await fetch(url); //await means the function get the value or not
      //convert in to the json file
      const resJson = await response.json();
      //get the main element of weather api
      setData(resJson.results);
      console.log(resJson.results);
    };

    fetchApi();
  }, [search]);

  const fetchMoreData = async () => {
    setTimeout(async () => {
      const url = `https://newsdata.io/api/1/news?apikey=pub_95720016c1cf1419d89fd712586ab4d5794f&q=${search}&page=${
        page + 1
      }`;
      setPage(page + 1);
      const response = await fetch(url); //await means the function get the value or not
      //convert in to the json file
      const resJson = await response.json();
      //get the main element of weather api
      setData(resJson.results);
      console.log(resJson.results);
    }, 1500);
  };

  return (
    <>
      <header>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </header>
      <div>
        <input
          type="search"
          className="inputField mx-3 inline-block mt-1 b-3 bg-black text-white rounded p-2 fixed"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            //target the each text whatevr u write in search box it will try to find and change the value
          }}
        />

        {data ? (
          data.map((value) => {
            return (
              <div className=" inline-block p-2 mt-6 mx-2 max-w-sm rounded overflow-hidden shadow-lg">
                <img src={value.image_url} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{value.title}</div>
                  <p className="text-gray-700 text-base">{value.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {value.source_id}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {value.keywords}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #winter
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p>Not found</p>
        )}
        <div>
          <button onClick={fetchMoreData}>Next Page </button>
        </div>
      </div>
    </>
  );
}
News.defaultProps = {
  pageSize: 12,
  // country: 'ca',
  // category: 'general'
};

News.propTypes = {
  // pageSize: PropTypes.number,
  // country: PropTypes.string,
  // category: PropTypes.string
};

export default News;
