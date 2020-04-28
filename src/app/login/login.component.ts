import { Component, OnInit } from '@angular/core';  
import { FormGroup, Validators, FormControl } from '@angular/forms';  
import { UserDetail } from "../classes/UserDetail";
import { UserService } from '../services/user.service';  
import { Router } from '@angular/router';  
  
@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']  
})  
export class LoginComponent implements OnInit {  
  
  private adminDetail = new UserDetail();  
  
  constructor(private adminService : UserService, private router : Router) { }  
  
  ngOnInit() {  
    if((this.adminService.isLoggedIn()) )  
    {  
        this.router.navigate(['/profile', localStorage.getItem('id')]);  
    }  
    else  
    {  
        console.log("login unsuccesssful");
        this.router.navigate(['/login']);  
    }  
  }  
  
  // create the form object.  
  form = new FormGroup({  
    email : new FormControl('' , Validators.required),  
    password : new FormControl('' , Validators.required)  
  });  
  
  Login(LoginInformation)  
  {  
      this.adminDetail.email = this.Email.value;  
      this.adminDetail.password = this.Password.value;  
  
      this.adminService.login(this.adminDetail).subscribe(  
        response => {  
            let result =  response.json();  
            console.log(result);
              
            if(result > 0)  
            {  
              console.log("token -  ")
              let token = response.headers.get("Authorization");  
              console.log(token)
              // resp.headers.get('X-Token')
              localStorage.setItem("token" , token);  
              localStorage.setItem("id" , result);  
    
              this.router.navigate(['/profile', result]);  
              
              // this.router.navigate(['/profile']);
            }  
            if(result == -1)  
            {  
              alert("please register before login Or Invalid combination of Email and password");  
            }  
             
        },  
        error => {  
            console.log("Error in authentication");  
        }  
      );  
  }  
  
  get Email(){  
      return this.form.get('email');  
  }  
  
  get Password(){  
      return this.form.get('password');  
  }  
  
}  