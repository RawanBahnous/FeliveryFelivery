import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuitemsService } from 'src/app/Services/menuitems.service';
import { SharedService } from 'src/app/Services/shared.service';
import { StoreService } from 'src/app/Services/store.service';

@Component({
  selector: "app-menuitems",
  templateUrl: "./menuitems.component.html",
  styleUrls: ["./menuitems.component.css"],
})
export class MenuitemsComponent implements OnInit {
  
  p: number = 1;
  itemperpage:number = 7;
  // totalproducts :number = 0;

  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 12;
  // tableSizes: any = [5, 10, 15, 20];

  items: any = [];

  data: any = [];

  constructor(
    public menuservice: MenuitemsService,
    private router: Router,
    public shared: SharedService,
    private servicestore: StoreService
  ) {}
  id: any = this.shared.getId();

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.ngOnInit();
  // }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.ngOnInit();
  // }
  ngOnInit(): void {
    this.menuservice.GetAllmenuserved().subscribe({
      next: (data) => {
        var d = Object.values(data);
        // this.totalproducts = d.length;
        console.log(d);
        for (let i = 0; i < d.length; i++) {
          if (d[i].restaurantID == this.id) {
            this.items.push(d[i]);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // deleteItem(id: any): void {
  //   this.menuservice.getMenuitemById(id).subscribe()
  //   this.menuservice.deleteMenuitem(id).subscribe(() => {
  //     // alert('Item deleted successfully.');
  //     console.log("Deleteeed");

  //     this.router.navigate(["/store-dashboard/menuitems"]);
  //   }, error => {
  //     console.error('Error deleting item:', error);
  //   });
  // }

  newItem: any = {};

  addItem(): void {
    this.menuservice.addmenuitem(this.newItem).subscribe(
      (response) => {
        console.log("Item added successfully.");
        // Reset the form after successful submission
        this.newItem = {};
      },
      (error) => {
        console.error("Error adding item:", error);
      }
    );
  }
}