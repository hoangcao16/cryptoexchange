/* eslint-disable */
import historyProvider from './historyProvider'

const supportedResolutions = ["1", "3", "5", "15", "30", "60", "120", "240", "D"]

const config = {
    supported_resolutions: supportedResolutions
}; 

export default {
	onReady: cb => {
	console.log('=====onReady running- pass datafeed confit optiosn to cb')	
		setTimeout(() => cb(config), 0)
		
	},
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		console.log('====Search Symbols running');
	},
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		// expects a symbolInfo object in response
		console.log('======resolveSymbol running - pass symbolInfo objt to cb')
		// console.log('resolveSymbol:',{symbolName})
		var split_data = symbolName.split(/[/]/)

		// console.log({split_data})
		var symbol_stub = {
			name: symbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			theme : 'Black',
		
			minmov: 1,
			pricescale: 100000000,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution:  supportedResolutions,
			volume_precision: 8,
			data_status: 'streaming',
			has_no_volume: true,
		}

		if (split_data[1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
			symbol_stub.pricescale = 100
		}
		setTimeout(function() {
			onSymbolResolvedCallback(symbol_stub)
			// console.log('Resolving that symbol....', symbol_stub)
		}, 0)
		
		
		// onResolveErrorCallback('Not feeling it today')

	},
	getBars: function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {

		console.log('=====getBars running, from'+ from + " to=" + to +  resolution + " data=" + firstDataRequest)
		historyProvider.getBars(symbolInfo, resolution, from, to, firstDataRequest)
		.then(bars => {
			if (bars.length) {
				onHistoryCallback(bars, {noData: false})
			} else {
				onHistoryCallback(bars, {noData: true})
			}
		}).catch(err => {
			console.log({err})
			onErrorCallback(err)
		})

	},
	subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		//console.log('=====subscribeBars runnning')
	},
	unsubscribeBars: subscriberUID => {
		//console.log('=====unsubscribeBars running')
	},
	calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
		//optional
		console.log('=====calculateHistoryDepth running' + resolution + ', resolutionBack=' + resolutionBack
			+ 'intervalBack=' + intervalBack)
		// while optional, this makes sure we request 24 hours of minute data at a time
		// CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
		return resolution < 60 ? {resolutionBack: 'D', intervalBack: '1'} : undefined
	},
	getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getMarks running')
	},
	getTimeScaleMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
		//optional
		console.log('=====getTimeScaleMarks running')
	},
	getServerTime: cb => {
		console.log('=====getServerTime running')
	}
}