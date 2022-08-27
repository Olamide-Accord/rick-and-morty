import Head from "next/head"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
import logo from "../public/images/logo.svg";
import style from "../styles/Home.module.css"

const url ="https://rickandmortyapi.com/api/character/";

export async function getServerSideProps () {
  const response = await fetch(url);
  const data = await response.json();
  return {
    props: {
      data
    }
  }
}

const Home = ({data}) => {
  const {info, results: defaultResults = []} = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({
    ...info,
    current: url
  });
  const {current} = page;

  useEffect(() => {
    if(current === url) return;

    async function fetchData() {
      const response = await fetch(current);
      const newData = await response.json();

      updatePage({
        current,
        ...newData.info
      });

      if(!newData.info?.prev) {
        updateResults(newData.results);
        return;

      }
      updateResults(prev => {
        return [
          ...prev,
          ...newData.results
        ]
      })
    }
    fetchData()
  }, [current])

  const handleLoadMore = () => {
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {currentTarget = {}} = e;
    const inputSearch = Array.from(currentTarget?.elements);
    const inputName = inputSearch.find(field => field.name === "query");

    const value = inputName.value || '';
    const newUrl = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: newUrl
    })
  }

  return (
    <section>
      <Head>
        <title>Rick and Morty</title>
        <meta 
          name="description" 
          content="This is a simple static site displaying the various characters in the sci-fi series, Rick and Morty" 
        />
      </Head>
      <div className={style.heroDiv}>
        <Image src={logo} width={200} height={80} />
      </div>
      <div className={style.formSearch}>
        <form className={style.search} onSubmit={handleSubmit}>
          <input type="search" name="query" className={style.inputSearch} />
          <input type="button"  className={style.inputBtn} value='submit' />
        </form>
      </div>
      <div className={style.box}>
        {
          results.map((character) => {
            const {id, name, image} = character;
            return (
              <div className={style.card} key={id}>
                <Link href='/character/[id]' as={`/character/${id}`}>
                  <div>
                    <img src={image} alt={name} />
                    <div className={style.cardText}>
                      <h4>{name}</h4>
                    </div>
                  </div>
                </Link> 
              </div>
            )
          })
        }
      </div>
      <div className={style.flexBtn}>
      <button onClick={handleLoadMore}>Load more</button>
      </div>
    </section>
  )
}

export default Home;
