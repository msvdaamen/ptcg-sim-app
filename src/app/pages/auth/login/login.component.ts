import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const {
      email,
      password
    } = this.loginForm.value;
    this.apollo.mutate<{login: {accessToken: string}}>({
       mutation: gql`
         mutation login($email: String! $password: String!){
           login(loginCredentials: {email: $email password: $password}) {
             accessToken
           }
         }
       `,
      variables: {
        email,
        password
      }
    }).subscribe(({data}) => {
      const accessToken = data.login.accessToken;
      this.apollo.client.writeQuery({
        query: gql`
            query accessToken {
              accessToken @client
            }
        `,
        data: {
          accessToken
        }
      });
      localStorage.setItem('accessToken', accessToken);
      this.router.navigate(['']);
    });
  }

}
