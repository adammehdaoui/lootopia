export function Button({
  text,
  className = "", // Par défaut, on ne passe pas de className
}: {
  text: string;
  className?: string; // className devient optionnel
}) {
  return (
    <button
      className={`text-white border-2 rounded-full h-10 w-56 hover:text-[#142247] hover:bg-white hover:w-72 duration-500 hover:font-semibold ${className}`}
    >
      {text}
    </button>
  );
}
