import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  stock: object;
  message: object;
  socket: any;
  amazon = 0.00;
  google = 0.00;
  apple = 0.00;
  public messages: object[];
  public amazonData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Amazon' },
  ];
  public googleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Google' },
  ];
  public appleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Apple' }
  ];
  public amazonLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', ''];
  public googleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', ''];
  public appleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', ''];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,255,255,0.1)'
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
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointRadius: 5
    }
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  constructor(private userService: UserService) {
    this.socket = io.connect(environment.baseurl);
  }
  public getMessages(): void {
    this.userService.getMessages()
      .pipe(first())
      .subscribe(
        res => {
            this.messages = res;
          // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.messages.length; i++) {
              // @ts-ignore
              this.messages[i].date = moment(this.messages[i].date, moment.ISO_8601).format('DD-MMMM hh:mm:SS');
              // @ts-ignore
              this.messages[i].username = this.messages[i].username.split('@')[0];
            }
            this.messages = this.messages.reverse();
        },
        err => {
        });
  }
  ngOnInit() {
    this.getMessages();
    this.socket.on('messages', (msg: any) => {
      this.message = JSON.parse(msg);
      // @ts-ignore
      if (this.message && this.message.username && this.message.date && this.message.msg) {
        // @ts-ignore
        this.message.date = moment(this.message.date, moment.ISO_8601).format('DD-MMMM hh:mm:SS');
        this.messages.unshift(this.message);
        // @ts-ignore
        this.message.username = this.message.username.split('@')[0];
      }
    });
    this.socket.on('stock', (msg: any) => {
      this.stock = JSON.parse(msg);
      // @ts-ignore
      if (this.stock && this.stock.google && this.stock.amazon && this.stock.apple) {
        // @ts-ignore
        this.pushPrices();
      }
    });
    }
  public pushPrices() {
      // @ts-ignore
      this.amazon = this.stock.amazon.price;
      // @ts-ignore
      this.apple = this.stock.apple.price;
      // @ts-ignore
      this.google = this.stock.google.price;
      // @ts-ignore
      this.amazonData[0].data.push(this.stock.amazon.price);
      // @ts-ignore
      this.googleData[0].data.push(this.stock.google.price);
      // @ts-ignore
      this.appleData[0].data.push(this.stock.apple.price);
      this.amazonData[0].data.shift();
      this.googleData[0].data.shift();
      this.appleData[0].data.shift();
      this.amazonLabels.push(moment().format('h:m:s'));
      this.googleLabels.push(moment().format('h:m:s'));
      this.appleLabels.push(moment().format('h:m:s'));
      this.amazonLabels.shift();
      this.googleLabels.shift();
      this.appleLabels.shift();
  }
}
