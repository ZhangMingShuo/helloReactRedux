# reactReduxStart

## 说明

本仓库代码参考书籍`《深入浅出React和Redux》`，因为我看的太晚了，书中的案例都是基于`react@15.x.x`，`react-dom@15.x.x`，`redux@3.6.0`，`react-redux@5.0.1`，当我在这本书的时候根据根据脚手架下载下来的demo中各个依赖的版本已经不再是这些了，因为在很多地方有些方式的使用会和这本书提供的代码不大一样，当然了，那必须是进步的，因为新的版本已经不再兼容老的使用方法啦！

## 开始一个React应用

* `npm install create-react-app -g`全局安装工具包
* `create-react-app first_react_app`新建项目
* `cd first_react_app`进入项目
* `npm start`运行初始项目
* 自动开启页面[localhost://3000](localhost://3000)

congratulation！第一个React应用诞生啦！

## JSX

### JSX简介

所谓`JSX`其实是JS的语法扩展，从代码中也可以看到，这种语法让我们可以在JS中编写像`HTML`一样的代码。但是我们需要明白`JSX`和`HTML`到底有什么不同：

首先，`JSX`中使用的“元素”不局限于`HTML`中的元素，可以是任何一个`React`组件，这里需要注意的一点是：`React`判断一个元素是`HTML`元素还是`React`组件的原则就是_看第一个字母是否大写_；

其次，在`JSX`中可以通过`onClick`这样的方式给一个元素添加一个事件处理函数（注意是`onClick`不是`onclick`）

#### JSX的进步

看到上面第二条是不是感觉到一个困惑，长期以来不是一直不提倡在`HTML`中使用`onclick``么，那为什么在React`的`JSX`中我们却要使用`onClick`这样的方式来添加事件处理函数呢？

首先我们说一下`HTML`中直接使用`onclick`不专业的原因：

* `onclick`添加的事件处理函数是全局环境下执行的，污染了全局环境很容易产生bug
* 给很多`DOM`元素添加`onclick`事件可能会影响网页的性能
* 对于使用`onclick`的`DOM`元素，如果要动态从`DOM`树中删除的话，需要把对应的事件处理注销，否则可能造成内存泄漏产生bug

而这些问题，`JSX`中都不存在：

* `onClick`挂载的每个函数都可以控制在组件范围内，不会污染全局空间，使用的事件委托方式处理点击事件性能当然比为每个`onClick`都挂载一个事件处理函数要高
* `React`控制了组件的生命周期，在`unmount`的时候自然可以清除相关的所有事件处理函数，内存泄漏也不再是一个问题

#### React的工作方式

要了解一样东西的特点，最好的方法当然是拿这个东西和另一样东西作比较，这里拿`jQuery`来比较好了。

##### jQuery理念

`jQuery`的解决方案是：根据`CSS`规则找到对应`id`值的元素，挂上一个匿名事件处理函数，在事件处理函数中选中需要被修改的`DOM`元素，读取其中的文本值加以修改，然后修改这个`DOM`元素。

这是一种最容易理解的开发模式（找到它，然后修改它），但是当项目越来越庞大，这种模式会造成代码结构复杂，难以维护，相信每个`jQuery`使用者都会是这种体会

##### React理念

`React`开发应用组件并没有像`jQuery`那样“找到它，然后做一些事”。

`React`的理念，就像是一个函数（render），用户看到的界面（UI）就是这个函数的执行结果，只接受数据（data）作为参数，就像这样：

$$UI=render(data)$$

## React组件数据

`React`组件数据分为两种：`prop`和`state`。设计组件的时候关于数据的一个原则就是，`prop`是组件的对外接口，`state`是组件的内部状态，对外用`prop`，内部用`state`

### prop

`prop`是从外部传递给组件的数据，每个组件都是独立存在的模块，组件之外的一切都是外部世界，外部世界就是通过`prop`来和组件对话。

#### 赋值

具体使用呢，就像组件的`HTML`属性一样写在组件标签上的就是它的`prop`

```react
<SampleButton onClick={onButtonClick} cards={this.cards} />
```

#### 读取

一个组件需要定义自己的构造函数一定要在构造函数的第一行通过`super`调用父类也就是`React.Component`的构造函数，否则类实例的所有成员函数都无法通过`this.props`访问到父组件传递过来的`props`值，prop的读取也是很简单

```react
class SampleButton extents Component {
    constructor(props){
        super(props)
    }
    this.state = {
        cards: props.cards
    }
}
```

### `state`

`state`代表组件的内部状态，也就是组件内部使用的变量放在`state`中，且`state`必须是对象，即使这个组件只有一个属性，也需要写到`state`对象中，唯一需要注意的就是修改`state`中的值的时候需要使用`setState`方法，而不能直接重新赋值`state`的值，必须这样

```react
this.setState({count: this.state.count + 1})
```

而不能这样

```
this.state.count = this.state.count + 1
```

### 对比

组件的`state`存在的意义就是被修改，每一次通过`this.setState`函数修改`state`就改变了组件的状态然后通过渲染过程把这种变化体现出来

组件绝不应该去修改传入的`props`值，这样可能让程序陷入一团混乱中，完全违背了`React`设计的初衷

## 组件的生命周期

`React`定义组件的生命周期可能会经历以下三个过程：

* 装载过程（`Mount`）
* 更新过程（`Update`）
* 卸载过程（`Unmount`）

三种不同的过程会依次调用组件的一些成员函数，这些函数称为生命周期函数，定制一个`React`组件，实际上就是定制这些生命周期函数

### 装载过程（`Mount`）

#### `constructor`

要创造一个组件类的实例，当然会调用对应的构造函数。当然，并不是每个组件都需要定义自己的构造函数，无状态的组件就不需要，需要构造函数的组件往往是为了以下目的：

* 初始化`state`
* 绑定成员函数的`this`环境

#### `render`

这是`React`组件最重要的函数，一个`React`函数可以忽略其他所有函数都不实现，但是一定要实现`render`函数。`render`函数只是返回一个`JSX`描述的结构，如果组件不用渲染界面不需要返回页面结构，就让`render`函数返回一个`null`或者`false`即可

#### `componentWillMount`和`componentDidMount`

在组件装载过程中，`componentWillMount`会在调用`render`函数之前，`componentDidMount`会在调用`render`函数之后。

通常不用定义`componentWillMount`函数，因为它是发生在“将要装载”时候，这个时候没有任何渲染出来的结果。

`componentDidMount`函数的作用就很大了，它被调用的时候`render`函数返回的东西已经发生了渲染，组件已经被装载到`DOM`树上了

需要注意的是，`componentWillMount`都是紧贴着自己组件的`render`函数之前被调用，但是`componentDidMount`函数并不是紧跟着`render`函数之后被调用的，假设当前页面有三个组件，三个组件的`componentDidMount`函数是在最后连在一起被调用的，打印出周期函数执行过程如下：

```php+HTML
constructor: First
componentWillMount First
render First
constructor: Second
componentWillMount Second
render Second
constructor: Third
componentWillMount Third
render Third
componentDidMount First
componentDidMount Second
componentDidMount Third
```

### 更新过程（`Update`）

当`props`或者`state`被修改的时候，就会引发组件的更新过程

#### `componentWillRecieveProps(nextProps)`

只要是父组件的`render`函数被调用，在`render`函数里面被渲染的子组件就会经历更新过程，不管父组件传给子组件的`props`有没有改变，都会触发子组件的`componentWillRecieveProps`函数，但是，通过`this.setState`方法触发的更新过程并不会调用这个函数，它只是根据新的`props`值来计算出是不是要更新内部状态的`state`

#### `shouldComponentUpdate(nextProps,nextState)`

说`render`函数重要，是因为`render`函数决定了该渲染什么，而说`shouldComponentUpdate`函数重要，是因为它决定了一个组件什么时候不需要渲染

在更新过程中，`React`库首先调用`shouldComponentUpdate`函数，如果这个函数返回`true`就会继续更新过程，接下来调用`render`函数；否则就立刻停止更新过程，也就不会引发后续的渲染了

这个函数重要是因为只要这个函数使用恰当，就能够大大提高`React`组件的性能，虽然`React`的渲染性能已经很不错了，但是，不管渲染有多快，如果发现没必要重新渲染，那就干脆不用渲染速度会更快

#### `componentWillUpdate`和`componentDidUpdate`

如果`shouldComponentUpdate`函数返回true，React接下来就会依次调用对应组件的`componentWillUpdate`和`componentDidUpdate`函数

### 卸载过程（`Unmount`）

#### `componentWillUnmount`

当React组件要从DOM树上删除掉之前，对应的`componentWillUnmount`函数会被调用，往往和`componentDidMount`函数有关。比如，在`componentDidMount`中创造了一些`DOM`元素，如果不管可能会造成内存泄漏，那就需要在`componentWillUnmount`中把这些创造的`DOM`元素清理掉。

#### `state`和`prop`的局限

在我们的第二个案例（`control_panel`）中，每个`Counter`组件都有自己的状态记录当前计数，而父组件`ControlPanel`也有一个状态来存储所有`Counter`计数之和，也就是数据发生了重复

数据如果出现了重复，带来的问题就是如何保证重复的数据始终一致，如果数据存多份而且不一致，那就很难决定到底使用哪个数据作为正确结果了

还有一个问题就是如果在一个应用中包含三级或者三级以上的组件结构，顶层的祖父组件想要传递一个数据给最低层的子组件，如果用`prop`的方式，就只能通过父组件中转，即使这个父组件根本不需要这个值，那也要搬运这个值，暂且不说是不是违反了低耦合的设计要求了，想想都恶心不是么

所以，全局状态就是唯一可靠的数据源，这就是`Flux`和`Redux`中`Store`的概念

## Flux

##### 我理解的Flux流程

在`controlPanel`实例中，通过`Flux`对原本的`React`程序进行了改造，基本的逻辑可以理解为：

* 首先需要一个全局唯一的`AppDispatcher.js`文件
* 每个模块（`Counter`和`Summary`）都有一个自己的`Store`文件用来存储自己的数据，同时还要register自己模块要用到的方法到上面的`AppDispatcher`上
* `Actions`用来存放用户的所有交互事件，调用这里的方法来`dispatch`事件
* `AppDispatcher`收到`Actions`文件dispatch来的方法就会调用之前在`Store`中register到`AppDispatcher`上的事件

也就是说每个模块都有一个自己的`Store`保存和处理数据并可以注册事件到唯一的`Dispatcher`上，`Actions`用来派发这些在不同模块中注册的事件。

以这个实例为例，`CounterStore`中注册的事件中，计算更新完组件需要的数据后还会触发`change`事件，对应的，组件`Counter`要在组件开始时注册这个`change`事件并绑定相应的触发函数，这样才能在数据发生变化时拿到最新的值。

在完全只用`React`实现的版本里，用户的交互操作引发的事件处理函数直接通过`this.setState`改变组件的状态，在`Flux`实现版本中，用户的操作引发的是一个动作的派发，这个派发会发送给所有`Store`对象，引起`Store`对象的状态改变，而不是直接引发组件的状态改变，因为组件的状态是`Store`状态的映射，所以改变了`Store`对象也就触发了`React`组件对象的状态改变，从而改变了界面的重新渲染。

##### `waitFor`

`waitFor`接受一个数组作为参数，数组中每一个元素都是一个register函数的返回结果，也就是所谓的`dispatchToken`，在调用`waitFor`函数的时候，把控制权交给Dispatcher，让它检查一下`dispatchToken`代表的回调函数有没有被执行，如果已经执行那就直接继续，否则就等`dispatchToken`代表的回调函数执行后`waitFor`再返回。

##### `Flux`优点

在`Flux`理念里，如果要改变界面必须改变`Store`中的状态，如果要改变`Store`中的状态，必须派发一个`action`对象给`Dispatcher`，在这种规矩之下想要追溯一个应用的逻辑就变得非常容易，简而言之就是，在`Flux`体系下，驱动界面改变始于一个动作的派发，别无他法。

##### `Flux`不足

* 在`Flux`体系中，如果两个`Store`之间有逻辑依赖关系就必须用上`Dispatcher`的`waitFor`函数
* 难以进行服务器端渲染
* `Store`混杂了逻辑和状态

So，`Redux`出现了...

## `Redux`

### 基本原则

#### 唯一数据源

应用的状态数据应该只存储在唯一的一个`Store`上

在`Flux`中，应用可以拥有多个`Store`，根据功能把应用状态数据进行划分存储给若干个`Store`中，这样容易造成数据冗余，虽然利用`waitFor`方法可以保证多个`Store`之间的更新顺序，但是产生了不同`Store`之间的依赖关系，说好的不依赖的呢？说好的相互独立呢？所以，`Redux`整个应用只保持一个`Store`，那如何设计这个`Store`结构就是`Redux`的核心问题了。

#### 保持状态只读

不能去直接修改状态，要修改必须通过派发，改变状态的方法不是去修改状态上值，而是创建一个新的状态对象返回给`Redux`，由`Redux`完成新的状态组装

#### 数据改变只能通过纯函数完成

这里所说的纯函数就是`Reducer`，`Redux`中每个`reducer`函数签名如下

$reducer(state, action)$

第一个参数`state`是当前状态，第二个参数`action`是接收到的`action`对象，`reducer`根据`state`和`action`的值产生一个新的对象返回

#### `Flux`和`Redux`处理`Store`

`Flux`中的`Store`处理函数

```react
CounterStore.dispatchToken = AppDispatcher.register(action=>{
  if(action.type===ActionTypes.INCREMENT){
    counterValues[action.counterCaption]++
    CounterStore.emitChange()
  }else if(action.type===ActionTypes.DECREMENT){
    counterValues[action.counterCaption]--
    CounterStore.emitChange()
  }
})
```

`Redux`中实现方法

```react
function reducer(state, action) => {
  const {counterCaption} = action
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1}
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1}
    default:
      return state
  }
}
```

`reducer`函数不光接受`action`为参数，还接受`state`为参数，`reducer`只负责计算状态，不负责存储状态

### `Redux`实例

#### `Actions`

``control_panel_flux`和`control_panel_redux`是分别用`Flux`和`Redux`实现相同应用的代码，从应用的`src/Actions.js`文件对比就会发现，`Redux`中每个`action`构造函数都返回一个`action`对象，而`Flux`中`action`构造函数并不返回什么，而是把构造的动作函数立刻通过调用`Dispatcher`的`dispatch`函数派发出去。因为，在`Redux`中，函数都是不做什么产生副作用的动作，而是返回一个对象，如何处理这个对象的工作还是交给调用者的。

`control_panel_flux`：

```react
export const increment = (counterCaption)=>{
  AppDispatcher.dispatch({
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  })
}

export const decrement = (counterCaption)=>{
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  })
}
```

`control_panel_redux`：

```react
export const increment = (counterCaption)=>{
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  }
}

