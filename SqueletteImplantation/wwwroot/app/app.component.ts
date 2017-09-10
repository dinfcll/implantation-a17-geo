import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl:'./view/index.html',
  styleUrls:['./../css/styles.css','./../lib/font-awesome-4.7.0/css/font-awesome.css','./../lib/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent  { name = 'Angular'; }
