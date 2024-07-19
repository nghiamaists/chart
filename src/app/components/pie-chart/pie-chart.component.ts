import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { pie, arc, select, PieArcDatum } from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent implements OnInit {
  @ViewChild('chartArea') private chartAreaEl!: ElementRef<SVGGElement>;
  data = [20, 80];
  pieGenerator = pie().padAngle(0.03);
  arcData = this.pieGenerator(this.data);
  arcGenerator = arc<PieArcDatum<number | {valueOf(): number}>>().innerRadius(120).outerRadius(160);

  color = d3
    .scaleOrdinal()
    .domain(this.arcData.map(it => it.value.toString()))
    .range(['#5FC3DB', 'url(#linearGradient)']);

  public ngOnInit() {
    // const chartObj = select(this.chartAreaEl.nativeElement);
    // chartObj.selectAll('path').data(this.arcData).join('path').attr('d', d => this.arcGenerator(d))
  }

  toString(va: number) {
    return va.toString();
  }
}
