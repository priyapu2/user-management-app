import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../../models/user-model';
import { MustMatch, ValidateName, MinimumAge } from '../../../helper/validatros';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,

} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  optionGender: string[] = ['Male', 'Female', 'Other'];
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    },
      {
        validator: [MustMatch('password', 'confirmPassword'), ValidateName('firstName'),
        ValidateName('lastName'),
        MinimumAge(15)
        ],
      });
  }

  onNoClick(): void {
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmAdd() {
    const userData: User = this.userForm.getRawValue();
    this.dialogRef.close(userData);
  }
}


