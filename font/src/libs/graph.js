import merge from 'lodash/merge';
import '@/assets/images/logo_small@2x.png';
import { themeColor, apiPath } from './constants';

window.ZoomChartsLicense = 'ZCP-usno4xtor: knowlegene';
window.ZoomChartsLicenseKey = [
    '9ef6e3424ecb1afcb04d135dcee4400d9307bc237e8d475892',
    '12103c3fe11a909b45a2e517ccec5a00a396da1d277bb4c125affb96ddf135e964a532877b17e',
    'c8b74b0eb233065fb7f68f7e0214ed9a6174533bea8432a9722bcb7fc377d24a54887cdf0cbd4',
    'a68aff8ef12ac5692a8d31fbdbf15bc88ab8a10a72c770063dce5554d39506c6bc4881601e21c',
    '8188b417f87832552b3f5c08a6d095dc843524bd6846e7d7dfda09f869698f323a58103e16a8f',
    '3ade36ea3a3c51fbe745a7c5f4368ea55299e02ca504aeaca62ef6545bc2ce04265888fc68a72',
    'e0e3710856befe0791190cb1fd3431b5bbbb72b0238d32045d46369eae4569c5cca122ab1cd96'
].join('');

function netGraph(options) {
    var settings = merge({
        area: { height: 500 },
        advanced: {
            // 修改默认地址
            exportProxyURL: `${apiPath}/api/downLoad/downLoadFile`
        },
        credits: {
            enabled: true,
            enabledOnExport: true,
            url: 'javascript:__techSuport();',
            urlTarget: '_self',
            image: '',
            location: 'inside'
        },
        interaction: {
            zooming: {
                zoomExtent: [0.5, 2],
                autoZoomSize: 0.8,
                initialAutoZoom: true,
                zoomInOnDoubleClick: false
            }
        },
        style: {
            nodeRadiusExtent: [1, 30],
            node: {
                shadowBlur: 0,
                imageCropping: 'fit'
            },
            nodeHovered: {
                shadowBlur: 4,
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                shadowColor: 'rgba(50,50,50,.6)',
            },
            nodeLabel: {
                backgroundStyle: {
                    fillColor: ''
                },
                textStyle: {
                    font: "12px Microsoft Yahei, Helvetica, Arial, sans-serif"
                },
                lineSpacing: 1,
                borderRadius: 0,
                scaleWithSize : false,
                scaleWithZoom : true,
            },
            nodeFocused: {
                // 中心点不使用特殊颜色
                fillColor: ''
            },
            link: {
                toDecoration: 'arrow'
            },
            linkHovered: {
                shadowBlur: 3,
                shadowColor: 'rgba(50,50,50,.5)',
                shadowOffsetY: 1
            },
            linkSelected: {
                shadowBlur: 0,
                shadowColor: 'transparent'
            },
            linkLabel: {
                rotateWithLink: true,
                scaleWithSize: false,
                scaleWithZoom: true,
                borderRadius: 0,
                padding: 0,
                backgroundStyle: {
                    lineColor: 'transparent'
                },
                textStyle: {
                    font: "12px Microsoft Yahei, Helvetica, Arial, sans-serif"
                }
            },
            selection: {
                lineWidth: 0,
                sizeConstant: 3,
                fillColor: themeColor,
                shadowColor: 'rgba(100,100,100,0.5)'
            },
            linkLabelScaleBase: 0.8,
            linkDecorationMinSize: 2.6,
            linkDecorationScale: 4,
            linkStrengthExtent: [.8, 1],
            linkDetailMinZoom: 0.8,
            multilinkSpacing: 10
        },
        toolbar: { enabled: false },
        nodeMenu: { enabled: false },
        localization: {
            closeButton: '关闭',
            dataRequestFailed: '请求数据失败',
            exportNotAvailable: '浏览器不支持',
            loadingLabel: '加载中...',
            menu: {
                close: '关闭',
                collapse: '折叠',
                dynamic: '锁定',
                expand: '展开',
                fixed: '解锁',
                focus: '设为中心',
                hide: '隐藏',
                unfocus: '取消中心'
            }
        }
    }, options);
    // eslint-disable-next-line
    return new NetChart(settings);
}

window.__techSuport = (function () {
    let count = 0;
    let timeoutTimer = null;
    return function () {
        count++;
        if (count >= 3) {
            count = 0;
            alert('\u6280\u672f\u652f\u6301\uff1a\u5317\u4eac\u77e5\u56e0\u667a\u6167\u6570\u636e\u79d1\u6280\u6709\u9650\u516c\u53f8')
        } else {
            clearTimeout(timeoutTimer);
            timeoutTimer = setTimeout(function () {
                count = 0;
            }, 5000);
        }
    }
})();

export default netGraph;