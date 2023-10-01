// App.js
import { Navigation } from 'react-native-navigation';
import LiveDrivingMode from './LiveDrivingMode';

// Register your screen components
Navigation.registerComponent('LiveDrivingMode', () => LiveDrivingMode);

const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'LiveDrivingMode',
              options: {
                topBar: {
                  title: {
                    text: 'Live Driving Mode',
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};

startApp();