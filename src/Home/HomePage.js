import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [catFact, setCatFact] = useState("");
  const [dadJoke, setDadJoke] = useState("");
  const [showCatFact, setShowCatFact] = useState(false);

  useEffect(() => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        setDadJoke(response.data.joke);
      })
      .catch((error) => {
        alert.error("Error fetching dad joke:", error);
      });
  }, []);

  const fetchCatFact = () => {
    axios
      .get("https://catfact.ninja/fact")
      .then((response) => {
        setCatFact(response.data.fact);
        setShowCatFact(true);
      })
      .catch((error) => {
        alert.error("Error fetching cat fact:", error);
      });
  };

  return (
    <div>
      <div className="cat-facts">
        <h3>Cat Fact</h3>
        {showCatFact ? (
          <p>{catFact}</p>
        ) : (
          <button className="cat-facts-btn" onClick={fetchCatFact}>
            Show Cat Fact
          </button>
        )}
      </div>
      <h3>Dad Joke</h3>
      <p>{dadJoke}</p>
    </div>
  );
};

export default HomePage;
