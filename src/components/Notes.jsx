import { useEffect, useState } from "react";
import { api } from "../api";

export default function Notes({ setNotes, notes }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/notes")
      .then(function (response) {
        // handle success
        console.log(response);
        setNotes(response.data.Items);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="border h-60">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border h-60">
      {notes &&
        notes.map((note) => {
          return (
            <div key={note.id} className="border p-5 w-fit rounded-2xl m-5">
              <p>{note.text}</p>
            </div>
          );
        })}
    </div>
  );
}
