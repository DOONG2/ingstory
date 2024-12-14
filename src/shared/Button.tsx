type ButtonProps = {
  className?: string;
  text?: string;
  handleClickButton: () => void;
};

export default function Button({
  className,
  text,
  handleClickButton,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`border-black text-[#b1452e] border-solid border-2 ${className}`}
      onClick={() => {
        handleClickButton();
      }}
    >
      {text}
    </button>
  );
}
