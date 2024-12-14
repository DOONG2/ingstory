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
      className={`text-textPrimary border border-borderPrimary hover:bg-hoverPrimary rounded-3xl px-14 py-1 ${className}`}
      onClick={() => {
        handleClickButton();
      }}
    >
      {text}
    </button>
  );
}
