import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Lootopia" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className=" justify-center m-14 bg-[#142247] border-8 border-white rounded-2xl">
      {/* ----- DIV DU HAUT ----- */}
      <div className="p-4 ">
        <h1 className="text-3xl flex justify-center mb-4">WHAT IS LOOTOPIA</h1>
        <span className="flex items-center justify-around gap-8">
          <p className="w-1/2">
            Lootopia is an immersive online platform that brings the excitement
            of treasure hunting into the digital world. Players can explore a
            vast array of interactive scavenger hunts, solving puzzles, decoding
            clues, and uncovering hidden treasures. Whether you are a casual
            adventurer or a competitive seeker, Lootopia offers challenges for
            all skill levels. The platform allows users to create their own
            treasure hunts, share them with the community, and even earn rewards
            for successful completions. Featuring dynamic rankings, an in-game
            marketplace, and social interactions, Lootopia blends adventure,
            mystery, and competition in a unique gaming experience. Join the
            hunt and see if you have what it takes to become a legendary
            treasure seeker! 🏴‍☠️✨
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Ou7c8Sg9YVg?si=c4qagz2fr1F4dg6E"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </span>
      </div>
      <hr className="mx-8"></hr>

      {/* ----- DIV DU BAS ----- */}
      <div className="flex items-center justify-around p-4 gap-4">
        {/* DIV POPULAR HUNTS */}
        <div className="flex flex-col justify-center ">
          <p className="text-3xl flex justify-center mb-4">Popular hunts</p>
          <span className="grid grid-cols-3">
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
            <span className="flex flex-col items-center">
              <img
                src="/assets/logo.webp"
                alt="Lootopia Logo"
                className="h-72 w-96 m-4 "
              />
              <p>Name</p>
            </span>
          </span>
        </div>
        {/* DIV AVIS DES utilisateurs */}
        {/* <div className="flex flex-col justify-center border-x px-8 w-1/3">
          <p className="flex justify-center">Avis des utilisateurs</p>
          <hr className="my-4"></hr>
          <span className=" flex flex-col">
            <p>USER 1 :</p>
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus modi dolorem, ex quos dolorum"
            </p>
            <hr className="my-2"></hr>
            <p>USER 2 :</p>
            <p>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus modi dolorem, ex quos dolorum"
            </p>
          </span>
        </div> */}
        {/* DIV COMMENT CA MARCHE */}
        {/* <div className="flex flex-col justify-center w-1/3">
          <p className="flex justify-center">Comment ca marche ?</p>
          <hr></hr>
          <span >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
            pariatur iste, velit ab blanditiis provident at tempora corporis
            reiciendis, tempore ad sapiente! Repellendus deserunt maiores
            officiis voluptate sit distinctio eos.
          </span>
        </div> */}
      </div>
    </div>
  );
}
