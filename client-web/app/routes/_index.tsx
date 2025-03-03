import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className=" m-8 bg-[#142247] border-8 border-white rounded-2xl p-4">
      {/* ----- DIV DU HAUT ----- */}
      <div className="p-4 text-white">
        <h1 className="text-2xl md:text-3xl flex justify-center mb-4">
          WHAT IS LOOTOPIA
        </h1>
        <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-6">
          <p className="w-full lg:w-1/2 text-center lg:text-left">
            Lootopia is an immersive online platform that brings the excitement
            of treasure hunting into the digital world. Players can explore a
            vast array of interactive scavenger hunts, solving puzzles, decoding
            clues, and uncovering hidden treasures. Whether you are a casual
            adventurer or a competitive seeker, Lootopia offers challenges for
            all skill levels.
          </p>
          <iframe
            className="w-full lg:w-[560px] h-[250px] md:h-[280px] lg:h-[315px]"
            src="https://www.youtube.com/embed/QI80NZ2zJkg?si=9H1x_noCOYzVVy45"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      <hr className="mx-8 border-gray-300" />

      {/* ----- DIV DU BAS ----- */}
      <div className="flex flex-col items-center p-4 gap-4">
        {/* DIV POPULAR HUNTS */}
        <div className="w-full">
          <p className="text-2xl md:text-3xl text-white text-center mb-4">
            Popular hunts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src="/assets/logo.webp"
                  alt="Lootopia Logo"
                  className="h-40 w-40 sm:h-64 sm:w-64 md:h-72 md:w-96 m-2 rounded-lg"
                />
                <p className="text-white">Name</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
