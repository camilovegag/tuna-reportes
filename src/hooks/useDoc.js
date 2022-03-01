import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDoc = (c, id) => {
  const [document, setDocument] = useState(null);

  // c stands for collection, the argument that this hook takes.
  useEffect(() => {
    let docRef = doc(db, c, id);

    const unsub = onSnapshot(docRef, (doc) => {
      setDocument({ id: doc.id, ...doc.data() });
    });
    return () => unsub();
  }, [c, id]);

  return { document };
};
