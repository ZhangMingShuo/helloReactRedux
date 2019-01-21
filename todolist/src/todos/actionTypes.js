/* 
定义 todos 支持的 action 类型
即: 对待办事项的增加,反转和删除
考虑到应用可以无限扩展,每个组件也要避免命名冲突,所以每个组件的action类型字符串值都有一个唯一前缀
*/

export const ADD_TODO = 'TODO/ADD'
export const TOGGLE_TODO = 'TODO/TOGGLE'
export const REMOVE_TODO = 'TODO/REMOVE'