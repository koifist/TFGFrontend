import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as moment from 'moment';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ToastrService} from 'ngx-toastr';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons/faCaretUp';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons/faCaretDown';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  faCaretUpp = faCaretUp;
  faCaretDown = faCaretDown;
  stock: object;
  message: object;
  socket: any;
  prices = {
    amazon: {
      past: 0,
      current: 0
    },
    google: {
      past: 0,
      current: 0
    },
    apple: {
      past: 0,
      current: 0
    },
    microsoft: {
      past: 0,
      current: 0
    }
  };

  public messages: object[];
  public amazonData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Amazon' },
  ];
  public googleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Google' },
  ];
  public appleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Apple' }
  ];
  public microsoftData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Microsoft' }
  ];
  public amazonLabels: Label[] = ['', '', '', '', '' , '', '', '', '', ''];
  public googleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', ''];
  public appleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', ''];
  public microsoftLabels: Label[] = ['', '', '', '', '' , '', '', '', '', ''];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {fontColor: 'black', beginAtZero: true},
        gridLines: {color: 'white'}
      }],
      yAxes: [{
        ticks: {fontColor: 'black', beginAtZero: true, maxTicksLimit: 10, stepSize: 250, suggestedMax: 2000},
        gridLines: {color: 'rgb(128, 128, 128)'},
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 20
      }
    }
  };
  public barChartColors: Color[] = [
    {
      backgroundColor: 'rgb(17, 212, 212)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  constructor(private userService: UserService, private toastr: ToastrService) {
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
          this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
        });
  }
  public getPrices(): void {
    this.userService.getStockInfo()
      .pipe(first())
      .subscribe(
        res => {
          this.prices.amazon = res.amazon;
          this.prices.google = res.google;
          this.prices.apple = res.apple;
          this.prices.microsoft = res.microsoft;
          // @ts-ignore
          this.amazonData[0].data.unshift(this.prices.amazon.current);
          // @ts-ignore
          this.googleData[0].data.unshift(this.prices.google.current);
          // @ts-ignore
          this.appleData[0].data.unshift(this.prices.apple.current);
          // @ts-ignore
          this.microsoftData[0].data.unshift(this.prices.microsoft.current);
          this.amazonData[0].data.pop();
          this.googleData[0].data.pop();
          this.appleData[0].data.pop();
          this.microsoftData[0].data.pop();
          this.amazonLabels.unshift(moment().format('h:m:s'));
          this.googleLabels.unshift(moment().format('h:m:s'));
          this.appleLabels.unshift(moment().format('h:m:s'));
          this.microsoftLabels.unshift(moment().format('h:m:s'));
          this.amazonLabels.pop();
          this.googleLabels.pop();
          this.appleLabels.pop();
          this.microsoftLabels.pop();
        },
        err => {
          this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
        });
  }
  ngOnInit() {
    this.getMessages();
    this.getPrices();
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
      if (this.stock) {
        this.pushPrices();
      }
    });
    }
  public pushPrices() {
      // @ts-ignore
      this.prices.amazon.current = this.stock.amazon.price;
      // @ts-ignore
      this.prices.apple.current = this.stock.apple.price;
      // @ts-ignore
      this.prices.google.current = this.stock.google.price;
      // @ts-ignore
      this.prices.microsoft.current = this.stock.microsoft.price;
      // @ts-ignore
      this.amazonData[0].data.unshift(this.stock.amazon.price);
      // @ts-ignore
      this.googleData[0].data.unshift(this.stock.google.price);
      // @ts-ignore
      this.appleData[0].data.unshift(this.stock.apple.price);
      // @ts-ignore
      this.microsoftData[0].data.unshift(this.stock.microsoft.price);
      this.amazonData[0].data.pop();
      this.googleData[0].data.pop();
      this.appleData[0].data.pop();
      this.microsoftData[0].data.pop();
      this.amazonLabels.unshift(moment().format('h:m:s'));
      this.googleLabels.unshift(moment().format('h:m:s'));
      this.appleLabels.unshift(moment().format('h:m:s'));
      this.microsoftLabels.unshift(moment().format('h:m:s'));
      this.amazonLabels.pop();
      this.googleLabels.pop();
      this.appleLabels.pop();
      this.microsoftLabels.pop();
  }
}
