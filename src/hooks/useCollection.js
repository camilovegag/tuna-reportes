import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import moment from "moment";

export const useCollection = (c, arc) => {
  const [documents, setDocuments] = useState(null);

  // c stands for collection, the argument that this hook takes.
  useEffect(() => {
    let colRef = collection(db, c);
    const q = query(colRef, where("archive", "==", false));
    const archive = query(colRef, where("archive", "==", true));

    const unsub = onSnapshot(arc ? archive : q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(results.sort((a, b) => moment(a.time).valueOf() - moment(b.time).valueOf()));
    });
    return () => unsub();
  }, [c, arc]);

  return { documents };
};
