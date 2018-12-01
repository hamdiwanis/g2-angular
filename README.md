# ngx-f2
Angular for Antvis [F2](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)

[![NPM version](https://img.shields.io/npm/v/ngx-f2.svg)](https://www.npmjs.com/package/ngx-f2)

## Demo

- [Live Demo](https://hamdiwanis.github.io/ngx-f2/)

> This is a fork of [g2-angular](https://github.com/cipchk/g2-angular) by [cipchk](https://github.com/cipchk/g2-angular) but for F2 instead check it out if you use G2

## Install

### 1. You can install `ngx-f2` from npm.

```bash
npm install ngx-f2 --save
```

### 2. **Important:** You need install and include `f2` library in app via `webpack bundler` or `html`.

**A: webpack bundler**

```bash
npm install @antv/f2 --save
```

You can choose load `f2` script file via `.angular-cli.json` or Lazy load.

*(Recommend)*
```json
// .angular-cli.json
"scripts": [
  "../node_modules/@antv/f2/dist/f2.min.js"
]
```

or

```typescript
import { G2ChartModule } from 'ngx-f2';

@NgModule({
  imports: [
    G2ChartModule.forRoot({
      js: 'https://gw.alipayobjects.com/os/antv/assets/f2/3.3.0/f2.min.js'
    })
  ]
});
```

**B: index.html**

```html
<script src="https://gw.alipayobjects.com/os/antv/assets/f2/3.3.0/f2.min.js"></script>
```

## How to use it with:

```html
<f2-chart [options]="options" (ready)="ready($event)"></f2-chart>
```

```js
      options = {
        height: 300,
        forceFit: true,
      }
      
      ready(chart) {
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
      }
```

see the demo for more details
+ `angular-cli` please refer to [demo](./demo/src/app/).

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/hamdiwanis/ngx-f2/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/hamdiwanis/ngx-f2/blob/master/LICENSE) file for the full text)
