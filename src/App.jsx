import { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "react-oidc-context";
import { api } from "./api";
import Notes from "./components/Notes";

function App() {
  const [notes, setNotes] = useState([]);
  const auth = useAuth();

  const Error = () => {
    if (auth.error) {
      return <div>Encountering error... {auth.error.message}</div>;
    }
  };

  const Badge = () => {
    if (auth.isAuthenticated) {
      return (
        <div className="flex justify-between align-baseline">
          <pre> Hello, {auth.user?.profile["cognito:username"]} </pre>

          <button onClick={() => auth.removeUser()}>Sign out</button>
        </div>
      );
    }
  };

  return (
    <>
      <header className="mb-5 text-left h-48">
        {!auth.isLoading ? (
          <>
            <h1 className="mb-5">Codex March Cohort 2025 Notes App</h1>

            <Badge />
            {!auth.isAuthenticated && (
              <button onClick={() => auth.signinRedirect()}>Sign in</button>
            )}
            <Error />
          </>
        ) : (
          <p className="text-center h-48">Loading...</p>
        )}
      </header>
      <main>
        <section>
          <h2 className="h2 mb-3">Our notes</h2>
          <Notes setNotes={setNotes} notes={notes} auth={auth} />
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
