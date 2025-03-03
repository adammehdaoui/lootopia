export function Button({ text }: { text: string }) {
  return (
    <button className="text-white border-4 rounded-full h-10 w-56 hover:text-[#142247] hover:bg-white hover:w-72 duration-500 hover:font-semibold">
      {text}
    </button>
  );
}
