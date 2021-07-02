import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Tab3Page } from '../tab3/tab3.page';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {
  products: Observable<any[]>;
  @ViewChild('myfab', {read: ElementRef }) carBtn: ElementRef;
  cart = {};
  cartAnimation: Animation;

  constructor(private productService: ProductService, private animationCtrl: AnimationController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.productService.cart.subscribe(value => {
      this.cart = value;
    })
  }

  ngAfterViewInit() {
    this.cartAnimation = this.animationCtrl.create('cart-animation');
    this.cartAnimation
  }
  addToCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.addToCart(product.id);
    this.cartAnimation.play()
  }

  removeFromCart(event: { stopPropagation: () => void; }, product: { id: any; }) {
    event.stopPropagation();
    this.productService.removeFromCart(product.id);
    this.cartAnimation.play()
  }
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: Tab3Page
    });
    await modal.present();
  }
}
