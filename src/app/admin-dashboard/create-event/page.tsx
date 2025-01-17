import CreateEventForm from "../_components/CreateEventForm";


const CreateEventPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <CreateEventForm />
      </div>
    </main>
  );
};

export default CreateEventPage;
