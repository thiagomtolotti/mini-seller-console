interface ErrorStateProps {
  resourceName: string;
}

export default function ErrorState({ resourceName }: ErrorStateProps) {
  return (
    <p className="text-red-500 text-center">
      There was an error loading {resourceName.toLowerCase()}.
    </p>
  );
}
