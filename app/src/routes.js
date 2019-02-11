import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'

import Login from './pages/login'
import Timeline from './pages/timeline'

const Routes = createAppContainer(
  createSwitchNavigator({
    login: Login,
    app: createStackNavigator({
      Timeline,
    })
  })
)

export default Routes