## Vue的data在什么情况下可以是对象，什么情况下必须是函数，为什么？
只有new Vue的时候(Vue2 的main.js中)既可以是对象，也可以是函数，别的情况都必须是函数。

这是因为如果是对象，会出现数据污染，Vue在实例化组件的时候使用的是同一个组件，而使用函数会返回独立的对象。
**在vue2中：**
其实下面这种情况不太会出现，new Vue只会在main.js出现。
```bash
// 根实例：可以是对象或函数
new Vue({
  data: {
    count: 0
  }
  // 或
  // data() { return { count: 0 } }
})

// 组件：必须是函数
Vue.component('my-comp', {
  data() {
    return {
      msg: 'hello'
    }
  }
})
```
// main.js可能出现的情况
```bash
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```
**在vue3中：**

```bash
// 根实例（createApp）：必须是函数
const app = Vue.createApp({
  data() {
    return {
      count: 0
    }
  }
})

// 组件：必须是函数
app.component('my-comp', {
  data() {
    return {
      msg: 'hello'
    }
  }
})
```
你主要记住用函数肯定都是没问题的，只有vue2的new Vue可以使用对象的形式，因为这里的data本身就是全局的，虽然一般也不会用。
**使用函数的原因是避免数据污染。**

## 为什么定义props的默认值为数组或者对象的时候，需要时候函数？
为了防止数据污染，使用对象或者数组，在实例化的时候会返回同一个引用。
这个问题和data问题是同一个原因。
## 箭头函数最初的设计目的是什么？
1.简化代码。没什么好说的。
2.避免传统方法this指向难以把控的问题。因为箭头函数的指向是有明确规律的，向上查找就行，比较容易控制，而传统funtion,可能被对象调用，可能被方法调用，this指向是非常难以把控的。
## 怎么实现图片在浏览器伸缩的时候实现自适应？
我被问过这个问题，我回答百分比，媒体查询，vh,vw，面试官都不满意，问chatgpt,可能是想问下面的内容：
```css
img {
  width: 30%;
  height: auto;
}
```
## 有1w条数据，不能分页，怎么做数据优化？
使用虚拟列表。可以用第三方库vue-virturl-scroller。
怎么手动实现虚拟列表？
1.计算每项高度和容器高度。
2.监听滚动事件，计算出滚动的起始结束索引。
3.只渲染这部分的DOM(需要上下多渲染一个，避免出现半个item的情况)
4.通过translateY把需要渲染的item正确的现实出来。

## 浏览器如何实现跨tab通信？
localStorage。addListener("storage")是可以监听这个事件的。 

sessionStorage只在当前tab有效。

这个题目实际上是localStorage和sessionStorage有什么区别的变种问题。
## 如何上传大文件
通过分片。axios支持这个功能。需要调用两次接口，第一个接口循环上传分片，都上传完成后，调用第二个接口通知后端完成，后端自己去完成合并。

```bash
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <div v-if="progress > 0">上传进度：{{ progress }}%</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const CHUNK_SIZE = 2 * 1024 * 1024 // 2MB
const progress = ref(0)

function handleFileChange(e) {
  const file = e.target.files[0]
  if (!file) return
  uploadFileInChunks(file)
}

async function uploadFileInChunks(file) {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
  let uploaded = 0

  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE
    const end = Math.min(file.size, start + CHUNK_SIZE)
    const chunk = file.slice(start, end)
    const formData = new FormData()
    formData.append('file', chunk)
    formData.append('filename', file.name)
    formData.append('index', i)
    formData.append('total', totalChunks)

    await axios.post('/api/upload', formData)
    uploaded++
    progress.value = Math.floor((uploaded / totalChunks) * 100)
  }

  // 可选：通知后端合并分片
  await axios.post('/api/merge', { filename: file.name, total: totalChunks })
  alert('上传完成')
}
</script>
```

