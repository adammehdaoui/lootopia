export function Live() {
  return (
    <div className="relative mb-10 flex h-4 w-4">
      <span className="absolute inset-0 bottom-24 z-10 m-auto h-2 w-2 rounded-full bg-red-500" />
      <span className="absolute inset-0 bottom-24 m-auto h-4 w-4 animate-ping rounded-full bg-red-500" />
    </div>
  )
}
