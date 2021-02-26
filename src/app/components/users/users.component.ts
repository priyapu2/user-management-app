import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from '../../services/userService';
import { User } from '../../models/user-model';
import { StorageService } from '../../services/storageService';
import { LOCALSTORAGE } from '../../constants/localStorage';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  usersList: User[] = [];
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'gender', 'email', 'dateOfBirth', 'action'];
  demoUsers: User[] = [
    {
      userId: 9000, firstName: 'Amit', lastName: 'Asthana', gender: 'Male', email: 'ami.seh@yahoo.com', dateOfBirth: new Date('02/15/1992'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9001, firstName: 'Bobby', lastName: 'Brown', gender: 'Female', email: 'bob.brw@yahoo.com', dateOfBirth: new Date('04/05/1992'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9002, firstName: 'Chirag', lastName: 'Den', gender: 'Male', email: 'chi.den@yahoo.com', dateOfBirth: new Date('02/24/1992'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9003, firstName: 'Dany', lastName: 'Brown', gender: 'Male', email: 'dan.brw@yahoo.com', dateOfBirth: new Date('02/15/1991'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9004, firstName: 'Ela', lastName: 'Sehgal', gender: 'Female', email: 'ela.seh@yahoo.com', dateOfBirth: new Date('07/29/1993'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9005, firstName: 'Fabio', lastName: 'Crew', gender: 'Male', email: 'fab.guc@yahoo.com', dateOfBirth: new Date('02/16/1992'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9006, firstName: 'Gucci', lastName: 'Lane', gender: 'Male', email: 'gu.la@yahoo.com', dateOfBirth: new Date('02/18/1995'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9007, firstName: 'Herald', lastName: 'Kupper', gender: 'Male', email: 'he.ku@yahoo.com', dateOfBirth: new Date('02/20/1986'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9008, firstName: 'Ira', lastName: 'Behl', gender: 'Male', email: 'ila.behl@yahoo.com', dateOfBirth: new Date('03/15/1992'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9009, firstName: 'Jane', lastName: 'Jacob', gender: 'Female', email: 'jan.jac@yahoo.com', dateOfBirth: new Date('02/26/9180'), password: '123456', confirmPassword: '123456'
    },
    {
      userId: 9010, firstName: 'Kevin', lastName: 'Kols', gender: 'Male', email: 'kev.ko@yahoo.com', dateOfBirth: new Date('06/24/1992'), password: '123456', confirmPassword: '123456'
    }
  ]
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    const storedUsers = await this.storageService.getItem(LOCALSTORAGE.USERS);
    if (storedUsers && storedUsers.length > 0) {
      this.usersList = storedUsers;
    } else {
      this.usersList = this.demoUsers;
      this.storageService.setItem(LOCALSTORAGE.USERS, this.usersList);
    }
  }

  addUser() {
    var dialogRef = this.dialog.open(AddUserComponent, {
      minHeight: '50%',
      minWidth: '30%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.userService.saveUser(result);
        this.usersList = await this.storageService.getItem(LOCALSTORAGE.USERS);
      }
    });
  }

  async deleteUser(userData) {
    await this.userService.deleteUser(userData);
    this.usersList = this.storageService.getItem(LOCALSTORAGE.USERS);
  }

}
