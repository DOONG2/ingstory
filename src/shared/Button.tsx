type ButtonProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  handleClickButton: () => void;
};

export default function Button({
  className,
  text,
  disabled,
  handleClickButton,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`text-textPrimary border border-borderPrimary hover:bg-hoverPrimary rounded-3xl px-14 py-1 ${className}`}
      onClick={() => {
        handleClickButton();
      }}
    >
      {text}
    </button>
  );
}