export const decrement = (counterCaption)=>{
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  }
}
```

#### `Dispatcher`

`Flux`中我们用到的`Dispatcher`对象作用就是把一个`action`对象分发给多个注册了的`Store`，既然`Redux`让全局只有一个`Store`所以就没必要再创造一个`Dispatcher`，直接简化成`Store`对象上的一个函数`dispatch`就可以啦，毕竟只有一个`Store`，要分发也是分发给这个`Store`，就调用`Store`上一个表示分发的函数，多合情合理。

#### `createStore`

`Redux`的`createStore`方法用来注册一个`store`，返回值为包含了若干方法的对象：

```js
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

export default function createStore(){
    
    function getState(){}
    
    function dispatch(){}
    
    function subscribe(){}
    
    function replaceReducer(){}
    
    dispatch({ type: ActionTypes.INIT })
    
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer
    }
}
```

其中

- `dispatch`：分发`action`，根据`action`查询`reducer`中变更`state`的方法，更新`store tree`，变更`store tree`后，依次执行`listener`中所有响应函数
- `subscribe`：注册`listener`，监听`state`变化（当`store tree`更新后，依次执行数组中的`listener`）
- `getState`：读取`store tree`中所有`state`
- `replaceReucer`：替换`reducer`，改变`state`更新逻辑

从[`createStore源码分析`](https://www.jianshu.com/p/670817164b91)中可以看到，函数首先将`createStore()`函数传入的第二个参数暂存下来作为`getState()`函数的抛出值，当dispatch触发后通过注册的事件改变了内部暂存的初始值，并将其赋值给用来`getState()`函数的抛出值，因为每次dispatch以后再重新`getState()`后的数据就是更新后的数据（这就是为什么虽然`Reducer`是个纯函数只处理但没有改变`state`的值，但是派发事件处理函数后再通过`getState()`拿到的值已经发生了更新）

对于组件来说，读取`Store`的状态，并根据当前`props`和`state`渲染用户界面，用于初始化组件的状态，同时还要监听`Store`的状态改变，当状态改变时需要更新组件状态从而驱动组件重新渲染，当需要更新`Store`状态时，就要派发`action`对象

### 组件`context`

在应用`control_panel-redux`中`Counter`和`Summary`两个组件都导入了`Store`文件：`import store from '../Store.js'`，虽然现在全局`Store`文件只有一个了，但是如果我们的应用规模很大，总不能每个文件都引入一下这个文件，所以直接在组件中导入`Store`显示是不规范的。

最好的导入的地方当然是最顶层组件的位置，但是这样只能通过组件的父子关系使用props一层层往下传递，这显然也是不合理的，嵌套多层的组件结构中就懵逼了，所以：

`React`提供了一个叫`Context`的功能，能完美解决这个问题，能让一个树形组件上所有组件都能访问一个共同的对象，当然，需要上下级组件的配合：

* 上级组件需要宣称自己支持`context`，并提供一个函数来返回代表`Context`的对象
* 该上级组件的下级组件只要宣称自己需要这个`context`就可以通过`this.context`访问到这个共同的环境对象

具体实现可以应用[`control_panel_context`](https://github.com/yy709593266/reactReduxStart/tree/master/control_panel_context)

##### 提供`context`

之前入口`src/index.js`文件中，顶层组件是`ControlPanel`，现在这个组件被`Provider`包住了，`Provider`成为了顶层组件，这里`Provider`只是把渲染工作交给子组件，自己扮演的只是提供`Context`包住顶层`ControlPanel`而已，让`context`覆盖了整个应用所有组件。`Provider.js`代码如下：

```react
import { Component } from 'react'
import PropTypes from 'prop-types'

