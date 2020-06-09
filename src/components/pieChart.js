import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import firebase from "../firebase";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Students", "Teachers"],
        datasets: [
          {
            label: "",
            data: [15, 3],
            backgroundColor: ["rgba(124, 221, 221, 1)", "rgba(255, 115, 0, 1)"],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const studentRef = db.collection("students");
    const teacherRef = db.collection("teachers");
    studentRef.onSnapshot((snapshot) =>
      snapshot.forEach(() => this.handleUpdate(0))
    );
    teacherRef.onSnapshot((snapshot) =>
      snapshot.forEach(() => this.handleUpdate(1))
    );
  }

  handleUpdate = (i) => {
    let chartDataCopy = Object.assign({}, this.state.chartData);
    chartDataCopy.datasets[0].data[i]++;
  };

  render() {
    return (
      <div>
        <Doughnut
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
          }}
          height={90}
        />
        <Paper style={{ color: "grey", marginTop: 16 }}>
          <Typography variant="h4">
            Teachers {this.state.chartData.datasets[0].data[1]} :{" "}
            {this.state.chartData.datasets[0].data[0]} Children
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default PieChart;
