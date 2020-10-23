import { Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { users } from '../../store/user.selectors';
import { UserState } from '../../store/user.reducer';

import { UserModel } from '../user-input/user-model';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit, OnDestroy {
  svg;
  margin = 50;
  width = 750 - (this.margin * 2);
  height = 400 - (this.margin * 2);
  innerWidth = this.width - this.margin * 2;
  innerHeight = this.height - this.margin * 2;
  users$: Observable<Array<UserModel>>;
  friends: Array<UserModel>;
  ngUnsubscribe = new Subject();

  constructor(private store: Store<UserState>) {
    this.users$ = this.store.select(users);
  }

  ngOnInit(): void {
    this.createSvg();
    this.users$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(userArray => {
      this.friends = userArray;
      this.drawPlot();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private createSvg(): void {
    this.svg = d3.select('figure#scatter')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', `translate(${this.margin},${this.margin})`);
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 300])
      .range([ 0, this.width ]);
    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([ this.height, 0]);
    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin - 20)
      .text('Weight');

    this.svg.append('text')
      .attr('class', 'axis-label')
      .attr('x', -(this.height / 2))
      .attr('y', -(this.margin / 2))
      .attr('transform', 'rotate(-90)')
      .text('Age');

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
      .data(this.friends)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.weight))
      .attr('cy', d => y(d.age))
      .attr('r', 7)
      .style('opacity', .5)
      .style('fill', '#69b3a2');

    // Add labels
    dots.selectAll('text')
      .data(this.friends)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('x', d => x(d.weight))
      .attr('y', d => y(d.age));
  }
}
