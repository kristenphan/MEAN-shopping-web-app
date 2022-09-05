import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [];
  cardsForHandset = [];
  cardsForWeb = [];

  isHandset:boolean = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              public appService: AppService,
              private notifierService: NotifierService) {}

  ngOnInit() {
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();
    });

    this.appService.getDeals().subscribe(
      response => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
      },
      error => {
        // alert('There was an error in receiving data from server. Please come again later!');
        // Use Angular Material Snack Bar and an Angular service to show error message on failed api call
        this.notifierService.showNotification('There was an error in receiving data from server. Please come again later!',
                                               'OK');
      }
    );
  }

  loadCards() {
    this.cards = this.isHandset? this.cardsForHandset : this.cardsForWeb;
  }

  getImage(imageName: string): string {
    return 'url(' + 'http://localhost:3000/images/' + imageName + '.jpg' + ')';
  }
}
