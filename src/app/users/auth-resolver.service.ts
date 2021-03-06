import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
 
import { UserService }  from './user.service';
import { ProductService }  from '../products/product.service';

 
@Injectable()
export class AuthResolver implements Resolve<Boolean> {
  constructor(
    private userService: UserService,
    private productService: ProductService,    
    private router: Router
  ) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Boolean> {
    if (this.userService.userIsLoggedIn) { // Already checked this session so we can assume they are still logged in
      return this.productService.getCart().then(() => {
        return true;
      });
    }
    else {
      return this.userService.isLoggedIn().then((res) => {
        if (res) {
          this.productService.getCart().then(() => {
            return res;
          });
        }
        else {
          return res;
        }
      });
    }
  }
}