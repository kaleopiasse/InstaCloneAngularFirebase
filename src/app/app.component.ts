import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyAB15vlIIluho3otPOpx085u4QpvrX6OF0',
      authDomain: 'jta-instagram-clone-683d2.firebaseapp.com',
      databaseURL: 'https://jta-instagram-clone-683d2.firebaseio.com',
      projectId: 'jta-instagram-clone-683d2',
      storageBucket: 'jta-instagram-clone-683d2.appspot.com',
      messagingSenderId: '951297016264'
    };
    firebase.initializeApp(config);
  }
}
