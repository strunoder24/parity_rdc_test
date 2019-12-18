import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleUp, faAngleDown, faCaretDown, faCaretUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);