## 组件生命周期
### 说说组件的生命周期
也可能叫你聊聊Vue2和Vue3的生命周期？
**题目目的**
考察你对组件生命周期的理解。
**注意点**
需要回答出几个完整的生命周期。
vue2和vue3是生命周期是有区别的。
**标准答案：**
vue2的生命周期分别是：
(把生命周期背一遍给面试官听)
```javascript
beforeCreate()
created()
beforeMount()
mounted()
beforeUpdate()
updated()
beforeDestroy()
destroyed()
```
vue3是生命周期：
```javascript
onBeforeMount()
onMounted()
onBeforeUpdate()
onUpdated()
onBeforeDestroy()
onDestroyed()
```
setup()相当于created(),还要keep-alive相关的两个生命周期，onActivated()和onDectivated()
```java
setup()//相当于created()
//keepalive相关的两个生命周期
onActivated()
onDectivated()
```
**补充**
把生命周期按照顺序背一遍，再把vue2和vue3的区别说一下就差不多了。具体生命周期的作用还是非常好回答的。
### created和mounted分别有什么作用？
created()被执行的时候，组件实例已经被创建，可以访问数据和方法。但组件还没有挂载到DOM上。
这个时候可以对数据进行一些初始化操作，发送网络请求。
mounted()被执行的时候，组件已经挂载到DOM上，这时候可以做一些和DOM相关的操作。
## 组件之间的传值
### 组件都有哪些传值方式？
这是一个非常笼统的提问，也可以问的非常细致。下面的回答是非常全面的。
**标准答案：**
**父传子：**
通过props实现父组件对子组件的传值。
**子传父：**
通过this.$emit()和v-on的方式（vue2，回答这个就差不多了）。
vue3通过defineEmits定义emit，通过@event-name的形式实现回调函数。 
**兄弟组件：**
通过pinia或者vuex这些状态管理库实现。或者通过eventbus,mitt这些第三方工具实现。
**隔代传递组件：**
通过provide和inject实现。
## Vue的是怎么实现的响应式的（是什么原理）？vue2和vue3有什么区别？
**标准答案：**
都是通过数据拦截的方式。vue2是通过Object.defineProperty实现的数据拦截。而vue3是通过Proxy的方式实现拦截，这种方式更加的高效。
### Proxy为什么高效？
Proxy可以之间对所有属性进行拦截，defineProperty需要遍历每个属性，并且不能之间处理数组和对象。
### vue2为什么不使用Proxy实现？
vue2是2016发布的，那时候es5发布不久，考虑到浏览器兼容性问题，所有vue2没有使用proxy。

## 双向绑定
### 如何实现组件的双向绑定？v-model 的原理是什么？
通过v-model或者通过v-value及事件回调来实现双向绑定，v-model只是后者的语法糖。

v-model就是语法糖。原理就是通过:value加事件回调来实现数据的绑定。
###  双向绑定和响应式是什么关系？
双向绑定是需要响应式支持的，有响应式才能实现双向绑定。更切确的说，响应式就是单向绑定，而双向绑定需要响应式加监听事件的组合。
## 模板编译和渲染流程
### 说说 Vue 的模板编译和渲染流程
把下面的流程说一遍就差不多了。

模板-->ast-->render函数-->虚拟DOM(vnode)-->diff算法-->真实DOM

先通过解析模板代码生成ast,再通过ast生成render函数，通过render函数返回虚拟DOM(vnode)，再通过diff算法对比，更新到真实DOM。（第一次也会调用diff算法，只是执行步骤比较简单）
### 说说vue的diff算法
同层比较，双端比较，key值标记，静态节点优化（vue3）。
react是单端比较。
## 懒加载
### 你是怎么实现组件懒加载的？
路由懒加载：()=>import()
普通懒加载：defineAsyncComponnt()
普通懒加载非常少用，一般都用路由懒加载实现。



## Vue3 的 Teleport、Suspense、Fragment 分别有什么作用？
这三个都是Vue3才有的新特性。
Teleport可以将组件渲染到任意的节点。一般用于Dialog，弹窗等功能。
Suspense是悬念的意思，一般用于loading时占位。

## Vuex相关
### 什么是 Vuex？它解决了什么问题？
Vuex是Vue推出的一个状态管理库。主要解决组件之间传值复杂，状态同步困难的问题。
### Vuex 的核心概念有哪些？分别有什么作用？
state:存储全局共享状态。
getter:从state中派生出一些状态。（类似于计算属性）
mutation:唯一可以修改state的方法，必须同步。
action:提交mutation,可以包含异步操作。
module:模块化管理不同业务的状态。
### 为什么 mutation 必须是同步的？action 可以异步吗？
mutation必须同步是为了保证状态变化可跟踪，浏览器插件能同步感知状态变化。action可以异步，可以发送网络请求，执行定时器等异步操作。
### 如何在组件中访问和修改 Vuex 的 state？
访问：this.\$store.state.xxx。或者通过mapState辅助函数。
修改：this.\$store.commit("mutationName",payload)提交commit,或者通过mapMutation辅助函数。
### 如何触发action?
this.\$store.dispatch("actionName",payload)
### 如何实现模块化 Vuex？模块之间如何通信？如何访问具体的模块
使用modules属性引入不同的store业务模块。模块之间可以通过根state或者dispatch或者commit进行通信。

