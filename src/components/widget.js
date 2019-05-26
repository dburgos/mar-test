import * as d3 from 'd3';
import formatThousands from '../lib/util.js';

const STYLE_PATH = '../styles/components/widget.css';
const COLOR_CLASSES = ['dark-pie', 'light-pie'];
const WIDTH = 300;
const HEIGHT = 200;
const DEFAULT_COLOR = 'blue';
const EURO = '\u20AC';
const CURRENCY = EURO;

export default class Widget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'open' });
    this.colorScheme = this.getAttribute('color-scheme') || DEFAULT_COLOR;
    this.dataSource = this.getAttribute('data-source');
    const rawData = require('../../data/' + this.dataSource + '.json');
    const renderParams = this.precalculate(rawData);
    this.render(renderParams);
  }

  precalculate(data = []) {
    let total;
    let tabletPercent;
    let smartphonePercent;
    let tabletTotal = 0;
    let smartphoneTotal = 0;

    data.forEach((item) => {
      const isTablet = item.device === 'tablet';
      const isPhone = item.device === 'smartphone';
      if (isTablet) {
        tabletTotal += item.value;
      } else if (isPhone) {
        smartphoneTotal += item.value;
      }
    });

    total = tabletTotal + smartphoneTotal;
    tabletPercent = (tabletTotal * 100 / total) || 0;
    smartphonePercent = (smartphoneTotal * 100 / total) || 0;

    const grouped = [];
    grouped.push({ device: 'smartphone', value: smartphonePercent });
    grouped.push({ device: 'tablet', value: tabletPercent });

    return {
      grouped,
      smartphonePercent,
      smartphoneTotal,
      tabletPercent,
      tabletTotal,
      total,
      list: data
    };
  }

  render(params) {
    const outerRadius = HEIGHT / 2;
    const innerRadius = HEIGHT / 2 - 10;
    const showCurrency = this.dataSource === 'revenue';
    const template = `
      <link rel='stylesheet' href='${STYLE_PATH}'>
      <div class='wrapper color-${this.colorScheme}'> 
        <div class='chart-container'> 
          <div class='chart'> 
            <svg id='svg'></svg> 
          </div>
          <div class='chart-text'>
            <span class='measure'>${this.dataSource}</span>
            <span class='value'>${formatThousands(params.total) + (showCurrency ? CURRENCY : '')}</span>
          </div>
        </div>
        <div class='footer'>
          <div>
            <span class='light-pie label'>Tablet</span>
            <span class='percent'>${Math.round(params.tabletPercent)}%</span>
            <span class='value'>${formatThousands(params.tabletTotal)}</span>
          </div>
          <div> 
            <span class='dark-pie label'>Smartphone</span> 
            <span class='percent'>${Math.round(params.smartphonePercent)}%</span> 
            <span class='value'>${formatThousands(params.smartphoneTotal)}</span>
          </div>
        </div>
      </div>
    `;
    this.shadow.innerHTML = template;

    // Init SVG
    const svg = d3.select(this.shadow)
      .select('#svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .attr('class', this.dataSource);

    // Init Pie
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null)
      .padAngle(0);

    // Init Arc
    const arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    // Circular chart
    const g1 = svg.append('g')
      .attr('transform', 'translate(' + WIDTH / 2 + ',' + HEIGHT / 2 + ')');

    g1.selectAll('path')
      .data(pie(params.grouped))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', (d) => {
        return COLOR_CLASSES[d.index];
      });

    // Trendline x axis scale
    const x = d3.scaleTime()
      .rangeRound([0, 200])
      .domain([0, params.list.length - 1]);

    // Trendline y axis scale
    const y = d3.scaleLinear()
      .rangeRound([40, 0])
      .domain(d3.extent(params.list, d => d.value));

    // Trendline background area
    const area = d3.area()
      .x((d, i) => x(i))
      .y1(100)
      .y0(d => y(d.value));

    // Datapoints line
    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d.value));

    // Cut inside the pie
    const g2 = svg.append('g')
      .attr('transform', 'translate(62,115)')
      .attr('clip-path', 'circle(86px at 86px -15px)');

    // Add area
    g2.append('path')
      .datum(params.list)
      .attr('class', 'area')
      .attr('stroke', 'none')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', area);

    // Add datapoints
    g2.append('path')
      .datum(params.list)
      .attr('fill', 'none')
      .attr('class', 'trendline')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}

window.customElements.define('demo-widget', Widget);