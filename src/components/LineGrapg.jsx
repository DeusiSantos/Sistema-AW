import React from 'react';
import ReactApexChart from 'react-apexcharts';

class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Vendas',
          data: [60, 21, 45, 30, 69, 32, 69]
        },
        {
          name: 'Vendas Anteriores',
          data: [30, 60, 30, 55, 25, 50, 75]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
    
        title: {
          text: 'Vendas por Dia da Semana',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
          column: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], // Altere as categorias para representar os dias da semana
          tickPlacement: 'on'
        },
        markers: {
          size: 6,
          colors: ['#008FFB', '#00E396'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 8
          }
        },
        fill: {
          type: 'solid',
          opacity: 0.3,
          colors: ['#008FFB', '#00E396']
        }
      }
    };
  }

  render() {
    return (
      <div id="chart" className='w-full relative mt-5 lg:block lg:mt-0'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={400}
        />
      </div>
    );
  }
}

export default LineGraph;
