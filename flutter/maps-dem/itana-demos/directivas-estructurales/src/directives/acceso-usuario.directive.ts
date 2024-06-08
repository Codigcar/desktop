import { Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appAccesoUsuario]',
})
export class AccesoUsuarioDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private router: ActivatedRoute,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {
 /*   this.router.params.subscribe((params) => {
      if(params['type']) this.viewContainer.createEmbeddedView(this.templateRef);
      else this.viewContainer.clear();
    });
    */
  }

  @Input() set appAccesoUsuario(btnNombre: string) {
    this.router.params.subscribe((params) => {
      if(params['type'] == btnNombre) this.viewContainer.createEmbeddedView(this.templateRef);
      else this.viewContainer.clear();
    });
  }
}
