import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/user';
import { FetchUsers } from 'src/app/state/admin-view-state/adminView.actions';
import { AdminViewState } from 'src/app/state/admin-view-state/adminView.state';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  private users$!: Observable<User[]>;
  public users!: User[];

  displayedColumns: string[] = ['id', 'email', 'role', 'actions'];

  constructor(private store: Store) {
    this.store.dispatch(FetchUsers);
    this.users$ = this.store.select(AdminViewState.selectUsers);
    this.users$.subscribe((res) => this.users = res);
  }

  ngOnInit(): void {}
}
