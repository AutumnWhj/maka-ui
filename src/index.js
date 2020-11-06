import Button from './packages/button'

console.log(3333, Button)
const components = {
  mkButton: Button
}

const install = function (Vue, options = {}) {

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });


  // Vue.prototype.$message = Message;
  // Vue.prototype.$notice = Notice;
}

export default install