class Provider extends Component {
  //getChildContext函数返回的就是代表Context的对象
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  render(){
    // this.props.children代表的就是两个Provider标签之间的子组件
    return this.props.children
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
}

//让React认可Provider为一个Context的提供者
Provider.childContextTypes = {
  store: PropTypes.object
}

export default Provider
```

##### 使用`context`

在需要使用的组件中（`Counter.js`）构造函数时传入，具体可以参考`Counter.js`文件内容，注意`Counter.js`组件中拆分成了两个组件，其中`Counter`是接收数据纯渲染也叫傻瓜组件喽，`CounterContainer`用来接收和处理数据给`Counter`来渲染也叫容器组件：

```react
constructor(props, context){
    super(props,context)

    this.onIncrement = this.onIncrement.bind(this)
    this.onDecrement = this.onDecrement.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getOwnState = this.getOwnState.bind(this)

    this.state = this.getOwnState()
}
...
CounterContainer.contextTypes = {
  store: PropTypes.object
}
```

后面使用就像使用`props`一样，直接访问`this.context`即可。

##### 注意

因为`Context`相当于提供了一个全局可以访问的对象，但是全局对象或者说全局变量肯定是我们应该避免的用法，只要有一个地方改变了全局对象的值，应用中其他部分就会受到影响，所以，单纯来看`React`的这个`Context`必须强调要谨慎使用，只有对那些每个组件都可能使用但是中间组件又可能不使用的对象才有必要使用`Context`。

### `react-redux`

上面的例子[`control_panel_context`](https://github.com/yy709593266/reactReduxStart/tree/master/control_panel_context)我们改进React的两个方法是，第一是拆分组件为渲染组件和容器组件，第二是使用`Context`提供一个所有组件都可以直接访问的`context`，改进后的项目是不是已经很方便了，实际上，这些工作都可以使用一个库`react-redux`来帮我们完成让我们更加方便。具体可以参考应用[`control_panel_provider`](https://github.com/yy709593266/reactReduxStart/tree/master/control_panel_provider)

#### `connect`

首先，我们从实例的`Counter.js`文件中可以看到具体用法

```react
import React from 'react'
import PropTypes from 'prop-types'
import * as Actions from '../Actions'
import {connect} from 'react-redux'

const buttonStyle = {
  margin: '10px'
}

function Counter({caption, onIncrement, onDecrement, value}){
  return (
    <div>
      <button style={buttonStyle} onClick={onIncrement}>+</button>
      <button style={buttonStyle} onClick={onDecrement}>-</button>
      <span>{caption} count: {value}</span>
    </div>
  )
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    value: state[ownProps.caption]
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    onIncrement: ()=>{
      dispatch(Actions.increment(ownProps.caption))
    },
    onDecrement: ()=>{
      dispatch(Actions.decrement(ownProps.caption))
    }
  }
}

