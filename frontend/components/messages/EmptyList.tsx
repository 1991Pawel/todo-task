export function EmptyList() {
  return (
    <div className="flex flex-col items-center justify-center py-4 text-center text-muted-foreground space-y-4">
      <div className="space-y-1">
        <p className="text-lg font-semibold">Brak wiadomości</p>
        <p className="text-sm">Dodaj pierwszą wiadomość</p>
      </div>
    </div>
  );
}
