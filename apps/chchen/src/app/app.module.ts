import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BracketModule } from './bracket/bracket.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BracketModule
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
