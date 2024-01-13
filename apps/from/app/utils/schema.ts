import { DocumentReference } from 'firebase/firestore';

export const DocumentReferenceSchema = (x: object): x is DocumentReference =>
  x instanceof DocumentReference;
