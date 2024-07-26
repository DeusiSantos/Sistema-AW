import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Por mês',
        data: [13, 15, 11, 9, 12]
      }, {
        name: 'Por Ano',
        data: [30, 45, 51, 68, 37]
      }, {
        name: 'Por dia',
        data: [6, 4, 3, 6, 5]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '80%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          title: {
            text: "crescimento nos ultimos tempos"
          },
          categories: ['Bacias', 'Operadores', 'Blocos', 'Plataformas', 'Poços'],
        },
        yaxis: {
          title: {
            text: ''
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val, { seriesIndex, dataPointIndex, w }) {
              const category = w.globals.labels[dataPointIndex];
              return `${val} ${category}`;
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <>
        <div id="chart" className='w-full relative mt-5 lg:block lg:mt-0'>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height="400px"
          />
        </div>

      </>
    );
  }
}

export default ApexChart;
