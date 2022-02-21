/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Container } from './style';
import { useState, useEffect } from 'react';
import { widget } from './charting_library';
import Datafeed1 from './api/datafeeds';
import { useParams } from 'react-router-dom';
const Chart = props => {
  const tv_chart_container = 'tv_chart_container';
  // const [symbol, setSymbol] = useState('POW:ROB/USDT');
  const libraryPath = '/custom_scripts/chart_main/';
  let { pair } = useParams();
  const findIndex = pair?.indexOf('_');
  const changeFormatPair = `POW:${pair?.substring(
    0,
    findIndex,
  )}/${pair?.substring(findIndex + 1)}`;
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    initTradingView();
  }, [changeFormatPair]);

  const initTradingView = () => {
    const widgetOptions = {
      fullscreen: false,
      autosize: true,
      symbol: changeFormatPair,
      container_id: tv_chart_container,
      library_path: libraryPath,
      datafeed: Datafeed1,
      locale: 'en',
      timezone: 'Asia/Bangkok', //todo: ustawianie timezone'a po strefie usera
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      debug: true,
      // loading_screen:{ backgroundColor: "#00DD00",foregroundColor: "#000000", }, //todo:do it
      interval: '1',
      // timeframe:'',//todo: na koncu
      toolbar_bg: `#1e2329`,
      // saved_data: this.savedData,
      allow_symbol_change: true,
      time_frames: [
        {
          text: '1y',
          resolution: '1W',
        },
        {
          text: '6m',
          resolution: '3D',
        },
        {
          text: '3m',
          resolution: '1D',
        },
        {
          text: '1m',
          resolution: '1D',
        },
        {
          text: '1w',
          resolution: '30',
        },
        {
          text: '3d',
          resolution: '30',
        },
        {
          text: '1d',
          resolution: '30',
        },
        {
          text: '6h',
          resolution: '15',
        },
        {
          text: '1h',
          resolution: '1',
        },
      ],
      drawings_access: {
        type: 'black',
        // tools: [{name: "Regression Trend"}]//todo: moje
        tools: [
          {
            name: 'Trend Line',
            grayed: true,
          },
          {
            name: 'Trend Angle',
            grayed: true,
          },
        ], //todo: bb
      },
      disabled_features: [
        'header_symbol_search',
        // 'header_interval_dialog_button',
        // 'show_interval_dialog_on_key_press',
        // 'symbol_search_hot_key',
        // 'study_dialog_search_control',
        // 'display_market_status',
        // 'header_compare',
        // 'edit_buttons_in_legend',
        // 'symbol_info',
        // 'border_around_the_chart',
        // 'main_series_scale_menu',
        // 'star_some_intervals_by_default',
        // 'datasource_copypaste',
        // 'right_bar_stays_on_scroll',
        // 'context_menus',
        // 'go_to_date',
        // 'compare_symbol',
        // 'border_around_the_chart',
        // 'timezone_menu',
        // 'header_resolutions', //todo: przetestowac
        // 'control_bar', //todo: przetestowac
        // 'edit_buttons_in_legend', //todo: przetestowac
        // 'remove_library_container_border',
      ],
      enabled_features: [
        // 'header_symbol_search',
        'header_interval_dialog_button',
        'show_interval_dialog_on_key_press',
        'symbol_search_hot_key',
        'study_dialog_search_control',
        'display_market_status',
        'header_compare',
        'symbol_info',
        'border_around_the_chart',
        'main_series_scale_menu',
        'star_some_intervals_by_default',
        'datasource_copypaste',
        'right_bar_stays_on_scroll',
        'context_menus',
        'go_to_date',
        'compare_symbol',
        'timezone_menu',
        'header_resolutions', //todo: przetestowac
        'control_bar', //todo: przetestowac
        'edit_buttons_in_legend', //todo: przetestowac
        'remove_library_container_border',
        'dont_show_boolean_study_arguments',
        'use_localstorage_for_settings',
        'save_chart_properties_to_local_storage',
        'side_toolbar_in_fullscreen_mode',
        'hide_last_na_study_output',
        'constraint_dialogs_movement', //todo: nie do końca jestem pewien
      ],
      studies_overrides: {
        'volume.volume.color.0': '#FF00FF',
        'volume.volume.color.1': '#00DD00',
        'volume.volume.transparency': 100,
      },
      overrides: {
        'symbolWatermarkProperties.color': 'rgba(0,0,0, 0)',
        'paneProperties.background': '#1e2329',
        'paneProperties.vertGridProperties.color': '#344568',
        'paneProperties.horzGridProperties.color': '#344568',
        'paneProperties.crossHairProperties.color': '#58637a',
        'paneProperties.crossHairProperties.style': 2,
        'mainSeriesProperties.style': 9,
        'mainSeriesProperties.showCountdown': true,
        'scalesProperties.showSeriesLastValue': true,
        'mainSeriesProperties.visible': false,
        'mainSeriesProperties.showPriceLine': true,
        'mainSeriesProperties.priceLineWidth': 1,
        'mainSeriesProperties.lockScale': false,
        'mainSeriesProperties.minTick': 'default',
        'mainSeriesProperties.extendedHours': false,
        volumePaneSize: 'tiny',
        editorFontsList: [
          'Lato',
          'Arial',
          'Verdana',
          'Courier New',
          'Times New Roman',
        ],
        'paneProperties.topMargin': 5,
        'paneProperties.bottomMargin': 5,
        'paneProperties.leftAxisProperties.autoScale': true,
        'paneProperties.leftAxisProperties.autoScaleDisabled': false,
        'paneProperties.leftAxisProperties.percentage': true,
        'paneProperties.leftAxisProperties.percentageDisabled': true,
        'paneProperties.leftAxisProperties.log': false,
        'paneProperties.leftAxisProperties.logDisabled': false,
        'paneProperties.leftAxisProperties.alignLabels': true,
        // "paneProperties.legendProperties.showStudyArguments": true,
        'paneProperties.legendProperties.showStudyTitles': true,
        'paneProperties.legendProperties.showStudyValues': true,
        'paneProperties.legendProperties.showSeriesTitle': true,
        'paneProperties.legendProperties.showSeriesOHLC': true,
        'scalesProperties.showLeftScale': false,
        'scalesProperties.showRightScale': true,
        'scalesProperties.backgroundColor': '#1e2329',
        'scalesProperties.lineColor': '#1e2329',
        'scalesProperties.textColor': '#8f98ad',
        'scalesProperties.scaleSeriesOnly': false,
        'mainSeriesProperties.priceAxisProperties.autoScale': true,
        'mainSeriesProperties.priceAxisProperties.autoScaleDisabled': false,
        'mainSeriesProperties.priceAxisProperties.percentage': false,
        'mainSeriesProperties.priceAxisProperties.percentageDisabled': false,
        'mainSeriesProperties.priceAxisProperties.log': false,
        'mainSeriesProperties.priceAxisProperties.logDisabled': false,
        'mainSeriesProperties.candleStyle.upColor': '#00DD00',
        'mainSeriesProperties.candleStyle.downColor': '#FF00FF',
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': '#00DD00',
        'mainSeriesProperties.candleStyle.borderUpColor': '#00DD00',
        'mainSeriesProperties.candleStyle.borderDownColor': '#FF00FF',
        'mainSeriesProperties.candleStyle.wickColor': '#737375',
        'mainSeriesProperties.candleStyle.wickUpColor': '#00DD00',
        'mainSeriesProperties.candleStyle.wickDownColor': '#FF00FF',
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.hollowCandleStyle.upColor': '#00DD00',
        'mainSeriesProperties.hollowCandleStyle.downColor': '#FF00FF',
        'mainSeriesProperties.hollowCandleStyle.drawWick': true,
        'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
        'mainSeriesProperties.hollowCandleStyle.borderColor': '#00DD00',
        'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#00DD00',
        'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#FF00FF',
        'mainSeriesProperties.hollowCandleStyle.wickColor': '#737375',
        'mainSeriesProperties.hollowCandleStyle.wickUpColor': '#00DD00',
        'mainSeriesProperties.hollowCandleStyle.wickDownColor': '#FF00FF',
        'mainSeriesProperties.haStyle.upColor': '#00DD00',
        'mainSeriesProperties.haStyle.downColor': '#FF00FF',
        'mainSeriesProperties.haStyle.drawWick': true,
        'mainSeriesProperties.haStyle.drawBorder': true,
        'mainSeriesProperties.haStyle.borderColor': '#00DD00',
        'mainSeriesProperties.haStyle.borderUpColor': '#00DD00',
        'mainSeriesProperties.haStyle.borderDownColor': '#FF00FF',
        'mainSeriesProperties.haStyle.wickColor': '#737375',
        'mainSeriesProperties.haStyle.wickUpColor': '#00DD00',
        'mainSeriesProperties.haStyle.wickDownColor': '#FF00FF',
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.upColor': '#00DD00',
        'mainSeriesProperties.barStyle.downColor': '#FF00FF',
        'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
        'mainSeriesProperties.barStyle.dontDrawOpen': false,
        'mainSeriesProperties.lineStyle.color': '#0cbef3',
        'mainSeriesProperties.lineStyle.linestyle': 0,
        'mainSeriesProperties.lineStyle.linewidth': 1,
        'mainSeriesProperties.lineStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.color1': '#0cbef3',
        'mainSeriesProperties.areaStyle.color2': '#0098c4',
        'mainSeriesProperties.areaStyle.linecolor': '#0cbef3',
        'mainSeriesProperties.areaStyle.linestyle': 0,
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.transparency': 80,
      },
      custom_css_url: 'chart.css',
      // custom_css_url: 'custom_scripts/chart_main/static/chart.css',
    };

    const tvWidget = new widget(widgetOptions);
    tvWidget.onChartReady(() => {
      console.log('mounted:onChartReady');
      const button = tvWidget
        .createButton()
        .attr('title', 'Click to show a notification popup')
        .addClass('apply-common-tooltip')
        .on('click', () =>
          widget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              // eslint-disable-next-line no-console
              console.log('Noticed!');
            },
          }),
        );

      // button[0].innerHTML = 'Check API';
      button[0].style = 'display:none';
    });
  };
  return <Container id={tv_chart_container}> Here is chart</Container>;
};
export default Chart;
