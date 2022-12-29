// import "./styles.css";
import React from "react";
import Layout from "../../Layout";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { Grid, Card, Text } from "@nextui-org/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [0,1,2,4,5,5,7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        // data: labels.map([0,1,2,4,5,5,7]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

function DashboardView() {
    
  return (
    <Layout title="Home">
      <h1>About</h1>
      <div className="Home">
        <div className="Container">
          <h3 className="HeadingText">{"Trang tổng quan về trang web "}</h3>
          {/* <p className="DescriptionText">{"giới thiệu trang web"}</p> */}

          <Button
            style={{ display: "inline-block" }}
            className="button"
            variant="primary"
            // onClick={HandleStart}
          >
            <NavLink className={"button-text"} exact to={"/Exam"}>
              Làm bài thi Toeic
            </NavLink>
          </Button>
          <Line options={options} data={data} />;
        </div>
      </div>
    </Layout>
  );
}

export default DashboardView;
