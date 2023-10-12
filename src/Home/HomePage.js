import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [catFact, setCatFact] = useState("");
  const [dadJoke, setDadJoke] = useState("");
  const [showCatFact, setShowCatFact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("session");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const storedJoke = localStorage.getItem("dadJoke");
    const session = sessionStorage.getItem("session");

    setTimeout(() => {
      if (!session) {
        setIsLoading(true);
        axios
          .get("https://icanhazdadjoke.com/", {
            headers: { Accept: "application/json" },
          })
          .then((response) => {
            setDadJoke(response.data.joke);
            localStorage.setItem("dadJoke", response.data.joke);
            sessionStorage.setItem("session", "true");
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching dad joke:", error);
            setIsLoading(false);
          });
      } else {
        setDadJoke(storedJoke);
        setIsLoading(false);
      }
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3>Cat Fact</h3>
          {showCatFact ? (
            <div>
              <p>{catFact}</p>
              <button className="cat-facts-btn" onClick={fetchCatFact}>
                New Cat Fact
              </button>
            </div>
          ) : (
            <button className="cat-facts-btn" onClick={fetchCatFact}>
              Show Cat Fact
            </button>
          )}

          <h3>Dad Joke</h3>
          <p>{dadJoke}</p>
        </>
      )}
    </div>
  );
};

export default HomePage;
