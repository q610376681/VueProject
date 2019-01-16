import globalConfig from './config.js'

var PSApi = {
  //  方法
  login: globalConfig.ip + '/userLogin',
  getUserBooks: globalConfig.ip + '/getUserBooks',
  getAllCategory: globalConfig.ip + '/getAllCategory',
  releaseBooks: globalConfig.ip + '/releaseBooks',
  uploadBookCover: globalConfig.ip + '/uploadBookCover',
  sellOrRelease: globalConfig.ip + '/sellOrRelease',
  getLatestBooks: globalConfig.ip + '/getLatestBooks',
  getBook: globalConfig.ip + '/getBook',
  getClassifiedBooks: globalConfig.ip + '/getClassifiedBooks',
  getRecommendBooks: globalConfig.ip + '/getRecommendBooks',
  searchBooks: globalConfig.ip + '/searchBooks',
  userRegister: globalConfig.ip + '/userRegister',
  //  静态资源
  imgSrc: globalConfig.imgIp + '/bnuSHBooksImg',
  imgSrcLocal: globalConfig.localWindowsimgIp + '/bookImg'
}

export default PSApi
