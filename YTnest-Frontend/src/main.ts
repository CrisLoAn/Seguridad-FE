import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVRpR2Nbe05xdl9CZVZTQ2YuP1ZhSXxQd0djUX9edHxRQWJbUUU=");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
