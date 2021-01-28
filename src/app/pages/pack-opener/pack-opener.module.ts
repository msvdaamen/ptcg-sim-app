import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PackOpenerRoutingModule} from './pack-opener-routing.module';
import {PackOpenerComponent} from './pack-opener.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    PackOpenerComponent
  ],
    imports: [
        CommonModule,
        PackOpenerRoutingModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class PackOpenerModule {}
