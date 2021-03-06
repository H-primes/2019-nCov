var pListEN = ['shandong', 'hubei', 'beijing', 'shanghai', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'anhui', 'fujian', 'gansu',
    'guangdong', 'guangxi', 'guizhou', 'hainan', 'hebei', 'henan', 'heilongjiang', 'hunan', 'jilin', 'jiangsu', 'jiangxi', 'liaoning',
    'neimenggu', 'ningxia', 'qinghai', 'shanxi', 'shanxi1', 'sichuan', 'taiwan', 'xizang', 'xinjiang', 'yunnan', 'zhejiang'
];
var pListCN = ['山东', '湖北', '北京', '上海', '天津', '重庆', '香港', '澳门', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北',
    '河南', '黑龙江', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山西', '陕西', '四川', '台湾', '西藏', '新疆', '云南', '浙江'
];

var dataArray;
$.ajax({

    url: "../resource/province.json", //json文件位置，文件名

    type: "GET", //请求方式为get

    dataType: "json", //返回数据格式为json

    async: false,

    success: function(data) { //请求成功完成后要执行的方法 
        //给info赋值给定义好的变量
        dataArray = data;
        //console.log(dataArray);
    }

})

//console.log(dataArray);


var currentConfirmedData = [];
var suspectedData = [];
var curedData = [];
var deadData = [];


function Data(name, value) {
    this.name = name;
    this.value = value;
    //console.log(value);
}


for (var i = 0; i < dataArray.length; i++) {
    currentConfirmedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].currentConfirmedCount));
    //console.log(dataArray[i].currentConfirmedCount);
    suspectedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].suspectedCount));
    curedData.push(new Data(dataArray[i].provinceShortName, dataArray[i].curedCount));
    deadData.push(new Data(dataArray[i].provinceShortName, dataArray[i].deadCount));
}

function showMap() {
    let myChart = echarts.init(document.getElementById('map'));
    let option = {
        title: {
            text: '当前分布',
            subtext: '数据来自丁香园',
            left: 'center'
        },
        tooltip: {
            show: true,
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            //icon: 'circle',
            data: [
                '确诊',
                '死亡',
                '治愈',
            ],
            icon: 'circle'
        },
        visualMap: {
            min: 0,
            max: 2000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            color: ['black', 'rgb(71,6,6)', 'red', 'pink', 'white'],
        },

        series: [{
                name: '确诊',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: currentConfirmedData,
            },
            {
                name: '死亡',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: deadData,
            },
            {
                name: '治愈',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: curedData,
            }
        ]
    };

    myChart.setOption(option);
}