import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  products = [];
 
  constructor(private productService: ProductService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }
 
  ngOnInit() {
    const cartItems = this.productService.cart.value;
 
    this.productService.getProducts().pipe(take(1)).subscribe(allProducts => {
      this.products = allProducts.filter(p => cartItems[p.id]).map(product => {
        return { ...product, count: cartItems[product.id] };
      });
    });
  }
 
  async checkout() {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Thanks for your order',
      buttons: ['Continue shopping']
    });
 
    await alert.present();
 
    this.productService.checkoutCart();
    this.modalCtrl.dismiss();
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}