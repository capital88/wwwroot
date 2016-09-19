import {Component} from '@angular/core';
import { Jsonp, JSONP_PROVIDERS }       from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from './hero.service';
import { Fcpoint }           from './fcpoint';
import { Fund }           from './fcpoint';
import { Todo,Info }           from './fcpoint';
import { Jsonday}           from './fcpoint';


declare var jQuery:any;

@Component({
    selector: 'my-chart',
    templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private heroService: HeroService,
    private jsonp : Jsonp,
    private route: ActivatedRoute) {

    }
    Infos : Info[];
    todos : Todo[];     
    options: Object;
    url:string;
	private data = [
			{
	            name: 'USA',
	            data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
	                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
	                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
	                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
	                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
	                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
	                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
	        },
            {
            	name: 'USSR/Russia',
	            data: [null, null, null, null, null, null, null, null, null, null,
	                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
	                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
	                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
	                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
	                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
	                21000, 20000, 19000, 18000, 18000, 17000, 16000]
	        }];

    ngAfterViewInit() {

          this.route.params.forEach((params: Params) => {this.url = params['id']; });
        this.heroService.getFcpoint('app/txt/fcpoint/'+this.url)
                                   .subscribe(
                                       obj => this.setdataFcpoint(obj),//this.options.title.text = 'fcpoints.data.xxxx', //Bind to view
                                        err => {
                                            // Log errors if any
                                            console.log(err);
                                        });
     this.heroService.getFunds('app/txt/ffund/'+this.url)
                                   .subscribe(
                                       obj => this.setdataFund(obj),//this.options.title.text = 'fcpoints.data.xxxx', //Bind to view
                                        err => {
                                            // Log errors if any
                                            console.log(err);
                                        });
     this.heroService.getJsonDay('app/txt/forderday/'+this.url)
                                   .subscribe(
                                       obj => this.setdataJosnDay(obj),//this.options.title.text = 'fcpoints.data.xxxx', //Bind to view
                                        err => {
                                            // Log errors if any
                                            console.log(err);
                                        });
     this.heroService.getTodo('app/txt/fnodos/'+this.url)
                                   .subscribe(
                                       obj => this.setdataTodo1(obj),//this.options.title.text = 'fcpoints.data.xxxx', //Bind to view
                                        err => {
                                            // Log errors if any
                                            console.log(err);
                                        });
       this.heroService.getTodo('app/txt/fTList/'+this.url)
                                   .subscribe(
                                       obj => this.setdataTodo2(obj),//this.options.title.text = 'fcpoints.data.xxxx', //Bind to view
                                        err => {
                                            // Log errors if any
                                            console.log(err);
                                        });
    	//this.renderChart2(this.url);
        //this.renderChart1(this.url);
    }
    // setdata(tmpfcpoints:Fcpoint[]):void{
    //     this.jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
    //     this.options = res.json();
    //     // Create the chart
    //      jQuery('#divbuysell').highcharts('StockChart', {
    //         rangeSelector : {
    //             selected : 1
    //         },
    //         title : {
    //             text : 'AAPL Stock Price'
    //         },
    //         series : [{
    //             name : 'AAPL',
    //             data : this.options,
    //             tooltip: {
    //                 valueDecimals: 2
    //             }
    //         }]
    //     });
    // });
    // }
    
    setdataFcpoint(tmpfcpoints:Fcpoint[]):void{     
                  jQuery('#divbuysell').highcharts('StockChart', {
            chart: {
                zoomType: 'x'
            },
            rangeSelector: {
                selected:2,
                enabled: true
            },
            navigator: {
                enabled: true
            },
            title: {
                text: '買入賣出點'
            },
            useHighStocks: true,
               
                series : [{
                    name : 'AAPL',
                    data : tmpfcpoints.data,
                     id: 'dataseries',
                    tooltip: {
                    valueDecimals: 4
                }
            }, {
                type: 'flags',
                data: tmpfcpoints.buy,
                onSeries: 'dataseries',
                shape: 'squarepin',
                width: 16
            }, {
            type: 'flags',
            data: tmpfcpoints.sell,
            color: '#FFFFFF', // same as onSeries
            fillColor: '#000000',
            onSeries: 'dataseries',
            width: 16,
            style: { // text style
                color: 'white'
            },
            states: {
                hover: {
                    fillColor: '#395C84' // darker
                }
            }
                  }]
            });
     }
      setdataFund(tmpfunds:Fund[]):void{
            jQuery('#divline').highcharts({
	       
           chart: {
               type: 'line'
           },
          
           xAxis: {type: 'datetime',
                labels: {
	                formatter: function () {
	                    return this.value;
	                }
	            },
               categories: tmpfunds[0].categories
           }, yAxis: {
               title: {
                   text: '%'
               }
           
       },
       series: tmpfunds[0].datas,
       title: {
           text: '基金獲利率'
       },

      
	    });
     }
     setdataJosnDay(tmpJsondays:Jsonday[]):void{
        jQuery('#divcolumn').highcharts({	      
            chart: {
                type: 'column'
            },
            // tooltip: {
            //     headerFormat: '<b>{series.name}</b><br>',
            //     pointFormat: '損益:{point.y}'
            // },
            xAxis: {
                type: 'datetime',
                 categories: tmpJsondays[0].categories
            },
            yAxis: {
                title: {
                    text: '%'
                }
            
        },
        series: [{            
            name: '%',
            data: tmpJsondays[0].data,        
            color: '#FF0000',
            negativeColor: '#0088FF',
            tooltip: {
                valueDecimals: 2
            }
        }],
        title: {
            text: '交易報酬率'//率
        }

	    });
            
     }     
      setdataTodo1(tmpInfos:Todo[]):void{     
         this.Infos = tmpInfos;
     }
      setdataTodo2(tmptodos:Todo[]):void{
         this.todos = tmptodos;   
     }
    // renderChart2(aa:string){
    //      this.jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
    //     this.options = res.json();
    //     jQuery('#divline').highcharts({
	//         chart: {
	//             type: 'line'
	//         },
	//         title: {
	//             text: 'US and USSR nuclear stockpiles'+aa
	//         },
	//         subtitle: {
	//             text: 'Source: thebulletin.metapress.com'+this.data[0].data[6]
	//         },
	//         xAxis: {
	//             allowDecimals: false,
	//             labels: {
	//                 formatter: function () {
	//                     return this.value;
	//                 }
	//             }
	//         },
	//         yAxis: {
	//             title: {
	//                 text: 'Nuclear weapon states'
	//             },
	//             labels: {
	//                 formatter: function () {
	//                     return this.value / 1000 + 'k';
	//                 }
	//             }
	//         },
	//         tooltip: {
	//             pointFormat: '{series.name} produced <b>{point.y:,.0f}</b>' +
	//             			 '<br/>warheads in {point.x}'
	//         },
	//         plotOptions: {
	//             area: {
	//                 pointStart: 1940,
	//                 marker: {
	//                     enabled: false,
	//                     symbol: 'circle',
	//                     radius: 2,
	//                     states: {
	//                         hover: {
	//                             enabled: true
	//                         }
	//                     }
	//                 }
	//             }
	//         },
	//         series: this.data
	//     });
    //     });

    // }
    // renderChart1(aa:string){
    //      this.jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {
    //     this.options = res.json();
    //     jQuery('#divcolumn').highcharts({
	//         chart: {
	//             type: 'area'//column'
	//         },
	//         title: {
	//             text: 'US and USSR nuclear stockpiles'+aa
	//         },
	//         subtitle: {
	//             text: 'Source: thebulletin.metapress.com'+this.data[0].data[6]
	//         },
	//         xAxis: {
	//             allowDecimals: false,
	//             labels: {
	//                 formatter: function () {
	//                     return this.value;
	//                 }
	//             }
	//         },
	//         yAxis: {
	//             title: {
	//                 text: 'Nuclear weapon states'
	//             },
	//             labels: {
	//                 formatter: function () {
	//                     return this.value / 1000 + 'k';
	//                 }
	//             }
	//         },
	//         tooltip: {
	//             pointFormat: '{series.name} produced <b>{point.y:,.0f}</b>' +
	//             			 '<br/>warheads in {point.x}'
	//         },
	//         plotOptions: {
	//             area: {
	//                 pointStart: 1940,
	//                 marker: {
	//                     enabled: false,
	//                     symbol: 'circle',
	//                     radius: 2,
	//                     states: {
	//                         hover: {
	//                             enabled: true
	//                         }
	//                     }
	//                 }
	//             }
	//         },
	//         series: this.data
	//     });
    //     });

    // }
}