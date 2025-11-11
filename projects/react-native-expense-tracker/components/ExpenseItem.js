import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem({ expense }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}> 
        <Text style={styles.category}>{expense.category}</Text>
        {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
      </View>
      <View style={styles.right}> 
        <Text style={styles.amount}>${Number(expense.amount).toFixed(2)}</Text>
        <Text style={styles.date}>{new Date(expense.ts.toDate()).toLocaleDateString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#fff', marginVertical: 6, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  left: { flex: 1, paddingRight: 10 },
  right: { alignItems: 'flex-end' },
  category: { fontSize: 16, fontWeight: '600', color: '#333' },
  note: { fontSize: 12, color: '#666', marginTop: 2 },
  amount: { fontSize: 16, fontWeight: '700', color: '#0A7F55' },
  date: { fontSize: 11, color: '#888', marginTop: 4 }
});
