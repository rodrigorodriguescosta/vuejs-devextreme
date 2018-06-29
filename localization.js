// DevExtreme Globalize integration
import 'devextreme/localization/globalize/number'
import 'devextreme/localization/globalize/date'
import 'devextreme/localization/globalize/currency'
import 'devextreme/localization/globalize/message'


// DevExtreme messages (en messages already included)
var deMessages = require('devextreme/localization/messages/pt.json')

// CLDR data
var deCaGregorian = require('cldr-data/main/pt/ca-gregorian.json')
var deNumbers = require('cldr-data/main/pt/numbers.json')
var deCurrencies = require('cldr-data/main/pt/currencies.json')

var likelySubtags = require('cldr-data/supplemental/likelySubtags.json')
var timeData = require('cldr-data/supplemental/timeData.json')
var weekData = require('cldr-data/supplemental/weekData.json')
var currencyData = require('cldr-data/supplemental/currencyData.json')
var numberingSystems = require('cldr-data/supplemental/numberingSystems.json')

window.Globalize = require('globalize')

Globalize.load(
  deCaGregorian,
  deNumbers,
  deCurrencies,

  likelySubtags,
  timeData,
  weekData,
  currencyData,
  numberingSystems
)
Globalize.loadMessages(deMessages)
Globalize.locale('pt')
