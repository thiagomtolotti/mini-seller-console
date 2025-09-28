export default function CardsSkeleton() {
  return Array(10)
    .fill("")
    .map((_, idx) => (
      <div
        key={idx}
        className="w-full h-64 bg-white/10 animate-pulse rounded-lg"
        role="presentation"
      />
    ));
}
