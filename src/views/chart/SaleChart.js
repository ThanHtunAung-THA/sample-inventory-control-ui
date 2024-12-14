// SaleChart.js
import React from 'react';
import Chart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

const SaleChart = ({ saleData }) => {
  const chartData = {
    series: [{
        name: "Sales",
        data: saleData.map(item => item.total),
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        title: {
          text: 'Sales Chart',
        },
        xaxis: {
          categories: saleData.map(item => item.date),
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['red'], // Change this to your desired font color
          },
        },
          stroke: { 
          show: true,
          width: 2,
          colors: ['transparent']
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
      },
    };
  
  return (
    <CCard>
      <CCardHeader>Sales Chart</CCardHeader>
      <CCardBody>
        {saleData.length > 0 ? (
          <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        ) : (
          <p>Loading sales data...</p>
        )}
      </CCardBody>
    </CCard>
  );
};

export default SaleChart;
