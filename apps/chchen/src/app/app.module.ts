import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BracketModule } from './bracket/bracket.module';
import { BoardComponent } from './board/board.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BracketModule
    ],
    declarations: [AppComponent, BoardComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
