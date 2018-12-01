import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // todo: refactor
  charts = [
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        const data = [
          { month: 'Jan', temperature: 7.0 },
          { month: 'Feb', temperature: 6.9 },
          { month: 'Mar', temperature: 9.5 },
          { month: 'Apr', temperature: 14.5 },
          { month: 'May', temperature: 18.2 },
          { month: 'Jun', temperature: 21.5 },
          { month: 'Jul', temperature: 25.2 },
          { month: 'Aug', temperature: 26.5 },
          { month: 'Sep', temperature: 23.3 },
          { month: 'Oct', temperature: 18.3 },
          { month: 'Nov', temperature: 13.9 },
          { month: 'Dec', temperature: 9.6 },
        ];

        chart.source(data, {
          month: {
            alias: '月份',
            range: [0, 1],
          },
          temperature: {
            alias: '平均温度(°C)',
          },
        });
        chart
          .line()
          .position('month*temperature')
          .size(2);
        chart.render();
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        const data = [
          { year: '2012', sales: 850 },
          { year: '2013', sales: 894 },
          { year: '2014', sales: 912 },
          { year: '2015', sales: 974 },
          { year: '2016', sales: 997 },
          { year: '2017', sales: 1013 },
          { year: '2018', sales: 1130 },
          { year: '2019', sales: 1204 },
          { year: '2020', sales: 1250 },
        ];

        chart.source(data, {
          year: {
            range: [0, 1],
          },
          sales: {
            tickCount: 5,
          },
        });
        chart.axis('year', {
          tickLine: {
            length: 4,
            lineWidth: 1,
            stroke: '#e8e8e8',
          },
        });
        chart.tooltip(false);
        chart.line().position('year*sales');
        chart.point().position('year*sales').style('year', {
          stroke: '#1890ff',
          lineWidth: 1,
          fill: '#FFF',
          r: function r(val) {
            if (val * 1 < 2018) {
              return 5;
            }
            return 0;
          },
        });

        chart.guide().regionFilter({
          start: ['64%', '0%'],
          end: ['100%', '100%'],
          color: '#fff',
          style: {
            lineDash: [3, 8],
          },
        });

        const forecastData = data.slice(6);
        forecastData.map(function(obj) {
          chart.guide().point({
            position: [obj.year, obj.sales],
            style: {
              fill: '#1890ff',
              r: 3,
            },
          });
          chart.guide().text({
            position: [obj.year, obj.sales],
            content: '$' + obj.sales,
            style: {
              fill: '#1890ff',
              textAlign: 'center',
            },
            offsetY: -15,
          });
        });
        chart.guide().rect({
          start: ['2017', 'min'],
          end: ['max', 'max'],
          style: {
            fill: '#1890ff',
            fillOpacity: 0.05,
          },
        });
        chart.guide().text({
          position: ['2017', 'max'],
          content: '预测',
          style: {
            fill: '#808080',
            textAlign: 'start',
            textBaseline: 'top',
            fontWeight: 'bold',
          },
          offsetX: 8,
          offsetY: 8,
        });
        chart.render();
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        // customize shape and animation
        const _F = window.F2,
          Shape = _F.Shape,
          Util = _F.Util,
          Global = _F.Global,
          G = _F.G,
          Animate = _F.Animate;
        const Vector2 = G.Vector2;

        Shape.registerShape('interval', 'tick', {
          draw: function draw(cfg, container) {
            const points = this.parsePoints(cfg.points);
            const style = Util.mix({
              stroke: cfg.color,
            }, Global.shape.interval, cfg.style);
            if (cfg.isInCircle) {
              let newPoints = points.slice(0);
              if (this._coord.transposed) {
                newPoints = [points[0], points[3], points[2], points[1]];
              }

              const _cfg$center = cfg.center,
                x = _cfg$center.x,
                y = _cfg$center.y;

              const v = [1, 0];
              const v0 = [newPoints[0].x - x, newPoints[0].y - y];
              const v1 = [newPoints[1].x - x, newPoints[1].y - y];
              const v2 = [newPoints[2].x - x, newPoints[2].y - y];

              let startAngle = Vector2.angleTo(v, v1);
              let endAngle = Vector2.angleTo(v, v2);
              const r0 = Vector2.length(v0);
              const r = Vector2.length(v1);

              if (startAngle >= 1.5 * Math.PI) {
                startAngle = startAngle - 2 * Math.PI;
              }

              if (endAngle >= 1.5 * Math.PI) {
                endAngle = endAngle - 2 * Math.PI;
              }

              const lineWidth = r - r0;
              const newRadius = r - lineWidth / 2;

              return container.addShape('Arc', {
                className: 'interval',
                attrs: Util.mix({
                  x: x,
                  y: y,
                  startAngle: startAngle,
                  endAngle: endAngle,
                  r: newRadius,
                  lineWidth: lineWidth,
                  lineCap: 'round',
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 0,
                  shadowOffsetY: -5,
                  shadowBlur: 50,
                }, style),
              });
            }
          },
        });

        Animate.registerAnimation('waveIn', function(shape, animateCfg) {
          const startAngle = shape.attr('startAngle');
          const endAngle = shape.attr('endAngle');
          shape.attr('endAngle', startAngle);
          shape.animate().to(Util.mix({
            attrs: {
              endAngle: endAngle,
            },
          }, animateCfg));
        });
        // ------

        const data = [
          {
            name: 'activity1',
            percent: 2370,
            color: '#1ad5de',
            icon: 'stand.png',
            bgColor: '#183C3D',
          }, {
            name: 'activity2',
            percent: 80,
            color: '#a0ff03',
            icon: 'walk.png',
            bgColor: '#324214',
          }, {
            name: 'activity3',
            percent: 65,
            color: '#e90b3a',
            icon: 'run.png',
            bgColor: '#40131D',
          },
        ];

        chart.source(data, {
          percent: {
            max: 100,
          },
        });
        chart.legend(false);
        chart.coord('polar', {
          transposed: true,
          innerRadius: 0.382,
          radius: 0.8,
        });
        chart.axis(false);
        chart.interval().position('name*percent').color('color', function(val) {
          return val;
        }).shape('tick').size(18).animate({
          appear: {
            animation: 'waveIn',
            duration: 1500,
            easing: 'elasticOut',
          },
          update: {
            duration: 1500,
            easing: 'elasticOut',
          },
        });

        data.map(function(obj) {
          // background
          chart.guide().arc({
            start: [obj.name, 0],
            end: [obj.name, 99.98],
            top: false,
            style: {
              lineWidth: 18,
              stroke: obj.bgColor,
            },
          });
          chart.guide().html({
            position: [obj.name, 0],
            html: '<div style="width: 16px;height: 16px;">' + '<img style="width: 16px;height: 16px;display: block;" src="http://www.adeveloperdiary.com/wp-content/uploads/2015/11/' + obj.icon + '" />' + '</div>',
          });
        });
        chart.render();

        const updateData = () => {
          for (let i = 0; i < data.length; ++i) {
            data[i].percent = Math.floor(Math.random() * 60 + 20);
          }
          chart.changeData(data);
          setTimeout(updateData, 1500);
        };

        setTimeout(updateData, 1500);
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {

        const data = [
          {
            year: 2000,
            age: 27.2,
          }, {
            year: 2001,
            age: 27.5,
          }, {
            year: 2002,
            age: 27.8,
          }, {
            year: 2003,
            age: 28,
          }, {
            year: 2004,
            age: 28.2,
          }, {
            year: 2005,
            age: 28.4,
          }, {
            year: 2006,
            age: 28.8,
          }, {
            year: 2007,
            age: 28.8,
          }, {
            year: 2008,
            age: 28.8,
          }, {
            year: 2009,
            age: 28.8,
          }, {
            year: 2010,
            age: 28.9,
          }, {
            year: 2011,
            age: 29,
          }, {
            year: 2012,
            age: 29.3,
          }, {
            year: 2013,
            age: 29.4,
          }, {
            year: 2014,
            age: 29.5,
          }, {
            year: 2015,
            age: 29.7,
          }, {
            year: 2016,
            age: 30,
          }, {
            year: 2017,
            age: 30.12,
          }];
        const defs = {
          year: {
            range: [0, 1],
            max: 2020,
          },
          age: {
            tickCount: 5,
          },
        };
        chart.axis('year', {
          label: function label(text, index, total) {
            const cfg = {
              textAlign: 'center',
            };
            if (index === 0) {
              cfg.textAlign = 'start';
            }
            if (index > 0 && index === total - 1) {
              cfg.textAlign = 'end';
            }
            return cfg;
          },
        });
        chart.source(data, defs);
        chart.tooltip({
          showCrosshairs: true,
        });
        chart.guide().tag({
          position: [2017, 30.12],
          content: '30.12',
          direct: 'tl',
          offsetY: -5,
          background: {
            fill: '#8659AF',
          },
          pointStyle: {
            fill: '#8659AF',
          },
        });
        chart.line().position('year*age').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
        chart.area().position('year*age').shape('smooth').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
        chart.render();
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        const data = [
          {
            amount: 20,
            ratio: 0.1,
            memo: '学习',
            const: 'const',
          }, {
            amount: 100,
            ratio: 0.5,
            memo: '睡觉',
            const: 'const',
          }, {
            amount: 10,
            ratio: 0.05,
            memo: '吃饭',
            const: 'const',
          }, {
            amount: 30,
            ratio: 0.15,
            memo: '讲礼貌',
            const: 'const',
          }, {
            amount: 10,
            ratio: 0.05,
            memo: '其他',
            const: 'const',
          }, {
            amount: 20,
            ratio: 0.1,
            memo: '运动',
            const: 'const',
          }, {
            amount: 10,
            ratio: 0.05,
            memo: '暂无备注',
            const: 'const',
          }];

        chart.source(data);
        chart.coord('polar', {
          transposed: true,
          innerRadius: 0.4,
          radius: 0.75,
        });
        chart.axis(false);
        chart.legend({
          position: 'bottom',
          align: 'center',
        });
        chart.tooltip(false);
        chart.guide().html({
          position: ['50%', '50%'],
          html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>',
        });

        chart.pieLabel({
          sidePadding: 75,
          label1: (d) => {
            return {
              text: d.memo,
              fill: '#808080',
            };
          },
          label2: (d) => {
            return {
              fill: '#000000',
              text: '$' + d.amount.toFixed(2),
              fontWeight: 500,
              fontSize: 10,
            };
          },
        });
        chart.interval().position('const*ratio').color('memo', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273']).adjust('stack');
        chart.render();


        const frontPlot = chart.get('frontPlot');
        const coord = chart.get('coord'); // 获取坐标系对象
        frontPlot.addShape('sector', {
          attrs: {
            x: coord.center.x,
            y: coord.center.y,
            r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
            r0: coord.circleRadius * coord.innerRadius,
            fill: '#000',
            opacity: 0.15,
          },
        });
        chart.get('canvas').draw();
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        const recentOneMonth = [
          {
            name: '超大盘能力',
            value: 6.5,
          }, {
            name: '抗跌能力',
            value: 9.5,
          }, {
            name: '稳定能力',
            value: 9,
          }, {
            name: '绝对收益能力',
            value: 6,
          }, {
            name: '选证择时能力',
            value: 6,
          }, {
            name: '风险回报能力',
            value: 8,
          }];
        const recentThreeMonth = [
          {
            name: '超大盘能力',
            value: 6,
          }, {
            name: '抗跌能力',
            value: 8.5,
          }, {
            name: '稳定能力',
            value: 7.5,
          }, {
            name: '绝对收益能力',
            value: 5.5,
          }, {
            name: '选证择时能力',
            value: 6,
          }, {
            name: '风险回报能力',
            value: 6,
          }];
        const recentSixMonth = [
          {
            name: '超大盘能力',
            value: 6,
          }, {
            name: '抗跌能力',
            value: 7,
          }, {
            name: '稳定能力',
            value: 7,
          }, {
            name: '绝对收益能力',
            value: 5.5,
          }, {
            name: '选证择时能力',
            value: 5.65,
          }, {
            name: '风险回报能力',
            value: 6,
          }];

        chart.source(recentOneMonth, {
          value: {
            min: 0,
            max: 10,
          },
        });
        chart.coord('polar');
        chart.tooltip(false); // 关闭 tooltip
        chart.axis('value', {
          grid: {
            lineDash: null,
          },
          label: null,
          line: null,
        });
        chart.axis('name', {
          grid: {
            lineDash: null,
          },
        });
        chart.area().position('name*value').color('#FE5C5B').style({
          fillOpacity: 0.2,
        }).animate({
          appear: {
            animation: 'groupWaveIn',
          },
        });
        chart.line().position('name*value').color('#FE5C5B').size(1).animate({
          appear: {
            animation: 'groupWaveIn',
          },
        });
        chart.point().position('name*value').color('#FE5C5B').animate({
          appear: {
            delay: 300,
          },
        });

        chart.guide().html({
          position: ['50%', '50%'],
          html: '<div style="color: #FE5C5B;white-space: nowrap;text-align:center;">' + '<p style="font-size: 12px;margin:0;">诊断分</p>' + '<p style="font-size: 32px;margin:0;font-weight: bold;">73</p>' + '</div>',
        });
        chart.render();
      },
    },
    {
      options: {
        height: 300,
        forceFit: true,
      },
      ready: (chart) => {
        const data = [
          { 'week': 'Monday', 'time': 'Midnight', 'value': 0.176042 }, {
          'week': 'Monday',
          'time': '1am',
          'value': 0.096146,
        }, { 'week': 'Monday', 'time': '2am', 'value': 0.076414 }, {
          'week': 'Monday',
          'time': '3am',
          'value': 0.334734,
        }, { 'week': 'Monday', 'time': '4am', 'value': 0.132583 }, {
          'week': 'Monday',
          'time': '5am',
          'value': 0.135422,
        }, { 'week': 'Monday', 'time': '6am', 'value': 0.060884 }, {
          'week': 'Monday',
          'time': '7am',
          'value': 0.768601,
        }, { 'week': 'Monday', 'time': '8am', 'value': 0.230771 }, {
          'week': 'Monday',
          'time': '9am',
          'value': 0.07572,
        }, { 'week': 'Monday', 'time': '10am', 'value': 0.210855 }, {
          'week': 'Monday',
          'time': '11am',
          'value': 0.090938,
        }, { 'week': 'Monday', 'time': 'Midday', 'value': 0.094296 }, {
          'week': 'Monday',
          'time': '1pm',
          'value': 0.290368,
        }, { 'week': 'Monday', 'time': '2pm', 'value': 0.093755 }, {
          'week': 'Monday',
          'time': '3pm',
          'value': 0.099166,
        }, { 'week': 'Monday', 'time': '4pm', 'value': 0.429278 }, {
          'week': 'Monday',
          'time': '5pm',
          'value': 0.962314,
        }, { 'week': 'Monday', 'time': '6pm', 'value': 0.43833 }, {
          'week': 'Monday',
          'time': '7pm',
          'value': 0.244464,
        }, { 'week': 'Monday', 'time': '8pm', 'value': 0.550621 }, {
          'week': 'Monday',
          'time': '9pm',
          'value': 0.173093,
        }, { 'week': 'Monday', 'time': '10pm', 'value': 0.103659 }, {
          'week': 'Monday',
          'time': '11pm',
          'value': 0.0773,
        }, { 'week': 'Tuesday', 'time': 'Midnight', 'value': 0.096146 }, {
          'week': 'Tuesday',
          'time': '1am',
          'value': 0.076414,
        }, { 'week': 'Tuesday', 'time': '2am', 'value': 0.334734 }, {
          'week': 'Tuesday',
          'time': '3am',
          'value': 0.132583,
        }, { 'week': 'Tuesday', 'time': '4am', 'value': 0.135422 }, {
          'week': 'Tuesday',
          'time': '5am',
          'value': 0.060884,
        }, { 'week': 'Tuesday', 'time': '6am', 'value': 0.768601 }, {
          'week': 'Tuesday',
          'time': '7am',
          'value': 0.230771,
        }, { 'week': 'Tuesday', 'time': '8am', 'value': 0.07572 }, {
          'week': 'Tuesday',
          'time': '9am',
          'value': 0.210855,
        }, { 'week': 'Tuesday', 'time': '10am', 'value': 0.090938 }, {
          'week': 'Tuesday',
          'time': '11am',
          'value': 0.094296,
        }, { 'week': 'Tuesday', 'time': 'Midday', 'value': 0.290368 }, {
          'week': 'Tuesday',
          'time': '1pm',
          'value': 0.093755,
        }, { 'week': 'Tuesday', 'time': '2pm', 'value': 0.099166 }, {
          'week': 'Tuesday',
          'time': '3pm',
          'value': 0.429278,
        }, { 'week': 'Tuesday', 'time': '4pm', 'value': 0.962314 }, {
          'week': 'Tuesday',
          'time': '5pm',
          'value': 0.43833,
        }, { 'week': 'Tuesday', 'time': '6pm', 'value': 0.244464 }, {
          'week': 'Tuesday',
          'time': '7pm',
          'value': 0.550621,
        }, { 'week': 'Tuesday', 'time': '8pm', 'value': 0.173093 }, {
          'week': 'Tuesday',
          'time': '9pm',
          'value': 0.103659,
        }, { 'week': 'Tuesday', 'time': '10pm', 'value': 0.0773 }, {
          'week': 'Tuesday',
          'time': '11pm',
          'value': 0.265913,
        }, { 'week': 'Wednesday', 'time': 'Midnight', 'value': 0.076414 }, {
          'week': 'Wednesday',
          'time': '1am',
          'value': 0.334734,
        }, { 'week': 'Wednesday', 'time': '2am', 'value': 0.132583 }, {
          'week': 'Wednesday',
          'time': '3am',
          'value': 0.135422,
        }, { 'week': 'Wednesday', 'time': '4am', 'value': 0.060884 }, {
          'week': 'Wednesday',
          'time': '5am',
          'value': 0.768601,
        }, { 'week': 'Wednesday', 'time': '6am', 'value': 0.230771 }, {
          'week': 'Wednesday',
          'time': '7am',
          'value': 0.07572,
        }, { 'week': 'Wednesday', 'time': '8am', 'value': 0.210855 }, {
          'week': 'Wednesday',
          'time': '9am',
          'value': 0.090938,
        }, { 'week': 'Wednesday', 'time': '10am', 'value': 0.094296 }, {
          'week': 'Wednesday',
          'time': '11am',
          'value': 0.290368,
        }, { 'week': 'Wednesday', 'time': 'Midday', 'value': 0.093755 }, {
          'week': 'Wednesday',
          'time': '1pm',
          'value': 0.099166,
        }, { 'week': 'Wednesday', 'time': '2pm', 'value': 0.429278 }, {
          'week': 'Wednesday',
          'time': '3pm',
          'value': 0.962314,
        }, { 'week': 'Wednesday', 'time': '4pm', 'value': 0.43833 }, {
          'week': 'Wednesday',
          'time': '5pm',
          'value': 0.244464,
        }, { 'week': 'Wednesday', 'time': '6pm', 'value': 0.550621 }, {
          'week': 'Wednesday',
          'time': '7pm',
          'value': 0.173093,
        }, { 'week': 'Wednesday', 'time': '8pm', 'value': 0.103659 }, {
          'week': 'Wednesday',
          'time': '9pm',
          'value': 0.0773,
        }, { 'week': 'Wednesday', 'time': '10pm', 'value': 0.265913 }, {
          'week': 'Wednesday',
          'time': '11pm',
          'value': 0.099811,
        }, { 'week': 'Thursday', 'time': 'Midnight', 'value': 0.334734 }, {
          'week': 'Thursday',
          'time': '1am',
          'value': 0.132583,
        }, { 'week': 'Thursday', 'time': '2am', 'value': 0.135422 }, {
          'week': 'Thursday',
          'time': '3am',
          'value': 0.060884,
        }, { 'week': 'Thursday', 'time': '4am', 'value': 0.768601 }, {
          'week': 'Thursday',
          'time': '5am',
          'value': 0.230771,
        }, { 'week': 'Thursday', 'time': '6am', 'value': 0.07572 }, {
          'week': 'Thursday',
          'time': '7am',
          'value': 0.210855,
        }, { 'week': 'Thursday', 'time': '8am', 'value': 0.090938 }, {
          'week': 'Thursday',
          'time': '9am',
          'value': 0.094296,
        }, { 'week': 'Thursday', 'time': '10am', 'value': 0.290368 }, {
          'week': 'Thursday',
          'time': '11am',
          'value': 0.093755,
        }, { 'week': 'Thursday', 'time': 'Midday', 'value': 0.099166 }, {
          'week': 'Thursday',
          'time': '1pm',
          'value': 0.429278,
        }, { 'week': 'Thursday', 'time': '2pm', 'value': 0.962314 }, {
          'week': 'Thursday',
          'time': '3pm',
          'value': 0.43833,
        }, { 'week': 'Thursday', 'time': '4pm', 'value': 0.244464 }, {
          'week': 'Thursday',
          'time': '5pm',
          'value': 0.550621,
        }, { 'week': 'Thursday', 'time': '6pm', 'value': 0.173093 }, {
          'week': 'Thursday',
          'time': '7pm',
          'value': 0.103659,
        }, { 'week': 'Thursday', 'time': '8pm', 'value': 0.0773 }, {
          'week': 'Thursday',
          'time': '9pm',
          'value': 0.265913,
        }, { 'week': 'Thursday', 'time': '10pm', 'value': 0.099811 }, {
          'week': 'Thursday',
          'time': '11pm',
          'value': 0.076164,
        }, { 'week': 'Friday', 'time': 'Midnight', 'value': 0.132583 }, {
          'week': 'Friday',
          'time': '1am',
          'value': 0.135422,
        }, { 'week': 'Friday', 'time': '2am', 'value': 0.060884 }, {
          'week': 'Friday',
          'time': '3am',
          'value': 0.768601,
        }, { 'week': 'Friday', 'time': '4am', 'value': 0.230771 }, {
          'week': 'Friday',
          'time': '5am',
          'value': 0.07572,
        }, { 'week': 'Friday', 'time': '6am', 'value': 0.210855 }, {
          'week': 'Friday',
          'time': '7am',
          'value': 0.090938,
        }, { 'week': 'Friday', 'time': '8am', 'value': 0.094296 }, {
          'week': 'Friday',
          'time': '9am',
          'value': 0.290368,
        }, { 'week': 'Friday', 'time': '10am', 'value': 0.093755 }, {
          'week': 'Friday',
          'time': '11am',
          'value': 0.099166,
        }, { 'week': 'Friday', 'time': 'Midday', 'value': 0.429278 }, {
          'week': 'Friday',
          'time': '1pm',
          'value': 0.962314,
        }, { 'week': 'Friday', 'time': '2pm', 'value': 0.43833 }, {
          'week': 'Friday',
          'time': '3pm',
          'value': 0.244464,
        }, { 'week': 'Friday', 'time': '4pm', 'value': 0.550621 }, {
          'week': 'Friday',
          'time': '5pm',
          'value': 0.173093,
        }, { 'week': 'Friday', 'time': '6pm', 'value': 0.103659 }, {
          'week': 'Friday',
          'time': '7pm',
          'value': 0.0773,
        }, { 'week': 'Friday', 'time': '8pm', 'value': 0.265913 }, {
          'week': 'Friday',
          'time': '9pm',
          'value': 0.099811,
        }, { 'week': 'Friday', 'time': '10pm', 'value': 0.076164 }, {
          'week': 'Friday',
          'time': '11pm',
          'value': 0.3154,
        }, { 'week': 'Saturday', 'time': 'Midnight', 'value': 0.135422 }, {
          'week': 'Saturday',
          'time': '1am',
          'value': 0.060884,
        }, { 'week': 'Saturday', 'time': '2am', 'value': 0.768601 }, {
          'week': 'Saturday',
          'time': '3am',
          'value': 0.230771,
        }, { 'week': 'Saturday', 'time': '4am', 'value': 0.07572 }, {
          'week': 'Saturday',
          'time': '5am',
          'value': 0.210855,
        }, { 'week': 'Saturday', 'time': '6am', 'value': 0.090938 }, {
          'week': 'Saturday',
          'time': '7am',
          'value': 0.094296,
        }, { 'week': 'Saturday', 'time': '8am', 'value': 0.290368 }, {
          'week': 'Saturday',
          'time': '9am',
          'value': 0.093755,
        }, { 'week': 'Saturday', 'time': '10am', 'value': 0.099166 }, {
          'week': 'Saturday',
          'time': '11am',
          'value': 0.429278,
        }, { 'week': 'Saturday', 'time': 'Midday', 'value': 0.962314 }, {
          'week': 'Saturday',
          'time': '1pm',
          'value': 0.43833,
        }, { 'week': 'Saturday', 'time': '2pm', 'value': 0.244464 }, {
          'week': 'Saturday',
          'time': '3pm',
          'value': 0.550621,
        }, { 'week': 'Saturday', 'time': '4pm', 'value': 0.173093 }, {
          'week': 'Saturday',
          'time': '5pm',
          'value': 0.103659,
        }, { 'week': 'Saturday', 'time': '6pm', 'value': 0.0773 }, {
          'week': 'Saturday',
          'time': '7pm',
          'value': 0.265913,
        }, { 'week': 'Saturday', 'time': '8pm', 'value': 0.099811 }, {
          'week': 'Saturday',
          'time': '9pm',
          'value': 0.076164,
        }, { 'week': 'Saturday', 'time': '10pm', 'value': 0.3154 }, {
          'week': 'Saturday',
          'time': '11pm',
          'value': 0.146557,
        }, { 'week': 'Sunday', 'time': 'Midnight', 'value': 0.060884 }, {
          'week': 'Sunday',
          'time': '1am',
          'value': 0.768601,
        }, { 'week': 'Sunday', 'time': '2am', 'value': 0.230771 }, {
          'week': 'Sunday',
          'time': '3am',
          'value': 0.07572,
        }, { 'week': 'Sunday', 'time': '4am', 'value': 0.210855 }, {
          'week': 'Sunday',
          'time': '5am',
          'value': 0.090938,
        }, { 'week': 'Sunday', 'time': '6am', 'value': 0.094296 }, {
          'week': 'Sunday',
          'time': '7am',
          'value': 0.290368,
        }, { 'week': 'Sunday', 'time': '8am', 'value': 0.093755 }, {
          'week': 'Sunday',
          'time': '9am',
          'value': 0.099166,
        }, { 'week': 'Sunday', 'time': '10am', 'value': 0.429278 }, {
          'week': 'Sunday',
          'time': '11am',
          'value': 0.962314,
        }, { 'week': 'Sunday', 'time': 'Midday', 'value': 0.43833 }, {
          'week': 'Sunday',
          'time': '1pm',
          'value': 0.244464,
        }, { 'week': 'Sunday', 'time': '2pm', 'value': 0.550621 }, {
          'week': 'Sunday',
          'time': '3pm',
          'value': 0.173093,
        }, { 'week': 'Sunday', 'time': '4pm', 'value': 0.103659 }, {
          'week': 'Sunday',
          'time': '5pm',
          'value': 0.0773,
        }, { 'week': 'Sunday', 'time': '6pm', 'value': 0.265913 }, {
          'week': 'Sunday',
          'time': '7pm',
          'value': 0.099811,
        }, { 'week': 'Sunday', 'time': '8pm', 'value': 0.076164 }, {
          'week': 'Sunday',
          'time': '9pm',
          'value': 0.3154,
        }, { 'week': 'Sunday', 'time': '10pm', 'value': 0.146557 }, {
          'week': 'Sunday',
          'time': '11pm',
          'value': 0.108531,
        }];
        chart.source(data);
        chart.coord('polar', {
          innerRadius: 0.2,
        });
        chart.tooltip(false);
        chart.axis('week', {
          grid: null,
          line: null,
          tickLine: null,
          label: null,
        });
        chart.axis('time', {
          line: null,
          tickLine: null,
          grid: null,
          labelOffset: 3,
        });
        chart.polygon().position('time*week').color('value', '#BAE7FF-#1890FF-#0050B3').style({
          stroke: '#fff',
          lineWidth: 1,
        });

        const values = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
        values.map(function(val, idx) {
          chart.guide().text({
            top: true,
            position: [0, idx],
            content: val,
            style: {
              fill: '#fff',
              textAlign: 'center',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
          });
        });
        chart.render();
      },
    },
  ];
}
