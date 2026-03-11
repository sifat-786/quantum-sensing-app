import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import type { TelemetryData } from '../services/SerialService';

/**
 * Converts a TelemetryData array into a CSV string.
 */
function convertToCSV(data: TelemetryData[]): string {
  if (!data || data.length === 0) {
    return 'No data recorded.';
  }

  // Header row
  let csvRows = ['Timestamp,Frequency (Hz),Capacitance (pF),Res. Freq (kHz),Impedance (kOhm)'];

  // Data rows
  data.forEach(row => {
    const timestamp = row.timestamp ? new Date(row.timestamp).toISOString() : new Date().toISOString();
    const freq = row.freq.toFixed(0);
    const cap = row.cap.toFixed(4);
    const res = row.res.toFixed(4);
    const imp = row.imp.toFixed(4);

    csvRows.push(`${timestamp},${freq},${cap},${res},${imp}`);
  });

  return csvRows.join('\n');
}

/**
 * Exports the session data to a local CSV file and opens the native Share Dialog.
 */
export async function exportSessionToCSV(data: TelemetryData[]) {
  try {
    const csvString = convertToCSV(data);
    
    // Web Simulator Fallback
    if (Platform.OS === 'web') {
      console.log('--- CSV EXPORT INITIATED (WEB SIMULATOR) ---');
      console.log(csvString.substring(0, 300) + '\n... [truncated]');
      console.log('--- NOTE: Native Sharing is not available on Web. ---');
      alert(`Exported ${data.length} rows to console. Native sharing requires mobile.`);
      return;
    }

    // Native Mobile Handling
    const filename = `AQC_Export_${Date.now()}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${filename}`;

    await FileSystem.writeAsStringAsync(fileUri, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const isSharingAvailable = await Sharing.isAvailableAsync();
    
    if (isSharingAvailable) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Export Quantum Capacitance Data',
        UTI: 'public.comma-separated-values-text'
      });
    } else {
      console.warn('Sharing is not available on this device');
    }

  } catch (error) {
    console.error('Failed to export CSV:', error);
  }
}
