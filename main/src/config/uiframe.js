// elementUI 的UI资源按需加载的配置，主要加载通用化的资源
// element 常用组件引用

import Vue from 'vue'
import {
  Table,
  TableColumn,
  Calendar,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Divider,
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tag,
  Collapse,
  CollapseItem,
  Dialog,
  Empty,
  Pagination,
} from 'element-ui'

const elComponents = [
  Table,
  TableColumn,
  Calendar,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Divider,
  Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Tag,
  Collapse,
  CollapseItem,
  Dialog,
  Empty,
  Pagination,
]

// 注册特殊this调用组件
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

// 抛出
export default elComponents
