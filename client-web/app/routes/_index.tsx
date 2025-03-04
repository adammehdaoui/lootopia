import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia" },
    { name: "description", content: "Lootopia is your treasure finding app!" },
  ];
};

export default function Index() {
  return (
    <div className="m-8 bg-[#142247] border-4 border-white rounded-2xl p-4">
      <div className="flex flex-col mt-5 pb-10 space-y-10 text-white">
        <h1 className="flex justify-center text-2xl md:text-3xl mb-4 font-montserrat font-bold ">
          WHAT IS LOOTOPIA ? 😮
        </h1>
        <div className="flex flex-col lg:flex-row items-center lg:justify-around gap-6 font-biorhyme">
          <p className="w-full lg:w-1/2 text-center lg:text-left ">
            Lootopia is a digital treasure-hunting platform where players solve puzzles, decode clues, and uncover hidden rewards. Whether casual or competitive, users can create, share, and complete challenges while engaging in dynamic rankings, an in-game marketplace, and social interactions. Join the hunt and become a legendary seeker! 🏴‍☠️✨
          </p>
          <iframe
            className="w-full lg:w-[560px] h-[250px] md:h-[280px] lg:h-[315px]"
            src="https://www.youtube.com/embed/fQvpDfFjjPo?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      <hr className="mx-8 pb-10 border-gray-300" />

      <div className="flex flex-col items-center p-4 gap-4">
        <div className="w-full">
          <p className="text-2xl md:text-3xl text-white text-center mb-4 font-montserrat font-bold">
            Popular hunts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src="/assets/logo.png"
                  alt="Lootopia Logo"
                />
                <p className="text-white">Name {index}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
