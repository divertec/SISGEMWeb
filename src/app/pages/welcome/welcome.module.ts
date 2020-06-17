import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { IconModule } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { EmpleadoComponent } from '../empleado/empleado.component';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module'
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];


@NgModule({
  imports: [WelcomeRoutingModule,
    DemoNgZorroAntdModule,
    NzIconModule.forRoot(icons),
    IconModule,
  ],
  declarations: [WelcomeComponent,],
  bootstrap: [EmpleadoComponent],
  exports: [WelcomeComponent],

})
export class WelcomeModule { }
