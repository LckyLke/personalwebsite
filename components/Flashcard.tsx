import React, { useState } from "react";
import RatingButton from "./RatingButton";
import { FiRefreshCcw } from "react-icons/fi";
import { useSpring, animated, useTransition } from "react-spring";
import { useUserStore } from "./store";
import axios from "axios";

interface Card {
  front: string;
  back: string;
  number: number;
}

interface Props {
  quit: any;
  cards: any;
}

const Flashcard: React.FC<Props> = ({ quit, cards }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [countAnswered, setCountAnswered] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [animatedButton, setAnimatedButton] = useState<number | null>(null);

  const name = useUserStore((state) => state.user);
  const ratings = useUserStore((state) => state.ratings);
  const setUserRatings = useUserStore((state) => state.setUserRatings);

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  const handleMainMenu = () => {
    // code to handle the main menu button click
    // e.g. navigate to the main menu page, or show a modal with main menu options
  };

  const handleSettings = () => {
    // code to handle the settings button click
    // e.g. navigate to the settings page, or show a modal with settings options
  };

  const { transform } = useSpring({
    transform: showBack
      ? "rotateY(180deg) scaleX(-1)"
      : "rotateY(0deg) scaleX(1)",
  });

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % cards.length);
    setShowBack(false);
  };

  const handleAnswer = (rating: number) => {
    setAnimatedButton(rating);
    setTimeout(() => {
      nextCard();
      setAnimatedButton(null);
    }, 300);
  };

  const setRating = (card: Card, rating: number) => {
    setRatingServer(card, rating, name, ratings);
    setCountAnswered((prev) => prev + 1);
    console.log(countAnswered);
    console.log(cards.length);
    if (countAnswered >= cards.length - 1) {
      quit();
    }
  };

  const setRatingServer = async (
    card: Card,
    rating: number,
    name: string,
    ratings: number[]
  ) => {
    try {
      const updatedRatings = Array.from(ratings);
      if (updatedRatings[card.number - 1] + rating < 0) {
        updatedRatings[card.number - 1] = 0;
      } else if (updatedRatings[card.number - 1] + rating > 10) {
        updatedRatings[card.number - 1] = 10;
      } else {
        updatedRatings[card.number - 1] =
          updatedRatings[card.number - 1] + rating;
      }

      const response = await axios.put("/api/users", {
        name,
        ratings: updatedRatings,
      });
      console.log("updated ratings: ");
      console.log(response.data.ratings);
      setUserRatings(response.data.ratings);
    } catch (error) {
      console.log("Error while updating ratings" + error);
    }
  };

  const animation = (val: number) =>
    useSpring({
      transform: animatedButton === val ? "scale(1.35)" : "scale(1)",
      config: { duration: 300 },
    });

  return (
    <div className="flex flex-col justify-around h-screen">
      <animated.div
        style={{ transform }}
        className="flex flex-col self-center justify-between w-3/4 rounded-lg shadow-lg bg-slate-100"
      >
        <div></div>
        <div className="flex items-center justify-center">
          {showBack ? (
            <div className="p-4">
              <div className="flex justify-between pb-2">
                <span></span>
                <span></span>
                <span className="font-bold ">
                  Answer: {cards[currentCard]?.number}
                </span>
              </div>

              {cards[currentCard].solution}
            </div>
          ) : (
            <div className="flex flex-col w-full p-4">
              <div className="flex justify-between pb-2 ">
                <span>
                  {"Rating: " +
                    (ratings ? ratings[cards[currentCard]?.number - 1] : "")}
                </span>
                <span></span>
                <span className="font-bold ">
                  Question: {cards[currentCard]?.number}
                </span>
              </div>
              <div className="self-center">{cards[currentCard]?.question}</div>
              <div className="self-center">
                {cards[currentCard]?.answers.map((a: Text) => (
                  <div>{a}</div>
                ))}
              </div>
              <div></div>
            </div>
          )}
        </div>
        <div className="flex justify-around p-4 bg-slate-200">
          <span></span>
          <RatingButton
            onClick={() => {
              setRating(cards[currentCard], 1);
              handleAnswer(1);
            }}
            text="poor"
            rating={1}
            animation={animation(1)}
          />
          <RatingButton
            onClick={() => {
              setRating(cards[currentCard], 0);
              handleAnswer(2);
            }}
            text="fair"
            rating={2}
            animation={animation(2)}
          />
          <RatingButton
            onClick={() => {
              setRating(cards[currentCard], -1);
              handleAnswer(3);
            }}
            text="good"
            rating={3}
            animation={animation(3)}
          />
          <button onClick={handleFlip}>
            <FiRefreshCcw size={24} />
          </button>
        </div>
      </animated.div>
      <div className="flex justify-around p-4 bg-slate-200">
        <button className="btn btn-main-menu" onClick={handleMainMenu}>
          Main Menu
        </button>
        <button className="btn btn-settings" onClick={handleSettings}>
          Settings
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
