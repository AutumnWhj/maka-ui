import MakaUI from '../../src/index.js'
import "../../src/styles/index.scss"

export default ({
  Vue,
  options,
  router
}) => {
  console.log(Vue.use(MakaUI), 66666)
  Vue.use(MakaUI)
}