export function Live() {
  return (
    <div className="relative mr-5 flex h-4 w-4 self-center">
      <span className="absolute inset-0 z-10 m-auto h-2 w-2 rounded-full bg-red-500" />
      <span className="absolute inset-0 m-auto h-4 w-4 animate-ping rounded-full bg-red-500" />
    </div>
  )
}
