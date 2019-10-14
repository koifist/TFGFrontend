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
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import * as _ from 'lodash';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  loaded = false;
  faCaretUpp = faCaretUp;
  faCaretDown = faCaretDown;
  faPaperPlane = faPaperPlane;
  msg = '';
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
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Amazon' },
  ];
  public googleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Google' },
  ];
  public appleData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Apple' }
  ];
  public microsoftData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Microsoft' }
  ];
  public amazonLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  public googleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  public appleLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  public microsoftLabels: Label[] = ['', '', '', '', '' , '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {fontColor: 'black'},
        gridLines: {color: 'transparent'}
      }],
      yAxes: [{
        ticks: {fontColor: 'black'},
        gridLines: {color: 'black'},
      }],
    },
    plugins: {
      datalabels: {
        display: false,
        anchor: 'start',
        align: 'top',
        rotation: 320,
        clamp: true,
        font: {
          weight: 'bold',
          size: 15
        }
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 20
      }
    },
    elements: {
      line: {
        tension: 0
      }
    }
  };
  public barChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgb(16, 2, 217)',
      pointBackgroundColor: 'rgb(16, 2, 217)',
    }
  ];
  public barChartType: ChartType = 'line';
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
    this.loaded = true;
    const time = moment();
    const day = time.isoWeekday();
    const start = moment('15:25:00', 'HH:mm:ss');
    const end = moment('22:00:00', 'HH:mm:ss');
    if (time.isBetween(start, end) && day < 6) {
      this.userService.getStockInfo()
        .pipe(first())
        .subscribe(
          res => {
            // @ts-ignore
            this.amazonData[0].data.push(this.prices.amazon.current);
            // @ts-ignore
            this.googleData[0].data.push(this.prices.google.current);
            // @ts-ignore
            this.appleData[0].data.push(this.prices.apple.current);
            // @ts-ignore
            this.microsoftData[0].data.push(this.prices.microsoft.current);
            this.amazonData[0].data.shift();
            this.googleData[0].data.shift();
            this.appleData[0].data.shift();
            this.microsoftData[0].data.shift();
            this.amazonLabels.push(moment().format('HH:MM:s'));
            this.googleLabels.push(moment().format('HH:MM:s'));
            this.appleLabels.push(moment().format('HH:MM:s'));
            this.microsoftLabels.push(moment().format('HH:MM:s'));
            this.amazonLabels.shift();
            this.googleLabels.shift();
            this.appleLabels.shift();
            this.microsoftLabels.shift();
            setTimeout(() => {
              this.getPrices();
            }, 300000);
          },
          err => {
            this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
          });
    } else {
      this.toastr.info('Actualmente la bolsa no esta en activo. Le mostraremos la última información recogida.');
    }
  }
  ngOnInit() {
    this.getMessages();
    this.getHistory();
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
    }
  public getHistory() {
    this.userService.getStockHistory()
      .pipe(first())
      .subscribe(
        res => {
          _.forEach(res.amazon, (data) => {
            this.amazonData[0].data.push(data.price);
            this.amazonData[0].data.shift();
            this.amazonLabels.push(data.time);
            this.amazonLabels.shift();
          });
          _.forEach(res.google, (data) => {
            this.googleData[0].data.push(data.price);
            this.googleData[0].data.shift();
            this.googleLabels.push(data.time);
            this.googleLabels.shift();
          });
          _.forEach(res.apple, (data) => {
            this.appleData[0].data.push(data.price);
            this.appleData[0].data.shift();
            this.appleLabels.push(data.time);
            this.appleLabels.shift();
          });
          _.forEach(res.microsoft, (data) => {
            this.microsoftData[0].data.push(data.price);
            this.microsoftData[0].data.shift();
            this.microsoftLabels.push(data.time);
            this.microsoftLabels.shift();
          });
          this.prices = res.prices;
          this.getPrices();
        },
        err => {
          this.toastr.error('Ha ocurrido un error. Porfavor contacte con el administrador');
        });
  }
}
