import MessagesList from "@components/messages/MessagesList";
import AddMessageForm from "@components/messages/AddMessageForm";

export default function Home() {
  return (
    <div className="min-h-screen w-full px-4 py-10 flex justify-center items-start font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-5xl flex flex-col items-center gap-12">
        <MessagesList />
        <AddMessageForm />
      </main>
    </div>
  );
}
