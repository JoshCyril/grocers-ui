import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal/modal-ref';

@Component({
  selector: 'app-model-cart',
  templateUrl: './model-cart.component.html',
  styleUrls: ['./model-cart.component.scss']
})
export class ModelCartComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<ModelCartComponent>) { }

  ngOnInit(): void {
  }

}
