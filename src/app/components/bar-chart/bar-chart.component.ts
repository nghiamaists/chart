import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface MockChart {
  city: string;
  p: number[];
}

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit {
  readonly mocData: Array<MockChart> = [
    {
      city: 'Jan',
      p: [10, 20, 30, 50, 35],
    },
    {
      city: 'Feb',
      p: [50, 20, 40, 20, 15],
    },
    {
      city: 'Mar',
      p: [80, 60, 30, 19, 21],
    },
    {
      city: 'Api',
      p: [80, 60, 30, 90, 77],
    },
    {
      city: 'Jun',
      p: [80, 60, 30, 22, 10],
    },
    {
      city: 'Jul',
      p: [80, 60, 30, 10, 12],
    },
  ];

  @ViewChild('xAxisRef', { static: true })
  private xAxisEl!: ElementRef<SVGGElement>;
  @ViewChild('yAxisRef', { static: true })
  private yAxisEl!: ElementRef<SVGGElement>;

  private max = Math.max(
    ...this.mocData.reduce((arr, val) => arr.concat(val.p), <number[]>[]),
  );

  margin = { top: 10, right: 30, bottom: 20, left: 50 };
  height = 500 - this.margin.top - this.margin.bottom;
  width = 1000 - this.margin.left - this.margin.right;
  yAxisRange = Array((this.max + 20) / 10)
    .fill(0)
    .map((_, i) => i * 10);

  xAxis = d3
    .scaleBand()
    .domain(this.mocData.map((_, i) => _.city))
    .range([0, this.width])
    .padding(0.2);

  yAxis = d3
    .scaleLinear()
    .domain([0, this.max + 20])
    .range([this.height, 0]);

  barChartRange = d3
    .scaleBand()
    .domain(['0', '1', '2', '3', '4'])
    .range([0, this.xAxis.bandwidth()])
    .padding(0.3);

  color = d3
    .scaleOrdinal()
    .domain(['0', '1', '2', '3', '4'])
    .range(['#29015A', '#5FC3DB', '#026BFE', '#E1238E', '#FF5252']);

  public ngOnInit(): void {
    const xAxisObject = d3.select(this.xAxisEl.nativeElement);
    xAxisObject.call(d3.axisBottom(this.xAxis).tickSize(5));

    const yAxisObject = d3.select(this.yAxisEl.nativeElement);
    yAxisObject.call(d3.axisLeft(this.yAxis));
  }

  toString(num: number) : string {
    return num.toString()
  }
}
