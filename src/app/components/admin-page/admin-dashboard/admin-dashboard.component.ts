import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/user';
import { FetchUsers } from 'src/app/state/admin-view-state/adminView.actions';
import { AdminViewState } from 'src/app/state/admin-view-state/adminView.state';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  private users$!: Observable<User[]>;
  public users!: User[];

  public pageSizes = [5, 10, 25];
  public displayedColumns: string[] = ['id', 'email', 'role', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  public dataSource = new MatTableDataSource<User>(this.users);

  constructor(private store: Store) {
    this.store.dispatch(FetchUsers);
    this.users$ = this.store.select(AdminViewState.selectUsers);

    this.users$.subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}
  
}
