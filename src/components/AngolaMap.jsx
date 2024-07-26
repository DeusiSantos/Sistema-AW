import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import angolaHigh from '../../angolaHigh.json'; // Importe o arquivo GeoJSON de Angola

function AngolaMap() {
  useEffect(() => {
    // Crie uma instância do mapa
    let chart = am4core.create('mapdiv', am4maps.MapChart);
    chart.geodata = angolaHigh; // Use o arquivo GeoJSON de Angola

    // Defina a projeção e outras configurações
    chart.projection = new am4maps.projections.Miller();
    chart.zoomControl = new am4maps.ZoomControl();

    // Crie polígonos para representar as províncias de Angola
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = am4core.color('#629cf3dc');
    polygonTemplate.stroke = am4core.color('#ffffff');
    polygonTemplate.strokeWidth = 0.5;

    polygonTemplate.events.on('over', (event) => {
        event.target.fill = am4core.color('#1e88e5'); // Altera temporariamente a cor do preenchimento ao passar o mouse
      });
  
      polygonTemplate.events.on('out', (event) => {
        event.target.fill = am4core.color('#629cf3dc'); // Restaura a cor do preenchimento quando o mouse sai
      });

    // Personalize o estilo do tooltip
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color('#FFFFFF');
    polygonSeries.tooltip.background.stroke = am4core.color('#ffffff');
    polygonSeries.tooltip.background.strokeWidth = 1;
    polygonSeries.tooltip.label.fill = am4core.color('#000000');

    // Adicione um rótulo para cada província
    let labelSeries = chart.series.push(new am4maps.MapImageSeries());
    let labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
    labelTemplate.text = '{name}';
    labelTemplate.fontSize = 10;
    labelTemplate.horizontalCenter = 'middle';
    labelTemplate.verticalCenter = 'middle';

    // Adicione um rótulo de tooltip (dica) para mostrar o nome da província ao passar o mouse
    polygonTemplate.tooltipText = '{name}';

    // Adicione um rótulo para cada província
    labelTemplate.text = '{id}'; // Exibe a sigla da província
    labelTemplate.fontSize = 10;
    labelTemplate.horizontalCenter = 'middle';
    labelTemplate.verticalCenter = 'middle';

    // Aplique o tema animado
    am4core.useTheme(am4themes_animated);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="mapdiv" style={{ width: '100%', height: '100%', margin: "auto" }}></div>;
}

export default AngolaMap;
