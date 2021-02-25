/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule, OnInit  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment: </b> 
                    <ng-container *ngIf="!loan_amount">N/A</ng-container>
                    <ng-container *ngIf="loan_amount">{{monthly_payment | currency}}</ng-container><br/>
                    <b>Late Payment Fee : 
                      <ng-container *ngIf="!loan_amount">N/A</ng-container>
                      <ng-container *ngIf="loan_amount">{{late_payment | currency}}</ng-container>   
                    </b><br/>
                </div>`
})
export class Test01Component implements OnInit {

    public loan_amount: number = 10000;
    public monthly_payment: number = 200;
    public late_payment: number = 10;

    public ngOnInit() {
        this.monthly_payment = 0.02 * this.loan_amount;
        this.late_payment = 0.05 * this.monthly_payment;
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}