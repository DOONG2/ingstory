"use client";

import Button from "@/shared/Button";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <Button
        className="items-center"
        text="Start"
        handleClickButton={() => {
          console.log("test");
        }}
      />
    </div>
  );
}
