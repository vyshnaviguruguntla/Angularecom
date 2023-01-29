import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from './config';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite';
import { Customer } from '../models/customer';
import { ConfigService } from './config.service';
import { async } from '@firebase/util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {

  private customerAddressCollection = collection( ConfigService.getFirestoreApp(), 'CustomerAddress');
  private customerBillingAddressCollection = collection( ConfigService.getFirestoreApp(), 'CustomerBillingAddress');
  private static customerAddress: any[];
  private static customerBillingAddress: any[];

  constructor() { }

  async getCustomerAddress() {
    if (!CustomerAddressService.customerAddress) {
      const user = JSON.parse(sessionStorage.getItem('user'))
      // Traemos los productos que estaán en la DB
      const customerAddressSnapshot = await getDocs(this.customerAddressCollection) as any;
      const customerAddressList = customerAddressSnapshot.docs
        .map(doc => ({id: doc?.id, ...doc?.data()}))
        .filter(({userId}) => userId === user.uid);
        CustomerAddressService.customerAddress = customerAddressList as [];
    }

    return CustomerAddressService.customerAddress;
  }

  async setCustomerAddress(address) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    address.userId = user?.uid;
    await addDoc(this.customerAddressCollection, address);
    CustomerAddressService.clearAddresses();
  }

  async setCustomerBillingAddress(address) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    address.userId = user?.uid;
    await addDoc(this.customerBillingAddressCollection, address);
    CustomerAddressService.clearBillingAddresses();
  }

  private static clearAddresses() {
    CustomerAddressService.customerAddress = null;
  }

  private static clearBillingAddresses() {
    CustomerAddressService.customerBillingAddress = null;
  }

}