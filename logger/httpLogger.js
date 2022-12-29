const morgan = require('morgan')
const json  =require('morgan-json')
const logger = require('./logger')


// const format = json({
//   short: ':method :url :status',
//   length: ':res[content-length]',
//   'response-time': ':response-time ms'
// });

const format = json({
  method :':method',
  url : ':url' ,
  status : ':status',
  contentLength: ':res[content-length]',
  responseTime: ':response-time ms'
});

// const httpLogger = morgan(format)
const httpLogger= morgan(format,{
  stream: {
    write: (message) => {
      // winston.info(message);
      const { method, url, status, contentLength, responseTime } = JSON.parse(message)
      logger.info('HTTP Access log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime:Number(responseTime)

      })
    }
  }
})

module.exports = httpLogger
