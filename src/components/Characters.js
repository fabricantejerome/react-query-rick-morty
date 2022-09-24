import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, isLoading } = useQuery(["characters", page], fetchCharacters);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    let previousPage = page - 1;
    setPage(previousPage);
  };

  const handleNext = () => {
    let nextPage = page + 1;
    setPage(nextPage);
  };

  return (
    <div className="characters">
      {data.results.map((character, index) => (
        <Character key={index} character={character} />
      ))}
      <div>
        <button disabled={!data.info.prev} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={!data.info.next} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Characters;
