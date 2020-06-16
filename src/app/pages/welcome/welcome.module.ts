import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconModule } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];


@NgModule({
  imports: [WelcomeRoutingModule,
    NgZorroAntdModule,
    NzIconModule.forRoot(icons),
    NzSpaceModule,
    IconModule,
    NzGridModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
