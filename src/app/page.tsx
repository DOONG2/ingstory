import Button from "@/shared/Button";

export default function Home() {
  return (
    <div>
      <Button
        text="Start"
        handleClickButton={() => {
          console.log("test");
        }}
      />
    </div>
  );
}
