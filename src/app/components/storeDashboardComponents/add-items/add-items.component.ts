import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { MenuitemsService } from 'src/app/Services/menuitems.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent {

  addnewitem= new FormGroup({
    itemname: new FormControl("",[Validators.min(5),Validators.max(50),Validators.required]),
    category: new FormControl("", Validators.required),
    price:new FormControl("",[Validators.pattern(/^(?=.*[0-9]).{1,3}$/),Validators.required]),
    itemImg:new FormControl(""),
    desc:new FormControl("",[Validators.required,Validators.max(100)]),

  })

  constructor(public myService:MenuitemsService){
  }

addNewItem(itemnam: string, categoryname: any, price: any,rname:any) {
    // {
    //   "name": "string",
    //   "price": 0,
    //   "categoryID": 1,
    //   "restaurantID": 1,
    //   "menuItemImg": "string"
    // }
    let newItem={
      name: itemnam,
      price: price,
      categoryID: categoryname,
      restaurantID: rname,
     menuItemImg: "skkfftring"
      }
  
  if (this.addnewitem.valid) {
    console.log(newItem);
      this.myService.addmenuitem(newItem).subscribe(
        (data: any) => {
                  console.log(data);
                },
                (err: any) => {
                  console.log('Error', err);
                }
      );

      // }
      // );
      // this.router.navigate(['/menuitems']); 
      // alert(`${itemnam} added successfully`);
    }
  }
  
  newItem: any = {};

  addItem(name: string, category: any, price: any,rest:any): void {
     
      let newItem={
        name: name,
        price: price,
        categoryID: category,
        restaurantID: rest,
        }
    this.myService.addmenuitem(this.newItem).subscribe(
      (response) => {
        console.log('Item added successfully.');
        this.newItem = {};
      },
      (error) => {
        console.error('Error adding item:', error);
      }
    );
  }
}















