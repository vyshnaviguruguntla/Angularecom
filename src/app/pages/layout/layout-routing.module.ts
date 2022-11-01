import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'shoppingcart',
        loadChildren: () => import('../shoppingcart/shoppingcart.module').then(m => m.ShoppingcartModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
