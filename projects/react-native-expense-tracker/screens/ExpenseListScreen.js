import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import ExpenseItem from '../components/ExpenseItem';
import { subscribeToExpenses } from '../services/expenses';

export default function ExpenseListScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToExpenses(user.uid, setExpenses);
    return () => unsub();
  }, [user]);

  if (!user) return <View style={styles.center}><Text>Loading user...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Expenses</Text>
        <Button title='Add' onPress={() => navigation.navigate('AddExpense')} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No expenses yet.</Text>}
        contentContainerStyle={expenses.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
      />
      <View style={styles.footerButtons}>
        <Button title='Reports' onPress={() => navigation.navigate('Reports')} />
        <Button title='Analytics' onPress={() => navigation.navigate('Analytics')} />
        <Button title='Logout' color='#B00020' onPress={() => signOut(auth)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  empty: { textAlign: 'center', color: '#666' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  footerButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderColor: '#eee' }
});
