import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import {AuthUser} from '../../../graphql';

const REGISTER_MUTATION = gql`
    mutation register($email: String!, $password: String!, $passwordConfirmation: String!) {
      register(registerCredentials: {email: $email, password: $password, passwordConfirmation: $passwordConfirmation}) {
        id
        email
        accessToken
      }
    }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  register(): void {
    const values = this.registerForm.value;

    this.apollo.mutate<{register: AuthUser}>({
      mutation: REGISTER_MUTATION,
      variables: values
    }).subscribe(({data}) => {
      const accessToken = data.register.accessToken;
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
