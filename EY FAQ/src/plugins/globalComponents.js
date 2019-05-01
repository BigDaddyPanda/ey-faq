 
/**
 * You can register global components here
 */
import {
  Alert,
  Collapse,
  CollapseItem,
  Checkbox,
  Switch,
  Badge,
  Progress,
  Pagination,
  Radio,
  FormGroupInput,
  Card,
  DropDown,
  Navbar,
  NavbarToggleButton,
  NavLink,
  TabPane,
  Tabs,
  Modal,
  Parallax,
  Slider,
  Button,
  BaseTable

} from '@/components';
const globalComponents = {
  install(Vue) { 
    Vue.component(Alert.name,Alert);
    Vue.component(Collapse.name,Collapse);
    Vue.component(CollapseItem.name,CollapseItem);
    Vue.component(Checkbox.name,Checkbox);
    Vue.component(Switch.name,Switch);
    Vue.component(Badge.name,Badge);
    Vue.component(Progress.name,Progress);
    Vue.component(Pagination.name,Pagination);
    Vue.component(Radio.name,Radio);
    Vue.component(FormGroupInput.name,FormGroupInput);
    Vue.component(Card.name,Card);
    Vue.component(DropDown.name,DropDown);
    Vue.component(Navbar.name,Navbar);
    Vue.component(NavbarToggleButton.name,NavbarToggleButton);
    Vue.component(NavLink.name,NavLink);
    Vue.component(TabPane.name,TabPane);
    Vue.component(Tabs.name,Tabs);
    Vue.component(Modal.name,Modal);
    Vue.component(Parallax.name,Parallax);
    Vue.component(Slider.name,Slider);
    Vue.component(Button.name,Button);
    Vue.component(BaseTable.name,BaseTable);
    }
};

export default globalComponents;