//connect执行后的结果还是一个函数
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

```

如何理解这个文件呢？

`connect`的意思就是连接展示组件和容器组件，为了加以区分和理解，这里先用`Container`表示容器组件，用`Component`表示展示组件

```js
import {connect} from 'react-redux'
const Container = connect()(Component)
```

结构如下

```react
<Container>
	<Component />
</Container>
```

现在只是展示了一个组件生成了一个容器组件并将他们连接了起来，但是容器组件中并没有数据和逻辑

由此引出`connect`函数的传参，`connect`传入的两个参数（它可以接受四个参数，但是我们暂时只看它常用的两个参数）

* `mapStateToProps`（输入逻辑）

  负责将通过state获得的数据映射到展示组件的this.props

* `mapDispatchToProps`（输出逻辑）

  负责将用户操作转化为Action的功能函数映射到展示组件的this.props

所以完成的用法就是

```react
import {connect} from 'react-redux'
const Container = connect(mapStateToProps, mapDispatchToProps)(Component)
```

##### `mapStateToProps`

先来看应用中的使用

```js
function mapStateToProps(state, ownProps){
  return {
    value: state[ownProps.caption]
  }
}
...
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

* `state`就是我们`Store`的值，用来传给内部的展示组件`Counter.js`

* ``ownProps`就是当前组件通过`props`传递进来的`props`值，请看`ControlPanel.js`

  ```react
  class ControlPanel extends Component {
    
    render(){
      return (
        <div style={style}>
          <Counter caption="First"/>
          <Counter caption="Second"/>
          <Counter caption="Third"/>
          <hr />
          <Summary />
        </div>
      )
    }
  }
  ```

##### `mapDispatchToProps`

来看应用中的使用

```js
function mapDispatchToProps(dispatch, ownProps){
  return {
    onIncrement: ()=>{
      dispatch(Actions.increment(ownProps.caption))
    },
    onDecrement: ()=>{
      dispatch(Actions.decrement(ownProps.caption))
    }
  }
}
...
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

