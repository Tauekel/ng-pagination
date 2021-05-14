import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  index = 0;
  pages = [];
  itemsPerPage = 10;

  constructor(
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(res => {
      this.pages = this.paginate(res);
      this.users = this.pages[this.index];
    });
  }

  paginate = followers => {
    const numberOfPages = Math.ceil(followers.length / this.itemsPerPage);
    return Array.from({length: numberOfPages}, (_, index) => {
      const start = index * this.itemsPerPage;
      return followers.slice(start, start + this.itemsPerPage);
    });
  }

  goToPage(event: Event): void {
    const prevBtn = (event.target as HTMLInputElement).classList.contains('prev-btn');
    const pageBtn = (event.target as HTMLInputElement).classList.contains('page-btn');
    const nextBtn = (event.target as HTMLInputElement).classList.contains('next-btn');
    const index = (event.target as HTMLInputElement).dataset.index;

    if (prevBtn) {
      this.index--;
      if (this.index < 0) { this.index = this.pages.length - 1; }
    }

    if (pageBtn) { this.index = parseInt(index, 10); }

    if (nextBtn) {
      this.index++;
      if (this.index > this.pages.length - 1) { this.index = 0; }
    }

    this.getUsers();
  }
}
