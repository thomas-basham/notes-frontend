import { useState } from "react";
import "./App.css";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "4dh1mnauilrtn7cnbrs8p4t443";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain =
      "https://us-east-1kvwzbv3oz.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const error = () => {
    if (auth.error) {
      return <div>Encountering error... {auth.error.message}</div>;
    }
  };

  const badge = () => {
    if (auth.isAuthenticated) {
      return (
        <div className="flex justify-between align-baseline">
          <button onClick={() => auth.removeUser()}>Sign out</button>

          <pre> Hello: {auth.user?.profile.email} </pre>
        </div>
      );
    }
  };

  console.log(auth.user);

  return (
    <>
      <header className="mb-5 text-left h-48">
        {!auth.isLoading ? (
          <>
            <h1 className="mb-5">Codex March Cohort 2025 Notes App</h1>

            {badge()}
            {!auth.isAuthenticated && (
              <button onClick={() => auth.signinRedirect()}>Sign in</button>
            )}
            {/* {error()} */}
          </>
        ) : (
          <p className="text-center h-48">Loading...</p>
        )}
      </header>
      <main>
        <section>
          <h2 className="h2">Our notes</h2>

          <div className="border h-60"></div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