负责定义发送`action`的函数映射到展示组件的`this.props`

* `()=>{dispatch(...)}`表示我们要传递给内部展示组件的函数
* `onIncrement`表示我们在展示组件中可以通过`this.props.onIncrement`来获取这个函数

#### `Provider`

顶层组件中通过`Provider`将`store`传入到组件中，这样每个子组件都可以拿到值啦，`src/index.js`

```react
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import ControlPanel from './views/ControlPanel'
import store from './Store.js'

ReactDOM.render(
  <Provider store={store}>
    <ControlPanel />
  </Provider>,
  document.getElementById('root')
)

```

`function Counter({caption, onIncrement, onDecrement, value}){}`函数中，`caption`是父组件`props`进来的参数，`value`是`mapStateToProps`进来的，`onIncrement`和`onDecrement`是`mapDispatchToProp`带进来的且触发会调用相应的`dispatch`函数，本节[参考](https://blog.csdn.net/q1056843325/article/details/54880804)

### 性能优化

#### 单个组件的性能优化

##### `shouldComponentUpdate`

听说`shouldComponentUpdate`是`React`组件生命周期函数中除了`render`函数之外最重要的一个函数了，它决定了组件“什么时候不需要重新渲染”，一听就是优化性能的操作。

`shouldComponentUpdate`默认返回的都是`true`，每次都重新渲染虽然浪费了性能但至少不会出错，单个组件性能优化就可以通过定制`shouldComponentUpdate`来实现

一般的判断`shouldComponentUpdate`通过传入的`props`值有没有发生变化来判断，比如在`TodoItem`组件中影响渲染的只有两个`props`值分别为`completed`和`text`，因此`shouldComponentUpdate`可以写成：

```js
shouleComponentUpdate(nextProps, nextState){
    return (nextProps.completed !== this.props.completed) || (nextProps.text !== this.props.text)
}
```

一个应用有那么多组件，如果每个`React`组件都需要定制自己的`shouldComponentUpdate`函数，那岂不是很麻烦，所以使用`react-redux`库就很简单啦：

```react
export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
```

`connect`的过程实际上产生了一个无名的`React`组件类，定制了`shouldComponentUpdate`函数的实现，实现逻辑是比对传递给内层傻瓜组件的`props`和上一次`props`，因为负责“组件看起来怎样”的傻瓜组件（这里的`TodoItem`组件）是一个无状态组件，它的渲染完全由传入的值决定，看，有了`connect`是不是就方便了很多，使用它来包裹一个组件就可以利用那个聪明的`shouldComponentUpdate`函数啦。

#### 多个组件的性能优化

* 避免标签名的替换，因为这样会重载包括这个标签以及以下的所有内容
* 多个子组件需要加上`key`值，且`key`值最好不用使用数组中元素的索引来表示，`key`值最好都是稳定不变的

#### `reselect`提高数据获取性能

`reselect`的工作原理：只要相关状态没有改变，那就直接使用上一次缓存结果

`TodoList`组件中：

```react
import {selectVisibleTodos} from '../selector.js'
const TodoList = ({todos})=>{
  return (
    <ul className="todo-list">
    {
      todos.map(item=>(
        <TodoItem 
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.completed}
        />
      ))
    }
    </ul>
  )
}

const mapStateToProps = (state)=>{
  //根据Store上的filter状态决定todos状态上取哪些元素来显示
  // console.log(state)->{todos: [xxx], filter: xxx}
  return {
    todos: selectVisibleTodos(state)
  }
}

export default connect(mapStateToProps)(TodoList)
```

`selector.js`中：

```react
import {createSelector} from 'reselect'

const getFilter = (state) => state.filter
const getTodos = (state) => state.todos

export const selectVisibleTodos = createSelector(
  [getFilter, getTodos],
  (filter, todos)=>{
    switch (filter) {
      case FilterTypes.ALL:
        return todos;
      case FilterTypes.COMPLETED:
        return todos.filter(item=>item.completed);
      case FilterTypes.UNCOMPLETED:
        return todos.filter(item=>!item.completed);
      default:
        throw new Error('unsupported filter')
    }
  }
)
```

本来`todos`在每一次组件更新的时候都会重新计算，如果`state`树结构复杂，岂不是很浪费性能，引入`reselect`后的方法是：只要传入到`selector`中的值：`filter`和`todos`字段不变，不论怎样触发`TodoList`的渲染过程，都不会引发没有必要的遍历`todos`字段的运算，性能自然更快，具体关于`reselect`可以参考[翻译Redux的中间件--Reselect](https://www.jianshu.com/p/6e38c66366cd)

### `Redux`异步操作

在一个`Redux`应用中，状态都尽量存在`Redux`的`Store`上，所有单个`React`组件访问服务器（直接在组件中请求服务器数据）的方案就不适用了，而请求服务器数据又是一个异步操作，所以我们需要做的就是在`Redux`中实现异步操作。

#### `redux-thunk`实现异步操作

`Redux`的单向数据流是同步操作，每一个`action`对象被派发到`Store`上之后，同步的被分配到所有的`reducer`函数，完成数据操作后立刻同步返回，`reducer`返回的结果又被同步的拿去更新`Store`上的状态数据，更新状态数据的操作会立刻被同步给监听`Store`状态改变的函数，从而引发作为视图的`React`组件更新过程

在`Redux`的单向数据流中，在`action`对象被`reducer`函数处理之前是插入异步功能的时机

当我们想要让`Redux`帮忙处理一个异步操作的时候，代码一样也要派发一个`action`对象，但是这个引发异步操作的`action`对象比较特殊，我们叫它为“异步`action`对象”

之前例子中`action`构造函数返回的都是一个普通对象，该对象包含若干字段，其中必不可少的字段是`type`，但是“异步`action`对象”不是一个普对象，而是一个函数

`redux-thunk`中间件的工作就是检查`action`对象是不是函数，如果不是函数就放行，完成普通`action`对象的生命周期，而如果发现`action`对象是函数，那就执行这个函数，并把`Store`的`dispatch`函数和`getState`函数作为参数传递到函数中去，处理过程到此为止，不会让这个异步`action`对象继续派发到`reducer`函数，例如

```js
const increment = () => ({
    type: ActionTypes.INCREMENT
})
```

这是个普通的同步增加计数的`action`构造函数`increment`，异步`action`对象如下

```js
const incrementAsync = () => {
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment)
        },1000)
    }
}
```

这样一个函数被`dispatch`函数派发之后会被`redux-thunk`中间件执行，于是`setTimeout`函数会发生作用，1秒后利用参数`dispatch`函数派发出同步`action`构造函数`increment`的结果，此时派发的就是一个普通对象，不会被`redux-thunk`拦截，而是直接派发到`reducer`最终驱动到`Store`上状态的改变。

#### 中间件

之前介绍通过`dispatch`派发的`action`对象会进入`reducer`，其实在`action`对象进入`reducer`之前，会经历中间件的管道。

在这里管道中，每个中间件都会接收到`action`对象，在处理完之后就会把`action`对象交给下一个中间件处理，只有所有的中间件都处理完`action`对象之后，才轮到`reducer`来处理`action`对象。如果某个中间件觉得没必要继续处理这个`action`对象了，就不会把`action`对象交给下一个中间件，对这个`action`对象的处理就此中止也就轮不到`reducer`了。

#### `Promise`中间件实现异步功能

在我们的[weather实例](https://github.com/yy709593266/reactReduxStart/tree/master/weather_react)中我们的`actions`对象是这样的：

```js
export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
})
export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})
export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})
export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityCode/${cityCode}.html`
    dispatch(fetchWeatherStarted())
    fetch(apiUrl).then(res=>{
      if(res.status!==200){
        throw new Error(`Fail to get response with status ${res.status}`)
      }
      res.json().then(resData=>{
        dispatch(fetchWeatherSuccess(resData.weatherinfo))
      }).catch(err=>{
        console.log(err)
        throw new Error(`Invalid json response ${err}`)
      })
    }).catch(err=>{
      dispatch(fetchWeatherFailure(err))
    })
  }
}
```

通过改进的`Promise`中间件是这样的：

```js
export default function promiseMiddleware({dispatch}){
  return (next)=>(action)=>{
    const {types, promise, ...rest} = action
    if(!isPromise(promise)||!(action.types&&action.types.length===3)){
      return next(action)
    }
    const [PENDING, DONE, FAIL] = types
    dispatch({...rest, type: PENDING})
    return action.promise.then(
      (result)=>dispatch({...rest, result, type: DONE}),
      (error)=>dispatch({...rest, error, type: FAIL})
    )
  }
}
```

这个中间件处理的异步对象必须包含一个`promise`字段和一个`types`字段，前者是一个`Promise`对象，后者是一个大小为3的数组，依次分别代表异步操作的进行中、成功结束和失败三种`action`类型，一个被`Promise`中间件处理的`action`对象的例子是这样的：

```jsx
{
    promise: fetch(apiUrl),
    types: ['pending', 'success', 'failure']
}
```

如果传入的`action`对象不满足这种格式，就直接通过`next`交给其他中间件处理。

如果传入的`action`对象满足条件，那么`Promise`中间件就从`action`对象的`types`字段中取出三个`action`类型，第一个是表示异步操作进行中的`PENDING`，先制造一个`type`为`PENDING`的`action`对象派发出去，告诉系统这个异步动作开始了	，接下来，通过`then`和`catch`分别连接上`promise`字段，分别派发成功和失败动作。

