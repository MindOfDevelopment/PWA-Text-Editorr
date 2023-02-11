import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.info("Saving to DB");

  const jateDb = await openDB("jate", 1);
  const trxn = jateDb.transaction("jate", "readwrite");
  const store = trxn.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const res = await request;
  return res;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.info("get content from DB");
  const jateDb = await openDB("jate", 1);
  const trxn = jateDb.transaction("jate", "readonly");
  const store = trxn.objectStore("jate");
  const request = store.getAll();
  const res = await request;
  return res?.value;
};

initdb();
