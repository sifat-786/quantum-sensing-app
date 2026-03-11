import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, typography, globalStyles, getGlowStyle } from '../theme/theme';

interface RealTimeChartProps {
  title: string;
  data: number[];
  color?: string;
  yAxisSuffix?: string;
}

const screenWidth = Dimensions.get('window').width;

export const RealTimeChart: React.FC<RealTimeChartProps> = ({ 
  title, 
  data, 
  color = colors.primary,
  yAxisSuffix = ''
}) => {
  // Ensure we have at least 2 data points for a valid chart
  const chartData = data.length > 1 ? data : [0, 0];

  return (
    <View style={[globalStyles.card, styles.container, getGlowStyle('rgba(0,0,0,0.5)')]}>
      <Text style={[typography.h2, { marginBottom: 16 }]}>{title}</Text>
      
      <LineChart
        data={{
          labels: [], // No x-axis labels needed for scrolling real-time graphs
          datasets: [
            {
              data: chartData,
              color: (opacity = 1) => `rgba(${hexToRgb(color)}, ${opacity})`,
              strokeWidth: 3,
            }
          ],
        }}
        width={screenWidth - 64} // Padding compensation
        height={220}
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: colors.cardBackground,
          backgroundGradientTo: colors.cardBackground,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})`, // Neon grid lines
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "0", // Hide dots by default to look more like a continuous analog signal
            strokeWidth: "2",
            stroke: color
          },
          propsForBackgroundLines: {
            strokeDasharray: '4', // Dashed grid
            stroke: colors.cardBorder, // Subtle grid lines
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
          marginLeft: -16, // Shift left slightly to align y-axis with title
        }}
      />
    </View>
  );
};

// Helper to convert hex to rgb for rgba strings
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1] || '0', 16)}, ${parseInt(result[2] || '0', 16)}, ${parseInt(result[3] || '0', 16)}` 
    : '0, 240, 255'; // Fallback to primary
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 16,
    paddingRight: 8,
  },
});
