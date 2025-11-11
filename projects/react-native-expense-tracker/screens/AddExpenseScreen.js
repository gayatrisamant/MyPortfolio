import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { addExpense } from '../services/expenses';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other'];

export default function AddExpenseScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);

  const save = async () => {
    if (!user) return;
    if (!amount) return Alert.alert('Validation', 'Amount required');
    setSaving(true);
    try {
      await addExpense(user.uid, { amount: parseFloat(amount), category, note });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput placeholder='Amount' keyboardType='decimal-pad' value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput placeholder={`Category (${CATEGORIES.join(', ')})`} value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder='Note (optional)' value={note} onChangeText={setNote} style={styles.input} />
      <Button title={saving ? 'Saving...' : 'Save'} onPress={save} disabled={saving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 }
});
