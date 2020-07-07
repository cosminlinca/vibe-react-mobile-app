import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Consumer } from './ChartContext';

export const ChartReport = ({ navigation }) => {
    const labels_ani = [];
    return (
        <View style = {styles.container}>
            <Consumer>
                {({ isLoading, loadingError, items }) => (
                    <View>
                        <Button
                            style = {styles.button}
                            mode="outlined"
                            onPress={() => navigation.navigate('Todo')}>
                            Back
                        </Button>
                        {items &&
                             <LineChart
                             data={{
                             labels: items.map(item => item.an_aparitie ),
                             datasets: [
                                 {
                                 data: items.map(item => item.nr_piese ),
                                 }
                             ]
                            }}
 
                             width={Dimensions.get("window").width} // from react-native
                             height={Dimensions.get("window").height}
                             yAxisLabel={""}
                             yAxisSuffix={" p"}
                             chartConfig={{
                                 backgroundColor: "#191970",
                                 backgroundGradientFrom: "#6495ED",
                                 backgroundGradientTo: "#6495ED",
                                 decimalPlaces: 2, // optional, defaults to 2dp
                                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                 style: {
                                     borderRadius: 16,
                                     margin: 16,
                                 },
                                 propsForDots: {
                                     r: "6",
                                     strokeWidth: "2",
                                     stroke: "#ffa726"
                                 }
                             }}
                             bezier
                             style={{
                                 borderRadius: 16
                             }}
                         />
                        }
                       
                    </View>     
                )}
            </Consumer>
        </View>
    );
}

ChartReport.navigationOptions = {
    headerTitle: 'Chart',
    headerStyle: {
        backgroundColor: 'lightblue',
    },
};

const styles = StyleSheet.create({
    button: {
      marginTop: 32,
      marginBottom: 8
    },
    text: {
        marginTop: 36
    },
    container: {
        backgroundColor: '#A4D7F3',
    },
  });