import HomeCard from "@src/components/HomeCard";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-8 dark:bg-black sm:items-start">
        <HomeCard />
      </main>
    </div>
  );
}
