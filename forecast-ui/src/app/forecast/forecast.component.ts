import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastService } from '../shared/services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  name: string | null;
  options: any;
  data: number[];
  constructor(private forecastService: ForecastService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const xAxisData: string[] = ["Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    this.name = this.route.snapshot.paramMap.get('name');
    this.forecastService.forecast().subscribe(
      (res) => {

    this.options = {
      legend: {
        data: ['bar'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'bar',
          type: 'bar',
          data: res,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
      }
    )

  }

  

}
