const APP_URL = 'https://demo_feed.tradingview.com'
const api_root = APP_URL + '/getBars'
const history = {}

export default {
    history: history,

    getBars: function(symbolInfo, resolution, from, to, first, limit) {

        var split_symbol = symbolInfo.name.split(/[/]/)
        const qs = {
            fsym: split_symbol[0],
            tsym: split_symbol[1],
            toTs:  to ? to : '',
            limit: limit ? limit : 2000,
            resolution: resolution
        }

        return axios.post(`${api_root}`, qs)
            .then(response => {
                let data = response.data;
                if (data.Response && data.Response === 'Error') {
                    // console.log('CryptoCompare API error:',data.Message)
                    return []
                }

                var bars = data.Data.map(el => {
                   console.log(el);
                    return {
                        time: el.time * 1000, //TradingView requires bar time in ms
                        low: el.low,
                        high: el.high,
                        open: el.open,
                        close: el.close,
                        volume: el.volumefrom,
                        volumeto: 100,
                    }


                })
                if (first) {
                    var lastBar = bars[bars.length - 1]
                    history[symbolInfo.name] = {lastBar: lastBar}
                }

                return bars

            })
            .catch(e => {
                console.log(e);
            })
    }
}
