import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);

  // c stands for collection, the argument that this hook takes.
  useEffect(() => {
    let colRef = collection(db, c);
    const q = query(colRef, orderBy("time"));

    const unsub = onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(results);
    });
    return () => unsub();
  }, [c]);

  return { documents };
};
