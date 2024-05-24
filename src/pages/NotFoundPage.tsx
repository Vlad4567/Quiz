export const NotFoundPage: React.FC = () => {
  return (
    <main className="flex items-center justify-center">
      <div className="h-fit flex gap-2">
        <h2>404</h2>
        <div className="h-full w-1 animate-pulse bg-primary"></div>
        <h2>Not Found</h2>
      </div>
    </main>
  );
};
