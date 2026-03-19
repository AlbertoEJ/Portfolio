import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Survey, SurveyResponse, AnswerValue } from "./survey-types";

export async function getActiveSurveys(): Promise<Survey[]> {
  const q = query(
    collection(db, "surveys"),
    where("active", "==", true)
  );
  const snapshot = await getDocs(q);
  const surveys = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Survey);
  return surveys.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
}

export async function getSurveyById(id: string): Promise<Survey | null> {
  const snap = await getDoc(doc(db, "surveys", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Survey;
}

export async function checkEmailExists(
  surveyId: string,
  email: string
): Promise<boolean> {
  const q = query(
    collection(db, "surveys", surveyId, "responses"),
    where("email", "==", email.toLowerCase().trim())
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function submitResponse(
  surveyId: string,
  data: { name: string; email: string; answers: Record<string, AnswerValue> }
): Promise<void> {
  await addDoc(collection(db, "surveys", surveyId, "responses"), {
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    answers: data.answers,
    submittedAt: serverTimestamp(),
  });
}

export async function getResponses(surveyId: string): Promise<SurveyResponse[]> {
  const snapshot = await getDocs(
    collection(db, "surveys", surveyId, "responses")
  );
  return snapshot.docs.map((d) => d.data() as SurveyResponse);
}
