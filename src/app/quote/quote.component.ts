import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api/api.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  quote = '';
  loading = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.runRandomQuoteApi();
  }

  runRandomQuoteApi() {
    this.loading = true;
    this.apiService.getRandomQuote().subscribe({
      next: (response) => {
        this.quote = response?.content || '';
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
