import { Injectable } from '@angular/core';
import { ModelCartComponent } from '../comp/model-cart/model-cart.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: MdbModalRef<ModelCartComponent> | null = null;

  constructor(private modalService: MdbModalService) { }

  openModal() {
    this.modalRef = this.modalService.open(ModelCartComponent)
  }
}
