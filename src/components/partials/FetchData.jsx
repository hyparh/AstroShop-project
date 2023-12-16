import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function fetchTelescopes() {
  const telescopesCollectionRef = collection(db, "telescopes");
  const telescopesSnapshot = await getDocs(telescopesCollectionRef);
  return telescopesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
