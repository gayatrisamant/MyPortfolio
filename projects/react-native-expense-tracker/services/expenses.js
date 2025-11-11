import { db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, Timestamp, getDocs } from 'firebase/firestore';

const EXPENSES = 'expenses';

export function addExpense(userId, expense) {
  return addDoc(collection(db, EXPENSES), {
    userId,
    amount: expense.amount,
    category: expense.category,
    note: expense.note || '',
    ts: expense.ts || Timestamp.fromDate(new Date())
  });
}

export function updateExpense(id, updates) {
  return updateDoc(doc(db, EXPENSES, id), updates);
}

export function deleteExpense(id) {
  return deleteDoc(doc(db, EXPENSES, id));
}

export function subscribeToExpenses(userId, callback) {
  const q = query(
    collection(db, EXPENSES),
    where('userId', '==', userId),
    orderBy('ts', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

export async function getMonthlySummary(userId, year, month /* 0 indexed */) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 1);
  const q = query(
    collection(db, EXPENSES),
    where('userId', '==', userId),
    orderBy('ts', 'desc')
  );
  const snap = await getDocs(q);
  const filtered = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    .filter(e => {
      const date = e.ts.toDate();
      return date >= start && date < end;
    });
  const total = filtered.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const byCategory = filtered.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});
  return { total, byCategory, count: filtered.length };
}
