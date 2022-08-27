import Head from "next/head";
import Link from "next/link";
import charStyle from "./Characters.module.css"

const url = "https://rickandmortyapi.com/api/character/"

export async function getServerSideProps({query}) {
  const {id} = query;
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  return {
    props: {
      data
    }
  }
}

const CharacterDetails = ({data}) => {
  const {name, image, gender, status, species, origin, type, location, episode} = data;
  return (
    <section>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={charStyle.charHeader}>
        <div className={charStyle.image}>
          <img src={image} alt={name} />
        </div>
        <h2>{name}</h2>
      </div>
      
      <div className={charStyle.section}>
        <h4>Information</h4>
        <div className={charStyle.details}>
          <div className={charStyle.info}>
            <div className={charStyle.card}>
              <h5>gender:</h5>
              <p>{gender}</p>
            </div>
            <div className={charStyle.card}>
              <h5>status:</h5>
              <p>{status}</p>
            </div>
            <div className={charStyle.card}>
              <h5>specie:</h5>
              <p>{species}</p>
            </div>
          </div>

          <div className={charStyle.info}>
            <div className={charStyle.card}>
              <h5>origin:</h5>
              <p>{origin.name}</p>
            </div>
            <div className={charStyle.card}>
              <h5>type:</h5>
              <p>{type ? `${type}`: 'Unknown' }</p>
            </div>
            <div className={charStyle.card}>
              <h5>location:</h5>
              <p>{location.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={charStyle.flexBtn}>
        <button>
          <Link href="/">
            Back to All Characters
          </Link>
        </button>
      </div>
    </section>
  )
}
export default CharacterDetails;


