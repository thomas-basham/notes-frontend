import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "react-oidc-context";
import { GoTrash } from "react-icons/go";

export default function Notes({ setNotes, notes }) {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const userId = auth?.user?.profile?.sub;
  useEffect(() => {
    if (!userId) return; // if no userId, exit early

    setLoading(true);
    api
      .get(`/notes?userId=${userId}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setNotes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }, [userId]); // re-run effect if userId changes

  const addNoteHandler = (event) => {
    event.preventDefault();
    const newNote = { text: event.target["note-text"].value, userId: userId };
    setLoading(true);
    api
      .post(`/notes`, newNote)
      .then(function (response) {
        // handle success
        console.log(response);
        setNotes((prevNotes) => {
          return [newNote, ...prevNotes];
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  };

  const deleteNoteHandler = (noteObj) => {
    setLoading(true);
    api
      .delete(`/notes/${noteObj.id}?userId=${noteObj.userId}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => {
            return note.id !== noteObj.id;
          });
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="border h-60">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="border min-h-[60vh] p-5">
      {userId &&
        (!loading ? (
          <form
            onSubmit={(event) => addNoteHandler(event)}
            className="text-left "
          >
            <textarea
              type="text"
              name="note-text"
              id="note-text"
              className="border rounded me-2 p-2"
            />
            <input type="submit" value="Add Note" />
          </form>
        ) : (
          <p>Loading...</p>
        ))}
      {notes &&
        notes.map((note) => {
          return (
            <div key={note.id} className="mx-7">
              <GoTrash
                onClick={() => deleteNoteHandler(note)}
                className="cursor-pointer text-red-500  float-right"
              />
              <div className="border p-5 w-fit rounded-2xl m-5">
                <p>{note.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
