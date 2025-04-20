import type { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia - The Ultimate Treasure Hunt" },
    {
      name: "description",
      content:
        "Join Lootopia and embark on thrilling treasure hunts! Solve clues, find rewards, and climb the leaderboard."
    }
  ]
}

export default function Index() {
  // temporary ids for the hunts
  const ids = ["hunt1", "hunt2", "hunt3", "hunt4", "hunt5", "hunt6"]

  return (
    <div className="text-white">
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Welcome to <span className="text-yellow-400">Lootopia</span> 🏴‍☠️
        </h1>
        <p className="mt-4 max-w-2xl font-biorhyme text-lg text-gray-300">
          A digital treasure-hunting experience where you solve clues, complete quests, and unlock
          hidden rewards. Are you ready for the challenge?
        </p>
        <a
          href="/admin"
          className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3 font-bold transition-all hover:bg-yellow-500"
        >
          Start Your Adventure 🚀
        </a>
      </section>

      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-red-500"></div>

      <h2 className="mt-10 pb-10 text-center text-3xl font-bold md:text-4xl">Featured hunts 🔍</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={ids[index]}
            className="cursor-pointer rounded-lg bg-gray-800 p-6 text-center shadow-lg transition-transform hover:scale-105"
          >
            <img
              src="/assets/logo.png"
              alt="Treasure Hunt"
              className="mx-auto mb-4 h-24 w-24 object-cover"
            />
            <h3 className="text-xl font-semibold">Hunt {index + 1}</h3>
            <p className="mt-2 text-sm text-gray-400">Solve mysteries and unlock treasures.</p>
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
  )
}
