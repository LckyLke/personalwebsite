import { useUserStore } from "./store";

const RadioButtons = () => {
  const selectedAmount = useUserStore((state) => state.selectedAmount);
  const setSelectedAmount = useUserStore((state) => state.setSelectedAmount);

  return (
    <div className="flex flex-col">
      <div className="inline-block mb-2">
        <input
          type="radio"
          id="small"
          name="amount"
          value={10}
          className="form-radio"
          checked={selectedAmount === 10}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
        />
        <label htmlFor="small" className="ml-2">
          Small (10)
        </label>
      </div>
      <div className="inline-block mb-2">
        <input
          type="radio"
          id="medium"
          name="amount"
          value={50}
          className="form-radio"
          checked={selectedAmount === 50}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
        />
        <label htmlFor="medium" className="ml-2">
          Medium (50)
        </label>
      </div>
      <div className="inline-block mb-2">
        <input
          type="radio"
          id="big"
          name="amount"
          value={100}
          className="form-radio"
          checked={selectedAmount === 100}
          onChange={(e) => setSelectedAmount(Number(e.target.value))}
        />
        <label htmlFor="big" className="ml-2">
          Big (100)
        </label>
      </div>
    </div>
  );
};

export default RadioButtons;
