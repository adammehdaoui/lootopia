import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia - The Ultimate Treasure Hunt" },
    { name: "description", content: "Join Lootopia and embark on thrilling treasure hunts! Solve clues, find rewards, and climb the leaderboard." },
  ];
};

export default function Index() {
  return (
    <div className="text-white">
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome to <span className="text-yellow-400">Lootopia</span> 🏴‍☠️
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          A digital treasure-hunting experience where you solve clues, complete quests, and unlock hidden rewards. Are you ready for the challenge?
        </p>
        <a
          href="/signup"
          className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 font-bold py-3 px-6 rounded-lg transition-all"
        >
          Start Your Adventure 🚀
        </a>

        <div className="mt-10">
          <iframe
            className="w-full max-w-80 rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/fQvpDfFjjPo?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </section>

      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mt-10 pb-10">
        Popular Hunts 🔍
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-16">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src="/assets/logo.png"
              alt="Treasure Hunt"
              className="mx-auto mb-4 w-24 h-24 object-cover"
            />
            <h3 className="text-xl font-semibold">Hunt {index + 1}</h3>
            <p className="text-gray-400 text-sm mt-2">
              Solve mysteries and unlock treasures.
            </p>
            <a
              href={`/hunt/${index}`}
              className="mt-4 inline-block text-yellow-400 hover:text-yellow-500"
            >
              Join Hunt →
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}
