import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getMonthlySummary } from '../services/expenses';

export default function ReportsScreen() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = current month

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);

  useEffect(() => {
    if (!user) return;
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    getMonthlySummary(user.uid, target.getFullYear(), target.getMonth()).then(setSummary);
  }, [user, monthOffset]);

  if (!summary) return <View style={styles.center}><Text>Loading summary...</Text></View>;

  const categories = Object.entries(summary.byCategory);
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
  const monthLabel = target.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report: {monthLabel}</Text>
      <Text style={styles.total}>Total: ${summary.total.toFixed(2)}</Text>
      <FlatList
        data={categories}
        keyExtractor={([cat]) => cat}
        renderItem={({ item: [cat, amt] }) => (
          <View style={styles.row}><Text style={styles.cat}>{cat}</Text><Text style={styles.amt}>${amt.toFixed(2)}</Text></View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No expenses this month.</Text>}
      />
      <View style={styles.navButtons}>
        <Button title='Prev' onPress={() => setMonthOffset(o => o + 1)} />
        <Button title='Current' onPress={() => setMonthOffset(0)} />
        <Button title='Next' onPress={() => setMonthOffset(o => Math.max(0, o - 1))} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  total: { fontSize: 18, marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  cat: { fontWeight: '600' },
  amt: { fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' },
  navButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }
});
