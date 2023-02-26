let REACT_APP_BACKEND_URL = ''
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  REACT_APP_BACKEND_URL = 'http://localhost:3001'
}

export { REACT_APP_BACKEND_URL }
