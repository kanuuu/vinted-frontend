import { Range } from "react-range";

const Filters = ({ sort, setSort, price, setPrice, setFinalPrice }) => {
  return (
    <div className="filters">
      <span>Trier par prix :</span>
      <label className="switch">
        <input
          type="checkbox"
          name="sorting"
          id=""
          checked={sort}
          onChange={() => {
            setSort(!sort);
          }}
        />
        <span className="slider">{sort ? "↓" : "↑"}</span>
      </label>
      <span>Prix entre :</span>
      <Range
        step={1}
        min={0}
        max={1000}
        values={price}
        onChange={(e) => {
          setPrice(e);
        }}
        onFinalChange={(e) => {
          setFinalPrice(e);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#f2f2f2",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#00747f",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-20px",
                width: "max-content",
                fontSize: "12px",
                color: "#00747f",
                border: "1px solid #00747f",
                borderRadius: "5px",
                padding: "2px",
                boxSizing: "border-box",
              }}
            >
              {`$ ${price[index].toFixed(2)}`}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Filters;
