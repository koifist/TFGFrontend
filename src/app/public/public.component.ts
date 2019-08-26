import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  messageText: object;
  socket: any;
  amazon: number;
  google: number;
  apple: number;
  public amazonData: ChartDataSets[] = [
    { data: [], label: 'Amazon' },
  ];
  public googleData: ChartDataSets[] = [
    { data: [], label: 'Google' },
  ];
  public appleData: ChartDataSets[] = [
    { data: [], label: 'Apple' }
  ];
  public amazonLabels: Label[] = [];
  public googleLabels: Label[] = [];
  public appleLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,

    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: '#000000',
          },
          ticks: {
            min: 0,
            max: 2500,
            fontColor: '#000000',
            fontSize: 25,
          },

        }
      ],
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 2500,
            fontColor: '#000000',
            fontSize: 20,
          },

        }
      ]
    },
    annotation: {
    },
  };
  public lineChartColors: Color[] = [
    { // red
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  constructor() {
    this.socket = io.connect(environment.baseurl);
  }

  ngOnInit() {
    this.socket.on('stock', (msg: any) => {
      this.messageText = JSON.parse(msg);
      // @ts-ignore
      if (this.messageText && this.messageText.google && this.messageText.amazon && this.messageText.apple) {
        // @ts-ignore
        this.pushPrices();
      }
    });
    }
  public pushPrices(messageText) {
      // @ts-ignore
      this.amazonData[0].data.push(this.messageText.amazon.price);
      // @ts-ignore
      this.amazon = this.messageText.amazon.price;
      this.amazonLabels.push(moment().format('h:mm:ss'));
      if (this.amazonData[0].data.length >= 15) {
        this.amazonData[0].data.shift();
        this.amazonLabels.shift();
      }
      // @ts-ignore
      this.googleData[0].data.push(this.messageText.google.price);
      // @ts-ignore
      this.google = this.messageText.google.price;
      this.googleLabels.push(moment().format('h:mm:ss'));
      if (this.googleData[0].data.length >= 15) {
        this.googleData[0].data.shift();
        this.googleLabels.shift();
      }
      // @ts-ignore
      this.appleData[0].data.push(this.messageText.apple.price);
      // @ts-ignore
      this.apple = this.messageText.apple.price;
      this.appleLabels.push(moment().format('h:mm:ss'));
      if (this.appleData[0].data.length >= 15) {
        this.appleData[0].data.shift();
        this.appleLabels.shift();
      }
  }
}
