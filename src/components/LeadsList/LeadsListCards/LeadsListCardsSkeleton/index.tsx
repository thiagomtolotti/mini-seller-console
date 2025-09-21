export default function LeadsListCardsSkeleton() {
  return Array(50)
    .fill("")
    .map((_, idx) => (
      <div
        key={idx}
        className="w-full h-64 bg-white/10 animate-pulse rounded-lg"
      />
    ));
}