通过this.\$store.dispatch('模块名/actionName',payload)或者this.\$store.commit("模块名/mutationName",payload)
### 如何在 Vuex 中做持久化存储？常见方案有哪些？
可以使用vuex-persistedstate这个插件。可以持久化到localStorage,sessionStorage,indexedDb。
### 说说vuex操作流程
组件 \=\=> dispatch(action)(可选) \=\=> commit(mutation) \=\=> state \=\=> 页面响应更新。
## Pinia相关
### 说说Pinia的流程
组件 \=\=> action \=\=> state \=\=> 页面响应更新。
### pinia有什么优势？和vuex的区别
pinia是vuex退出的最新一代状态管理工具。相比于vuex语法更加简单，更加高效，性能也更好。
和vuex相比，没有mutation，操作更加简单。可以直接修改state。
### Pinia 的核心概念有哪些？分别有什么作用？
state:存储全局状态
getter:对state进行派生数据，类似于计算属性computed。
action:执行业务操作，可以执行同步，异步操作。可以直接操作state。
### 如何在组件中访问和修改 Pinia 的 state？
在pinia中，可以直接操作state。

```bash
const countStore=useCountStore()
countStore.count++
```
###  Pinia 如何实现模块化和持久化？
每个 store 文件就是一个模块，按需导入即可。持久化可用插件（如 pinia-plugin-persist）自动同步到 localStorage、sessionStorage 等。
## Vue Router相关
### 什么是Vue Router?他的核心作用是什么？
Vue Router是Vue官方推出的路由管理工具。核心作用是实现页面切换和组件导航。
### 有几种路由模式？区别是什么？
有hash，history和abstract（memory）模式。
hash带#。服务器只关心#前面的内容，#后面的内容前端处理。
history和传统路径一样，看起来更美观。有利于SEO。
内存路由在Router3叫mode:"abstract",在Router4叫createMemoryHistory。
### 如何在 Vue 组件中进行路由跳转？请写出两种方式。
\<router-link :to="path"\>或者this.$router.push(“path”)或者useRouter().push("path")。
### 什么是动态路由？如何在 Vue Router 中配置动态路由？
动态路由是指路径中带参数的路由。如/user/:id,配置是{path:"/user/:id",component:User}
### 如何实现路由懒加载？请写出代码示例。
{path:"/user/:id",component:()=>import("./User.vue")}
### 什么是嵌套路由？如何配置嵌套路由？
使用children属性。
{
	path:"/user:id",
	component:()=>import(".User.vue"),
	children:[
		{
			path:"info",
			 component:()=>import("./Info.vue")
		}
	]
}

### 如何获取当前路由的参数、查询参数？
参数：this.\$route.params。
查询参数：this.\$router.query。
在setup中使用useRoute。

如果是连续路由，例如/user/:id/:postid,路由会按照先后顺序匹配，可以通过this.\$router.params.id和this.\$router.params.postid分别获取到这两个动态路由，这两个动态参数是平级关系，不是父子关系。
### 路由守卫（导航守卫）有哪些类型？分别在什么场景下使用？
全局守卫：主要用于登录校验，全局数据。
before((to,from,next)=>{
	if(to.isLogin()){
		login()//
	}else{
		next()//放行
	}
})
路由独享守卫：单路由校验。
组件内守卫：跳转确认，路由信息更新。
### 如何在 Vue Router 中实现 404 页面？ 
直接说文档有例子就行了。
添加最后一个路由：{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
### 如何在 Vue Router 中实现路由重定向？
使用redirect属性。
{path:"/path",redirect:"/targetPath"}
## SSR相关
### 什么是 SSR？它和 CSR 有什么区别？
Server-Side-Render.服务端渲染。
## uniapp相关
### uniapp的生命周期有什么？和Vue的生命周期有什么区别？
onLoad:页面加载。
onShow:页面显示。
onHide:页面隐藏。
onUnload:页面销毁。
和Vue的区别是页面和组件的区别。这几个生命周期是相对于页面的，也Vue的生命周期是相对于组件的。在我们的实现是页面的时候，可以使用页面的生命周期，实现是组件的时候使用组件的生命周期。
### 如何在 uni-app 中实现页面跳转？常用的 API 有哪些？
一般使用uni.navigateTo()，uni.redirect()，uni.switchTab()。
uni.navigateTo:跳转到页面，有栈结构。
uni.redirect:关闭当前页面，并跳转到目标页面，栈结构还在。
uni.relaunch:关闭所有页面，重启到指定页面。（跳转到登录页面）
uni.switcTab:切换tab。
### uni-app 的全局样式和局部样式如何设置？
在App的style标签中或者uni.scss中定义全局样式。在组件或者页面的<style scoped\>中定义局部样式。
### uni-app 如何实现组件通信？有哪些方式？
props,emit和on，provider和inject，eventBus，vuex,pinia。
### uni-app 的条件编译是什么？如何使用？
可以指定平台进行编译，实现差异化编译。#ifdef,#enddef,后面可以指定平台。
### uni-app 如何调用原生能力（如摄像头、定位等）？
通过uni.getLocation,uni.scanCode。
### uni-app 的数据存储方式有哪些？
uni.getStorage,uni.setStorage。vuex,pinia。
### uni-app 如何实现网络请求？推荐用什么 API？
uni.request发送网络请求，也可以使用axios，但uni.request的兼容性更好。