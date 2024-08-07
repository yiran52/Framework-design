import { Line } from '@ant-design/plots';

export const DemoLine = () => {
  const data = [
    { year: '1991', value: 3, type: 'A' },
    { year: '1992', value: 4, type: 'A' },
    { year: '1993', value: 3.5, type: 'A' },
    { year: '1994', value: 5, type: 'A' },
    { year: '1995', value: 4.9, type: 'A' },
    { year: '1996', value: 6, type: 'A' },
    { year: '1997', value: 7, type: 'A' },
    { year: '1998', value: 9, type: 'A' },
    { year: '1999', value: 13, type: 'A' },
    { year: '1991', value: 2, type: 'B' },
    { year: '1992', value: 3, type: 'B' },
    { year: '1993', value: 2.5, type: 'B' },
    { year: '1994', value: 4, type: 'B' },
    { year: '1995', value: 3.9, type: 'B' },
    { year: '1996', value: 5, type: 'B' },
    { year: '1997', value: 6, type: 'B' },
    { year: '1998', value: 8, type: 'B' },
    { year: '1999', value: 12, type: 'B' },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    lineStyle: {
      lineWidth: 2,
    },
    label:{
        position: 'top', // 标签位置在数据点的上方
        style: {
          fill: 'red', // 文本颜色
          fontSize: 12, // 字体大小
          fontWeight: 'bold', // 字体粗细
          opacity: 0.6, // 文本透明度
        },
        offset: 10, // 文本与数据点的距离为10
    }
  };

  return <Line {...config} />;
};
