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
      className={`text-textPrimary ${className}`}
      onClick={() => {
        handleClickButton();
      }}
    >
      {text}
    </button>
  );
}
