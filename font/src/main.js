import Vue from 'vue';
import App from './App.vue';
import router from './router';
import echarts from 'echarts';
import {
  Row,
  Col,
  Icon,
  Input,
  Button,
  Loading,
  Popover,
  Dialog,
  Checkbox,
  Select,
  Rate,
  CheckboxGroup,
  Option,
  OptionGroup,
  RadioButton,
  RadioGroup,
  Radio,
  Pagination,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Message,
  DatePicker,
  Form,
  FormItem,
  Tabs,
  TabPane
} from 'element-ui';
import './assets/theme/alert.css';
import './assets/theme/message.css';
import './assets/theme/loading.css';
import './assets/theme/popover.css';
import './assets/theme/button.css';
import './assets/theme/input.css';
import './assets/theme/icon.css';
import './assets/theme/row.css';
import './assets/theme/col.css';
import './assets/theme/dialog.css';
import './assets/theme/rate.css';
import './assets/theme/checkbox.css';
import './assets/theme/checkbox-group.css';
import './assets/theme/select.css';
import './assets/theme/option.css';
import './assets/theme/option-group.css';
import './assets/theme/scrollbar.css';
import './assets/theme/radio.css';
import './assets/theme/radio-button.css';
import './assets/theme/radio-group.css';
import './assets/theme/pagination.css';
import './assets/theme/breadcrumb.css';
import './assets/theme/breadcrumb-item.css';
import './assets/theme/table.css';
import './assets/theme/table-column.css';
import './assets/theme/message.css';
import './assets/theme/date-picker.css';
import './assets/theme/form.css';
import './assets/theme/form-item.css';
import './assets/theme/tabs.css';
import './assets/theme/tab-pane.css';
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Button);
Vue.use(Loading);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Rate);
Vue.use(CheckboxGroup);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Pagination);
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Message.install = function (Vue) {
  Vue.prototype.$message = Message
}
Vue.use(Message)

Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

window.__VUE_APP__ = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');