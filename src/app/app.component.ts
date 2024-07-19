import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

interface SolarChartConfig {
  maxRadius: number;
  minRadius: number;
  step: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarChartComponent, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  public ngOnInit(): void {}
}
