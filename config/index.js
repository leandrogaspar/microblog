const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
  console.log(`Using env=${env}`)
  const config = require('./config.json')
  const envConfig = config[env]

  Object.keys(envConfig).forEach((key) => {
    console.log(`Config - adding ${key}:${envConfig[key]} to process.env`)
    process.env[key] = envConfig[key]
  })
}
