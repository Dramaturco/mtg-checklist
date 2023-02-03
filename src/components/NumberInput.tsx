const INCREMENT_LABEL = "+";
const DECREMENT_LABEL = "-";

type NumberInputProps = {
  handler: Function;
  value: number;
  step: number;
  min: number;
  max: number;
  label?: string;
};

export default function NumberInput({
  handler,
  value,
  step,
  min,
  max,
  label,
}: NumberInputProps) {

  const validateValue = (value: number) => {
    if (value > max) return max;
    if (value < min) return min;
    return Number(value.toFixed(2));
  };

  const incrementValue = () => handler(validateValue(value + step));
  const decrementValue = () => handler(validateValue(value - step));

  return (
    <div className="text-center p-2">
      <div className="flex">
        <button
          className="w-12 border-b font-bold text-teal-500 hover:text-teal-400 active:text-teal-600"
          onClick={decrementValue}
        >
          {DECREMENT_LABEL}
        </button>
        <input
          type="number"
          className="w-16 spin-button-none border-b p-1 text-center font-normal text-lg"
          value={value}
          onBlur={(e) => handler(validateValue(Number(e.target.value)))}
          onChange={(e) => handler(validateValue(Number(e.target.value)))}
          id={label}
        />
        <button
          className="w-12 border-b font-bold text-teal-500 hover:text-teal-400 active:text-teal-600"
          onClick={incrementValue}
        >
          {INCREMENT_LABEL}
        </button>
      </div>
      {label && <label className="text-xs text-teal-500 pb-4" htmlFor={label}>{label}</label>}
    </div>
  );
}
