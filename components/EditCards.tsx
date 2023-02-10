import { useState } from "react";

interface Card {
  front: string;
  back: string;
  rating: number;
}

const EditCards: React.FC = () => {
  const [cards, setCards] = useState<any>([]);
  const [currentDeck, setCurrentDeck] = useState<any>(null);
  const [newDeckName, setNewDeckName] = useState("");
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [editingCard, setEditingCard] = useState(null);

  const handleNewDeck = () => {
    if (newDeckName) {
      setCards([...cards, { front: newDeckName, back: [], rating: 0 }]);
      setCurrentDeck(newDeckName);
      setNewDeckName("");
    }
  };

  const handleSelectDeck = (deck: string) => {
    setCurrentDeck(deck);
  };

  const handleAddCard = () => {
    if (currentDeck && newCardFront && newCardBack) {
      const newCards = cards.map((card: any) => {
        if (card.front === currentDeck) {
          return {
            ...card,
            back: [
              ...card.back,
              { front: newCardFront, back: newCardBack, rating: 0 },
            ],
          };
        }
        return card;
      });
      setCards(newCards);
      setNewCardFront("");
      setNewCardBack("");
    }
  };

  const handleEditCard = (card: any) => {
    setEditingCard(card);
    setNewCardFront(card.front);
    setNewCardBack(card.back);
  };

  const handleSaveCard = (card: any) => {
    const newCards = cards.map((c: any) => {
      if (c.front === currentDeck) {
        return {
          ...c,
          back: c.back.map((b: any) =>
            b === card ? { ...card, front: newCardFront, back: newCardBack } : b
          ),
        };
      }
      return c;
    });
    setCards(newCards);
    setEditingCard(null);
    setNewCardFront("");
    setNewCardBack("");
  };

  const handleDeleteCard = (card: any) => {
    const newCards = cards.map((c: any) => {
      if (c.front === currentDeck) {
        return {
          ...c,
          back: c.back.filter((b: any) => b !== card),
        };
      }
      return c;
    });
    setCards(newCards);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="New deck name"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <button onClick={handleNewDeck}>Create</button>
      </div>
      <div className="mb-4">
        <select
          onChange={(e) => handleSelectDeck(e.target.value)}
          value={currentDeck || ""}
        >
          <option value="" disabled>
            Select a deck
          </option>
          {cards.map((card: any) => (
            <option key={card.front} value={card.front}>
              {card.front}
            </option>
          ))}
        </select>
      </div>
      {currentDeck && (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New card front"
              value={newCardFront}
              onChange={(e) => setNewCardFront(e.target.value)}
            />
            <input
              type="text"
              placeholder="New card back"
              value={newCardBack}
              onChange={(e) => setNewCardBack(e.target.value)}
            />
            <button onClick={handleAddCard}>Add</button>
          </div>
          <div>
            {cards
              .find((card: any) => card.front === currentDeck)
              ?.back.map((card: any) => (
                <div key={card.front} className="mb-4">
                  {card.front} - {card.back}
                  <button onClick={() => handleEditCard(card)}>Edit</button>
                  <button onClick={() => handleDeleteCard(card)}>Delete</button>
                </div>
              ))}
          </div>
        </div>
      )}
      {editingCard && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
          <input
            type="text"
            placeholder="Edit card front"
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edit card back"
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
          />
          <button onClick={() => handleSaveCard(editingCard)}>Save</button>
          <button onClick={() => setEditingCard(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EditCards;
