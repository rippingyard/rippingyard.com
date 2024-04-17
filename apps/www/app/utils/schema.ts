import { DocumentReference } from 'firebase-admin/firestore';

export const DocumentReferenceSchema = (x: object): x is DocumentReference =>
  x instanceof DocumentReference;
