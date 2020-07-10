import { setPublicPath } from 'systemjs-webpack-interop'
(<any>window).__SINGLE_SPA_MFE__ && setPublicPath('appName')
