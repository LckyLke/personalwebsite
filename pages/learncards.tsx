import React, { useEffect, useState, useContext } from "react";
import Flashcard from "../components/Flashcard";
import EditCards from "../components/EditCards";
import { useUserStore, useCardStore } from "../components/store";
import Router from "next/router";
import { text } from "stream/consumers";
import RadioButtons from "../components/RadioButtons";

const LearnCards: React.FC<{ data: any }> = (data) => {
  const user = useUserStore((state) => state.user);
  const [mode, setMode] = useState("lobby");
  const [cardSelection, setCardSelection] = useState([]);
  const selectedAmount = useUserStore((state) => state.selectedAmount);
  const ratings = useUserStore((state) => state.ratings);
  const [showUsername, setShowUsername] = useState(true);

  const createCardSelection = (ratings = [], amount = 0) => {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      console.error("Invalid ratings array:", ratings);
      return;
    }

    if (!Number.isInteger(amount) || amount <= 0 || amount > ratings.length) {
      console.error("Invalid amount:", amount);
      return;
    }

    let cardSelectionNumbers = [];
    let ratingsSum = ratings.reduce((a, b) => a + b, 0);

    while (cardSelectionNumbers.length < amount) {
      let random = Math.floor(Math.random() * ratingsSum);
      for (let i = 0; i < ratings.length; i++) {
        if (random < ratings[i]) {
          cardSelectionNumbers.push(i);
          break;
        }
        random -= ratings[i];
      }
    }
    setCardSelection(cardSelectionNumbers);
  };

  const setCards = useCardStore((state) => state.setCards);
  const cards = useCardStore((state) => state.cards);

  function getCardsFetch() {
    if (user == null) {
      Router.push("/login");
    }
    let modfData = data["data"]?.map((card: any) => {
      return {
        question: card.question,
        answers: card.answers,
        solution: card.solution,
        number: card.number,
        rating: 0,
      };
    });
    setCards(modfData);
  }

  useEffect(() => {
    getCardsFetch();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        {showUsername && (
          <div id="username">{"You are logged in as " + user}</div>
        )}
        <button
          className="p-2 text-gray-500 transition duration-150 ease-in-out rounded-full hover:text-gray-600"
          onClick={() => setShowUsername(!showUsername)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div>
        {cards != null && cards.length != 0 ? (
          cardSelection.length == 0 || mode == "lobby" ? (
            <div>
              <RadioButtons />
              <button
                onClick={() => {
                  console.log(ratings);
                  console.log(selectedAmount);
                  setMode("learn");
                  createCardSelection(ratings, selectedAmount);
                }}
              >
                Start
              </button>
            </div>
          ) : (
            <Flashcard
              quit={() => {
                setMode("lobby");
              }}
              cards={cards.filter((v, i) => {
                return cardSelection.includes(i);
              })}
            />
          )
        ) : (
          <div>
            <div>
              There are no cards loaded...something probably went wrong.
            </div>
            <div>Try reloading the page.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/cards");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default LearnCards;
