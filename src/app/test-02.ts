/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Output, EventEmitter  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// There are multiple way of doing this, Using Subjects , or either Angular Service or using @Output event emitters.
// I am using Event Emitter approach
@Component({
    selector : 'textfield',
    template : '<input type="text" value="" [(ngModel)]="field" (ngModelChange)="fieldChange($event)"/>'
})
export class TextField {

  public field = "";
  @Output() public onTextFieldChange: EventEmitter<string> = new EventEmitter();

  public fieldChange(val) {
    this.onTextFieldChange.emit(val);
  }
  
    
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (onTextFieldChange)="textFieldChange($event)"></textfield>`
})
export class ChildComponent {

  @Output() public onTitleChanges: EventEmitter<string> = new EventEmitter();
  public textFieldChange(val) {
    this.onTitleChanges.emit(val);
  }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (onTitleChanges)="titleChange($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    public titleChange(val) {
      this.title = val;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField],
})
export class Test02Module {};