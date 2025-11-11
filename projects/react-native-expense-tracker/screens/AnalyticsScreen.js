import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getMonthlySummary } from '../services/expenses';
import { PieChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => onAuthStateChanged(auth, u => setUser(u)), []);
  useEffect(() => { if (user) { const now = new Date(); getMonthlySummary(user.uid, now.getFullYear(), now.getMonth()).then(setSummary); } }, [user]);

  if (!summary) return <View style={styles.center}><Text>Loading analytics...</Text></View>;

  const chartData = Object.entries(summary.byCategory).map(([category, amount], i) => ({
    name: category,
    amount,
    color: COLORS[i % COLORS.length],
    legendFontColor: '#333',
    legendFontSize: 12
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Month Breakdown</Text>
      {chartData.length === 0 ? <Text style={styles.empty}>No data.</Text> : (
        <PieChart
          data={chartData.map(d => ({ ...d, population: d.amount }))}
          width={Dimensions.get('window').width - 32}
          height={220}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'16'}
          absolute
        />
      )}
    </View>
  );
}

const COLORS = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#607D8B'];

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 24, color: '#666' }
});
